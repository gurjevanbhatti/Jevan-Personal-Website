from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime
import resend

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend setup
RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '')
CONTACT_TO_EMAIL = os.environ.get('CONTACT_TO_EMAIL', '')
if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


# ---------- Models ----------
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    note: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    delivered: bool = False

class ContactCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    note: str = Field(min_length=1, max_length=4000)


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**sc) for sc in status_checks]


def _build_email_html(name: str, email: str, note: str) -> str:
    safe_note = (note or '').replace('\n', '<br/>')
    return f"""
    <div style=\"font-family:'Segoe UI',Arial,sans-serif;background:#fff0f8;padding:24px;\">
      <div style=\"max-width:560px;margin:0 auto;background:#ffffff;border:2px solid #4a2b5c;border-radius:14px;box-shadow:4px 4px 0 0 #4a2b5c;overflow:hidden;\">
        <div style=\"background:linear-gradient(180deg,#ffd6ec,#ffb6d5);padding:10px 16px;border-bottom:2px solid #4a2b5c;\">
          <div style=\"font-size:14px;color:#4a2b5c;font-weight:700;\">new_message.exe \u2661</div>
        </div>
        <div style=\"padding:20px;color:#4a2b5c;\">
          <div style=\"font-size:16px;margin-bottom:8px;\"><b>From:</b> {name} &lt;{email}&gt;</div>
          <div style=\"font-size:14px;color:#8a5f7f;margin-bottom:14px;\">via your Y2K portfolio contact form</div>
          <div style=\"background:#fff7fb;border:2px dashed #e0a8c9;border-radius:10px;padding:14px;font-size:15px;line-height:1.55;\">{safe_note}</div>
        </div>
      </div>
    </div>
    """


@api_router.post("/contact", response_model=ContactMessage)
async def create_contact(payload: ContactCreate):
    msg = ContactMessage(name=payload.name, email=payload.email, note=payload.note)
    # Store first
    try:
        await db.contact_messages.insert_one(msg.dict())
    except Exception as e:
        logger.error(f"DB insert failed: {e}")

    # Try sending email via Resend
    delivered = False
    if RESEND_API_KEY and CONTACT_TO_EMAIL:
        try:
            resend.Emails.send({
                "from": "Portfolio <onboarding@resend.dev>",
                "to": [CONTACT_TO_EMAIL],
                "reply_to": [payload.email],
                "subject": f"\u2661 New portfolio message from {payload.name}",
                "html": _build_email_html(payload.name, payload.email, payload.note),
            })
            delivered = True
            await db.contact_messages.update_one({"id": msg.id}, {"$set": {"delivered": True}})
        except Exception as e:
            logger.error(f"Resend email failed: {e}")
            # Do not fail the request — message is stored regardless

    msg.delivered = delivered
    return msg


@api_router.get("/contact", response_model=List[ContactMessage])
async def list_contact_messages():
    items = await db.contact_messages.find().sort("created_at", -1).to_list(500)
    return [ContactMessage(**i) for i in items]


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

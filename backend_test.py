#!/usr/bin/env python3
"""
Backend API Test Suite for Y2K Portfolio Site
Tests the contact endpoint and basic API functionality
"""

import requests
import json
import sys
from datetime import datetime

# Backend base URL from frontend/.env
BASE_URL = "https://portfolio-essence-1.preview.emergentagent.com/api"

def print_test_header(test_name):
    print(f"\n{'='*60}")
    print(f"TEST: {test_name}")
    print(f"{'='*60}")

def print_result(passed, message):
    status = "✅ PASS" if passed else "❌ FAIL"
    print(f"{status}: {message}")
    return passed

def test_root_endpoint():
    """Test GET /api/ endpoint"""
    print_test_header("Root Endpoint (GET /api/)")
    
    try:
        response = requests.get(f"{BASE_URL}/", timeout=10)
        
        # Check status code
        if response.status_code != 200:
            return print_result(False, f"Expected 200, got {response.status_code}")
        
        # Check response body
        data = response.json()
        if data.get("message") != "Hello World":
            return print_result(False, f"Expected {{'message':'Hello World'}}, got {data}")
        
        return print_result(True, "Root endpoint returns correct response")
        
    except Exception as e:
        return print_result(False, f"Exception: {str(e)}")

def test_contact_post_valid():
    """Test POST /api/contact with valid data"""
    print_test_header("Contact POST - Valid Data")
    
    payload = {
        "name": "Gurjevan Test",
        "email": "gurjevan.test@example.com",
        "note": "This is an automated test message from the backend test suite. Testing the Y2K portfolio contact form functionality."
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/contact",
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=15
        )
        
        # Check status code
        if response.status_code != 200:
            print_result(False, f"Expected 200, got {response.status_code}")
            print(f"Response body: {response.text}")
            return False
        
        # Check response structure
        data = response.json()
        required_fields = ["id", "name", "email", "note", "created_at", "delivered"]
        missing_fields = [f for f in required_fields if f not in data]
        
        if missing_fields:
            return print_result(False, f"Missing fields in response: {missing_fields}")
        
        # Validate field values
        if data["name"] != payload["name"]:
            return print_result(False, f"Name mismatch: expected {payload['name']}, got {data['name']}")
        
        if data["email"] != payload["email"]:
            return print_result(False, f"Email mismatch: expected {payload['email']}, got {data['email']}")
        
        if data["note"] != payload["note"]:
            return print_result(False, f"Note mismatch: expected {payload['note']}, got {data['note']}")
        
        # Check delivered status
        delivered = data.get("delivered", False)
        print(f"   📧 Email delivered status: {delivered}")
        
        if not delivered:
            print("   ⚠️  WARNING: Email was NOT delivered by Resend")
            print("   Check backend logs for 'Resend email failed' messages")
        else:
            print(f"   ✅ Email successfully delivered to {payload['email']}")
        
        # Store the message ID for later retrieval test
        global test_message_id
        test_message_id = data["id"]
        
        return print_result(True, f"Contact message created successfully (delivered={delivered})")
        
    except Exception as e:
        return print_result(False, f"Exception: {str(e)}")

def test_contact_post_invalid():
    """Test POST /api/contact with invalid data (validation)"""
    print_test_header("Contact POST - Invalid Data (Validation)")
    
    invalid_payload = {
        "name": "",  # Empty name (min_length=1)
        "email": "not-an-email",  # Invalid email format
        "note": ""  # Empty note (min_length=1)
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/contact",
            json=invalid_payload,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        # Should return 422 for validation error
        if response.status_code != 422:
            print_result(False, f"Expected 422 (validation error), got {response.status_code}")
            print(f"Response body: {response.text}")
            return False
        
        return print_result(True, "Validation correctly rejected invalid data with 422")
        
    except Exception as e:
        return print_result(False, f"Exception: {str(e)}")

def test_contact_get():
    """Test GET /api/contact endpoint"""
    print_test_header("Contact GET - List Messages")
    
    try:
        response = requests.get(f"{BASE_URL}/contact", timeout=10)
        
        # Check status code
        if response.status_code != 200:
            return print_result(False, f"Expected 200, got {response.status_code}")
        
        # Check response is an array
        data = response.json()
        if not isinstance(data, list):
            return print_result(False, f"Expected array, got {type(data)}")
        
        # Check if our test message is in the list
        if hasattr(test_contact_post_valid, '__globals__') and 'test_message_id' in globals():
            found = any(msg.get("id") == test_message_id for msg in data)
            if found:
                print(f"   ✅ Test message (ID: {test_message_id}) found in list")
            else:
                print(f"   ⚠️  Test message (ID: {test_message_id}) not found in list")
        
        print(f"   📊 Total messages in database: {len(data)}")
        
        return print_result(True, f"Contact list retrieved successfully ({len(data)} messages)")
        
    except Exception as e:
        return print_result(False, f"Exception: {str(e)}")

def check_backend_logs():
    """Check backend logs for Resend failures"""
    print_test_header("Backend Log Analysis")
    
    try:
        import subprocess
        result = subprocess.run(
            ["tail", "-n", "50", "/var/log/supervisor/backend.err.log"],
            capture_output=True,
            text=True,
            timeout=5
        )
        
        log_content = result.stdout
        
        # Look for Resend failures
        if "Resend email failed" in log_content:
            print("   ⚠️  Found 'Resend email failed' in logs:")
            for line in log_content.split('\n'):
                if "Resend email failed" in line or "ERROR" in line:
                    print(f"      {line}")
            return False
        else:
            print("   ✅ No 'Resend email failed' errors found in recent logs")
            return True
            
    except Exception as e:
        print(f"   ⚠️  Could not check logs: {str(e)}")
        return True  # Don't fail the test if we can't check logs

def main():
    print("\n" + "="*60)
    print("Y2K PORTFOLIO BACKEND API TEST SUITE")
    print("="*60)
    print(f"Base URL: {BASE_URL}")
    print(f"Test Time: {datetime.now().isoformat()}")
    
    results = []
    
    # Run all tests
    results.append(("Root Endpoint", test_root_endpoint()))
    results.append(("Contact POST (Valid)", test_contact_post_valid()))
    results.append(("Contact POST (Invalid)", test_contact_post_invalid()))
    results.append(("Contact GET", test_contact_get()))
    
    # Check logs (informational, doesn't affect pass/fail)
    check_backend_logs()
    
    # Summary
    print("\n" + "="*60)
    print("TEST SUMMARY")
    print("="*60)
    
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status}: {test_name}")
    
    print(f"\nTotal: {passed}/{total} tests passed")
    
    if passed == total:
        print("\n🎉 All tests passed!")
        return 0
    else:
        print(f"\n❌ {total - passed} test(s) failed")
        return 1

if __name__ == "__main__":
    test_message_id = None
    sys.exit(main())

# Red Sea

**Runner-up, cmd-f 2024. 2nd place, Community Track.**

[Watch the demo](https://youtu.be/LY2TVymYyNM)

## The problem

Over 5,000 women in Gaza are living through harsh, unsafe conditions driven by
continuous bombardment, displacement and forced migration. Getting to
humanitarian aid is difficult, and that difficulty leads directly to stillbirths
and maternal deaths. Around 2.3 million people are afraid to leave their homes
at all, because the bombings destroyed the routes that used to be safe.

Our goal over the weekend was to give refugee women four things:

- **Safe routes.** Mapped paths to refugee camps from anywhere in Gaza,
  prioritising safe passage through conflict zones.
- **Assistance.** Humanitarian aid and emergency hotlines along the way.
- **Medical resources.** Hospitals in Gaza.
- **Safety guidance.** Quick access to safety tips for the journey.

## What it does

Red Sea is a web app that uses real time conflict data to work out the safest
route to a refugee camp. You can request humanitarian aid based on your own
needs, see medical facilities nearby, and switch languages. The interface is
built to be usable under pressure.

## How it works

The app pulls live data on coordinates, fatalities and conflict zones in Gaza
from ACLED. Every coordinate gets a safety level based on the type of event
(air strike, riot, protest) and the number of fatalities.

A KNN model in Python then assigns a safety level to the roads surrounding a
route, using forward geocoding from the Mapbox API, and picks the safest path
for the user. The front end is React, with Mapbox drawing the map and fetching
the routes.

Conflict data from [acleddata.com](https://acleddata.com).

## What we were proud of

Routing by machine learning was the hard part, and the part that worked. Pulling
the coordinate points off a route and scoring each one for safety took most of
the weekend, but we got there. We also liked how the landing page turned out,
with a rotating globe and the language options right there.

## What we learned

None of us had used Flask or the Mapbox API before, so wiring the backend to the
frontend was the real lesson. We also learned a lot about content planning and
deciding what a user needs to see first when the stakes are this high.

## What's next

Scraping news sources for more conflict zone data, a registration step before
arriving at a hospital, a proper toggle for hospital pop-ups, and Google
Translate so the app can work in Arabic.

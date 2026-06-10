# Testing Matrix

| Test Case | Steps | Expected Result | Status |
| Empty search | Submit empty form | Validation error shown | Pass |
| Same city | Lahore to Lahore | Error shown | Pass |
| Past date | Select old date | Error shown | Pass |
| Valid search | Lahore to Dubai | Flight card displayed | Pass |
| No result | Valid route not in API | No flights found | Pass |
| API down | Stop json-server | API error shown | Pass |
| 404 endpoint | Change endpoint URL | Error message shown | Pass |
| Mobile view | Test 360px width | Layout responsive | Pass |
| Desktop view | Test 1440px width | Layout clean | Pass |

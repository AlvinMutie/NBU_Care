# API Contract (REST)

Base URL (typical): `http://<server>:4000/api`

All responses are JSON unless otherwise noted. Errors return:

```json
{ "error": { "code": "VALIDATION_ERROR", "message": "Human message", "details": {} } }
```

## Auth

### `POST /api/auth/login`
Request:
```json
{ "username": "admin", "password": "..." }
```
Response:
```json
{ "token": "<jwt>", "user": { "id": 1, "username": "admin", "fullName": "NBU Administrator", "role": "ADMIN" } }
```

### `GET /api/auth/me`
Headers: `Authorization: Bearer <jwt>`

Response:
```json
{ "user": { "id": 1, "username": "admin", "fullName": "NBU Administrator", "role": "ADMIN" } }
```

## Users (ADMIN)

### `POST /api/users`
Request:
```json
{ "username": "nurse01", "fullName": "Nurse A", "password": "StrongPass123", "role": "NURSE" }
```

## Flashcards

Flashcard object:
```json
{
  "id": 10,
  "title": "Admission: Initial Assessment (NBU)",
  "category": "ROUTINE",
  "icon": "clipboard-heart",
  "whenToPerform": "...",
  "steps": ["...", "..."],
  "criticalWarnings": "...",
  "tips": "...",
  "image": { "id": 5, "url": "/uploads/5.jpg" }
}
```

### `GET /api/flashcards`
Query params:
- `query` (optional): search text
- `category` (optional): `ROUTINE|CLINICAL|CRITICAL|CALCULATIONS`
- `favoritesOnly` (optional): `true|false`

### `POST /api/flashcards` (ADMIN)
Validation:
- `steps` must be an array of **1..5** strings

### `PUT /api/flashcards/:id` (ADMIN)

### `DELETE /api/flashcards/:id` (ADMIN)

### `POST /api/flashcards/:id/image` (ADMIN)
Multipart upload: field name `image`.

## Favorites

### `POST /api/favorites`
Request:
```json
{ "entityType": "FLASHCARD", "entityId": 10 }
```

### `DELETE /api/favorites`
Request:
```json
{ "entityType": "FLASHCARD", "entityId": 10 }
```

## Scenarios

Scenario object:
```json
{
  "id": 3,
  "title": "Scenario: IV Fluid Rate Conversion",
  "category": "CALCULATIONS",
  "problemText": "...",
  "solutionSteps": ["...", "..."],
  "formulasText": "ml/hr = (ml/kg/day * weight_kg) / 24",
  "criticalWarnings": "..."
}
```

### `GET /api/scenarios`
Supports `query`, `category`, `favoritesOnly` similar to flashcards.

### `POST /api/scenarios` (ADMIN)
Validation:
- `solutionSteps` must be array of **1..12** strings

## Calculators

Calculators run client-side, but formulas are standardized and shown to users:
- Dose: `dose_mg = mg_per_kg * weight_kg`
- Volume: `volume_ml = (required_dose_mg / stock_dose_mg) * stock_volume_ml`
- IV fluids: `ml_hr = (ml_per_kg_day * weight_kg) / 24`
- Dilution: `C1 * V1 = C2 * V2` → `V1 = (C2 * V2) / C1`

## Realtime

Socket.IO events (emitted by backend on changes):
- `flashcards:changed` (payload: `{ type: "created"|"updated"|"deleted", id: number }`)\n+- `scenarios:changed` (same shape)


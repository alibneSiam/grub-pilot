# Goldfish API

Minimal FastAPI backend for invite-based user onboarding and profile management.

## Run locally

```bash
env/bin/uvicorn app:app --host 127.0.0.1 --port 8000
```

Open:
- `http://127.0.0.1:8000/`
- `http://127.0.0.1:8000/docs`

## API notes

- Passwords are **encrypted**, not hashed.
- The API does **not** verify password correctness on the spot during signup.
- Email addresses must end in `@commure.com`.
- Preferences must be a list of 5 strings.
- Each preference string must be exactly 3 characters long and contain only `b`, `c`, or `f`.
- Example: `fcb` means fish first, then chicken, then beef.
- Snacks are selected by default.

## Authentication / access model

This API does not use JWT or session auth.

Current rules:
- `signup` requires an approved invitation code (`request_id`).
- `update password`, `update preferences`, `view preferences`, and `delete profile` require the user’s current password.
- `forgot password` requires the approved invitation code and a new password.

## Endpoints

### 1) Health check

`GET /`

Checks that the API and database are reachable.

Response:
```json
{ "message": "Healthy" }
```

Possible error:
- `503 Service Unavailable` if the DB check fails

### 2) Request invitation

`POST /invitation-requests`

Request body:
```json
{ "email": "alibne.siam@commure.com" }
```

Purpose:
- creates a new invitation request
- returns a message telling the user to contact `alibnesiam@gmail.com` for an invitation code

Possible errors:
- `409 Conflict` if the same email already applied
- `422 Unprocessable Entity` if email format is invalid

### 3) Sign up

`POST /signup`

Request body:
```json
{
  "request_id": "7f8f7f0b-1c2d-4ee3-8d33-0b5f0b6d5c11",
  "email": "alibne.siam@commure.com",
  "password": "initial-password",
  "preferences": ["fcb", "bcf", "cbf", "bfc", "fbc"]
}
```

Purpose:
- creates a new user only if the invitation code is approved

Possible errors:
- `400 Bad Request` if user already exists
- `400 Bad Request` if invitation code is invalid
- `422 Unprocessable Entity` if schema validation fails

### 4) Update password

`PATCH /users/password`

Request body:
```json
{
  "email": "alibne.siam@commure.com",
  "current_password": "old-password",
  "new_password": "new-password"
}
```

Purpose:
- verifies the current password
- stores the new password encrypted

Possible errors:
- `401 Unauthorized` if password is wrong
- `404 Not Found` if user does not exist

### 5) Update preferences

`PATCH /users/preferences`

Request body:
```json
{
  "email": "alibne.siam@commure.com",
  "current_password": "old-password",
  "preferences": ["fcb", "bcf", "cbf", "bfc", "fbc"]
}
```

Purpose:
- verifies the current password
- replaces the stored preference list

Possible errors:
- `401 Unauthorized` if password is wrong
- `404 Not Found` if user does not exist

### 6) View preferences

`POST /users/preferences`

Request body:
```json
{
  "email": "alibne.siam@commure.com",
  "current_password": "old-password"
}
```

Response:
```json
{
  "email": "alibne.siam@commure.com",
  "preferences": ["fcb", "bcf", "cbf", "bfc", "fbc"]
}
```

### 7) Delete profile

`DELETE /users/profile`

Request body:
```json
{
  "email": "alibne.siam@commure.com",
  "current_password": "old-password"
}
```

Purpose:
- verifies the current password
- deletes the user profile from the database

Possible errors:
- `401 Unauthorized` if password is wrong
- `404 Not Found` if user does not exist

### 8) Forgot password

`POST /users/password/forgot`

Request body:
```json
{
  "email": "alibne.siam@commure.com",
  "invitation_code": "7f8f7f0b-1c2d-4ee3-8d33-0b5f0b6d5c11",
  "new_password": "new-password"
}
```

Purpose:
- resets the password without needing the current password
- only works if the invitation code is approved for that email

Possible errors:
- `401 Unauthorized` if invitation code is invalid
- `404 Not Found` if user does not exist

## Data rules for preferences

Each preference item is a 3-character fallback chain.

Example:
- `fcb` means:
  1. try fish
  2. if unavailable, try chicken
  3. if unavailable, try beef

List length must always be 5.

## Frontend team notes

- The UI can call the `/docs` page for interactive testing.
- The easiest flow is:
  1. request invitation
  2. receive approval / invitation code
  3. sign up
  4. manage password and preferences
- Keep password input hidden and clearly explain that passwords are encrypted, not hashed.

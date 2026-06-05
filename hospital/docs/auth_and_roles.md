# Authentication & Roles

## Identity model
- **Login ID**: `username` (can be staff ID or email-like username)
- **Display name**: `fullName`
- **Role**: `NURSE` or `ADMIN`

This keeps intranet deployments simple while supporting staff-ID style logins.

## Password policy (enforced server-side)
- Minimum length: **10**
- Must include at least **1 letter** and **1 number**
- Reject common/compromised patterns (basic checks)
- Stored using **bcrypt** (never plaintext)

## Role permissions matrix

| Capability | NURSE | ADMIN |
|---|---:|---:|
| Login / logout | ✅ | ✅ |
| View flashcards | ✅ | ✅ |
| Search + filter flashcards/scenarios | ✅ | ✅ |
| Favorite / unfavorite | ✅ | ✅ |
| Use calculators | ✅ | ✅ |
| View scenarios | ✅ | ✅ |
| Create/edit/delete flashcards | ❌ | ✅ |
| Upload/change flashcard images | ❌ | ✅ |
| Create/edit/delete scenarios | ❌ | ✅ |
| Create/disable users | ❌ | ✅ |
| View audit logs | ❌ | ✅ |

## Session model
- JSON Web Tokens (JWT) are used for API authentication.
- Optional refresh token cookie can be enabled for longer sessions on LAN.


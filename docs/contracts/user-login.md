# User Login

## 1. Endpoint Definition
- **Method:** `POST`
- **Path:** `/api/v1/auth/login`
- **Purpose:** Authenticate a user and return a session token with basic user object

## 2. Request Body
| Field | Type | Required? | Rules |
|-------|------|-----------|-------|
|`email`|String| Yes | Email must be a valid email|
|`password`| String | Yes | Password minimum contains 8 characters sting|


## 3. Success Response (200 OK)
Returns a json object with `accessToken` & `User` object

```json
{
    "accessToken": "jwt_jdfiasjrf98erfhn3984htnsk...",
    "expiresIn": 3600,
    "user": {
        "id": "usr_876",
        "name": "John",
        "email":"john@example.com",
        "role": "editor",
        "createdAt": "2025-10-10T09:00:00Z"
    }
}
```

## 4. Error Response

- **400 Bad Request:** Invalid email format or missing fields
- **401 Unauthorized:** Valid email format, but wrong password or user doesn't exist.

```json
{
    "error": {
        "code": "BAD_REQUEST",
        "message": "Request contains invalid data.",
        "details": [
            { "field": "email", "message": "Must be a valid email address." }
        ]
    }
}
```
```json
{
    "error": "UNAUTHORIZED",
    "message": "Invalid email or password."
}
```

## 5. UI State Mapping
- **Idle:** From is ready for input
- **Submitting:** Buttons shows a spinner, inputs are disabled
- **Success:** Redirect to dashboard, save token.
- **Field Error:** Map the `details` array to show red text under specific input
- **From Error:** Show a banner at the top for `401` errors: _"Invalid email or password"_


## 6. Test Data Matrix

### Valid cases
```json
{
    "email": "john@example.com",
    "password": "password12"
}
```

### Invalid cases

#### Case 1
```jsonc
{
    "email": "johnemail.com", // invalid email
    "password": "password12"
}
```

#### Case 2

```jsonc
{
    "email": "john@example.com",
    "password": "not-real-password" // wrong password
}
```
#### Case 3
```jsonc
{
    "email": "notexist@example.com", // user does not exist
    "password": "password12"
}

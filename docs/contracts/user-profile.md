# User Profile Feature Contract

## 1. Endpoint Definition
- **Method:** `GET`
- **Path:** `/api/v1/users/{id}`
- **Purpose:** Fetches a single user's profile information.

## 2. Request Parameters
- `id` (Path parameter): String, required. (e.g., `"usr_123"`)

## 3. Success Response (200 OK)
Returns a single JSON object.

| Field       | Type                 | Required? | Rules / Constraints                           |
|-------------|----------------------|-----------|-----------------------------------------------|
| `id`        | String               | Yes       | Unique identifier                             |
| `name`      | String               | Yes       | Min 1 character                               |
| `email`     | String               | Yes       | Must be valid email format                    |
| `role`      | Enum                 | Yes       | Allowed: `"admin"`, `"editor"`, `"viewer"`    |
| `createdAt` | String (ISO 8601)    | No        | Null if unknown, otherwise valid date string  |


### Valid Data Example
```json
{
    "id": "usr_123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "editor",
    "createdAt": "2024-10-27T10:00:00Z"
}
```
## 4. Error Responses

- **400 Bad Request:** Invalid `id` format provided.
- **404 Not Found:** User does not exist in the database.
- **500 Internal Server Error:** Database failure.

### Error JSON Shape Example
```json
{
    "error": {
        "code": "USER_NOT_FOUND",
        "message": "The requested user could not be found."
    }
}
```

## 5. UI State Mapping (Frontend Responsibility)

- **Loading:** Show skeleton/spinner while `GET` request is pending.
- **Success:** Render profile card with user data.
- **404 Error:** Show "User not found" empty state.
- **500 / Network Error:** Show "Unable to load data, please try again" toast/banner.

## 6. Test Data Matrix

### Valid cases
```json
{
    "id": "usr_123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "editor",
    "createdAt": "2024-10-27T10:00:00Z"
}
```
### Invalid cases

#### Case 1
```jsonc
{
    "id": 1, // Invalid id type
    "name": "John Doe",
    "email": "john@example.com",
    "role": "viewer",
    "createdAt": "2024-10-27T10:00:00Z"
}
```
#### Case 2
```jsonc
{
    "id": "usr_123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "staff", // Invalid enum type
    "createdAt": "2024-10-27T10:00:00Z"
}
```
#### Case 3
```jsonc
{
    "id": "usr_123",
    // name is missing
    "email": "john@example.com",
    "role": "editor",
    "createdAt": "2024-10-27T10:00:00Z"
}
```

### Edge cases

#### Case 1
```json
{
    "id": "usr_123",
    "name": "John Doe is the name of a man who was a monster called as @BC!",
    "email": "john@example.com",
    "role": "editor",
    "createdAt": "2024-10-27T10:00:00Z" 
}
```
#### Case 2
```json
{
    "id": "usr_123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "editor",
    "createdAt": "Joined this month"
}
```

#### Case 3
```json
{
    "id": "usr_123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "editor",
    "createdAt": ""
}
```
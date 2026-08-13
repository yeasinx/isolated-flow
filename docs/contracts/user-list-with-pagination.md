# User List with Pagination

## 1. Endpoint Definition 
- **Method:** `GET`
- **Path:** `api/v1/users`
- **Purpose:** Fetches all users with pagination metadata

## 2. Request Params 
- `page` (Path parameter): Number, required, min = 1 (e.g., `?page=3`)
- `limit` (Path parameter): Number, optional, default = 10

## 3. Success Response (200 OK)
Returns a json object with pagination metadata.

|Field | Type   | Required? | Rules / Constraints|
|----- | ------ | ----------|--------------------|
|`users` | Array  of `User` | Yes      | Can be empty `[]`|
|`totalPages`| Number | Yes |Integer, min 0| 
|`current_page`| Number | Yes | Must match the requested page |

### Valid Data Example
```json
{
    "users": [
        {
            "id": "usr_123",
            "name": "John",
            "email": "john@example.com",
            "role": "editor",
            "createdAt": "2023-10-12T12:00:00Z"
        },
        {
            "id": "usr_343",
            "name": "Ratan",
            "email": "ratan@example.com",
            "role": "viewer",
            "createdAt": "2024-10-12T12:00:00Z"
        }
    ],
    "totalPages": 10,
    "currentPage": 1
}
```

## 4. Error Responses
- **400 Bad Request:** Requested page not present (e.g., `page` is 0, `page` > `totalPages`)
- **500 Internal Server Error:** Database failure 

### Error JSON Shape Example
```json
{
    "error": {
        "code": "INVALID_PAGE",
        "message": "The requested page does not exist."
    }
}
```

## 5. UI state Mapping (Frontend Responsibility) 
- **Loading:** Shows skeleton/spinner while `GET` request is pending
- **Success:** Render the table with user list data
- **Empty State:** "No users added yet" if `users.length === 0`
- **500 Network Error:** Show "Unable to load data, please try again" toast/banner


## 6. Test Data Matrix
 
### Valid cases
```json
{
    "users": [
        {
            "id": "usr_123",
            "name": "John",
            "email": "john@example.com",
            "role": "editor",
            "createdAt": "2023-10-12T12:00:00Z"
        },
        {
            "id": "usr_343",
            "name": "Ratan",
            "email": "ratan@example.com",
            "role": "viewer",
            "createdAt": "2024-10-12T12:00:00Z"
        }
    ],
    "totalPages": 10,
    "current_page": 2
}
```

### Invalid cases

#### Case 1
```jsonc
{
    "users": [
        {
            "id": "usr_123",
            "name": "John",
            "email": "john@example.com",
            "role": "editor",
            "createdAt": "2023-10-12T12:00:00Z"
        },
        {
            "id": "usr_343",
            "name": "Ratan",
            "email": "ratan@example.com",
            "role": "viewer",
            "createdAt": "2024-10-12T12:00:00Z"
        }
    ],
    // missing totalPages
    "current_page": 1
}
```

#### Case 2

```jsonc
{
    "users": [
        {
            "id": "usr_123",
            "name": "John",
            "email": "john@example.com",
            "role": "editor",
            "createdAt": "2023-10-12T12:00:00Z"
        },
        {
            "id": "usr_343",
            "name": "Ratan",
            "email": "ratan@example.com",
            "role": "viewer",
            "createdAt": "2024-10-12T12:00:00Z"
        }
    ],
    "totalPages": "10", // totalPages must be number type
    "current_page": 1
}
```

### Edge cases

```jsonc
{
    "users": [],
    "totalPages": 10,
    "current_page": 1
}
```
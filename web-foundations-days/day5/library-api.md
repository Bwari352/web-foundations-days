
# Library Books REST API

## Overview

This REST API manages books in a library. The main resource is `/api/books`.

## 1. List All Books

- **Method:** GET
- **Path:** `/api/books`
- **Description:** Retrieves all books in the library.
- **Request body:** Not required.
- **Success status:** 200 OK

## 2. Get One Book

- **Method:** GET
- **Path:** `/api/books/1`
- **Description:** Retrieves a specific book using its ID.
- **Request body:** Not required.
- **Success status:** 200 OK

## 3. Create a Book

- **Method:** POST
- **Path:** `/api/books`
- **Description:** Adds a new book to the library.
- **Example request body:**

```json
{
  "title": "Things Fall Apart",
  "author": "Chinua Achebe",
  "isbn": "9780385474542",
  "published_year": 1958
}
```

- **Success status:** 201 Created

## 4. Update a Book

- **Method:** PUT
- **Path:** `/api/books/1`
- **Description:** Updates an existing book using its ID.
- **Example request body:**

```json
{
  "title": "Things Fall Apart",
  "author": "Chinua Achebe",
  "isbn": "9780385474542",
  "published_year": 1958
}
```

- **Success status:** 200 OK

## 5. Delete a Book

- **Method:** DELETE
- **Path:** `/api/books/1`
- **Description:** Deletes a book using its ID.
- **Request body:** Not required.
- **Success status:** 204 No Content

## 6. List Books by Author

- **Method:** GET
- **Path:** `/api/books?author=Chinua%20Achebe`
- **Description:** Retrieves books written by the specified author using a query parameter.
- **Request body:** Not required.
- **Success status:** 200 OK

## Error Status Codes

### 400 Bad Request

- **Description:** The request contains invalid data.
- **Example:** A client tries to create a book without a required title or supplies an invalid publication year.

### 404 Not Found

- **Description:** The requested resource does not exist.
- **Example:** A client requests `GET /api/books/999`, but book ID 999 does not exist.

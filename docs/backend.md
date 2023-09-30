# Backend and Database Structure

## Backend

The backend of the application is powered by Node.js and Express.js, providing the server-side logic for handling requests and interacting with the database.

- **Node.js:** Node.js is a runtime environment that allows the execution of JavaScript code on the server. It is well-suited for building scalable and efficient backend applications.

- **Express.js:** Express.js is a minimal and flexible Node.js web application framework. It simplifies the process of building robust and scalable web applications and APIs.

## Database

The database used in this project is MongoDB, a NoSQL database known for its flexibility and scalability. MongoDB stores data in a document-oriented format, making it suitable for managing complex and varied data structures.

### Database Schema

The database schema is flexible and accommodates various data types. In this project, templates are stored as JSON documents in MongoDB. Here's an example record of a template:

```json
[
  {
    "_id": "6512e4c1e7278c2beca4c9be",
    "name": "temp",
    "__v": 0,
    "content": "<body><h1>Design Your Webview</h1>...</body>",
    "style": "<style>body { ... }</style>"
  }
]
```

- **"\_id"**: A unique identifier for the template.
- **"name"**: The name or title of the template.
- **"\_\_v"**: A version key used by MongoDB's document versioning.
- **"content"**: The HTML content of the template, including the structure and elements.
- **"style"**: The CSS styles associated with the template.

This schema allows for storing templates as JSON documents with associated metadata, making it easy to manage and retrieve templates when needed.

### Backend APIs

The backend provides a set of APIs to interact with the templates stored in the database:

- **Create Template**
  - **Endpoint:** POST `/templates`
  - **Description:** Creates a new template with the provided name, HTML content, and CSS styles.
- **Read All Templates**

  - **Endpoint:** GET `/templates`
  - **Description:** Retrieves a list of all templates in the database.

- **Read Template by ID**

  - **Endpoint:** GET `/templates/{templateId}`
  - **Description:** Retrieves a specific template by its unique identifier.

- **Update Template**

  - **Endpoint:** PATCH `/templates/{templateId}`
  - **Description:** Updates the HTML content and CSS styles of a specific template.

- **Save Draft API**

  - **Endpoint:** `/save-draft`
  - **Purpose:** Allows users to save a draft of their templates.

- **Publish API:**

  - **Endpoint:** `/publish`
  - **Purpose:** Publishes a template, making it accessible for viewing.

- **Update API:**
  - **Endpoint:** `/update`
  - **Purpose:** Updates the content and style of a template.

<!-- - **Delete Template**
  - **Endpoint:** DELETE `/templates/{templateId}`
  - **Description:** Deletes a specific template from the database. -->

These APIs enable users to perform CRUD operations on templates, allowing them to create, read, update, and delete templates as required by the application.

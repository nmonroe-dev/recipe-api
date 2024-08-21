# Recipe API

Welcome to the Recipe API documentation. This API allows you to manage recipes with CRUD (Create, Read, Update, Delete) operations. This README provides a guide on how to use and test the API.

## Table of Contents

- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [License](#license)

## Features

- **Retrieve**: Get a list of all recipes or details of a specific recipe.
- **Add**: Insert a new recipe into the database.
- **Update**: Modify an existing recipe.
- **Delete**: Remove a recipe from the database.

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/) (You need a MongoDB instance. You can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a managed solution.)

## Endpoints

### 1. Retrieve All Recipes

- **Endpoint**: `/recipes`
- **Method**: `GET`
- **Description**: Retrieves a list of all recipes available in the database.
- **Response**: Returns a JSON array of recipes.

### 2. Retrieve a Specific Recipe

- **Endpoint**: `/recipe/{id}`
- **Method**: `GET`
- **Description**: Retrieves details of a specific recipe by its unique ID.

### 3. Add a New Recipe

- **Endpoint**: `/recipe`
- **Method**: `POST`
- **Description**: Adds a new recipe to the database.

### 4. Update an Existing Recipe

- **Endpoint**: `/recipe/update/{id}`
- **Method**: `PUT`
- **Description**: Updates an existing recipe specified by its ID.

### 5. Delete a Recipe

- **Endpoint**: `/recipe/delete/{id}`
- **Method**: `DELETE`
- **Description**: Deletes a specific recipe from the database using its ID.

## Error Handling

When interacting with the Recipe API, you might encounter errors. Below are common error responses and their meanings:

### 400 Bad Request

- **Description**: The request could not be understood or was missing required parameters.
- **Possible Fix**: Check the request syntax and ensure all required parameters are included.

### 404 Not Found

- **Description**: The requested resource could not be found.
- **Possible Fix**: Verify that the URL is correct and that the resource exists.

### 500 Internal Server Error

- **Description**: An unexpected error occurred on the server.
- **Possible Fix**: If the problem persists, contact support with details of the request.

### 401 Unauthorized

- **Description**: Authentication is required or has failed.
- **Possible Fix**: Ensure you are providing valid authentication credentials.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

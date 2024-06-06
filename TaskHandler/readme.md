# Task Scheduler API

This project is a Spring Boot application that provides a RESTful API for managing tasks. Each user has their own task file, which is created using their username and password.

## Endpoints

### Create Task File

**URL:** `/create-task-file/`

**Method:** `GET`

**Description:** Creates a new task file for a user if it does not already exist.

**Parameters:**
- `username` (String): The username of the user.
- `password` (String): The password of the user.

**Response:**
- `200 OK`: File created.

### Get All Tasks

**URL:** `/get-all-task/`

**Method:** `GET`

**Description:** Retrieves all tasks for a user.

**Parameters:**
- `username` (String): The username of the user.
- `password` (String): The password of the user.

**Response:**
- `200 OK`: List of tasks.

### Add Task

**URL:** `/add-task/`

**Method:** `POST`

**Description:** Adds a new task to the user's task file.

**Parameters:**
- `username` (String): The username of the user.
- `password` (String): The password of the user.
- `name` (String): The name of the task.
- `desc` (String): The description of the task.
- `priority` (Boolean): The priority of the task.
- `status` (Boolean): The status of the task.

**Response:**
- `200 OK`: Task added.

### Get Task By ID

**URL:** `/get-task/id/`

**Method:** `POST`

**Description:** Retrieves a task by its ID.

**Parameters:**
- `username` (String): The username of the user.
- `password` (String): The password of the user.
- `id` (String): The ID of the task.

**Response:**
- `200 OK`: The task.

### Update Task By ID

**URL:** `/update-task/id/`

**Method:** `POST`

**Description:** Updates a task by its ID.

**Parameters:**
- `username` (String): The username of the user.
- `password` (String): The password of the user.
- `id` (String): The ID of the task.
- `name` (String): The new name of the task.
- `desc` (String): The new description of the task.
- `priority` (Boolean): The new priority of the task.
- `status` (Boolean): The new status of the task.

**Response:**
- `200 OK`: The updated task.

### Delete Task By ID

**URL:** `/delete-task/id/`

**Method:** `POST`

**Description:** Deletes a task by its ID.

**Parameters:**
- `username` (String): The username of the user.
- `password` (String): The password of the user.
- `id` (String): The ID of the task.

**Response:**
- `200 OK`: Task deleted.
- `400 Bad Request`: No such task exists.

### Greet

**URL:** `/`

**Method:** `GET`

**Description:** Returns a greeting message.

**Response:**
- `200 OK`: A greeting message.

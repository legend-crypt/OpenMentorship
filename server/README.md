# API Documentation for OpenMentors

## Overview

This API provides functionalities for OpenMenotrs platform. It includes features such as account creation, email verification, password reset, and user profile retrieval.
# Get Started with OpenMentors API

## Introduction

Welcome to the OpenMentors API! This section provides a quick guide on how to get started with the Yello API for user profile, mentor management, and meeting scheduling.

## Prerequisites

Before you begin, make sure you have the following:


1. **Dependencies**: Ensure that you have the required dependencies installed on your development environment.

## Installing Dependencies

To use the Yello API, you need to install the following dependencies:

1. **Python**: Make sure you have Python installed on your machine. You can download it from [python.org](https://www.python.org/downloads/).

2. **Django**: Yello API is built using the Django framework. Install Django using the following command:

    ```bash
    pip install django
    ```

3. **Django REST Framework**: Yello API leverages the Django REST Framework. Install it using:

    ```bash
    pip install djangorestframework
    ```

4. **Other Dependencies**: Depending on your specific environment, you may need to install additional libraries. Refer to the API documentation for any specific requirements.

## Setting Up the OpenMentors API

Follow these steps to set up and run the Yello API on your local machine:

### 1. Clone the Repository

```bash
git clone https://github.com/legend-crypt/OpenMentorship
cd OpenMentorship
```
### 2. Migrate Database
```bash
python manage.py makemigrations
python manage.py migrate
```
### 3. Create Superuser
```bash
python manage.py createsuperuser
```
### 4. Run Server
```bash
python manage.py runserver
```
Visit http://localhost:8000/api/ in your browser to access the OpenMentors API.




## Table of Contents

- [1. Account Management](#1-account-management)
  - [1.1 Create Account](#11-create-account)
  - [1.2 Verify Email](#12-verify-email)
  - [1.3 Send Verification Email](#13-send-verification-email)
  - [1.4 Login](#14-login)
- [2. Password Reset](#2-password-reset)
  - [2.1 Request Password Reset](#21-request-password-reset)
  - [2.2 Confirm Password Reset](#22-confirm-password-reset)
- [3. User Profile](#3-user-profile)
    - [3.1 Retrieve Profile](#31-retrieve-profile)
    - [3.2 Create Profile](#32-create-profile)
    - [3.3 Update Profile](#33-update-profile)
- [4. Mentor Managementt](#4-mentor-management)
    - [4.1 List Mentor](#41-list-mentor)
    - [4.2 Create Mentor Request](#42-create-mentor-request)
    - [4.3 Accept Mentee Request](#43-Mentee-request)
    - [4.4 Reject Mentee Request](#44-reject-mentee-request)
    - [4.5 Get  Mentor Accepted Students](#45-get-mentor-accepted-students)
    - [4.6 Get  student Mentors](#46-get-student-mentor-accept)
    - [4.7 Get Mentor Pending Requests](#47-get-mentor-pending-requests)
    - [4.8 Schedule Meeting](#48-schedule-meeting)
    - [4.9 List Scheduled Meetings](#49-list-scheduled-meetings)

## 1. Account Management

### 1.1 Create Account

**Endpoint**: `POST /accounts/create/`

**Description**: Create a new user account.

**Request Body**:

```json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "Mentor"
}
```
- `email` (string, required): User's email address.
-  `password` (string, required): User's password.
role (string, required):
- `User's` role (e.g., "Mentor", "Mentee").

**Response Body**:
- Success Response (201 Created):
```json
{
  "detail": "User created successfully",
  "user": {
    "user_id": "1234567890",
    "email": "user@example.com",
    "profile": {
      // User profile information
    },
    "created_at": "2024-01-08T12:34:56Z",
    "verified": false,
    "role": "user"
  }
}
```
- Error Response (400 Bad Request):
```json
{
  "error": "User with this email already exists."
}
```
```json
{
  "error": "Please provide both email and password"
}
```
### 1.2 Verify Email
**Endpoint**: `POST /accounts/verify-email/`

**Description**: Verify a user's email address.

**Request Body**:
```json
{
  "email": "user@example.com",
  "otp": "123456"
}

```
- `email` (string, required): 
User's email address.
- `otp` (string, required): One-time password for email verification.
**Response Body**:
- Success Response (200 OK):
```json
{
  "detail": "Your email has been verified successfully",
  "user": {
    // User information
  }
}

```
- Error Response (400 Bad Request):
```json
{
  "error": "Invalid OTP"
}
```
```json
{
  "error": "User with this email does not exist."
}
```
```json
{
  "error": "Your account has already been verified"
}

```
### 1.3 Send Verification Email
**Endpoint**: `POST /accounts/send-verification-email/`

**Description**: resend a verification email to a user's email address.

**Request Body**:
```json
{
  "email": "user@example.com"
}
```  
- `email` (string, required): User's email address.
**Response Body**:
- Success Response (200 OK):
```json
{
  "detail": "Verification email sent successfully"
}
```
- Error Response (400 Bad Request):
```json
{
  "error": "User with this email does not exist."
}
```
```json
{
  "error": "Your account has already been verified"
}
```
### 1.4 Login
**Endpoint**: `POST /accounts/login/`
**Description**: Login a user.
**Request Body**:
```json
{
  "email": "example@mail.com",
  "password": "password123"
}
```
- `email` (string, required): User's email address.
- `password` (string, required): User's password.
**Response Body**:

- Response 200 OK
  - ```json
      {
        "detail": "Sign in successful",
        "user": {
          // User information
            "profile" // Profile Information
        },
        "token": {
          "access": "your-access-token",
          "refresh": "your-refresh-token"
        }
      }
    ```
- Response 404 Bad Request
  - ```json
      {
        "error": "User not found"
      }
    ```
- Response 401 Unauthorized
  - ```json
      {
        "error": "Invalid credentials"
      }
    ```
## 2. Password Reset
### 2.1 Request Password Reset
**Endpoint**: `POST /accounts/password-reset-request/`
**Description**: Request a password reset for a user's account.
**Request Body**:
```json
{
  "email": "user@example.com"
}
```
- `email` (string, required): User's email address.
**Response Body**:
- Success Response (200 OK):
```json
{
  "detail": "Password reset code successfully"
}
```
- Error Response (404 Bad Request):
```json
{
  "error": "User with this email does not exist."
}
```
### 2.2 Confirm Password Reset
**Endpoint**: `POST /accounts/password-reset-confirm/`
**Description**: Confirm a password reset for a user's account.
**Request Body**:
```json
{
  "email": "user@example.com",
  "otp": "123456",
  "password": "newpassword"
}
```  
- `email` (string, required): User's email address.
- `otp` (string, required): One-time password for password reset.
- `password` (string, required): User's new password.
**Response Body**:
- Success Response (200 OK):
```json
{
  "detail": "Password reset successfully"
}
```
- Error Response (400 Bad Request):
```json
{
  "detail": "User does not exist"
}
```
```json
{
  "detail": "Password reset token does not exist"
}
```
```json
{
  "detail": "Password reset token is invalid"
}
```
```json
{
  "detail": "Password reset token has expired"
}
```
## 3. User Profile
**Endpoint**: `GET profile/retreive/`
**Description**: Retrieve a user's profile information.

**Request Headers:**
- `Authorization`: (string, required): JWT token for authentication.
**Response Body**:
- Success Response (200 OK) user has created profile:
  - ```json
      {
          "success": true,
          "message": "Profile found",
          "data": {
              "profile_id": "818e807d",
              "first_name": "john",
              "last_name": "Doe",
              "phone_number": "",
              "profile_picture": "/media/profile_pictures/repair.jpg",
              "bio": "",
              "created_at": "2024",
              "updated_at": "2025"
          }
      }
    ```
- Success Response (200 OK) user has not created profile:
  - ```json
      {
          "success": false,
          "message": "Profile does not exist",
          "data": {null}
      }
    ```
- Error Response (404 Not Found):
   - ```json
      {
        "error": "User does not exist"
      }
      ```
- Error Response (401 Unauthorized):
  - ```json
    {
      "detail": "User is not authenticated"
    }
    ```
### 3.2 Create Profile
**Endpoint**: `POST profile/create/`
**Description**: Create a user's profile information.
**Request Headers:**
- `Authorization`: (string, required): JWT token for authentication.
**Request Body**:
  ```json
  {
      "first_name": "John",
      "last_name": "Doe",
      "bio": "I am a software engineer",
      "profile_picture": "https://example.com/profile_picture.jpg",

  }
  ```
**Response Body**:
- Success Response (200 OK):
  - ```json
    {
      "detail": "Profile created successfully",
      "profile": {
        // User profile information
      },
      "user": {
        // User information
      }
    }
    ```
- Error Response (400 Bad Request):
  - ```json
    {
      "error": "Profile already exists"
    }
    ```
  - ```json
    {
      "error": "User is not authenticated"
    }
    ```
### 3.3 Update Profile
**Endpoint**: `PUT profile/update/`
**Description**: Update a user's profile information.
**Request Headers:**
- `Authorization`: (string, required): JWT token for authentication.
**Request Body**:
- include data for profile update
**Response Body**:
- Success Response (200 OK):
```json
{
  "detail": "Profile updated successfully",
  "profile": {
    // User profile information
  },
  "user": {
    // User information
  }
}
```
- Error Response (400 Bad Request):
```json
{
  "error": "Profile does not exist"
}
```
```json
{
  "error": "User is not authenticated"
}
```
## 4. Mentor Management
### 4.1 List Mentor
**Endpoint**: `GET mentors/list/`
**Description**: List all mentors.
**Request Headers:**
- `Authorization`: (string, required): JWT token for authentication.
**Response Body**:
- Success Response (200 OK):
```json
{
    "detail": "Mentors retrieved successfully",
    "data": [
        {
            "user_id": "985",
            "email": "yrnd@gmail.com",
            "role": "Mentor",
            "full_name": "Kweku Anana",
            "title": "Nii",
            "bio": ""
        },
        ...
    ]
}
```
### 4.2 Create Mentor Request
**Endpoint**: `POST mentors/create/`
**Description**: Create a mentor request.
**Request Headers:**
- `Authorization`: (string, required): JWT token for authentication.
**Request Body**:
```json
{
  "mentor_email": "example@example.com",
}
```
- `mentor_email` (string, required): Mentor's email address.
**Response Body**:
- Success Response (200 OK):
```json
{
    "detail": "Request Accepted Successfully",
    "data": [
        {
            "user_id": "b6475df1-57de-40cb-baad-05a940f22c5b",
            "full_name": "mentor12 mentor",
            "id": "1789f080-e661-4fe0-abb6-b6ca82d8d219"
        },
        {
            "user_id": "66d7ec2d-3d09-47ea-a0ec-afbf9cfbd995",
            "full_name": "mentor1 mentor",
            "id": "7e5271d2-4779-4b4c-b5db-d8fac9b6773d"
        }
    ]
}```
- Error Response (400 Bad Request):
```json
{
  "error": "Request not sent"
}
```
### 4.3 Accept Mentee Request
**Endpoint**: `POST mentors/accept/`
**Description**: Accept a mentee request.
**Request Headers:**
- `Authorization`: (string, required): JWT token for authentication.
**Request Body**:
```json
{
  "mentorSession_id": "1234567890",
}
```
- `mentSession_id` (string, required): menter session id.
**Response Body**:
- Success Response (200 OK):
```json
{
    "detail": "Request Accepted Successfully",
    "data": [
        {
            "user_id": "b6475df1-57de-40cb-baad-05a940f22c5b",
            "full_name": "mentor12 mentor",
            "id": "1789f080-e661-4fe0-abb6-b6ca82d8d219"
        },
        {
            "user_id": "66d7ec2d-3d09-47ea-a0ec-afbf9cfbd995",
            "full_name": "mentor1 mentor",
            "id": "7e5271d2-4779-4b4c-b5db-d8fac9b6773d"
        }
    ]
}
```
- Error Response (400 Bad Request):
```json
{
  "error": "Request not accepted"
}
```
### 4.5 Get Mentor Accepted Students
**Endpoint**: `GET mentors/mentor-requests/?status=accepted`

**Description**: Get all mentor request based on the status. ie `scheduled` can be `pending` or `accepted` or `rejected`.

**Request Headers:**
- `Authorization`: (string, required): JWT token for authentication.
**Response Body**:
- Success Response (200 OK):
```json
{
    "detail": "Requests retrieved successfully",
    "data": [
        {
            "user_id": "b6475df5a940f22c5b",
            "full_name": "mentor12 mentor",
            "id": "1789f080d219",
            "title": "CyberSecurity",
            "bio": "hello World"
        },
        {
            "user_id": "66d7ec2fbd995",
            "full_name": "mentor1 mentor",
            "id": "7e52ac9b6773d",
            "title": "UX",
            "bio": "hello World"
        }
    ]
}
```
### 4.10 List Student's mentor Requests
**Endpoint**: `GET http://127.0.0.1:8000/api/mentors/students-requests/?status=accepted`

**Description**: List all students mentor requests based on the status. ie `scheduled` can be `pending` or `accepted` or `rejected`.

**Request Headers:**
- `Authorization`: (string, required): JWT token for authentication.
**Response Body**:
- Success Response (200 OK):
```json
{
    "detail": "Requests retrieved successfully",
    "data": [
        {
            "user_id": "66d7ec2dcfbd995",
            "full_name": "mentor1 mentor",
            "id": "1789f08a82d8d219",
            "title": "Software Engineer",
            "bio": "hello World"

        },
        {
            "user_id": "b6475df1-522c5b",
            "full_name": "mentor12 mentor",
            "id": "7eb6773d",
            "title": "Frontend Developer",
            "bio": "hello World"

        }
    ]
}
```

### 5.0 Create Meeting
**Endpoint**: `POST meeting/create/`
**Description**: Create a meeting.
**Request Headers:**
- `Authorization`: (string, required): JWT token for authentication.
**Request Body**:
```json
id: "1789f080-e661-4fe0-abb6-b6ca82d8d219",
time: "2024-01-08T12:34:56Z",
```
- `id` (string, required): mentor request id.
- `time` (string, required): meeting time.
**Response Body**:
- Success Response (200 OK):
```json
{
    "detail": "Meeting created successfully",
}
```

### 5.1 List Mentor Scheduled Meetings
**Endpoint**: `GET meeting/retrieve/mentor/`
**Description**: List all mentor scheduled meetings.
**Request Headers:**
- `Authorization`: (string, required): JWT token for authentication.
**Response Body**:
```json
{
    "detail": "Mentor meeting retrieved successfully",
    "data": [
        {
            "meeting_id": "78ace5ff-d536-410c-85da-b77895e76f6a",
            "time": "2024-04-23T18:25:43.511000Z",
            "mentee": "lkkonadu001@st.ug.edu.gh1"
        }
    ]
}
```

### 5.2 List Student Scheduled Meetings
**Endpoint**: `GET meeting/retrieve/student/`
**Description**: List all student scheduled meetings.
**Request Headers:**
- `Authorization`: (string, required): JWT token for authentication.
**Response Body**:
```json
{
    "detail": "Student meeting retrieved successfully",
    "data": [
        {
            "meeting_id": "78ace5ff-d536-410c-85da-b77895e76f6a",
            "time": "2024-04-23T18:25:43.511000Z",
            "mentor": "johndoe@gmail.com"
        },
        ....
    ]
}
```

### 5.3 Retrieve Meeting
**Endpoint**: `GET meeting/retrieve/<meeting_id>/`
**Description**: Retrieve a meeting.
**Request Headers:**
- `Authorization`: (string, required): JWT token for authentication.
**Response Body**:
```json
{
    "detail": "Meeting retrieved successfully",
    "data": {
        "meeting_id": "78ace5ff-d536-410c-85da-b77895e76f6a",
        "time": "2024-04-23T18:25:43.511000Z",
        "mentor": "johndoeatgmail.com",  //property may be meentee
    }
}
```


# Contributing to OpenMentors API

Welcome to the Yello API open-source project! We appreciate your interest in contributing. Follow the steps below to get started:

## 1. Fork the Repository

Click the "Fork" button on the top-right corner of this repository to create your fork. This will create a copy of the repository in your GitHub account.

## 2. Clone Your Fork

Clone your fork to your local machine using the following command:

```bash
git clone https://github.com/legend-crypt/OpenMentorship
cd OpenMentorship
```
## 3. Create a Branch
Create a new branch to work on your feature or bug fix:

```bash
git checkout -b feature-or-bugfix-name
```
## 4. Make Changes
Make the necessary changes to the codebase. Ensure that your changes follow the project's coding standards.
## 5. Test Your Changes
Test your changes locally to ensure they work as expected. Run any existing tests and add new ones if applicable.

## 6. Commit Your Changes
Commit your changes with a clear and concise commit message

```bash
git add .
git commit -m "commit message"
```
## 7. Push Changes
Push your changes to your fork on GitHub:
  
  ```bash
  git push origin feature-or-bugfix-name
  ```
## 8. Create a Pull Request
Visit your fork on GitHub and click the "New Pull Request" button. Provide a clear title and description for your pull request, and submit it.
## 9. Code Review
Your pull request will be reviewed by the project maintainers. Address any feedback or changes requested.
## 10. Merge
Once your pull request is approved, it will be merged into the main repository. Congratulations! You have successfully contributed to the OpenMentors project.

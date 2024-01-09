# API Documentation for Yello User Management

## Overview

This API provides functionalities for user management in the Yello platform. It includes features such as account creation, email verification, password reset, and user profile retrieval.
# Get Started with Yello API

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
    - [4.6 Get  student Mentor Accept](#46-get-student-mentor-accept)
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
- Success Response (200 OK):
```json
{
  "detail": "Profile retrieved successfully",
  "data": {
    // User profile information
  }
}
```
```json
{
  "error": "Profile does not exist"
}
```
```json
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
```json
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
```json
{
  "error": "Profile already exists"
}
```
```json
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
      // Mentor information
      "user": 111343e,
      "profile": {
        "first_name": "John",
        "last_name": "Doe",
        "bio": "I am a software engineer",
        "profile_picture": "https://example.com/profile_picture.jpg",
      },
    },
    {
      // Mentor information
    }
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
    "detail": "Request successfully sent",
    "data": {
        "mentor_session_id": "e92f3fab-ea97-4993-abb0-b583163fdd5b",
        "status": "pending",
        "user": {
            "user_id": "87e58204-b56c-40df-8181-0669c567cf75",
            "email": "example@gmail.com",
            "profile": {
                "profile_id": "c2e9aad0-d36d-4c06-9380-f9c261a0c763",
                "first_name": "John",
                "last_name": "Doe",
                "phone_number": "0247255149",
                "profile_picture": "/media/profile_pictures/download.jpeg",
                "bio": "",
                "created_at": "2023-12-26T22:08:38.339661Z",
                "updated_at": "2023-12-26T22:08:38.339741Z"
            },
            "created_at": "2023-12-26T22:08:41.003661Z",
            "verified": true,
            "role": "Mentor"
        },
        "time": null,
        "created_at": "2024-01-08T10:17:34.939922Z",
        "meeting_id": null
    }
}
```
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
- `mentSession_id` (string, required): Student's user ID.
**Response Body**:
- Success Response (200 OK):
```json
{
    "detail": "Request Accepted Successfully",
    "data": {
        "mentor_session_id": "34e9827f-1086-44f5-a71",
        "status": "accepted",
        "user": {
            "user_id": "1b046a6",
            "email": "example@mail.com",
            "profile": {
                "profile_id": "0c49cfa5-7e52-4b1f-8b06-7abda3e57fe7",
                "first_name": "John",
                "last_name": "Doe",
                "phone_number": "05555545",
                "profile_picture": "/media/profile_pictures/msg1008385288-19259.jpg",
                "bio": "",
                "created_at": "2024-01-08T09:57:12.087033Z",
                "updated_at": "2024-01-08T09:57:12.087163Z"
            },
            "created_at": "2024-01-07T16:31:43.504249Z",
            "verified": true,
            "role": "Mentee"
        },
        "time": "2024-01-08T09:57:46Z",
        "created_at": "2024-01-08T09:57:47.511517Z",
        "meeting_id": null
    }
}
```
- Error Response (400 Bad Request):
```json
{
  "error": "Request not accepted"
}
```
### 4.4 Reject Mentee Request
**Endpoint**: `POST mentors/reject-request/`
**Description**: Reject a mentee request.
**Request Headers:**
- `Authorization`: (string, required): JWT token for authentication.
**Request Body**:
```json
{
  "mentorSession_id": "1234567890",
}
```
- `mentorSession_id` (string, required): Mentor session ID.
**Response Body**:
- Success Response (200 OK):
```json
{
  "detail": "Request successfully rejected",
  "data": {
    // Mentor request information
  }
}
```
- Error Response (400 Bad Request):
```json
{
  "error": "Request not rejected"
}
```
### 4.5 Get Mentor Accepted Students
**Endpoint**: `GET mentors/mentor-students/`

**Description**: Get all mentor accepted students.

**Request Headers:**
- `Authorization`: (string, required): JWT token for authentication.
**Response Body**:
- Success Response (200 OK):
```json
{
    "detail": "Requests retrieved successfully",
    "data": [
        {
            "mentor_session_id": "b3830618-61bb-488f-8d78-7496d49c2da8",
            "status": "accepted",
            "user": {
                "user_id": "15fc439c-8854-4543-a69c-dbf3f7ba89b3",
                "email": "man@man.com",
                "profile": {
                    "profile_id": "64967ee3-be02-4",
                    "first_name": "man",
                    "last_name": "ottu",
                    "phone_number": "+233502276434474",
                    "profile_picture": "/media/profile_pictures/msg1008385288-19257.jpg",
                    "bio": "",
                    "created_at": "2023-12-30T20:42:32.599556Z",
                    "updated_at": "2023-12-30T20:42:32.599645Z"
                },
                "created_at": "2023-12-30T20:42:40.689865Z",
                "verified": true,
                "role": "Mentee"
            },
            "time": "2023-12-30T20:42:55Z",
            "created_at": "2023-12-30T20:42:56.186343Z",
            "meeting_id": "8530295570"
        },
    ]
}
```
### 4.6 Get Student Mentor Accept

**Endpoint**: `GET mentors/student/accept/`

**Description**: Get all students accepted mentors.

**Request Headers:**
- `Authorization`: (string, required): JWT token for authentication.
**Response Body**:
- Success Response (200 OK):
```json
{
    "detail": "Requests retrieved successfully",
    "data": [
        {
            "mentor_session_id": "34e9827f-1086-44f5-a712-a0c652faeb6f",
            "status": "accepted",
            "user": {
                "user_id": "cb45ef59-bdf0-44a5-a3a7-ef8e2e1b96e1",
                "email": "example
                @mail.com",
                "profile": {
                    "profile_id": "d6a2ce03-4c1a-4119-845b-2512d4d3a5a7",
                    "first_name": "John",
                    "last_name": "Doe",
                    "phone_number": "+233555455555",
                    "profile_picture": "/media/profile_pictures/leetcode_award.png",
                    "bio": "",
                    "created_at": "2023-12-26T20:41:39.297800Z",
                    "updated_at": "2023-12-26T20:41:39.297946Z"
                },
                "created_at": "2023-12-26T20:56:49.807061Z",
                "verified": true,
                "role": "Mentor"
            },
            "time": "2024-01-08T09:57:46Z",
            "created_at": "2024-01-08T09:57:47.511517Z",
            "meeting_id": null
        }
    ]
}
```
### 4.7 Get Mentor Pending Requests

**Endpoint**: `GET mentors/pending-requests/`
**Description**: Get all pending requests for a mentor.
**Request Headers:**
- `Authorization`: (string, required): JWT token for authentication.
**Response Body**:
- Success Response (200 OK):
```json
{
    "detail": "Requests retrieved successfully",
    "data": [
        {
            "mentor_session_id": "b3830618-61bb-488f-8d78-7496d49c2da8",
            "status": "pending",
            "user": {
                "user_id": "15fc439c-8854-4543-a69c-dbf3f7ba89b3",
                "email": "man@man.com",
                "profile": {
                    "profile_id": "64967ee3-be02-4b68-b43f-7b1cd39bd579",
                    "first_name": "man",
                    "last_name": "ottu",
                    "phone_number": "+233502276474",
                    "profile_picture": "/media/profile_pictures/msg1008385288-19257.jpg",
                    "bio": "",
                    "created_at": "2023-12-30T20:42:32.599556Z",
                    "updated_at": "2023-12-30T20:42:32.599645Z"
                },
                "created_at": "2023-12-30T20:42:40.689865Z",
                "verified": true,
                "role": "Mentee"
            },
            "time": "2023-12-30T20:42:55Z",
            "created_at": "2023-12-30T20:42:56.186343Z",
            "meeting_id": "8530295570"
        },
        {
            "mentor_session_id": "34e9827f-1086-44f5-a712-a0c652faeb6f",
            "status": "pending",
            "user": {
                "user_id": "1b046a6d-274f-4ff7-894d-0de42e9ae9f7",
                "email": "example@mail.com",
                "profile": {
                    "profile_id": "0c49cfa5-7e52-4b1f-8b06-7abda3e57fe7",
                    "first_name": "new User",
                    "last_name": "Konadu",
                    "phone_number": "0502276474",
                    "profile_picture": "/media/profile_pictures/msg1008385288-19259.jpg",
                    "bio": "",
                    "created_at": "2024-01-08T09:57:12.087033Z",
                    "updated_at": "2024-01-08T09:57:12.087163Z"
                },
                "created_at": "2024-01-07T16:31:43.504249Z",
                "verified": true,
                "role": "Mentee"
            },
            "time": "2024-01-08T09:57:46Z",
            "created_at": "2024-01-08T09:57:47.511517Z",
            "meeting_id": null
        }
    ]

}
```
### 4.8 Schedule Meeting
**Endpoint**: `POST mentors/schedule-meeting/`
**Description**: Schedule a meeting between a mentor and a mentee.
**Request Headers:**
- `Authorization`: (string, required): JWT token for authentication.
**Request Body**:
```json
{
  "mentorSession_id": "1234567890",
  "time": "2024-01-08T12:34:56Z",
}
```
- `mentorSession_id` (string, required): Mentor session ID.
- `time` (string, required): Meeting time.
**Response Body**:
- Success Response (200 OK):
```json
{
  "detail": "Meeting scheduled successfully",
  "data": {
    // Meeting information
  }
}
```
- Error Response (400 Bad Request):
```json
{
  "error": "Meeting not scheduled"
}
```
### 4.9 List Scheduled Meetings
**Endpoint**: `GET mentors/scheduled-meetings/`
**Description**: List all scheduled meetings for a mentor.
**Request Headers:**
- `Authorization`: (string, required): JWT token for authentication.
**Response Body**:
- Success Response (200 OK):
```json
{
  "detail": "Meetings retrieved successfully",
  "data": [
    {
      // Meeting information
    },
    {
      // Meeting information
    }
  ]
}
```

# Contributing to Yello API

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
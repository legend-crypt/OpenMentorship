# API Documentation for Yello User Management

## Overview

This API provides functionalities for user management in the Yello platform. It includes features such as account creation, email verification, password reset, and user profile retrieval.

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
    - [4.5 Get  Mentor Meetings](#45-get-mentor-mentings)
    - [4.6 Get  student Meetings](#46-get-student-mentings)
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
**Endpoint**: `GET mentor/list/`
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
**Endpoint**: `POST mentor/create/`
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
    // Mentor request information
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
**Endpoint**: `POST mentor/accept/`
**Description**: Accept a mentee request.
**Request Headers:**
- `Authorization`: (string, required): JWT token for authentication.
**Request Body**:
```json
{
  "student_id": "1234567890",
}
```
- `student_id` (string, required): Student's user ID.
**Response Body**:
- Success Response (200 OK):
```json
{
  "detail": "Request successfully accepted",
  "data": {
    // Mentor request information
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
**Endpoint**: `POST mentor/reject-request/`
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
### 4.5 Get Mentor Meetings
**Endpoint**: `GET mentor/meetings/`
**Description**: Get all mentor meetings.
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
### 4.6 Get Student Meetings

**Endpoint**: `GET student/meetings/`
**Description**: Get all student meetings.
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
### 4.7 Get Mentor Pending Requests

**Endpoint**: `GET mentor/pending-requests/`
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
      // Request information
    },
    {
      // Request information
    }
  ]
}
```
### 4.8 Schedule Meeting
**Endpoint**: `POST mentor/schedule-meeting/`
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
**Endpoint**: `GET mentor/scheduled-meetings/`
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






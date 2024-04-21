/*
  The `Modal` React component represents a reusable modal window that can be used for various purposes such as scheduling meetings. It includes options for inputting date and time, and it communicates with the server to handle confirmation actions. This component employs state to manage user input and validation, making it versatile for different modal scenarios.

  Component:
  - Modal: A reusable modal window for various purposes, such as scheduling meetings.

  Key Functionalities:
  - Displays a modal window with a title, content, and input fields for date and time (conditionally based on the `isDateTimeInput` prop).
  - Manages user input for the date and time using local state (`dateTime`).
  - Validates the selected date and time to ensure it is in the future (if applicable).
  - Communicates with the server to handle confirmation actions, such as scheduling a meeting.
  - Alerts the user with server responses and closes the modal on confirmation.

  Note: This component follows a modular and reusable design, allowing it to be easily adapted for different modal scenarios across the application.
*/



import React, { useState } from 'react';
import axios from '../utils/axios';

export default function Modal({ isOpen, onClose, title, content, confirmText, isDateTimeInput, menteeId }) {
    const [dateTime, setDateTime] = useState("");
    const config = {
        headers : {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("access_token"))}`,
        }
    }
    console.log(`config is ${config.headers.Authorization}`);

    const handleChange = (e) => {
        setDateTime(e.target.value);
    };

    const isDateTimeValid = () => {
        if (!isDateTimeInput) return true;

        const currentDate = new Date();
        const selectedDate = new Date(dateTime);

        return selectedDate >= currentDate;
    };

    const handleConfirmClick = () => {
        axios
            .post("/meeting/create/", {
                mentee_id: menteeId,
                time: dateTime,
            }, config)
            .then((res) => {
                console.log(res);
                alert(res.data.detail);
                onClose();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
    <div id="modal">
        <div className="modal-container">
        <h1>{title}</h1>
        <p>{content}</p>
        {isDateTimeInput && <input type="datetime-local" name="date" id="date" onChange={handleChange} />}
        <br />
        {!isDateTimeValid() && isDateTimeInput && <p className="warning-text">Select a future date</p>}
        <button id="modal-btn" className="btn-collection col-btn" disabled={!isDateTimeValid()} onClick={handleConfirmClick}>
            {confirmText}
        </button>
        <button className="btn-collection col-btn danger" onClick={onClose}>
            Cancel
        </button>
        </div>
    </div>
    );
}

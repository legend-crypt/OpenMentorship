import React, { useState } from 'react';
import axios from '../utils/axios';

export default function Modal({ isOpen, onClose, title, content, confirmText, isDateTimeInput, meetingId }) {
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
            .put("/mentors/meeting-schedule/", {
                mentor_id: meetingId,
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

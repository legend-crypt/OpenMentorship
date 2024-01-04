import React, { useState } from 'react';

export default function Modal({ isOpen, onClose, onConfirm, title, content, confirmText, isDateTimeInput }) {
    const [dateTime, setDateTime] = useState("");

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
        if (onConfirm) {
            onConfirm(dateTime);
        }
        onClose();
    };

    return (
    <div id="modal" style={{ display: isOpen ? 'block' : 'none' }}>
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

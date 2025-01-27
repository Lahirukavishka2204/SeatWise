import React from 'react';
import {useStateContext} from '../context/ContextProvider.jsx';

const ConfirmationPopup = ({ onClose, userName, selectedTables }) => {
    // Calculate the amount to pay based on the number of selected tables
    const amountToPay = selectedTables.length * 50; // Assuming each table costs 50 LKR
  
    // Generate a random reservation number
    const reservationNumber = Math.floor(Math.random() * 1000000);
  
    return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white rounded-lg p-8">
        <span className="popup-close" onClick={onClose}>
          &#10005;
        </span>
        <h2 className="text-xl font-bold mb-4">Confirmation Popup</h2>
        <p className="text-gray-600 mb-4">Please review your reservation details.</p>
        <div className="mb-4">
          {/* <p className="font-semibold">Name: {userName}</p> */}
        </div>
        <div className="mb-4">
          <p className="font-semibold">Selected Tables:</p>
          <ul className="list-disc pl-6">
            {selectedTables.map(table => (
              <li key={table.id}>{table.table_number}</li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Amount to Pay (LKR): {amountToPay}</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Reservation Number: {reservationNumber}</p>
        </div>
        <div className="flex gap-4">
          {/* Define buttons and their actions here */}
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
            onClick={() => {
              // Perform action for "Confirm"
              onClose(); // Close the popup
            }}
          >
            Confirm
          </button>
          <button
            className="border border-red-500 text-red-500 px-4 py-2 rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;

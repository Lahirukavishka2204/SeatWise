import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../axios-client';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import WaitlistForm from '../components/WaitlistForm';

const HallDetail = () => {
  const { hallId } = useParams();
  const [hall, setHall] = useState(null);
  const [timeAvailabilities, setTimeAvailabilities] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPopup, setShowPopup] = useState(false); // New state for showing the pop-up
  const [selectedSlot, setSelectedSlot] = useState(null); // New state for storing the selected time slot

  useEffect(() => {
    const fetchHallDetail = async () => {
      try {
        const response = await axiosClient.get(`/halls/${hallId}`);
        setHall(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHallDetail();
  }, [hallId]);

  const fetchTimeAvailabilities = async (date) => {
    try {
      const year = date.getUTCFullYear();
      const month = date.getUTCMonth() + 1;
      const day = date.getUTCDate() + 1;
      const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      const response = await axiosClient.get(`/halls/${hallId}/time-availabilities/${formattedDate}`);
      setTimeAvailabilities(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchTimeAvailabilities(selectedDate);
    }
  }, [selectedDate]);

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setSelectedSlot(null);
  };

  const [showWaitlistForm, setShowWaitlistForm] = useState(false); // New state for showing the waitlist form

  const handleConfirmWaitlist = (formData) => {
    // Handle the waitlist form submission here
    console.log('Form Data:', formData);
    // You can perform any other actions here, such as saving the data to the server.
    // For demonstration purposes, we are only logging the form data.
    setShowWaitlistForm(false);
  };

  const handleWaitlistFormClose = () => {
    setShowWaitlistForm(false);
    setSelectedSlot(null);
  };

  if (!hall) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Hall Name and Description */}
      <div>
        <h1 className="text-3xl font-bold mb-4">{hall.name}</h1>
        <p className="text-gray-600 mb-6">{hall.description}</p>
      </div>

      {/* Calendar and Time Availabilities */}
      <div className="flex">
        {/* Left Column - Calendar */}
        <div className="mr-8">
          <h2 className="text-xl font-bold mb-2">Pick a date to view applicable slots</h2>
          <div className="border border-gray-300 rounded-md shadow-sm p-2">
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              className="rounded-md shadow-sm bg-white p-2"
              tileClassName={({ date, view }) =>
                view === 'month' && date.toDateString() === new Date().toDateString()
                  ? 'text-black' // Apply black font color to today's date
                  : null
              }
            />
          </div>
        </div>

        {/* Right Column - Time Availabilities */}
        <div>
          {selectedDate && (
            <>
              <h3>{selectedDate.toDateString()}</h3>
              {timeAvailabilities ? (
                <ul>
                  {timeAvailabilities.map((availability) => (
                    <li
                      key={availability.id}
                      style={{ color: 'white', cursor: 'pointer' }}
                      onClick={() => handleSlotClick(availability)}
                    >
                      <button
                        className={`p-2 m-2 rounded ${
                          availability.availability
                            ? 'bg-green-500 text-white'
                            : 'bg-yellow-500 text-white'
                        }`}
                      >
                        {availability.start_time} - {availability.end_time}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No time availabilities for the selected date.</p>
              )}
            </>
          )}
          {!selectedDate && <p>Select a date to view applicable slots.</p>}
        </div>
      </div>

      {/* Pop-up */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          {showWaitlistForm ? ( // Conditionally render the waitlist form
            <WaitlistForm
              user={{ username: 'John Doe', phoneNumber: '123-456-7890' }} // Replace with user data from the database
              selectedDate={selectedDate}
              selectedSlot={selectedSlot}
              onClose={handleWaitlistFormClose}
              onConfirm={handleConfirmWaitlist}
            />
          ) : (
            <div className="bg-white p-6 rounded-md shadow-lg">
              {selectedSlot && (
                <>
                  <h4 className="text-lg font-bold mb-4">
                    {selectedSlot.availability ? 'Slot Available' : 'Slot Unavailable'}
                  </h4>
                  <div className="mb-4">
                    {selectedSlot.availability ? (
                      <button className="px-4 py-2 mr-2 rounded bg-green-500 text-white">
                        Reserve
                      </button>
                    ) : (
                      <button
                        className="px-4 py-2 mr-2 rounded bg-yellow-500 text-white"
                        onClick={() => setShowWaitlistForm(true)} // Show the waitlist form as a pop-up
                      >
                        Join the waitlist
                      </button>
                    )}
                    <button
                      className="px-4 py-2 rounded border border-gray-500"
                      onClick={handlePopupClose}
                    >
                      Close
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HallDetail;

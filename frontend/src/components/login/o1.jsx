import React, { useState } from "react";

const CalendarGrid = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-indexed (0 = Jan)
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // state to track clicked dates and their colors
  const [selectedDays, setSelectedDays] = useState({});

  const handleDayClick = (day) => {
    setSelectedDays((prev) => {
      const current = prev[day];

      // Toggle color: undefined → green → red → remove
      if (!current) return { ...prev, [day]: "green" };
      if (current === "green") return { ...prev, [day]: "red" };

      const updated = { ...prev };
      delete updated[day];
      return updated;
    });
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Calendar - {month + 1}/{year}</h2>
      <div className="grid grid-cols-7 gap-2">
        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1;
          const color =
            selectedDays[day] === "green"
              ? "bg-green-500 text-white"
              : selectedDays[day] === "red"
              ? "bg-red-500 text-white"
              : "bg-gray-100";

          return (
            <div
              key={day}
              onClick={() => handleDayClick(day)}
              className={`h-16 w-full flex items-center justify-center border rounded cursor-pointer ${color} transition-all`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;

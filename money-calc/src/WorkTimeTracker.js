import React, { useState } from "react";
import "./WorkTimeTracker.css";

const WorkTimeTracker = () => {
  const [schema, setSchema] = useState(null);
  const [actualTimes, setActualTimes] = useState({
    mon: { startTime: "", endTime: "", hasBreak: false },
    tue: { startTime: "", endTime: "", hasBreak: false },
    wed: { startTime: "", endTime: "", hasBreak: false },
    thu: { startTime: "", endTime: "", hasBreak: false },
    fri: { startTime: "", endTime: "", hasBreak: false },
    sat: { startTime: "", endTime: "", hasBreak: false }
  });
  const [overtimeResults, setOvertimeResults] = useState({});

  const handleFileRead = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.schedule !== null) {
          setSchema(data.schedule);
        }
      } catch (error) {
        console.error("Error parsing JSON file:", error);
      }
    };

    reader.readAsText(file);
  };

  const handleActualTimeChange = (day, field, value) => {
    setActualTimes((prevActualTimes) => ({
      ...prevActualTimes,
      [day]: {
        ...prevActualTimes[day],
        [field]: value
      }
    }));
  };

  const handleBreakChange = (day, value) => {
    setActualTimes((prevActualTimes) => ({
      ...prevActualTimes,
      [day]: {
        ...prevActualTimes[day],
        hasBreak: value
      }
    }));
  };

  const calculateOvertime = (day) => {
    const actualTime = actualTimes[day];
  
    // Controleer of actualTime en actualTime.startTime gedefinieerd zijn voordat je ze gebruikt
    if (actualTime && actualTime.startTime) {
      const [startHour, startMinute] = actualTime.startTime.split(":").map(Number);
      const [endHour, endMinute] = actualTime.endTime.split(":").map(Number);
      const startMinutes = startHour * 60 + startMinute;
      const endMinutes = endHour * 60 + endMinute;
      let totalMinutes = endMinutes - startMinutes;

      if (actualTime.hasBreak) {
        totalMinutes -= 30; // Assuming a break of 30 minutes
      }

      const schemaTimes = schema[day].map(time => {
        const [hour, minute] = time.split(":").map(Number);
        return hour * 60 + minute;
      });

      const schemaWorkTime = schemaTimes[1] - schemaTimes[0];

      const overtimeMinutes = Math.max(totalMinutes - schemaWorkTime, 0);

      setOvertimeResults((prevResults) => ({
        ...prevResults,
        [day]: overtimeMinutes > 0 ? `Overtime ${day} : ${overtimeMinutes / 60} hour` : "No overtime"
      }));
    } else {
      // Handle the case where actualTime or actualTime.startTime is undefined
      console.error("Actual start time is not defined for day", day);
    }
  };

  const resetTime = () => {
    setActualTimes({
      Monday: { startTime: "", endTime: "", hasBreak: false },
      Tuesday: { startTime: "", endTime: "", hasBreak: false },
      Wensday: { startTime: "", endTime: "", hasBreak: false },
      Thursday: { startTime: "", endTime: "", hasBreak: false },
      Friday: { startTime: "", endTime: "", hasBreak: false },
      Saturday: { startTime: "", endTime: "", hasBreak: false }
    });

    // Reset ook de overurenresultaten
    setOvertimeResults({});
  };

  return (
    <div id="main-div">
      <h1>MoneyCalc</h1>
      <div>
        <h2>Work Time Tracker</h2>
        <input type="file" accept=".json" onChange={handleFileRead}/>
      </div>
      {schema && (
        <div>
          <h3>Schedule</h3>
          <ul>
            {Object.entries(schema).map(([day, times]) => {
              const actualTime = actualTimes[day] || {};
              return (
                <li key={day}>
                  <div id="schedule">{day}: {times.join(" - ")}</div>
                  <div className="selection">
                    <label className="label">Start Time:</label>
                    <input className="time-input"
                      type="time"
                      value={actualTime.startTime}
                      onChange={(e) => handleActualTimeChange(day, "startTime", e.target.value)}
                    />
                  </div>
                  <div className="selection">
                    <label className="label">End Time:</label>
                    <input className="time-input"
                      type="time"
                      value={actualTime.endTime}
                      onChange={(e) => handleActualTimeChange(day, "endTime", e.target.value)}
                    />
                  </div>
                  <div className="break-checkbox">
                    <label className="checkbox-label">
                      <input className="checkbox"
                        type="checkbox"
                        checked={actualTime.hasBreak}
                        onChange={(e) => handleBreakChange(day, e.target.checked)}
                      />
                      Has Break
                    </label>
                  </div>
                  <div className="calculatebutton-div">
                    <button className="button" onClick={() => calculateOvertime(day)}>Calculate Overtime</button>
                  </div>
                  <div>
                    {console.log(overtimeResults)}
                    {overtimeResults[day] ? (<p className="result-text">{overtimeResults[day]}</p>) : (<p className="result-text">{day} not calculated</p>)}
                  </div>
                </li>
              );
            })}
            <li>
              <div className="restbutton-div">
                <button style={{width: "10vw", backgroundColor: "#FFF"}} className="button" onClick={() => resetTime()}>
                  Time reset
                </button>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default WorkTimeTracker;

import React, { useEffect, useState } from "react";
import ShiftGrid from "./calendar";
import dayjs from "dayjs";
import "./index.css";
const Shifts = ({
  status,
  testData,
  topHeader,
  sections,
  headerName,
  emptyError,
  onClick,
  onDoubleClick,
  onContextMenu,
}) => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [mode, setMode] = useState(6);
  const [calendarView, setcalendarView] = useState(false);
  const dayArray = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    if (mode === 30) {
      setCurrentDate(currentDate.date(1));
    } else {
      setCurrentDate(dayjs());
    }
    changeView();
  }, [mode]);

  const nextWeek = () => {
    let newDate = null;
    if (mode === 6) {
      newDate = currentDate.add(7, "day");
    } else {
      newDate = currentDate.add(
        currentDate.endOf("month").date() - 2 - currentDate.day(),
        "day"
      );
    }
    setCurrentDate(newDate);
  };

  const prevWeek = () => {
    let newDate = null;
    if (mode === 6) {
      newDate = currentDate.subtract(7, "day");
    } else {
      newDate = currentDate.subtract(
        currentDate.endOf("month").date() + currentDate.day() - 1,
        "day"
      );
    }
    setCurrentDate(newDate);
  };

  const changeView = () => {
    setcalendarView(!calendarView);
  };

  return (
    <div className="col-12 card-body border">
      <div className="shift-header">
        <div className="d-flex justify-content-between border card-header  mb-2">
          <h3 className="search-box d-flex jystify-content-space-between ms-2 mt-2">
            <div className="form-group">
              <input
                className="form-control"
                placeholder="section to search..."
                type="text"
                onChange={(e) => {
                  setFilterText(e.target.value);
                }}
              />
            </div>
          </h3>
        </div>
      </div>
      <div style={{ marginTop: "20px" }}>
        <h4 className="text-center mt-2 card-header ">{topHeader}</h4>
        <div className="headerClass d-flex justify-content-between">
          <div>
            <button
              className="btn btn-primary changeDateButton me-2"
              onClick={() => prevWeek()}
            >
              prev
            </button>
            <button
              className="btn btn-primary changeDateButton  me-2"
              onClick={() => nextWeek()}
            >
              next
            </button>
          </div>
          <span className="headerDate">
            <b>
              {dayArray[currentDate.day()]} - {currentDate.format("DD-MM-YYYY")}
            </b>
          </span>
          <button
            className="btn btn-primary text-white "
            onClick={() => {
              mode === 6 ? setMode(30) : setMode(6);
            }}
          >
            {calendarView ? "Month View" : "Week View"}
          </button>
        </div>

        <ShiftGrid
          currentDate={currentDate}
          mode={mode}
          sections={
            filterText
              ? testData?.filter((t) =>
                  t.title?.toLowerCase()?.includes(filterText?.toLowerCase())
                )
              : testData
          }
          headerName={headerName}
          emptyError={emptyError}
          onClick={onClick}
          onDoubleClick={onDoubleClick}
          onContextMenu={onContextMenu}
        />
      </div>
    </div>
  );
};

export default Shifts;

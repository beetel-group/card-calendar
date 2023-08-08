import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

const ShiftGrid = ({
  currentDate,
  mode,
  sections,
  headerName,
  emptyError,
  onClick,
  onDoubleClick,
  onContextMenu,
}) => {
  const dayArray = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const getCurrentWeekDates = () => {
    let monday = "";
    const dateArray = [];
    let loopTill = 0;
    let dayOfWeek = currentDate.day();
    if (!dayOfWeek) dayOfWeek = 6;
    else dayOfWeek = dayOfWeek - 1;
    if (mode === 30) {
      monday = currentDate.startOf("month");
      loopTill = currentDate.endOf("month").date();
    } else {
      loopTill = 7;
      monday = currentDate.subtract(dayOfWeek, "day");
    }

    for (let i = 0; i < loopTill; i++) {
      dateArray.push(monday.add(i, "day").format("YYYY-MM-DD"));
    }
    return dateArray;
  };

  return (
    <div>
      <table className="table table-striped table-bordered">
        <thead className="table-sticky-header">
          <tr>
            <th style={{ minWidth: "100px" }}>{headerName}</th>
            {getCurrentWeekDates().map((dateValue, i) => (
              <th style={{ minWidth: "100px" }} key={i}>
                <div className="">
                  <span>{dayArray[dayjs(dateValue).day()]}</span>
                  <br />
                  <span>{dayjs(dateValue).format("DD-MM-YYYY")}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sections.map(
            (data, i) =>
              data?.cards.length > 0 && (
                <tr key={i}>
                  <td>
                    <h5 className="ms-2">{data.title}</h5>
                    <h6 className="mt-2 ">{data.mid_title}</h6>
                    <h6 className="mt-2 text-warning">{data.sub_title}</h6>
                  </td>

                  {getCurrentWeekDates().map((dateValue, i) => (
                    <td key={i}>
                      {data?.cards?.map(
                        (details) =>
                          dateValue.includes(details.start_date) && (
                            <div
                              className={`pointer ${
                                details.status === "unassigned"
                                  ? dayjs(dateValue).date() < dayjs().date()
                                    ? "calendarDiv blur"
                                    : "calendarDiv"
                                  : details.status === "assigned"
                                  ? dayjs(dateValue).date() < dayjs().date()
                                    ? "allocatedDiv blur"
                                    : "allocatedDiv"
                                  : details.status === "cancelled"
                                  ? dayjs(dateValue).date() < dayjs().date()
                                    ? "cancelDiv blur"
                                    : "cancelDiv"
                                  : dayjs(dateValue).date() < dayjs().date()
                                  ? "confirmedDiv blur"
                                  : "confirmedDiv"
                              }`}
                              onClick={(e) => onClick && onClick(e)}
                              onDoubleClick={(e) => {
                                onDoubleClick && onDoubleClick(e);
                              }}
                              onContextMenu={(e) => {
                                onContextMenu && onContextMenu(e);
                              }}
                              id={details.id}
                              key={details.id}
                              title={dateValue}
                            >
                              <p>
                                {details.start_time + "-" + details.end_time}
                              </p>
                              <p>{details.card_heading}</p>
                              {details.sub_heading && (
                                <p>({details.sub_heading})</p>
                              )}
                            </div>
                          )
                      )}
                    </td>
                  ))}
                </tr>
              )
          )}
        </tbody>
      </table>

      {sections?.length === 0 && (
        <div className="text-center">{emptyError}</div>
      )}
    </div>
  );
};

export default ShiftGrid;

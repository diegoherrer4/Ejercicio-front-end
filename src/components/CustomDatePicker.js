import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./CustomDatePicker.css";
import DatePicker from "react-datepicker";

const CustomDatePicker = ({ selected, onChange, placeholderText }) => {
  return (
    <DatePicker
      selected={selected}
      maxDate={new Date()}
      onChange={onChange}
      placeholderText={placeholderText}
      className="react-datepicker-wrapper custom-datepicker"
      popperClassName="react-datepicker-popper"
      portalId="root-portal"
    />
  );
};

export default CustomDatePicker;

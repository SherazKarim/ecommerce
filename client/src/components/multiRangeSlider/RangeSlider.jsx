// RangeSlider.js
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./Range.css";

const RangeSlider = ({ min, max, onChange, onFilter }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);

  useEffect(() => {
    const minPercent = ((minVal - min) / (max - min)) * 100;
    const maxPercent = ((maxVal - min) / (max - min)) * 100;
    range.current.style.left = `${minPercent}%`;
    range.current.style.width = `${maxPercent - minPercent}%`;
  }, [min, max, minVal, maxVal]);

  useEffect(() => {
    const minPercent = ((minValRef.current - min) / (max - min)) * 100;
    const maxPercent = ((maxVal - min) / (max - min)) * 100;
    range.current.style.width = `${maxPercent - minPercent}%`;
  }, [min, max, maxVal]);

  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <div className="container w-full border border-gray-200 h-[200px] px-6 py-5">
      <h1 className="heading mb-3 font-bold text-md left-[20px] relative z-5 before:bg-red-800">Filter:</h1>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={(event) => {
            const value = Math.min(Number(event.target.value), maxVal - 1);
            setMinVal(value);
            minValRef.current = value;
          }}
          className="thumb thumb--left left-0"
          style={{ zIndex: minVal > max - 100 && "5" }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={(event) => {
            const value = Math.max(Number(event.target.value), minVal + 1);
            setMaxVal(value);
            maxValRef.current = value;
          }}
          className="thumb thumb--right right-[0%]"
        />
      </div>

      <div className="slider">
        <div className="slider__track " />
        <div ref={range} className="slider__range" />
      </div>
      <h1 className="pt-6">
        Price:${minVal}-{maxVal}
      </h1>
      <button
        className="bg-red-600 hover:bg-red-500 text-white px-10 py-3 w-full mt-3"
        onClick={onFilter}
      >
        Filter
      </button>
    </div>
  );
};

RangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
};

export default RangeSlider;

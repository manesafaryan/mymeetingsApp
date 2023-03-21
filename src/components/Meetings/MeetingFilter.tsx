import React from "react";
import { useState } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";

import { DateRange } from "@mui/x-date-pickers-pro";

import { Multiselect } from "../shared";
import { DatePicker } from "../shared";
import KeepMountedModal from "../shared/Modal";

import { filterItems } from "../../pages/Home";
import { getFiltersFromUrl } from "../../utils/helpers/filterHelpers";
import { format } from "../../utils/formatters/dateFromatters";

export default function MeetingFilter() {
  let [searchParams] = useSearchParams();
  const [filters, setFilters] = useState(
    getFiltersFromUrl(searchParams).map((i) => filterItems[i].label)
  );
  const [range, setRange] = useState<DateRange<string> | null>(null);
  const navigate = useNavigate();
  const handleSelect = (value: string[]): void => {
    setFilters(value);
  };

  const handleFilter = () => {
    const dateStrStart = range?.[0] ? `&start=${format(range[0])}` : "";
    const dateStrEnd = range?.[1] ? `&end=${format(range[1])}` : "";
    const rangeStr = dateStrStart + dateStrEnd;
    navigate(
      `/filters?${filters
        .map((i) => i.split(" ").join(""))
        .join("&")}${rangeStr}`
    );
  };

  const handleReset = () => {
    navigate("/");
    setFilters([]);
    setRange(null);
  };

  const handleCustomValue = (date: DateRange<string | null>): void => {
    setRange(date);
  };
  return (
    <KeepMountedModal
      onAccept={handleFilter}
      acceptBtnName={"filter"}
      modalBtnName={"Filter"}
    >
      <>
        <Multiselect
          options={Object.values(filterItems).map((i) => i.label)}
          handleSelect={handleSelect}
          list={filters}
        ></Multiselect>
        <div>
          <p>Custom Range</p>
          <DatePicker handleValue={handleCustomValue} />
        </div>
        <button onClick={handleReset}>Reset</button>
      </>
    </KeepMountedModal>
  );
}

import { filterItems } from "../../pages/Home";
import { IMeeting } from "../../types/apiTypes";

const filterCustomRange =
  (date: URLSearchParams) => (data: IMeeting, key: string) => {
    const start = date.get("start") || "";
    const end = date.get("end") || "";
    const currentDate = key.slice(0, 10);
    if (start && !end.length) {
      return currentDate > start;
    } else if (end && !start.length) {
      return currentDate < end;
    }
    return currentDate > start && currentDate < end;
  };

export function filter(params: URLSearchParams) {
  return (data: IMeeting, date: string) => {
    const conditionBooleans = getFiltersFromUrl(params)
      .map((i) => filterItems[i])
      .map((i) => i.filter(data, date));
    if (params.has("start") || params.has("end")) {
      const isConditionOk = filterCustomRange(params)(data, date);
      conditionBooleans.push(isConditionOk);
    }
    return conditionBooleans.every((b) => b === true);
  };
}

export function getFiltersFromUrl(params: URLSearchParams) {
  return Object.keys(filterItems).filter((key) => {
    return params.has(key);
  });
}

export default filterCustomRange;

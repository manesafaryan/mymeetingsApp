import { act, renderHook } from "@testing-library/react-hooks";
import { getTimerValue } from "../../utils/helpers/dateHelper";
import useUpdatedgroupedData from "../usеUpdatedGroupedData";

describe("useUpdatedgroupedData", () => {
  const data = {
    items: [
      { day: "2024-03-22", time: "11:00" },
      { day: "2025-03-23", time: "15:00" },
      { day: "2026-03-24", time: "09:00" },
    ],
  };

  it("should separate upcoming and previous data", () => {
    let result;
    act(() => {
      result = renderHook(() => useUpdatedgroupedData(data)).result;
    });
    expect(result.current[0]).toHaveLength(0); // previous data
    expect(result.current[1]).toHaveLength(3); // upcoming data
  });

  it("should move upcoming events to previous after the scheduled time", () => {
    jest.useFakeTimers();
    let result;
    act(() => {
      result = renderHook(() => useUpdatedgroupedData(data)).result;
    });
    expect(result.current[0]).toHaveLength(0); // previous data
    expect(result.current[1]).toHaveLength(3); // upcoming data

    jest.advanceTimersByTime(
      getTimerValue(result.current[1][result.current[1].length - 1], 0)
    ); // advance time by firts upcoming date
    expect(result.current[0]).toHaveLength(3); // previous data
    expect(result.current[1]).toHaveLength(0); // upcoming data
  });
});

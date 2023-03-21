import { act } from "@testing-library/react";
import { useEffect, useState } from "react";
import { IDayMeeting, IMeeting } from "../types/apiTypes";
import getTimesDiff, { getTimerValue } from "../utils/helpers/dateHelper";
import { startInterval } from "../utils/helpers/setIntervalHelpers";

export default function useUpdatedgroupedData(data: IDayMeeting) {
  const [previous, setPrevious] = useState<IMeeting[]>([]);
  const [upcoming, setUpcoming] = useState<IMeeting[]>([]);

  useEffect(() => {
    if (data.items.length) {
      //separate upcoming and previous data
      const prev: IMeeting[] = [];
      const upcom: IMeeting[] = [];
      data.items.forEach((i) => {
        if (getTimesDiff(i.day + "T" + i.time) < 0) {
          prev.push(i);
        } else upcom.push(i);
      });
      setPrevious(prev);
      setUpcoming(upcom);

      //set interval to move upcomings to previous
      const upcomings: IMeeting[] = [...upcom];
      let nextEvent: IMeeting = upcomings.shift() as IMeeting;
      if (nextEvent) {
        let timerValue = getTimerValue(nextEvent, 0);
        const moveToPrevious = () => {
          act(() => {
            setPrevious([...prev, nextEvent]);
            setUpcoming([...upcomings]);
          });
          nextEvent = upcomings.shift() as IMeeting;
          if (nextEvent) {
            return getTimerValue(nextEvent, 0);
          } else return false;
        };
        startInterval(timerValue, moveToPrevious);
      }
    }
  }, [data]);

  return [previous, upcoming];
}

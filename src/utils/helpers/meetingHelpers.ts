import { toast } from "react-toastify";

import { getTimerValue, getTimesDiff } from "./dateHelper";
import { startInterval } from "./setIntervalHelpers";

import { IDayMeeting, IMeeting, MeetingSchedule } from "../../types/apiTypes";

interface MeetingByDay {
  [key: keyof MeetingSchedule]: IDayMeeting;
}

export function groupMeetingDataWithFilter(
  data: MeetingSchedule | null,
  filterCondition: (data: IMeeting, date: string) => boolean
): IDayMeeting[] {
  if (data) {
    const meetingsGroupedByDay: MeetingByDay = Object.entries(data)
      .sort(([date1], [date2]) => {
        return date1 > date2 ? 1 : -1;
      })
      .reduce((acc, [date, data]) => {
        const day = date.split("T")[0];
        const time = date.split("T")[1];
        if (filterCondition(data, date)) {
          if (acc[day]) {
            acc[day].items.push({ ...data, day, time });
          } else acc[day] = { day, items: [{ ...data, day, time }] };
        }
        return acc;
      }, {} as MeetingByDay);

    return Object.values(meetingsGroupedByDay);
  }
  return [];
}

export function setNotificationsForMeeting(data: MeetingSchedule) {
  //take only upcoming meetings at least 30 min away

  const meetingByOrder: IMeeting[] = groupMeetingDataWithFilter(
    data,
    (data: IMeeting, date: string) => calcIfMeetingIsUpcoming(date)
  ).reduce((acc, curr) => [...acc, ...curr.items], [] as IMeeting[]);

  //Take the closest meeting and set time out for that meeting

  if (meetingByOrder.length) {
    const closestMeeting = meetingByOrder.pop();
    if (closestMeeting) {
      let timerValue = getTimerValue(closestMeeting, 1800);
      const alertNotif = () => {
        toast("You have a meeting after 30min!");
        const closestMeeting = meetingByOrder.pop();
        if (closestMeeting) {
          return getTimerValue(closestMeeting, 1800);
        } else return false;
      };
      const MAX_32_BIT = 0x7fffffff;
      if (timerValue < MAX_32_BIT) {
        startInterval(timerValue, alertNotif);
      }
    }
  }
}

const calcIfMeetingIsUpcoming = (date: string) => {
  const thirtyMinutesInMs = 30 * 60 * 1000;
  return getTimesDiff(date) >= thirtyMinutesInMs;
};

const meetingHelpers = {
  groupMeetingDataWithFilter,
  setNotificationsForMeeting,
  calcIfMeetingIsUpcoming,
};
export default meetingHelpers;

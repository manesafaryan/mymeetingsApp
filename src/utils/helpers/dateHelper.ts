import { IDayMeeting, IMeeting } from "../../types/apiTypes";

export function getTimesDiff(date: string) {
  const now = new Date();
  const targetDate = new Date(date);
  const timeDiffMs = targetDate.getTime() - now.getTime();
  return timeDiffMs;
}

export function getTimerValue(data: IMeeting, time: number) {
  const targetDate = new Date(data.day + " " + data.time);
  const secondsUntilTarget =
    (Math.floor((targetDate.getTime() - Date.now()) / 1000) - time) * 1000;
  return secondsUntilTarget;
}

export function checkIfTheDayIsToday(date: string) {
  return new Date(date).toDateString() === new Date().toDateString();
}

export function addDuration(start: string, duration: string) {
  const [h, m, s] = start.split(":");
  return new Date(
    0,
    0,
    0,
    Number(h),
    Number(m),
    Number(s) + Number(duration.slice(0, -3)) * 60
  ).toLocaleTimeString("en-US", { hour12: false });
}

const dateHelper = {
  getTimesDiff,
  getTimerValue,
  checkIfTheDayIsToday,
  addDuration,
};
export default dateHelper;

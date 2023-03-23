import { MeetingSchedule } from "../../types/apiTypes";

export function setCache(key: string, data: MeetingSchedule, timeout: number) {
  const timestamp = Date.now() + timeout;
  localStorage.setItem(key, JSON.stringify({ data, timestamp }));
  setTimeout(() => {
    localStorage.removeItem(key);
  }, timeout);
}

export function getCache(key: string) {
  const item = localStorage.getItem(key);
  if (!item) return null;
  const { data } = JSON.parse(item);
  return data;
}

const localStorageHelpers = { setCache, getCache };
export default localStorageHelpers;

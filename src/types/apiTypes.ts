export interface MeetingSchedule {
  [key: string]: IMeeting;
}

export interface IMeeting {
  id: string;
  name: string;
  duration: string;
  isOnline: string;
  day?: string;
  time?: string
}

export interface IDayMeeting {
  items: IMeeting[];
  day: string;
}

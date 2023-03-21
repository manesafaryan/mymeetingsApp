import React from "react";
import { FunctionComponent } from "react";

import Meeting from "./MeetingByDayCard";

import { IDayMeeting } from "../../types/apiTypes";

interface IProps {
  meetingData: IDayMeeting[];
}

const MeetingsBoard: FunctionComponent<IProps> = ({ meetingData }) => {
  if (!meetingData?.length) {
    return <>No Meetings</>;
  }

  return (
    <>
      {meetingData.map((data: IDayMeeting) => (
        <Meeting data-testid="meeting" data={data} key={data.day} />
      ))}
    </>
  );
};

export default MeetingsBoard;

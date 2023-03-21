import React from "react";
import { FunctionComponent } from "react";

import { makeStyles } from "@mui/styles";

import MeetingCard from "./MeetingCard";

import formatDate from "../../utils/formatters/dateFromatters";
import { IDayMeeting } from "../../types/apiTypes";
import { usеUpdatedGroupedData } from "../../hooks";

interface IProps {
  data: IDayMeeting;
}

const MeetingByDayCard: FunctionComponent<IProps> = ({ data }) => {
  const classes = useStyles();
  const [previous, upcoming] = usеUpdatedGroupedData(data);
  
  return (
    <div className={classes.root}>
      <h1>
        {formatDate(new Date(data.day))} Number of meetings {data.items.length}
      </h1>
      <div className={classes.meetingsGroups}>
        <div>
          <p>Previous</p>
          <div className={classes.meetingGroup}>
            <div className={classes.meeting}>
              {previous.map((i) => (
                <MeetingCard data={i} key={i.id} />
              ))}
            </div>
          </div>
        </div>
        <div>
          <p>UpComings</p>
          <div className={classes.meetingGroup}>
            <div className={classes.meeting}>
              {upcoming.map((i) => (
                <MeetingCard data={i} key={i.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingByDayCard;

const useStyles = makeStyles({
  root: {
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    padding: "10px 50px",
  },
  meeting: {
    display: "flex",
    justifyContent: "space-around",
  },
  meetingsGroups: {
    display: "flex",
    justifyContent: "space-between",
    overflowY: "auto",
  },
  meetingGroup: {
    with: "100%",
    margin: "10px",
    border: "1px solid gray",
  },
});

import React from "react";
import { FunctionComponent } from "react";

import { makeStyles } from "@mui/styles";

import { IMeeting } from "../../types/apiTypes";
import { addDuration } from "../../utils/helpers/dateHelper";

interface IProps {
  data: IMeeting;
}

const MeetingCard: FunctionComponent<IProps> = ({ data }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <p>name:{data.name}</p>
      <p>starts:{data.time}</p>
      <p>ends:{addDuration(data.time, data.duration)}</p>
    </div>
  );
};

const useStyles = makeStyles({
  root: {
    margin: "30px",
    width: "150px",
    background: "pink",
  },
});

export default MeetingCard;

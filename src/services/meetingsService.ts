import axios from "axios";

import { handleResponse } from "../axios";

const meetingService = {
  // Meetings data

  getMeetingData: () =>
    axios
      .get(`${process.env.REACT_APP_API}/meetings.json`)
      .then(handleResponse),
};

export default meetingService;

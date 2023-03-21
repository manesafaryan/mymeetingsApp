import React, { useEffect, useState } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";

import moment from "moment";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { DateRange } from "@mui/x-date-pickers-pro/internal/models";
import { Skeleton } from "@mui/material";

import { Modal } from "../components/shared";
import { Multiselect } from "../components/shared";
import { DatePicker } from "../components/shared";
import { MeetingsBoard } from "../components/Meetings/Index";
import { IDayMeeting, IMeeting } from "../types/apiTypes";
import filterOptions from "../utils/constants/meetingConstants";
import groupMeetingDataWithFilter, {
  setNotificationsForMeeting,
} from "../utils/helpers/meetingHelpers";
import { format } from "../utils/formatters/dateFromatters";
import { filter, getFiltersFromUrl } from "../utils/helpers/filterHelpers";
import useFetchDataWithCache from "../hooks/useFetchData";
import meetingService from "../services/meetingsService";
import MeetingFilter from "../components/Meetings/MeetingFilter";

export const filterItems = {
  [filterOptions.UpcomingMeetings]: {
    label: "Upcoming Meetings",
    filter: (data: IMeeting, date: string) => {
      return new Date(date) > new Date();
    },
  },
  [filterOptions.MeetingsInThisWeek]: {
    label: "Meetings In This Week",
    filter: (data: IMeeting, date: string) => {
      return moment().isoWeek() == moment(date).isoWeek();
    },
  },
  [filterOptions.MeetingsLessThan30min]: {
    label: "Meetings Less Than 30min",
    filter: (data: IMeeting) => {
      return !data.duration.includes("h") && data.duration.slice(0, -3) < "30";
    },
  },
  [filterOptions.OnlineMeetings]: {
    label: "Online Meetings",
    filter: (data: IMeeting) => {
      return data.isOnline === "true";
    },
  },
  [filterOptions.OfflineMeetings]: {
    label: "Offline Meetings",
    filter: (data: IMeeting) => {
      return data.isOnline === "true";
    },
  },
};

const Home = () => {
  const [meetingData, _, loading] = useFetchDataWithCache(
    meetingService.getMeetingData,
    "meetings",
    600000
  );
  let [searchParams] = useSearchParams();

  const filteredData: IDayMeeting[] = groupMeetingDataWithFilter(
    meetingData,
    filter(searchParams)
  );

  useEffect(() => {
    //Notification alert
    if (meetingData) {
      setNotificationsForMeeting(meetingData);
    }
  }, [meetingData]);

  return (
    <>
     <MeetingFilter/>
      <ToastContainer position="top-right" autoClose={5000} theme="light" />
      {loading ? (
        <div>
          <Skeleton variant="rounded" width={"98%"} height={"40vh"} />
          <Skeleton variant="rounded" width={"98%"} height={"40vh"} />
        </div>
      ) : (
        <MeetingsBoard meetingData={filteredData} />
      )}
    </>
  );
};

export default Home;

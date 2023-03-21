import filterOptions from "../utils/constants/meetingConstants";

export type FilterOptions = typeof filterOptions[keyof typeof filterOptions];

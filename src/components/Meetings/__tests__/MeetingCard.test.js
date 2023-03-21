import React from "react";
import { render } from "@testing-library/react";
import MeetingCard from "../MeetingCard";

describe("MeetingCard component", () => {
  const mockData = {
    name: "Test Meeting",
    duration: "60min",
    isOnline: "true",
    time: "12:00:00"
  };

  it("should render meeting data correctly", () => {
    const { getByText } = render(<MeetingCard data={mockData} />);
    expect(getByText("Test Meeting")).toBeInTheDocument();
  });
});

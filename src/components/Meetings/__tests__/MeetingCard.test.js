import React from "react";
import { render } from "@testing-library/react";
import MeetingCard from "../MeetingCard";

describe("MeetingCard component", () => {
  const mockData = {
    name: "Test Meeting",
    duration: "60 minutes",
    isOnline: "true",
  };

  it("should render meeting data correctly", () => {
    const { getByText } = render(<MeetingCard data={mockData} />);
    expect(getByText("Test Meeting")).toBeInTheDocument();
    expect(getByText("60 minutes")).toBeInTheDocument();
    expect(getByText("true")).toBeInTheDocument();
  });
});

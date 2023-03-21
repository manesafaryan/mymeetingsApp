import { render } from "@testing-library/react";
import MeetingsBoard from "../MeetingsBoard";

describe("MeetingsBoard", () => {
  it('renders "No Meetings" if meetingData is empty', () => {
    const { getByText } = render(<MeetingsBoard meetingData={[]} />);
    expect(getByText("No Meetings")).toBeInTheDocument();
  });

  it("renders the list of meetings if meetingData is not empty", () => {
    const meetingData = [
      {
        day: "2022-01-01",
        items: [{ time: "09:00", name: "Meeting 1", id: 1, duration: "15min" }],
      },
      {
        day: "2022-01-02",
        items: [{ time: "10:00", name: "Meeting 2", id: 2, duration: "15min" }],
      },
      {
        day: "2022-01-03",
        items: [{ time: "11:00", name: "Meeting 3", id: 3, duration: "15min" }],
      },
    ];
    const { getByText } = render(<MeetingsBoard meetingData={meetingData} />);
    expect(getByText("Meeting 1")).toBeInTheDocument();
    expect(getByText("Meeting 2")).toBeInTheDocument();
    expect(getByText("Meeting 3")).toBeInTheDocument();
  });
});

import groupMeetingDataWithFilter from "./meetingHelpers";

describe("groupMeetingDataWithFilter", () => {
  it("groups meeting data by day and filters by condition", () => {
    const meetingData = {
      "2022-03-22T10:00:00": {
        id: 1,
        name: "Meeting 1",
        duration: 60,
        isOnline: true,
      },
      "2022-03-22T14:00:00": {
        id: 2,
        name: "Meeting 2",
        duration: 30,
        isOnline: false,
      },
      "2022-03-23T09:00:00": {
        id: 3,
        name: "Meeting 3",
        duration: 45,
        isOnline: true,
      },
    };

    const filterCondition = (data, date) => {
      return data.duration > 30;
    };
    const expectedGroupedData = [
      {
        day: "2022-03-23",
        items: [
          {
            id: 3,
            name: "Meeting 3",
            duration: 45,
            isOnline: true,
            day: "2022-03-23",
            time: "09:00:00",
          },
        ],
      },
      {
        day: "2022-03-22",
        items: [
          {
            id: 1,
            name: "Meeting 1",
            duration: 60,
            isOnline: true,
            day: "2022-03-22",
            time: "10:00:00",
          },
        ],
      },
    ];

    const result = groupMeetingDataWithFilter(meetingData, filterCondition);
    expect(result).toEqual(expectedGroupedData);
  });

  it("returns an empty array if data is null or undefined", () => {
    const filterCondition = jest.fn();
    const result1 = groupMeetingDataWithFilter(null, filterCondition);
    const result2 = groupMeetingDataWithFilter(undefined, filterCondition);
    expect(result1).toEqual([]);
    expect(result2).toEqual([]);
  });
});

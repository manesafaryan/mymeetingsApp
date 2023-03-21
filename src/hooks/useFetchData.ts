import { useEffect, useState } from "react";
import { MeetingSchedule } from "../types/apiTypes";
import { getCache, setCache } from "../utils/helpers/localStorageHelpers";

type FetchDataType = [MeetingSchedule | null, string, boolean];

export default function useFetchDataWithCache(
  request: () => Promise<any>,
  dataKey: string,
  cacheAmount: number
): FetchDataType {
  const [data, setData] = useState<MeetingSchedule | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      const cachedData = getCache(dataKey);
      if (cachedData) {
        setData(cachedData);
        setLoading(false);
        return;
      }
      try {
        const response = await request();
        if (!response.status.ok) {
          throw new Error(response.message);
        }
        setData(response.data);
        setCache("meetings", response.data, cacheAmount);
      } catch (error) {
        if (error instanceof Error) {
          setError(
            `We couldn't complete your request due to a ${error.message}.`
          );
        }
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  return [data, error, loading];
}

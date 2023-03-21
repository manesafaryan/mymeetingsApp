import { renderHook } from "@testing-library/react-hooks";
import useFetchDataWithCache from "../useFetchData";
import { getCache, setCache } from "../../utils/helpers/localStorageHelpers";

jest.mock("../../utils/helpers/localStorageHelpers");

describe("useFetchDataWithCache", () => {
  const fakeData = {
    status: { ok: true },
    data: { "2022-03-21T12:00:00": { id: "1234", name: "Meeting 1" } },
  };
  const fakeRequest = jest.fn();
  const dataKey = "meetings";
  const cacheAmount = 60 * 1000;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch data and set cache if data is not already in cache", async () => {
    getCache.mockReturnValueOnce(null);
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchDataWithCache(
        fakeRequest.mockResolvedValue(fakeData),
        dataKey,
        cacheAmount
      )
    );

    expect(result.current[0]).toBeNull();
    expect(result.current[1]).toBe("");
    expect(result.current[2]).toBe(true);

    await waitForNextUpdate();

    expect(result.current[0]).toBe(fakeData.data);
    expect(result.current[1]).toBe("");
    expect(result.current[2]).toBe(false);

    expect(setCache).toHaveBeenCalledWith(dataKey, fakeData.data, cacheAmount);
  });

  it("should fetch data from cache if data is already in cache", async () => {
    getCache.mockReturnValueOnce(fakeData);
    const { result } = renderHook(() =>
      useFetchDataWithCache(fakeRequest, dataKey, cacheAmount)
    );

    expect(result.current[0]).toBe(fakeData);
    expect(result.current[1]).toBe("");
    expect(result.current[2]).toBe(false);

    expect(fakeRequest).not.toHaveBeenCalled();
    expect(setCache).not.toHaveBeenCalled();
  });

  it("should set error message if request fails", async () => {
    const errorMessage = "Network error";
    fakeRequest.mockRejectedValueOnce(new Error(errorMessage));
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchDataWithCache(fakeRequest, dataKey, cacheAmount)
    );

    expect(result.current[0]).toBeNull();
    expect(result.current[1]).toBe("");
    expect(result.current[2]).toBe(true);

    await waitForNextUpdate();

    expect(result.current[0]).toBeNull();
    expect(result.current[1]).toBe(
      `We couldn't complete your request due to a ${errorMessage}.`
    );
    expect(result.current[2]).toBe(false);

    expect(setCache).not.toHaveBeenCalled();
  });
});

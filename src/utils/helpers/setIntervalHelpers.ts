export default function changeIntervalTimer(
  newTimerValue: number,
  intervalId:  NodeJS.Timeout,
  task: () => any
) {
  clearInterval(intervalId);
  if(newTimerValue) {
  startInterval(newTimerValue, task);
  }
}

export function startInterval(timerValue: number, task: () => any) {
  const intervalId = setTimeout(() => {
    const newTime = task();
    changeIntervalTimer(newTime, intervalId, task);
  }, timerValue);
}

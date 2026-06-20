export const getSaleDeadline = () => {
  const deadline = new Date();
  const day = deadline.getDay();
  const daysUntilSunday = (7 - day) % 7;

  deadline.setDate(deadline.getDate() + daysUntilSunday);
  deadline.setHours(23, 59, 59, 999);

  if (deadline.getTime() <= Date.now()) {
    deadline.setDate(deadline.getDate() + 7);
  }

  return deadline.getTime();
};

export const formatCountdown = (milliseconds: number) => {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${days}д ${hours.toString().padStart(2, "0")}ч ${minutes
    .toString()
    .padStart(2, "0")}м ${seconds.toString().padStart(2, "0")}с`;
};

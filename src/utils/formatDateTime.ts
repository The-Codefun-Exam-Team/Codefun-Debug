const DateTimeFormat = new Intl.DateTimeFormat("vi-VN", {
  dateStyle: "short",
  timeStyle: "long",
});

export const formatDateTime = (date: Date) => DateTimeFormat.format(date);

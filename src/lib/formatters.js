export function formatDateTime(value) {
  return new Intl.DateTimeFormat("en-PH", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function formatDayName(value) {
  return new Intl.DateTimeFormat("en-PH", {
    weekday: "short",
  }).format(new Date(value));
}

export function formatClockLabel(value) {
  return new Intl.DateTimeFormat("en-PH", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

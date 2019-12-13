export default function dateTimeFilter(value, format) {
  const options = {};

  if (format.includes("date")) {
    options.day = "2-digit";
    options.month = "2-digit";
    options.year = "numeric";
  }

  if (format.includes("time")) {
    options.hour = "2-digit";
    options.minute = "2-digit";
    options.second = "2-digit";
  }

  return new Intl.DateTimeFormat("uk-UA", options).format(new Date(value));
}

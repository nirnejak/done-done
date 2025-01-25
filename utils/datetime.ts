import { format, formatDistance, startOfDay } from "date-fns"

export const formatToDate = (date: Date): string => {
  return format(date, "dd MMM yyyy")
}

export const formatToDateTime = (date: Date): string => {
  return format(date, "dd MMM yyyy: p")
}

export const fromNow = (date: Date): string => {
  if (date.getDate() === new Date().getDate()) {
    return "today"
  }
  return formatDistance(startOfDay(date), new Date(), {
    addSuffix: true,
  })
}

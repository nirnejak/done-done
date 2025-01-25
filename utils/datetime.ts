import {
  format,
  formatDistance,
  startOfDay,
  differenceInHours,
  endOfDay,
} from "date-fns"

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

  if (date > new Date()) {
    if (differenceInHours(startOfDay(date), new Date()) < 24) {
      return "tomorrow"
    }
    return formatDistance(startOfDay(date), startOfDay(new Date()), {
      addSuffix: true,
    })
  } else {
    if (Math.abs(differenceInHours(endOfDay(date), new Date())) < 24) {
      return "yesterday"
    }
    return formatDistance(startOfDay(date), startOfDay(new Date()), {
      addSuffix: true,
    })
  }
}

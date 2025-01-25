import { format, differenceInDays } from "date-fns"

export const formatToDate = (date: Date): string => {
  return format(date, "dd MMM yyyy")
}

export const formatToDateTime = (date: Date): string => {
  return format(date, "dd MMM yyyy: p")
}

export const fromNow = (date: Date): string => {
  const daysDifference = differenceInDays(date, new Date())

  switch (true) {
    case daysDifference === 0:
      return "Today"
    case daysDifference === 1:
      return "Yesterday"
    case daysDifference === -1:
      return "Tomorrow"
    case daysDifference > 0:
      return `${daysDifference} days ago`
    case daysDifference < 0:
      return `in ${Math.abs(daysDifference)} days`
    default:
      return ""
  }
}

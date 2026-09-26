/* Bolds the metrics in a sentence ("85%", "330,000", "~$100K", "0.25 milliseconds", "2nd"). */
const METRIC =
  /((?<![\w-])[~>$]*\d(?:[\d,]*\d)?(?:\.\d+)?(?:st|nd|rd|th)?(?:\s?(?:%|K\+?|M\+?|\+|milliseconds|ms)(?!\w))?)/g

const YEAR = /^(19|20)\d{2}$/
const COURSE_CODE = /\b[A-Z]{2,}\s$/ // "CMPT 340" is a course, not a metric

export default function Emphasize({ text }: { text: string }) {
  const parts = text.split(METRIC)
  return (
    <>
      {parts.map((part, i) =>
        i % 2 && !YEAR.test(part) && !COURSE_CODE.test(parts[i - 1]) ? <strong key={i}>{part}</strong> : part,
      )}
    </>
  )
}

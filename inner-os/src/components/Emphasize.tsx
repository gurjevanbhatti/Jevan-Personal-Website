/* Bolds the metrics in a sentence ("85%", "330,000", "~$100K", "0.25 milliseconds", "2nd"). */
const METRIC =
  /((?<![\w-])[~>$]*\d(?:[\d,]*\d)?(?:\.\d+)?(?:st|nd|rd|th)?(?:\s?(?:%|K\+?|M\+?|\+|milliseconds|ms)(?!\w))?)/g

export default function Emphasize({ text }: { text: string }) {
  return <>{text.split(METRIC).map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part))}</>
}

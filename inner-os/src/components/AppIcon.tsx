/* App icons are either an emoji or a path to an image in /public. */
export default function AppIcon({ icon, className }: { icon: string; className?: string }) {
  if (icon.startsWith('/')) {
    return <img src={icon} alt="" className={`app-icon-img ${className ?? ''}`} draggable={false} />
  }
  return <span className={className}>{icon}</span>
}

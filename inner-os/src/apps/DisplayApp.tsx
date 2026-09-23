import Wallpaper, { WALLPAPERS, type WallpaperId } from '../components/Wallpaper'

interface Props {
  value: WallpaperId
  onChange: (id: WallpaperId) => void
}

export default function DisplayApp({ value, onChange }: Props) {
  return (
    <div className="display-app">
      <h1 className="page-heading">Display Properties</h1>
      <p className="display-hint">Background</p>

      <div className="display-grid">
        {WALLPAPERS.map((w) => (
          <button
            key={w.id}
            className={`display-swatch ${w.id === value ? 'on' : ''}`}
            onClick={() => onChange(w.id)}
          >
            <div className="display-thumb">
              <Wallpaper variant={w.id} />
            </div>
            <span>{w.name}</span>
          </button>
        ))}
      </div>

      <p className="display-note">
        All of these are drawn in code — no image files, nothing downloaded from anywhere.
        Your choice is remembered on this device.
      </p>
    </div>
  )
}

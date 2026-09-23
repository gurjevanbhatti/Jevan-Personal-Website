export type PageId = 'home' | 'about' | 'experience' | 'projects' | 'contact'

export interface WindowState {
  x: number
  y: number
  width: number
  height: number
  minimized: boolean
  maximized: boolean
}

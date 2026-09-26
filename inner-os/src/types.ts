export type PageId = 'home' | 'about' | 'projects' | 'contact'

export type AppId = 'showcase' | 'vscode' | 'search' | 'terminal' | 'credits'

export interface AppDef {
  id: AppId
  title: string
  icon: string
  width: number
  height: number
}

export interface WindowState {
  id: AppId
  x: number
  y: number
  width: number
  height: number
  z: number
  minimized: boolean
  maximized: boolean
}

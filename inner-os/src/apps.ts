import type { AppDef } from './types'

export const APPS: AppDef[] = [
  { id: 'showcase', title: 'My Showcase', icon: '🖥️', width: 720, height: 520 },
  { id: 'vscode', title: 'VS Code', icon: '/inner-os/vscode.png', width: 940, height: 620 },
  { id: 'search', title: 'Safari', icon: '/inner-os/safari.svg', width: 1000, height: 620 },
  { id: 'terminal', title: 'Terminal', icon: '/inner-os/terminal.svg', width: 700, height: 460 },
  { id: 'credits', title: 'Credits', icon: '/inner-os/credits.png', width: 600, height: 520 },
]

import {getBadgeColor} from './get-badge-color'

export function getBadgePath(coverage: number, label?: string): string {
  const color = getBadgeColor(coverage)
  const encodedPercent = encodeURI('%')
  if (label) {
    const encodedColon = encodeURI(':')
    return `https://img.shields.io/badge/Coverage${encodedColon}${label}-${coverage}${encodedPercent}-${color}.svg`
  } else {
    return `https://img.shields.io/badge/Coverage-${coverage}${encodedPercent}-${color}.svg`
  }
}

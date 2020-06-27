import {info} from '@actions/core'
import {join, dirname} from 'path'
import {existsSync} from 'fs'

export async function getBadgesDir(
  badgesDirectoryInput: string,
  repositoryPath: string,
  coverageSummaryPath: string,
  dirMaker: (path: string) => Promise<void>
): Promise<string> {
  // Reject if invalid path was set in configuration
  if (badgesDirectoryInput !== '') {
    const fullBadgeDir = join(repositoryPath, badgesDirectoryInput)
    if (existsSync(fullBadgeDir)) {
      info(`Using existing badges directory: ${fullBadgeDir}`)
      return Promise.resolve(fullBadgeDir)
    } else {
      return Promise.reject(
        new Error(`Badges directory does not exist: ${fullBadgeDir}`)
      )
    }
  } else {
    // No path was set; try to create one
    const badgesDir = getBadgeDirName(coverageSummaryPath)
    const fullBadgeDir = join(repositoryPath, badgesDir)
    if (existsSync(fullBadgeDir)) {
      info(`Using existing badges directory: ${fullBadgeDir}`)
    } else {
      await dirMaker(fullBadgeDir)
      info(`Created new badges directory: ${fullBadgeDir}`)
    }
    return Promise.resolve(fullBadgeDir)
  }
}

function getBadgeDirName(coverageSummaryPath: string): string {
  let badgesDir = 'badges'
  const summaryDir = dirname(coverageSummaryPath)
  const lastForwardSlashIndex = summaryDir.lastIndexOf('/')
  const lastBackwardSlashIndex = summaryDir.lastIndexOf('\\')
  if (lastForwardSlashIndex !== -1 || lastBackwardSlashIndex !== -1) {
    let lastSummaryDirPart = ''
    lastSummaryDirPart =
      lastForwardSlashIndex !== -1
        ? summaryDir.substr(lastForwardSlashIndex + 1)
        : lastSummaryDirPart
    lastSummaryDirPart =
      lastBackwardSlashIndex !== -1
        ? summaryDir.substr(lastBackwardSlashIndex + 1)
        : lastSummaryDirPart
    badgesDir = join(badgesDir, lastSummaryDirPart)
  }
  return badgesDir
}

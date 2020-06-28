import {info} from '@actions/core'
import {join, dirname} from 'path'
import {existsSync} from 'fs'

export async function getBadgesDir(
  badgesDirectoryInput: string,
  repositoryPath: string,
  coverageSummaryPath: string,
  dirMaker: (path: string) => Promise<void>,
  writeDebugLogs: boolean
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
    const badgesDir = getBadgeDirName(coverageSummaryPath, writeDebugLogs)
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

function getBadgeDirName(
  coverageSummaryPath: string,
  writeDebugLogs: boolean
): string {
  let badgesDir = 'badges'
  const summaryDir = dirname(coverageSummaryPath)
  const lastForwardIdx = summaryDir.lastIndexOf('/')
  const lastBackwardIdx = summaryDir.lastIndexOf('\\')
  const lastIdx =
    lastForwardIdx > lastBackwardIdx ? lastForwardIdx : lastBackwardIdx
  if (lastIdx !== -1) {
    const lastSummaryDirPart = summaryDir.substr(lastIdx + 1)
    if (writeDebugLogs) {
      info(`Library name: ${lastSummaryDirPart}`)
    }
    badgesDir = join(badgesDir, lastSummaryDirPart)
  }
  return badgesDir
}

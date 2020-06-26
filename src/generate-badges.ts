import * as io from '@actions/io'
import {info} from '@actions/core'
import {readSummary} from './read-summary'
import {getBadgePath} from './get-badge-path'
import {download} from './download'
import {persist} from './persist'
import {existsSync} from 'fs'

async function generateBadge(
  coverage: number,
  badgesDirectory: string,
  writeDebugLogs: boolean,
  label?: string
): Promise<void> {
  const url = getBadgePath(coverage, label)
  const badge = await download(url)
  return persist(badge, badgesDirectory, writeDebugLogs, label)
}

export async function generateBadges(
  coverageSummaryPath: string,
  badgesDirectory: string,
  writeDebugLogs: boolean
): Promise<void> {
  return new Promise<void>(async (resolve, reject) => {
    try {
      if (!existsSync(badgesDirectory)) {
        info(
          `Badges directory does not exist, try to create one: ${badgesDirectory}`
        )
        await io.mkdirP(badgesDirectory)
      }
      const summary = await readSummary(coverageSummaryPath)
      const total = summary['total']
      await Promise.all([
        generateBadge(
          total.statements.pct,
          badgesDirectory,
          writeDebugLogs,
          'statements'
        ),
        generateBadge(
          total.branches.pct,
          badgesDirectory,
          writeDebugLogs,
          'branches'
        ),
        generateBadge(
          total.functions.pct,
          badgesDirectory,
          writeDebugLogs,
          'functions'
        ),
        generateBadge(
          total.lines.pct,
          badgesDirectory,
          writeDebugLogs,
          'lines'
        ),
        generateBadge(total.statements.pct, badgesDirectory, writeDebugLogs)
      ])
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}

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
): Promise<string> {
  const url = getBadgePath(coverage, label)
  const badge = await download(url)
  const fileName = label ? `coverage-${label}.svg` : `coverage.svg`
  return persist(badge, badgesDirectory, fileName, writeDebugLogs)
}

export async function generateBadges(
  coverageSummaryPath: string,
  badgesDirectory: string,
  writeDebugLogs: boolean
): Promise<void> {
  try {
    if (!existsSync(badgesDirectory)) {
      return Promise.reject(
        new Error(
          `Badges directory does not exist, try to create one: ${badgesDirectory}`
        )
      )
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
      generateBadge(total.lines.pct, badgesDirectory, writeDebugLogs, 'lines'),
      generateBadge(total.statements.pct, badgesDirectory, writeDebugLogs)
    ])
    return Promise.resolve()
  } catch (error) {
    return Promise.reject(error)
  }
}

import {readSummary} from './read-summary'
import {getBadgePath} from './get-badge-path'
import {download} from './download'
import {persist} from './persist'

async function generateBadge(
  coverage: number,
  badgesDirectory: string,
  label?: string
): Promise<void> {
  const url = getBadgePath(coverage, label)
  const badge = await download(url)
  return persist(badge, badgesDirectory, label)
}

export async function generateBadges(
  coverageSummaryPath: string,
  badgesDirectory: string
): Promise<void> {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const summary = await readSummary(coverageSummaryPath)
      const total = summary['total']
      await Promise.all([
        generateBadge(total.statements.pct, badgesDirectory, 'statements'),
        generateBadge(total.branches.pct, badgesDirectory, 'branches'),
        generateBadge(total.functions.pct, badgesDirectory, 'functions'),
        generateBadge(total.lines.pct, badgesDirectory, 'lines'),
        generateBadge(total.statements.pct, badgesDirectory)
      ])
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}

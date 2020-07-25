import {readFile, existsSync} from 'fs'
import {CoverageSummary} from './models/coverage-summary'
import {CoverageClover} from './models/coverage-clover'
import {toJson} from 'xml2json'

function convertCloverToSummary(clover: CoverageClover): CoverageSummary {
  const metrics = clover.coverage.project.metrics
  const [total, covered, skipped] = [0, 0, 0]

  const get_pct = (kind: string): number =>
    Math.round(
      (parseInt(metrics[`covered${kind}`]) * 100 * 100) /
        parseInt(metrics[kind])
    ) / 100

  // Used in generate-badges.ts
  return {
    total: {
      statements: {
        total,
        covered,
        skipped,
        pct: get_pct('statements')
      },
      branches: {
        total,
        covered,
        skipped,
        pct: get_pct('conditionals')
      },
      functions: {
        total,
        covered,
        skipped,
        pct: get_pct('methods')
      },
      lines: {
        total,
        covered,
        skipped,
        pct: get_pct('elements')
      }
    }
  }
}

export async function readSummary(path: string): Promise<CoverageSummary> {
  return new Promise<CoverageSummary>((resolve, reject) => {
    readFile(path, 'utf8', async (error, data) => {
      if (!existsSync(path)) {
        reject(new Error(`Coverage information path does not exist: ${path}`))
      }
      if (error == null) {
        const isJSON = RegExp('.json$')
        if (isJSON.test(path)) {
          const summary = (await JSON.parse(data)) as CoverageSummary
          resolve(summary)
        } else {
          const clover = toJson(data, {object: true}) as CoverageClover
          const summary = convertCloverToSummary(clover) as CoverageSummary
          resolve(summary)
        }
      } else {
        reject(error)
      }
    })
  })
}

import {readFileSync} from 'fs'
import {CoverageRecord} from './models/coverage-record'

export class CoverageSummary {
  [index: string]: CoverageRecord

  static readCoverageSummary(path: string): CoverageSummary {
    const summaryText = readFileSync(path, 'utf8')
    const summary = JSON.parse(summaryText) as CoverageSummary
    return summary
  }
}

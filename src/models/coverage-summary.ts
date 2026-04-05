import {CoverageRecord} from './coverage-record.js'

export interface CoverageSummary {
  [index: string]: CoverageRecord
}

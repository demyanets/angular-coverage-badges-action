import {CoverageData} from './coverage-data'
export interface CoverageRecord {
  lines: CoverageData
  statements: CoverageData
  functions: CoverageData
  branches: CoverageData
}

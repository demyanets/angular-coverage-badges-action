import {CoverageData} from './coverage-data.js'
export interface CoverageRecord {
  lines: CoverageData
  statements: CoverageData
  functions: CoverageData
  branches: CoverageData
}

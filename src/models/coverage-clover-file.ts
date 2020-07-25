import {CoverageCloverMetrics} from './coverage-clover-metrics'
import {CoverageCloverLinesList} from './coverage-clover-lines-list'

export interface CoverageCloverFile {
  name: string
  path: string
  metrics: CoverageCloverMetrics
  line: CoverageCloverLinesList
}

import {CoverageCloverMetrics} from './coverage-clover-metrics'
import {CoverageCloverFilesList} from './coverage-clover-files-list'

export interface CoverageCloverPackage {
  name: string
  metrics: CoverageCloverMetrics
  file: CoverageCloverFilesList
}

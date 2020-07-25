import {CoverageCloverMetrics} from './coverage-clover-metrics'
import {CoverageCloverPackagesList} from './coverage-clover-packages-list'

export interface CoverageCloverProject {
  timestamp: string
  name: string
  metrics: CoverageCloverMetrics
  package: CoverageCloverPackagesList
}

import {CoverageCloverProject} from './coverage-clover-project'

export interface CoverageClover {
  coverage: {
    generated: string
    clover: string
    project: CoverageCloverProject
  }
}

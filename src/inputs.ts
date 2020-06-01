import * as core from '@actions/core'
import {parseArray} from './parse-array'

export class Inputs {
  readonly coverageSummaryPath: string
  readonly badgesDirectory: string
  readonly protectedBranches: string[]
  readonly prodRun: boolean

  constructor() {
    this.prodRun =
      core.getInput('angular-coverage-badges-ci-run') === 'true' ? false : true
    this.coverageSummaryPath = core.getInput('coverage-summary-path')
    this.badgesDirectory = core.getInput('badges-directory')
    const branches = core.getInput('protected-branches')
    this.protectedBranches = parseArray(branches)
  }
}

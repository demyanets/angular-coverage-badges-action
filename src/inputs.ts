import * as core from '@actions/core'
import {parseArray} from './parse-array'

export class Inputs {
  readonly coverageSummaryPath: string
  readonly badgesDirectory: string
  readonly protectedBranches: string[]

  constructor() {
    this.coverageSummaryPath = core.getInput('coverage-summary-path')
    this.badgesDirectory = core.getInput('badges-directory')
    const branches = core.getInput('protected-branches')
    this.protectedBranches = parseArray(branches)
  }
}

import {readFile, existsSync} from 'fs'
import {CoverageSummary} from './models/coverage-summary'

export async function readSummary(path: string): Promise<CoverageSummary> {
  return new Promise<CoverageSummary>((resolve, reject) => {
    readFile(path, 'utf8', (error, data) => {
      if (!existsSync(path)) {
        reject(new Error(`Coverage information path does not exist: ${path}`))
      }
      if (error == null) {
        const summary = JSON.parse(data) as CoverageSummary
        resolve(summary)
      } else {
        reject(error)
      }
    })
  })
}

import {readFile, existsSync} from 'fs'
import {CoverageSummary} from './models/coverage-summary.js'

export async function readSummary(path: string): Promise<CoverageSummary> {
  return new Promise<CoverageSummary>((resolve, reject) => {
    if (!existsSync(path)) {
      reject(new Error(`Coverage information path does not exist: ${path}`))
      return
    }
    readFile(path, 'utf8', (error, data) => {
      if (error != null) {
        reject(error)
        return
      }
      try {
        const summary = JSON.parse(data) as CoverageSummary
        resolve(summary)
      } catch (e) {
        reject(e)
      }
    })
  })
}

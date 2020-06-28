import {info} from '@actions/core'
import {writeFile} from 'fs'
import path from 'path'

export async function persist(
  content: string,
  directory: string,
  fileName: string,
  writeDebugLogs: boolean
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const fullPath = path.join(directory, fileName)
    if (writeDebugLogs) {
      info(`Writing file: ${fullPath}`)
    }
    writeFile(fullPath, content, error => {
      if (error === null) {
        resolve(fullPath)
      } else {
        reject(error)
      }
    })
  })
}

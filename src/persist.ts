import {writeFile} from 'fs'
import path from 'path'

export async function persist(
  directory: string,
  name: string,
  content: string
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const fileName = `${name}.svg`
    const fullPath = path.join(directory, fileName)
    writeFile(fullPath, content, 'utf8', error => {
      if (error === null) {
        resolve()
      } else {
        reject(error)
      }
    })
  })
}

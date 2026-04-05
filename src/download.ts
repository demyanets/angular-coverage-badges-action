import {get} from 'https'
import {IncomingMessage} from 'http'

async function fetch(url: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    get(url, (result: IncomingMessage) => {
      // Follow redirects
      if (
        result.statusCode &&
        result.statusCode >= 300 &&
        result.statusCode < 400 &&
        result.headers.location
      ) {
        fetch(result.headers.location).then(resolve, reject)
        return
      }

      let file = ''

      // A chunk of data has been received.
      result.on('data', (chunk: Buffer) => {
        file += chunk.toString()
      })

      // The whole response has been received.
      result.on('end', () => resolve(file))
    }).on('error', error => reject(error))
  })
}

export async function download(url: string): Promise<string> {
  return fetch(url)
}

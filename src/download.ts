import {get} from 'https'

export async function download(url: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    get(url, result => {
      let file = ''

      // A chunk of data has been recieved.
      result.on('data', chunk => {
        file += chunk
      })

      // The whole response has been received.
      result.on('end', () => resolve(file))
    }).on('error', error => reject(error))
  })
}

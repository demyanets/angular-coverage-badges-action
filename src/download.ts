import {get} from 'https'

export async function download(url: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    get(url, res => {
      let file = ''

      // A chunk of data has been recieved.
      res.on('data', chunk => {
        file += chunk
      })

      // The whole response has been received.
      res.on('end', () => resolve(file))
    }).on('error', err => reject(err))
  })
}

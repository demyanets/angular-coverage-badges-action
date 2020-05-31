import {download} from '../src/download'

describe('Download tests', () => {
  test('should download', async () => {
    const path =
      'https://upload.wikimedia.org/wikipedia/en/8/80/Wikipedia-logo-v2.svg'
    const logo = await download(path)
    expect(logo).toBeDefined()
    expect(logo.length).toBeGreaterThan(0)
    expect(logo.startsWith('<')).toBeTruthy()
  })

  test('throws on invalid URL', async () => {
    await expect(download('invalid')).rejects.toThrow()
  })
})

export async function parseArray(array: string): Promise<string[]> {
  const json: unknown = JSON.parse(array)
  const result: string[] = []
  for (const item of json as string[]) {
    result.push(item)
  }
  return result
}

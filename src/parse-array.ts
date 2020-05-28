export function parseArray(array: string): string[] {
  const result: string[] = JSON.parse(array) as string[]
  return result
}

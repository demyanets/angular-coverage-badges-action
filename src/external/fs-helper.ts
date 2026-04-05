import * as fs from 'fs'

export function directoryExistsSync(path: string, required?: boolean): boolean {
  if (!path) {
    throw new Error("Arg 'path' must not be empty")
  }

  let stats: fs.Stats
  try {
    stats = fs.statSync(path)
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      (error as NodeJS.ErrnoException).code === 'ENOENT'
    ) {
      if (!required) {
        return false
      }

      throw new Error(`Directory '${path}' does not exist`)
    }

    throw new Error(
      `Encountered an error when checking whether path '${path}' exists: ${error instanceof Error ? error.message : String(error)}`
    )
  }

  if (stats.isDirectory()) {
    return true
  } else if (!required) {
    return false
  }

  throw new Error(`Directory '${path}' does not exist`)
}

export function existsSync(path: string): boolean {
  if (!path) {
    throw new Error("Arg 'path' must not be empty")
  }

  try {
    fs.statSync(path)
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      (error as NodeJS.ErrnoException).code === 'ENOENT'
    ) {
      return false
    }

    throw new Error(
      `Encountered an error when checking whether path '${path}' exists: ${error instanceof Error ? error.message : String(error)}`
    )
  }

  return true
}

export function fileExistsSync(path: string): boolean {
  if (!path) {
    throw new Error("Arg 'path' must not be empty")
  }

  let stats: fs.Stats
  try {
    stats = fs.statSync(path)
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      (error as NodeJS.ErrnoException).code === 'ENOENT'
    ) {
      return false
    }

    throw new Error(
      `Encountered an error when checking whether path '${path}' exists: ${error instanceof Error ? error.message : String(error)}`
    )
  }

  if (!stats.isDirectory()) {
    return true
  }

  return false
}

import {persist} from './persist'

export async function writeGitIgnore(
  path: string,
  writeDebugLogs: boolean
): Promise<string> {
  const content = `# Ignore everything in this directory\n*\n# Except this file, badges and subdirectories\n!.gitignore\n!*.svg\n!/**`
  const fileName = '.gitignore'
  const fullPath = await persist(content, path, fileName, writeDebugLogs)
  return Promise.resolve(fullPath)
}

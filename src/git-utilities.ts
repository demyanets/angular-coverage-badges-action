import {executeCommand} from './execute-command'

export async function getDiffs(dir: string): Promise<[string, string]> {
  const cmd = `git diff @{upstream} --numstat "${dir}"`
  return executeCommand(cmd)
}

export async function commitAsAction(dir: string): Promise<[string, string]> {
  const cmd =
    `git config --local user.email "action@github.com" && ` +
    `git config --local user.name "GitHub Action" && ` +
    `git commit --allow-empty -m "Coverage badge update" "${dir}"`
  return executeCommand(cmd)
}

export async function push(): Promise<[string, string]> {
  const cmd = `git push`
  return executeCommand(cmd)
}

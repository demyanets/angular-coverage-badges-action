import {executeCommand} from './execute-command'

export class GitHelper {
  static async getCurrentBranch(): Promise<[string, string]> {
    const cmd = 'git rev-parse --abbrev-ref HEAD'
    return executeCommand(cmd)
  }

  static async getDiffs(dir: string): Promise<[string, string]> {
    const cmd = `git diff @{upstream} --numstat "${dir}"`
    return executeCommand(cmd)
  }

  static async commitAsAction(dir: string): Promise<[string, string]> {
    const cmd =
      `git config --local user.email "action@github.com" && ` +
      `git config --local user.name "GitHub Action" && ` +
      `git commit --allow-empty -m "Coverage badge update" "${dir}"`
    return executeCommand(cmd)
  }

  static async push(): Promise<[string, string]> {
    const cmd = `git push`
    return executeCommand(cmd)
  }
}

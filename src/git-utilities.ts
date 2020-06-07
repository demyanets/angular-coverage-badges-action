import {executeCommand} from './execute-command'
import {exec, ExecOptions} from '@actions/exec'

export async function getGitVersion(options: ExecOptions): Promise<number> {
  return exec('git', ['--version'], options)
}

export async function getLog(options: ExecOptions): Promise<number> {
  return exec('git', ['log'], options)
}

export async function getDiffs(
  dir: string,
  options: ExecOptions
): Promise<number> {
  const args = ['diff', '@{upstream}', '--numstat', `${dir}`]
  return exec('git', args, options)
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

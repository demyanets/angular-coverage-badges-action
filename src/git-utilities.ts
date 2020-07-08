import {exec, ExecOptions} from '@actions/exec'
import {env} from 'process'
import {join} from 'path'

export async function getGitVersion(options: ExecOptions): Promise<number> {
  return exec('git', ['--version'], options)
}

export function getBranch(ref: string): string {
  // refs/heads/
  const heads = 'refs/heads/'
  if (ref.startsWith(heads)) {
    return ref.substring(heads.length)
  }

  // refs/pull/
  const pull = 'refs/pull/'
  if (ref.startsWith(pull)) {
    return ref.substring(pull.length)
  }
  // refs/tags/
  const tags = 'refs/tags/'
  if (ref.startsWith(tags)) {
    return ref.substring(tags.length)
  }

  // refs/
  const refs = 'refs/'
  if (ref.startsWith(refs)) {
    return ref.substring(refs.length)
  }

  throw new Error(`Unable to parse ref: ${ref}`)
}

export function isBranchPushable(
  ref: string,
  protectedBranches: string[]
): boolean {
  if (ref.startsWith('refs/pull/')) {
    return false
  }

  for (const branch of protectedBranches) {
    if (ref.endsWith(branch)) {
      return false
    }
  }

  return true
}

export async function checkout(
  branch: string,
  options: ExecOptions
): Promise<number> {
  return exec('git', ['checkout', branch], options)
}

export async function getDiffs(
  dir: string,
  options: ExecOptions
): Promise<number> {
  const args = ['diff', '@{upstream}', '--numstat', `${dir}`]
  return exec('git', args, options)
}

export async function add(
  dir: string,
  file: string,
  options: ExecOptions
): Promise<number> {
  const args = ['add', '--all', file]
  return exec('git', args, options)
}

export async function commitAsAction(
  dir: string,
  options: ExecOptions
): Promise<number> {
  let args = ['config', '--local', 'user.email', 'action@github.com']
  await exec('git', args, options)

  args = ['config', '--local', 'user.name', 'GitHub Action']
  await exec('git', args, options)

  args = ['commit', '--allow-empty', '-m', 'Coverage badges update', `${dir}`]
  return exec('git', args, options)
}

export async function push(
  branch: string,
  options: ExecOptions
): Promise<number> {
  // GitHub actions do not support calling other actions cuurently.
  // Use modified script from https://github.com/ad-m/github-push-action directly
  env['PUSH_INPUT_BRANCH'] = branch
  env['PUSH_INPUT_FORCE'] = 'false'
  env['PUSH_INPUT_TAGS'] = 'false'
  env['PUSH_INPUT_DIRECTORY'] = '.'
  const args = [join(__dirname, './push.sh')]
  return exec('bash', args, options)
}

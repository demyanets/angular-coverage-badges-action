import {getCurrentBranch, getDiffs, commitAsAction, push} from './git-utilities'
import {debug} from '@actions/core'

export async function updateRepository(
  badgesDirectory: string,
  protectedBranches: string[]
): Promise<void> {
  let result = await getCurrentBranch()
  const branch = result[0].trim()
  debug(`Branch: ${branch}`)
  if (!protectedBranches.includes(branch) && !branch.startsWith('pull/')) {
    result = await getDiffs(badgesDirectory)
    const matches = (result[0].match(/\.svg/g) || []).length
    debug(`SVG matches: ${matches}`)
    if (matches > 0) {
      result = await commitAsAction(badgesDirectory)
      result = await push()
    }
  }
}

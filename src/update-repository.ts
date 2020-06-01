import {getCurrentBranch, getDiffs, commitAsAction, push} from './git-utilities'

export async function updateRepository(
  badgesDirectory: string,
  protectedBranches: string[],
  ref: string
): Promise<void> {
  let result = await getCurrentBranch()
  const branch = result[0].trim()
  // eslint-disable-next-line no-console
  console.log(`Branch: ${branch}`)
  // eslint-disable-next-line no-console
  console.log(`Ref: ${ref}`)
  if (!protectedBranches.includes(branch) && !branch.startsWith('pull/')) {
    result = await getDiffs(badgesDirectory)
    const matches = (result[0].match(/\.svg/g) || []).length
    // eslint-disable-next-line no-console
    console.log(`SVG matches: ${matches}`)
    if (matches > 0) {
      result = await commitAsAction(badgesDirectory)
      result = await push()
    }
  }
}

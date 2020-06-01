import {getDiffs, commitAsAction, push} from './git-utilities'

export async function updateRepository(
  badgesDirectory: string,
  protectedBranches: string[],
  ref: string
): Promise<void> {
  // eslint-disable-next-line no-console
  console.log(`Ref: ${ref}`)
  let isProtected = false
  for (const branch of protectedBranches) {
    if (ref.endsWith(branch)) {
      isProtected = true
    }
  }
  if (!isProtected && !ref.startsWith('refs/pull/')) {
    let result = await getDiffs(badgesDirectory)
    const matches = (result[0].match(/\.svg/g) || []).length
    // eslint-disable-next-line no-console
    console.log(`SVG matches: ${matches}`)
    if (matches > 0) {
      result = await commitAsAction(badgesDirectory)
      result = await push()
    }
  }
}

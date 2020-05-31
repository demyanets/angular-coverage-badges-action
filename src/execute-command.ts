import {ExecOptions, exec} from 'child_process'
import {debug} from '@actions/core'

export async function executeCommand(
  cmd: string,
  options?: ExecOptions
): Promise<[string, string]> {
  return new Promise<[string, string]>((resolve, reject) => {
    debug(cmd)
    exec(cmd, options, (error, stdout, stderr) => {
      if (error === null) {
        resolve([stdout.toString(), stderr.toString()])
      } else {
        reject(error)
      }
    })
  })
}

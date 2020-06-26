import {info} from '@actions/core'
import {ExecOptions, exec} from 'child_process'

export async function executeCommand(
  cmd: string,
  options?: ExecOptions
): Promise<[string, string]> {
  return new Promise<[string, string]>((resolve, reject) => {
    info(cmd)
    exec(cmd, options, (error, stdout, stderr) => {
      if (error === null) {
        resolve([stdout.toString(), stderr.toString()])
      } else {
        reject(error)
      }
    })
  })
}

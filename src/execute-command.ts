import {ExecOptions, exec} from 'child_process'

export async function executeCommand(
  cmd: string,
  options?: ExecOptions
): Promise<[string, string]> {
  return new Promise<[string, string]>((resolve, reject) => {
    // eslint-disable-next-line no-console
    console.log(cmd)
    exec(cmd, options, (error, stdout, stderr) => {
      if (error === null) {
        resolve([stdout.toString(), stderr.toString()])
      } else {
        reject(error)
      }
    })
  })
}

import {ExecOptions} from '@actions/exec'

export class ExecOptionsStub {
  readonly options: ExecOptions
  private _stdout = ''
  private _stderr = ''
  private _stdline = ''
  private _stdoutCalled = false
  private _stderrCalled = false
  private _stdlineCalled = false

  get stdout(): string {
    return this._stdout
  }

  get stderr(): string {
    return this._stderr
  }

  get stdline(): string {
    return this._stdline
  }

  get stdoutCalled(): boolean {
    return this._stdoutCalled
  }

  get stderrCalled(): boolean {
    return this._stderrCalled
  }

  get stdlineCalled(): boolean {
    return this._stdlineCalled
  }

  constructor(inputText?: string) {
    const inputBuffer = inputText ? Buffer.from(inputText) : undefined
    this.options = {
      listeners: {
        stdout: (data: Buffer) => {
          this._stdout += data.toString()
          this._stdoutCalled = true
        },
        stderr: (data: Buffer) => {
          this._stderr += data.toString()
          this._stderrCalled = true
        },
        stdline: (data: string) => {
          this._stdline = data
          this._stdlineCalled = true
        }
      },
      input: inputBuffer
    }
  }
}

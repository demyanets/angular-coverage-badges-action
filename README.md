[![build-test](https://github.com/demyanets/angular-coverage-badges-action/workflows/build-test/badge.svg)](https://github.com/demyanets/angular-coverage-badges-action/actions?query=workflow%3Abuild-test)

# Angular Coverage Badges Github Action

This GitHub Action converts your Angular test suite's LCOV coverage data into the set of coverage badges that you can use in your README.md file locally. There is no need to create an accout or give your coverage data to any external service provider like [codecov.io](https://www.codecov.io) or [coveralls.io](https://coveralls.io/) for analysis.

When running with Angular repositories containing multiple projects, Angular Coverage Badges Github Action is able to generate badges for every single project preseving the structure of your solution.

## Usage

The action's step needs to run after your test suite has outputted an LCOV file. Angular comes with Karma test runner already preconfigured to generate the LCOV file. Please make sure that the 'coverageIstanbulReporter' in 'karma.config.js' contains the 'json-summary' reporter:
```JavaScript
coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../../coverage'),
      reports: ['html', 'lcovonly', 'text-summary', **'json-summary'**],
      fixWebpackSourcePaths: true
    },
```

### Inputs:

| Name                  | Requirement | Description |
| --------------------- | ----------- | ----------- |
| `coverage-summary-path` | _optional_ | Path to a "coverage-summary.json" file. Default: `./coverage/coverage-summary.json`. |
| `badges-directory` | _optional_ | Writes the coverage badges to the given directory. Default: `./badges" for root "src` project or `./badges/<library-name>` for a library. |
| `protected-branches` | _optional_ | List of protected branches that require review for commit and should be excluded from badge generation therefore. Default: `[]`. |
| `write-debug-logs` | _optional_ | Writes extra debug logs to console if set to "true". Default: ``. |

### Standard Example:

* This example assumes you're building your Angular project using the command `npm run test:ci`, demo here: [demyanets/stslib](https://github.com/demyanets/stslib/blob/feature/coverage-badges/.github/workflows/test.yml)

```yaml
# This workflow will do a clean install of node dependencies and run tests
name: test

on:
  push:
    branches:
      - '**'

  pull_request:
    branches:
      - master
      - develop

jobs:
  test:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [12.x]

    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v1
      with:
        node-version: ${{ matrix.node-version }}

    - run: npm ci
    - run: npm run test:ci

    # Coverage badges will be updated on any branch except protected
    # branches 'develop' and 'master' and on a pull requests
    - name: Test angular action
      uses:  demyanets/angular-coverage-badges-action@master
      with:
        coverage-summary-path: coverage/stslib/coverage-summary.json
        protected-branches: '["master",  "develop"]'
```

## Troubleshooting:

### Angular Coverage Badges Github Action fails on protected branches

Ensure that you configured your protected branches completely:

```yaml
protected-branches: '["master",  "develop"]'
```

## [MIT License](LICENSE.md)

## [Contributing](CONTRIBUTING.md)

[![build-test](https://github.com/emibcn/clover-coverage-badges-action/workflows/build-test/badge.svg)](https://github.com/emibcn/clover-coverage-badges-action/actions?query=workflow%3Abuild-test)

# Clover Coverage Badges Github Action

This GitHub Action converts your `coverage-summary.json` or `clover.xml` test suite's LCOV coverage data into the set of coverage badges that you can use in your README.md file locally. There is no need to create an accout or give your coverage data to any external service provider for analysis.

Clover Coverage Badges Github Action is not only generating the badges but also commits them into the local repository automatically.

When running with Clover repositories containing multiple projects, Clover Coverage Badges Github Action is able to generate badges for every single project preseving the structure of your solution.

## Usage

The action's step needs to run after your test suite has outputted an LCOV file. Angular comes with Karma test runner already preconfigured to generate the LCOV file. Please make sure that the `coverageIstanbulReporter` in `karma.config.js` contains the `json-summary` reporter:
```JavaScript
coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../../coverage'),
      reports: ['html', 'lcovonly', 'text-summary', 'json-summary'],
      fixWebpackSourcePaths: true
    },
```

### Inputs:

| Name                  | Requirement | Description |
| --------------------- | ----------- | ----------- |
| `github_token` | _required_ | Token for the repository. Can be passed in using ${{ secrets.GITHUB_TOKEN }}. |
| `coverage-summary-path` | _optional_ | Path to a "coverage-summary.json" or "clover.xml" file. Default: `./coverage/clover.xml`. |
| `badges-directory` | _optional_ | Writes coverage badges to the given directory. Default: `./badges` for root "src" project or `./badges/<library-name>` for a library. |
| `protected-branches` | _optional_ | List of the protected branches that require review for commit and should be excluded from the badge generation therefore. Default: `[]`. |
| `write-debug-logs` | _optional_ | Writes extra debug logs to console if set to "true". Default: `<empty>`. |

### Standard Example:

This example assumes you're building your Angular project using the command `npm run test:ci` or some other method to obtain a `clover.xml` file, demo here: [demyanets/stslib](https://github.com/demyanets/stslib/blob/feature/coverage-badges/.github/workflows/test.yml)

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
      uses:  emibcn/clover-coverage-badges-action@v1
      with:
        coverage-clover-path: coverage/stslib/clover.xml
        protected-branches: '["master",  "develop"]'
```

## Troubleshooting:

### Action fails on protected branches

Ensure that you configured your protected branches completely:

```yaml
protected-branches: '["master",  "develop"]'
```
### Badges get generated only for one project

Make sure that you added this action multiple times for every single `coverage-summary.json` file. 
The action will respect project structure and will automatically generate the badges in separate directories. 


## No affiliation with GitHub Inc.

GitHub are registered trademarks of GitHub, Inc. GitHub name used in this project are for identification purposes only. The project is not associated in any way with GitHub Inc. and is not an official solution of GitHub Inc. It was made available in order to facilitate the use of the site GitHub.

### [MIT License](LICENSE.md)

### [Contributing](CONTRIBUTING.md)

module.exports =
/******/ (function(modules, runtime) { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	__webpack_require__.ab = __dirname + "/";
/******/
/******/ 	// the startup function
/******/ 	function startup() {
/******/ 		// Load entry module and return exports
/******/ 		return __webpack_require__(198);
/******/ 	};
/******/
/******/ 	// run startup
/******/ 	return startup();
/******/ })
/************************************************************************/
/******/ ({

/***/ 33:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeCommand = void 0;
const child_process_1 = __webpack_require__(129);
const core_1 = __webpack_require__(470);
function executeCommand(cmd, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            core_1.debug(cmd);
            child_process_1.exec(cmd, options, (error, stdout, stderr) => {
                if (error === null) {
                    resolve([stdout.toString(), stderr.toString()]);
                }
                else {
                    reject(error);
                }
            });
        });
    });
}
exports.executeCommand = executeCommand;


/***/ }),

/***/ 82:
/***/ (function(__unusedmodule, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.parseArray = void 0;
function parseArray(array) {
    const result = JSON.parse(array);
    return result;
}
exports.parseArray = parseArray;


/***/ }),

/***/ 87:
/***/ (function(module) {

module.exports = require("os");

/***/ }),

/***/ 116:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getBadgePath = void 0;
const get_badge_color_1 = __webpack_require__(808);
function getBadgePath(coverage, label) {
    const color = get_badge_color_1.getBadgeColor(coverage);
    const encodedPercent = encodeURI('%');
    if (label) {
        const encodedColon = encodeURI(':');
        return `https://img.shields.io/badge/Coverage${encodedColon}${label}-${coverage}${encodedPercent}-${color}.svg`;
    }
    else {
        return `https://img.shields.io/badge/Coverage-${coverage}${encodedPercent}-${color}.svg`;
    }
}
exports.getBadgePath = getBadgePath;


/***/ }),

/***/ 129:
/***/ (function(module) {

module.exports = require("child_process");

/***/ }),

/***/ 198:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __webpack_require__(470);
const inputs_1 = __webpack_require__(842);
const generate_badges_1 = __webpack_require__(798);
const update_repository_1 = __webpack_require__(395);
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const inputs = new inputs_1.Inputs();
            core_1.debug(`coverageSummaryPath: ${inputs.coverageSummaryPath}`);
            core_1.debug(`badgesDirectory: ${inputs.badgesDirectory}`);
            yield generate_badges_1.generateBadges(inputs.coverageSummaryPath, inputs.badgesDirectory);
            yield update_repository_1.updateRepository(inputs.badgesDirectory, inputs.protectedBranches);
        }
        catch (error) {
            core_1.setFailed(error.message);
        }
    });
}
run();


/***/ }),

/***/ 211:
/***/ (function(module) {

module.exports = require("https");

/***/ }),

/***/ 357:
/***/ (function(module) {

module.exports = require("assert");

/***/ }),

/***/ 395:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRepository = void 0;
const git_utilities_1 = __webpack_require__(741);
const core_1 = __webpack_require__(470);
function updateRepository(badgesDirectory, protectedBranches) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield git_utilities_1.getCurrentBranch();
        const branch = result[0].trim();
        core_1.debug(`Branch: ${branch}`);
        if (!protectedBranches.includes(branch) && !branch.startsWith('pull/')) {
            result = yield git_utilities_1.getDiffs(badgesDirectory);
            const matches = (result[0].match(/\.svg/g) || []).length;
            core_1.debug(`SVG matches: ${matches}`);
            if (matches > 0) {
                result = yield git_utilities_1.commitAsAction(badgesDirectory);
                result = yield git_utilities_1.push();
            }
        }
    });
}
exports.updateRepository = updateRepository;


/***/ }),

/***/ 431:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const os = __webpack_require__(87);
/**
 * Commands
 *
 * Command Format:
 *   ##[name key=value;key=value]message
 *
 * Examples:
 *   ##[warning]This is the user warning message
 *   ##[set-secret name=mypassword]definitelyNotAPassword!
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        // safely append the val - avoid blowing up when attempting to
                        // call .replace() if message is not a string for some reason
                        cmdStr += `${key}=${escape(`${val || ''}`)},`;
                    }
                }
            }
        }
        cmdStr += CMD_STRING;
        // safely append the message - avoid blowing up when attempting to
        // call .replace() if message is not a string for some reason
        const message = `${this.message || ''}`;
        cmdStr += escapeData(message);
        return cmdStr;
    }
}
function escapeData(s) {
    return s.replace(/\r/g, '%0D').replace(/\n/g, '%0A');
}
function escape(s) {
    return s
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/]/g, '%5D')
        .replace(/;/g, '%3B');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 458:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.persist = void 0;
const fs_1 = __webpack_require__(747);
const path_1 = __importDefault(__webpack_require__(622));
function persist(content, directory, label) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const fileName = label ? `coverage-${label}.svg` : `coverage.svg`;
            const fullPath = path_1.default.join(directory, fileName);
            fs_1.writeFile(fullPath, content, error => {
                if (error === null) {
                    resolve();
                }
                else {
                    reject(error);
                }
            });
        });
    });
}
exports.persist = persist;


/***/ }),

/***/ 470:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __webpack_require__(431);
const os = __webpack_require__(87);
const path = __webpack_require__(622);
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable
 */
function exportVariable(name, val) {
    process.env[name] = val;
    command_1.issueCommand('set-env', { name }, val);
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    command_1.issueCommand('add-path', {}, inputPath);
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.  The value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store
 */
function setOutput(name, value) {
    command_1.issueCommand('set-output', { name }, value);
}
exports.setOutput = setOutput;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message
 */
function error(message) {
    command_1.issue('error', message);
}
exports.error = error;
/**
 * Adds an warning issue
 * @param message warning issue message
 */
function warning(message) {
    command_1.issue('warning', message);
}
exports.warning = warning;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store
 */
function saveState(name, value) {
    command_1.issueCommand('save-state', { name }, value);
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 622:
/***/ (function(module) {

module.exports = require("path");

/***/ }),

/***/ 741:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.push = exports.commitAsAction = exports.getDiffs = exports.getCurrentBranch = void 0;
const execute_command_1 = __webpack_require__(33);
function getCurrentBranch() {
    return __awaiter(this, void 0, void 0, function* () {
        const cmd = 'git rev-parse --abbrev-ref HEAD';
        return execute_command_1.executeCommand(cmd);
    });
}
exports.getCurrentBranch = getCurrentBranch;
function getDiffs(dir) {
    return __awaiter(this, void 0, void 0, function* () {
        const cmd = `git diff @{upstream} --numstat "${dir}"`;
        return execute_command_1.executeCommand(cmd);
    });
}
exports.getDiffs = getDiffs;
function commitAsAction(dir) {
    return __awaiter(this, void 0, void 0, function* () {
        const cmd = `git config --local user.email "action@github.com" && ` +
            `git config --local user.name "GitHub Action" && ` +
            `git commit --allow-empty -m "Coverage badge update" "${dir}"`;
        return execute_command_1.executeCommand(cmd);
    });
}
exports.commitAsAction = commitAsAction;
function push() {
    return __awaiter(this, void 0, void 0, function* () {
        const cmd = `git push`;
        return execute_command_1.executeCommand(cmd);
    });
}
exports.push = push;


/***/ }),

/***/ 747:
/***/ (function(module) {

module.exports = require("fs");

/***/ }),

/***/ 754:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readSummary = void 0;
const fs_1 = __webpack_require__(747);
function readSummary(path) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            fs_1.readFile(path, 'utf8', (error, data) => {
                if (!fs_1.existsSync(path)) {
                    reject(new Error(`Coverage information path does not exist: ${path}`));
                }
                if (error == null) {
                    const summary = JSON.parse(data);
                    resolve(summary);
                }
                else {
                    reject(error);
                }
            });
        });
    });
}
exports.readSummary = readSummary;


/***/ }),

/***/ 798:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateBadges = void 0;
const read_summary_1 = __webpack_require__(754);
const get_badge_path_1 = __webpack_require__(116);
const download_1 = __webpack_require__(851);
const persist_1 = __webpack_require__(458);
const fs_1 = __webpack_require__(747);
function generateBadge(coverage, badgesDirectory, label) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = get_badge_path_1.getBadgePath(coverage, label);
        const badge = yield download_1.download(url);
        return persist_1.persist(badge, badgesDirectory, label);
    });
}
function generateBadges(coverageSummaryPath, badgesDirectory) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!fs_1.existsSync(badgesDirectory)) {
                    reject(new Error(`Badges directory does not exist: ${badgesDirectory}`));
                }
                const summary = yield read_summary_1.readSummary(coverageSummaryPath);
                const total = summary['total'];
                yield Promise.all([
                    generateBadge(total.statements.pct, badgesDirectory, 'statements'),
                    generateBadge(total.branches.pct, badgesDirectory, 'branches'),
                    generateBadge(total.functions.pct, badgesDirectory, 'functions'),
                    generateBadge(total.lines.pct, badgesDirectory, 'lines'),
                    generateBadge(total.statements.pct, badgesDirectory)
                ]);
                resolve();
            }
            catch (error) {
                reject(error);
            }
        }));
    });
}
exports.generateBadges = generateBadges;


/***/ }),

/***/ 808:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBadgeColor = void 0;
const assert_1 = __importDefault(__webpack_require__(357));
function getBadgeColor(coverage, thresholdRed = 80, thresholdYellow = 90) {
    assert_1.default(coverage >= 0, 'Coverage shall be greater or equal 0');
    assert_1.default(coverage <= 100, 'Coverage shall be lesser or equal 100');
    assert_1.default(thresholdRed > 0, 'Red threshold shall be greater than 0');
    assert_1.default(thresholdRed < 100, 'Red threshold shall be lesser than 100');
    assert_1.default(thresholdYellow > 0, 'Yellow threshold shall be greater than 0');
    assert_1.default(thresholdYellow < 100, 'Yellow threshold shall be lesser than 100');
    assert_1.default(thresholdYellow > thresholdRed, 'Yellow threshold shall be greater than red threshold');
    if (coverage < thresholdRed)
        return 'red';
    if (coverage < thresholdYellow)
        return 'yellow';
    return 'brightgreen';
}
exports.getBadgeColor = getBadgeColor;


/***/ }),

/***/ 842:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inputs = void 0;
const core = __importStar(__webpack_require__(470));
const parse_array_1 = __webpack_require__(82);
class Inputs {
    constructor() {
        this.coverageSummaryPath = core.getInput('coverage-summary-path');
        this.badgesDirectory = core.getInput('badges-directory');
        const branches = core.getInput('protected-branches');
        this.protectedBranches = parse_array_1.parseArray(branches);
    }
}
exports.Inputs = Inputs;


/***/ }),

/***/ 851:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.download = void 0;
const https_1 = __webpack_require__(211);
function download(url) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            https_1.get(url, result => {
                let file = '';
                // A chunk of data has been recieved.
                result.on('data', chunk => {
                    file += chunk;
                });
                // The whole response has been received.
                result.on('end', () => resolve(file));
            }).on('error', error => reject(error));
        });
    });
}
exports.download = download;


/***/ })

/******/ });
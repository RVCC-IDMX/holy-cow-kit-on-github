var balloon = require("./lib/balloon");
var cows = require("./lib/cows");
var faces = require("./lib/faces");

/**
 * @param options
 * ## Face :
 * Either choose a mode (set the value as true) **_or_**
 * set your own defined eyes and tongue to `e` and `T`.
 * - ### `e` : eyes
 * - ### `T` : tongue
 * 
 * ## Cow :
 * Either specify a cow name (e.g. "fox") **_or_**
 * set the value of `r` to true which selects a random cow.
 * - ### `r` : random selection
 * - ### `f` : cow name - from `cows` folder
 * 
 * ## Modes :
 * Modes are just ready-to-use faces, here's their list:
 * - #### `b` : borg
 * - #### `d` : dead      
 * - #### `g` : greedy
 * - #### `p` : paranoia
 * - #### `s` : stoned
 * - #### `t` : tired
 * - #### `w` : wired
 * - #### `y` : youthful
 * 
 * @example
 * ```
 * // custom cow and face
 * cowsay.say({
 *     text: 'Hello world!',
 *     e: '^^', // eyes
 *     T: 'U ', // tongue
 *     f: 'USA' // name of the cow from `cows` folder
 * })
 * 
 * // using a random cow
 * cowsay.say({
 *     text: 'Hello world!',
 *     e: 'xx', // eyes
 *     r: true, // random mode - use a random cow.
 * })
 * 
 * // using a mode
 * cowsay.say({
 *     text: 'Hello world!',
 *     y: true, // using y mode - youthful mode
 * })
 * ```
 * 
 * @returns {string} compiled cow
 */
exports.say = function (options) {
	return doIt(options, true).full;
};

/**
 * @param options
 * ## Face :
 * Either choose a mode (set the value as true) **_or_**
 * set your own defined eyes and tongue to `e` and `T`.
 * - ### `e` : eyes
 * - ### `T` : tongue
 * 
 * ## Cow :
 * Either specify a cow name (e.g. "fox") **_or_**
 * set the value of `r` to true which selects a random cow.
 * - ### `r` : random selection
 * - ### `f` : cow name - from `cows` folder
 * 
 * ## Modes :
 * Modes are just ready-to-use faces, here's their list:
 * - #### `b` : borg
 * - #### `d` : dead      
 * - #### `g` : greedy
 * - #### `p` : paranoia
 * - #### `s` : stoned
 * - #### `t` : tired
 * - #### `w` : wired
 * - #### `y` : youthful
 * 
 * @example
 * ```
 * // custom cow and face
 * cowsay.think({
 *     text: 'Hello world!',
 *     e: '^^', // eyes
 *     T: 'U ', // tongue
 *     f: 'USA' // name of the cow from `cows` folder
 * })
 * 
 * // using a random cow
 * cowsay.think({
 *     text: 'Hello world!',
 *     e: 'xx', // eyes
 *     r: true, // random mode - use a random cow.
 * })
 * 
 * // using a mode
 * cowsay.think({
 *     text: 'Hello world!',
 *     y: true, // using y mode - youthful mode
 * })
 * ```
 * 
 * @returns {string} compiled cow
 */
exports.think = function (options) {
	return doIt(options, false).full;
};

/**
 * @example
 * ```
 * function get_cows(error, cow_names) {
 *    if (error) {
 *        console.log(error);
 *    }
 *    else if (cow_names) {
 *        console.log(`Number of cows available: ${cow_names.length}`);
 *    }
 *  }
 * 
 * cowsay.list(get_cows);
 * ```
 * @param callback
 * @returns {Promise} promise
 */
exports.list = cows.list;

/**
 * @param options
 * @returns {ICowOutput} structured output with text, bubble, cow, and full
 */
exports.sayJson = function (options) {
	return doIt(options, true);
};

/**
 * @param options
 * @returns {ICowOutput} structured output with text, bubble, cow, and full
 */
exports.thinkJson = function (options) {
	return doIt(options, false);
};

function doIt (options, sayAloud) {
	var cowFile;

	if (options.r) {
		var cowsList = cows.listSync();
		cowFile = cowsList[Math.floor(Math.random() * cowsList.length)];
	} else {
		cowFile = options.f || "default";
	}

	var cowTemplate = cows.get(cowFile);
	var face = faces(options);
	face.thoughts = sayAloud ? "\\" : "o";

	var action = sayAloud ? "say" : "think";
	var text = options.text || options._.join(" ");
	var bubble = balloon[action](text, options.n ? null : options.W);
	var cowText = cowTemplate(face);
	var full = bubble + "\n" + cowText;

	return { text: text, bubble: bubble, cow: cowText, full: full };
}

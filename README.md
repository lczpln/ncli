# NCLI

A command-line interface utility that provides various methods for interacting with the terminal.

## Install

```js
yarn add @lczpln/ncli
```

or

```js
npm install @lczpln/ncli --save
```

## Usage

Initializes the `NCLI` class and sets up the required dependencies.

```js
import ncli from "@lczpln/ncli";

const ncli = new NCLI();
```

### Parameters

- `titleColor`: the color to use for the title text (default: "blue").
- `subtitleColor`: the color to use for the subtitle text (default: "whiteBright").
- `msgColor`: the color to use for message text (default: "whiteBright").
- `optionsColor`: the color to use for options text (default: "green").
- `inputCharColor`: the color to use for input characters (default: "blue").

All the parameters are optional and have default values.
You can check all colors available here: https://github.com/chalk/chalk#colors

## Methods

### `getUserInput(options)`

Asynchronously prompts the user for input and returns the user's choice.

#### Example

```js
const ncli = new NCLI();

const options = [
  { title: "Apple", action: (input) => input },
  { title: "Banana", action: (input) => input },
  { title: "Orange", action: (input) => input },
  { title: "Watermelon", action: (input) => input },
];

const fruitChosen = await ncli.getUserInput({
  title: "FRUIT SELECTION",
  subtitle: "Select your favority fruit",
  options,
});

const fruit = options[fruitChosen - 1].title;

// > 2

console.log(fruit); // Banana
```

or

```js
const ncli = new NCLI();

const name = await ncli.getUserInput({
  title: "NAME SELECTION",
  subtitle: "What's your name?",
  action: (input) => input,
});

// > World

console.log("Hello " + name + "!"); // Hello World!
```

#### Parameters

- `options`: an object that contains the following properties:
  - `title`: the title to be displayed on the terminal.
  - `subtitle`: the subtitle to be displayed on the terminal.
  - `image`: an object that contains the following properties:
    - `path`: the path to the image file.
    - `process`: a boolean flag indicating whether the image should be processed or not.
    - `width`: width of the image in terminal.
    - `height`: height of the image in terminal.
    - `preserveAspectRatio`: a flag indicating whether the aspect ratio of the image should be preserved or not.
  - `action`: a function that will be called after the user input is received.
  - `error`: a boolean flag indicating whether an error message should be displayed.
  - `options`: an array of objects that represent the options that the user can choose from.
    - `title`: options title to be displayed like this: 1) myTitle
    - `action` action to be dispatched after user input a valid option number
  - `noClear`: a boolean flag indicating whether the terminal should be cleared before displaying the prompt.

The `_clear` is used to clear the terminal if noClear is false.

## `log()`

Displays a message on the terminal.

### Example

```js
ncli.log({ msg: "Searching for user" });

//await searchUsers()
```

### Parameters

- `title`: the title to display before the message (default: null)
- `msg`: the message to be displayed on the terminal (required)
- `color`: the color to use for the message text (default: "whiteBright").
- `noClear`: boolean value indicating if the terminal should be cleared before displaying the message (default: false).

The `_clear` is used to clear the terminal if noClear is false.

## `waitForKey(message)`

Asynchronously waits for the user to press any key on the keyboard.

#### Example

```js
await ncli.waitForKey({});
```

or

```js
await ncli.waitForKey({ msg: "My awesome msg! Please press enter (:" });
```

### Parameters

- `title`: the title to display before the message (default: null)
- `msg`: the message to be displayed on the terminal (required)
- `color`: the color to use for the message text (default: "whiteBright").
- `noClear`: boolean value indicating if the terminal should be cleared before displaying the message (default: false).

The `_clear` is used to clear the terminal if noClear is false.

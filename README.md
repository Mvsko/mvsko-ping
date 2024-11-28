# mvsko-ping

A network diagnostic tool based on Node.js, designed to test TCP connectivity with customizable options such as color-coded output and timeout configuration.

---

## Features

- **TCP Connectivity Testing**: Perform TCP ping tests to assess latency and host availability.
- **Customizable Output**: Change the output colors for better readability.
- **Timeout Configuration**: Set a timeout (between 500ms and 5000ms) for each ping.
- **Dynamic Commands**: Access options such as `--help`, `--color`, and more.

---

## Installation and Usage

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/Mvsko/mvsko-ping

# Navigate to the folder
$ cd mvsko-ping

# Install dependencies
$ npm install

# Run the application
$ node main.js
```

### Main Commands

- **`help`**: Displays help and available options.
- **`--color [red|green|blue|...]`**: Sets the output color.
- **`--timeout [ms]`**: Configures the timeout (between 500ms and 5000ms).
- **`clear` or `cls`**: Clears the console.

---

## Download

You can [download](https://github.com/Mvsko/mvsko-ping) the application for Windows, macOS, and Linux.

---

## Credits

This project uses the following open source libraries and tools:

- [Node.js](https://nodejs.org/)
- [fs](https://www.npmjs.com/package/fs)
- [quick.db](https://www.npmjs.com/package/quick.db)
- [cli-color](https://www.npmjs.com/package/cli-color)
- [readline](https://nodejs.org/api/readline.html)
- [os](https://nodejs.org/api/os.html)
- [node-bash-title](https://www.npmjs.com/package/node-bash-title)

---

> GitHub [@Mvsko](https://github.com/Mvsko)

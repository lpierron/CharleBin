# CharleBin

Shared Paste Text, TP for IUT CharleMagne

## Overview

CharleBin is a web application that allows users to share and paste text. It is intended for use as a teaching project for IUT CharleMagne.

## Features

- Paste and share text
- Simple and intuitive interface
- Secure and private text sharing

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/lpierron/CharleBin.git
   ```
2. Navigate to the project directory:
   ```bash
   cd CharleBin
   ```
3. Install dependencies:
   ```bash
   composer install
   npm install
   ```

## Usage

1. Start the PHP server:
   ```bash
   php -S localhost:8000
   ```
2. Open your browser and navigate to `http://localhost:8000`.

## Running Tests

To run all unit tests, use the following Docker command:
```bash
docker run --rm --read-only -v ~/PrivateBin:/srv:ro privatebin/unit-testing
```

For detailed instructions on running PHP and JavaScript tests, refer to the `tst/README.md` file.

## Contributing

We welcome contributions! Please see the [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines on how to contribute to this project.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

# react-twist-starter

Simple starter repo for React Twist that contains support for the following:

* CSS and LESS imports
* JSON and JSON5 imports
* Common image imports

Other features:

* Vendor code splitting

## Usage

Clone or download this repository, and then run `npm install`. This will download and install the necessary dependencies.

There are several npm scripts you can use:

* `npm start` (aliases: `serve`, `watch`) – watches the project for changes, and reloads when detected. Default address is [localhost:8080](http://localhost:8080).
* `npm build` – builds the project in `./build`
* `npm build:prod` – builds a production version in `./build`
* `npm build:test` – builds a test version in `./build`

## Coding your project

You should make changes to the `./src` directory. The entry point is defined as `./src/Main.jsx`.

## Linting your project

This project comes with `eslint` configured to use `eslint:recommended` and Twist's recommended settings, as described on https://github.com/adobe/eslint-plugin-twist#eslintrc-sample-configuration.

You can run the lint process using:

```bash
npm run lint
```

## Contributing

If you would like to contribute to this project, check out our [contribution guidelines](CONTRIBUTING.md)!

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.2.0] - 2024-02-26

### Changed

- Update @typescript-eslint/parser to v7

## [3.1.0] - 2023-10-15

### Changed

- Fix esm export paths in config

## [3.0.0] - 2023-08-30

### Changed

- [BREAKING] Minimal required node.js version is v16
- [BREAKING] Update @typescript-eslint/parser to v6 🎉

## [2.3.0] - 2023-03-17

### Changed

- Bump deps to fix security vulnerabilities

## [2.2.0] - 2023-03-17

### Changed

- Bump peer dependencies

## [2.1.0] - 2021-11-23

### Changed

- Bump deps to fix security vulnerabilities

## [2.0.0] - 2021-10-15

### Changed

- [BREAKING] Drop support for node v10
- [BREAKING] Update to eslint v8 🎉

## [1.8.0] - 2021-08-17

### Changed

- Update super old `@typescript-eslint/experimental-utils` dependency
- Update dev dependencies

## [1.7.0] - 2021-06-18

### Changed

- Update dependencies with security issues
- Update dev dependencies

## [1.6.0] - 2021-04-02

### Changed

- Update dependencies with security issues
- Update `package.json` `export` field

## [1.5.0] - 2020-09-22

### Changed

- Use `^` to pin dependencies

## [1.4.0] - 2020-09-22

### Changed

- Support typescript v4 and @typescript-eslint/parser v4 as peer deps

## [1.3.0] - 2020-07-16

### Changed

- Bump @typescript-eslint/parser to v3.5.0

## [1.2.0] - 2020-05-24

### Added

- Explicitly list supported node versions

### Fixed

- Node conditional exports paths

## [1.1.0] - 2020-05-24

### Fixed

- Add explicit dependency of json-schema for @typescript-eslint/experimental-utils

## [1.0.2] - 2020-05-22

### Changed

- Update build artifacts

## [1.0.1] - 2020-05-22

### Fixed

- Fix hanging Publish github action

## [1.0.0] - 2020-05-22

### Changed

- Rewrite to typescript with strong types
- Leverage helpers and types from @typescript-eslint/experimental-utils
- Run autofix tests with ESLint Class rather than spawn a child process for eslint runner
- Heavy refactoring and remove code paths that were never taken
- Update ESLint config
- Update to ESLint v7.0.0
- Update dependencies

### Added

- Follow semver
- Rollup bundler

## [0.10.0] - 2020-05-21

### Added

- Add ESLint 7 to peerDependencies

## [0.9.0] - 2020-05-19

### Added

- New option to `interface` rule: `requiredFirst` - if `true`, enforce optional properties to come after required ones.

## [0.8.0] - 2020-04-02

### Added

- License

### Fixed

- Fix linter crash on accessing node key name

[3.2.0]: https://github.com/infctr/eslint-plugin-typescript-sort-keys/compare/v3.1.0...v3.2.0
[3.1.0]: https://github.com/infctr/eslint-plugin-typescript-sort-keys/compare/v3.0.0...v3.1.0
[3.0.0]: https://github.com/infctr/eslint-plugin-typescript-sort-keys/compare/v2.3.0...v3.0.0
[2.3.0]: https://github.com/infctr/eslint-plugin-typescript-sort-keys/compare/v2.2.0...v2.3.0
[2.2.0]: https://github.com/infctr/eslint-plugin-typescript-sort-keys/compare/v2.1.0...v2.2.0
[2.1.0]: https://github.com/infctr/eslint-plugin-typescript-sort-keys/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/infctr/eslint-plugin-typescript-sort-keys/compare/v1.8.0...v2.0.0
[1.8.0]: https://github.com/infctr/eslint-plugin-typescript-sort-keys/compare/v1.7.0...v1.8.0
[1.7.0]: https://github.com/infctr/eslint-plugin-typescript-sort-keys/compare/v1.6.0...v1.7.0
[1.6.0]: https://github.com/infctr/eslint-plugin-typescript-sort-keys/compare/v1.5.0...v1.6.0
[1.5.0]: https://github.com/infctr/eslint-plugin-typescript-sort-keys/compare/v1.4.0...v1.5.0
[1.4.0]: https://github.com/infctr/eslint-plugin-typescript-sort-keys/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/infctr/eslint-plugin-typescript-sort-keys/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/infctr/eslint-plugin-typescript-sort-keys/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/infctr/eslint-plugin-typescript-sort-keys/compare/v1.0.2...v1.1.0
[1.0.2]: https://github.com/infctr/eslint-plugin-typescript-sort-keys/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/infctr/eslint-plugin-typescript-sort-keys/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/infctr/eslint-plugin-typescript-sort-keys/compare/v0.10.0...v1.0.0
[0.10.0]: https://github.com/infctr/eslint-plugin-typescript-sort-keys/compare/v0.9.0...v0.10.0
[0.9.0]: https://github.com/infctr/eslint-plugin-typescript-sort-keys/compare/v0.8.0...v0.9.0
[0.8.0]: https://github.com/infctr/eslint-plugin-typescript-sort-keys/compare/v0.7.0...v0.8.0

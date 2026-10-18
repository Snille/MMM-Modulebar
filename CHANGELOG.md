# Changelog

All notable changes to this project will be documented in this file.

## Unreleased

## 1.1.0 - 2026-10-18

- Integrated the `forceSwap` idea from basnelso's PR #17 with the current native DOM implementation and MagicMirror visibility API.
- Limited automatic hiding to buttons in the swap group; preserved instance selection and visibility locks, and refreshed peer button labels and icons after swaps.
- Documented the swap configuration with an example and added automated regression tests (`npm run check`).
- Updated the dependency lockfile using PR #28 and changed update instructions to `npm ci --omit=dev` to keep installations reproducible.
- Validated lint and seven regression tests on Node.js 26.5.1 and 22.23.3, with zero audit findings; verified clock/SMHI swaps in both directions on the development mirror.

- Removed the bundled jQuery dependency and replaced its usage with native DOM and CSS transitions.
- Updated README wording and setup instructions.
- Added maintenance files for linting and automated dependency checks.

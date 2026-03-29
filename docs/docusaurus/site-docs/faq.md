---
title: FAQ
description: Common questions about eslint-plugin-stylelint-2.
---

# FAQ

## Why not just run Stylelint separately?

You can. This plugin exists for teams that want one ESLint-centered workflow.

## Does this replace Stylelint?

No. It embeds Stylelint's linting results into ESLint; it does not replace Stylelint's rule engine.

## Why does the package name end in `-2`?

Because `eslint-plugin-stylelint` on npm is already taken.

## Can I still run Stylelint directly?

Yes. This plugin does not stop direct Stylelint usage. It only adds an ESLint-facing integration path.

## Does the plugin understand every Stylelint config pattern?

No. The config-focused rules intentionally start with common exported object patterns so fixes stay safe and predictable.

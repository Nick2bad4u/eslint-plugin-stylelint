---
title: Stylelint bridge
description: How eslint-plugin-stylelint-2 runs Stylelint from ESLint.
---

# Stylelint bridge

The `stylelint-2/stylelint` rule forwards the current CSS file to Stylelint's Node API and re-emits the resulting diagnostics through ESLint.

## Why that matters

That design lets teams keep one lint command and one editor integration surface instead of splitting stylesheet linting into a separate tool invocation.

## Autofix flow

When Stylelint returns computed edit info, the rule converts those edits into ESLint fixes so `eslint --fix` can apply them.

## Limits

This bridge still depends on your Stylelint config. If the config is weak, the ESLint-facing results will be weak too.

## Good fit

This workflow is a good fit when you want editor integrations and CI to consume one lint stream.

It is a weaker fit when your team deliberately separates CSS linting from general source linting.

---
title: Getting Started
description: Minimal docs-site getting-started guide for eslint-plugin-stylelint-2.
---

# Getting Started

Install the package:

```bash
npm install --save-dev eslint-plugin-stylelint-2 eslint stylelint
```

Then enable the recommended preset:

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [
    ...stylelint2.configs.recommended,
];
```

## What that preset enables

`recommended` currently expands to two file-scoped flat config entries:

- a stylesheet config for `**/*.css`
- a Stylelint config-file config for `stylelint.config.*` and `.stylelintrc.*`

## Stylesheets only

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [
    stylelint2.configs.stylesheets,
];
```

## Config files only

```ts
import stylelint2 from "eslint-plugin-stylelint-2";

export default [
    stylelint2.configs.configs,
];
```

## Common next step

After enabling the plugin, decide whether the bridge rule should point at your default Stylelint config discovery flow or an explicit `configFile` path.

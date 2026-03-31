/**
 * @packageDocumentation
 * Disallow top-level Stylelint fix configuration in authored config files.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createStylelintConfigDisallowedOptionRule } from "../_internal/stylelint-config-disallowed-option-rule.js";

/** Rule module that disallows `fix` in Stylelint config files. */
const disallowStylelintFixRule: RuleModuleWithDocs<
    "disallowConfigOption",
    readonly []
> = createStylelintConfigDisallowedOptionRule({
    defaultOptions: [],
    meta: {
        deprecated: false,
        docs: {
            configs: [
                "stylelint2.configs.recommended",
                "stylelint2.configs.configuration",
                "stylelint2.configs.all",
            ],
            description:
                "disallow configuring Stylelint's top-level `fix` option inside authored Stylelint config files.",
            recommended: true,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-fix",
        },
        fixable: "code",
        messages: {
            disallowConfigOption:
                "Remove `fix` from the shared Stylelint config. Autofix behavior is an execution concern that should be controlled by the ESLint `--fix` flow or Stylelint invocation callsite.",
        },
        schema: [],
        type: "suggestion",
    },
    name: "disallow-stylelint-fix",
    optionName: "fix",
});

export default disallowStylelintFixRule;

/**
 * @packageDocumentation
 * Disallow top-level Stylelint formatter configuration in authored config files.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createStylelintConfigDisallowedOptionRule } from "../_internal/stylelint-config-disallowed-option-rule.js";

/** Rule module that disallows `formatter` in Stylelint config files. */
const disallowStylelintFormatterRule: RuleModuleWithDocs<
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
                "disallow configuring Stylelint's top-level `formatter` option inside authored Stylelint config files.",
            recommended: true,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-formatter",
        },
        fixable: "code",
        messages: {
            disallowConfigOption:
                "Remove `formatter` from the Stylelint config. Formatter selection is an execution concern that belongs in the CLI or Node API callsite, not the shared config object.",
        },
        schema: [],
        type: "suggestion",
    },
    name: "disallow-stylelint-formatter",
    optionName: "formatter",
});

export default disallowStylelintFormatterRule;

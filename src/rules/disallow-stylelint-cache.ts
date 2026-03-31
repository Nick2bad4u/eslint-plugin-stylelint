/**
 * @packageDocumentation
 * Disallow top-level Stylelint cache configuration in authored config files.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createStylelintConfigDisallowedOptionRule } from "../_internal/stylelint-config-disallowed-option-rule.js";

/** Rule module that disallows `cache` in Stylelint config files. */
const disallowStylelintCacheRule: RuleModuleWithDocs<
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
                "disallow configuring Stylelint's top-level `cache` option inside authored Stylelint config files.",
            recommended: true,
            requiresTypeChecking: false,
            url: "https://nick2bad4u.github.io/eslint-plugin-stylelint-2/docs/rules/disallow-stylelint-cache",
        },
        fixable: "code",
        messages: {
            disallowConfigOption:
                "Remove `cache` from the shared Stylelint config. Cache policy belongs to the execution environment and should be managed at the CLI or task-runner level.",
        },
        schema: [],
        type: "suggestion",
    },
    name: "disallow-stylelint-cache",
    optionName: "cache",
});

export default disallowStylelintCacheRule;

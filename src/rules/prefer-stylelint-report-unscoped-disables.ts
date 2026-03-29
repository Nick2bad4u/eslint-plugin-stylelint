/**
 * @packageDocumentation
 * Require enabling Stylelint's built-in reporting for unscoped disable comments.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createStylelintConfigBooleanOptionRule } from "../_internal/stylelint-config-boolean-option-rule.js";

/** Rule module that requires `reportUnscopedDisables` in Stylelint config files. */
const preferStylelintReportUnscopedDisablesRule: RuleModuleWithDocs<
    string,
    readonly unknown[]
> = createStylelintConfigBooleanOptionRule({
    description:
        "require enabling Stylelint's `reportUnscopedDisables` config option in authored Stylelint config files.",
    message:
        "Enable `reportUnscopedDisables` so Stylelint reports disable comments that are not scoped to specific rules.",
    optionName: "reportUnscopedDisables",
    ruleName: "prefer-stylelint-report-unscoped-disables",
});

export default preferStylelintReportUnscopedDisablesRule;

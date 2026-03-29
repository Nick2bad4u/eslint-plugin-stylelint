/**
 * @packageDocumentation
 * Require enabling Stylelint's built-in reporting for needless disable comments.
 */
import type { RuleModuleWithDocs } from "../_internal/typed-rule.js";

import { createStylelintConfigBooleanOptionRule } from "../_internal/stylelint-config-boolean-option-rule.js";

/** Rule module that requires `reportNeedlessDisables` in Stylelint config files. */
const preferStylelintReportNeedlessDisablesRule: RuleModuleWithDocs<
    string,
    readonly unknown[]
> = createStylelintConfigBooleanOptionRule({
    description:
        "require enabling Stylelint's `reportNeedlessDisables` config option in authored Stylelint config files.",
    message:
        "Enable `reportNeedlessDisables` so Stylelint reports disable comments that do not suppress any active finding.",
    optionName: "reportNeedlessDisables",
    ruleName: "prefer-stylelint-report-needless-disables",
});

export default preferStylelintReportNeedlessDisablesRule;

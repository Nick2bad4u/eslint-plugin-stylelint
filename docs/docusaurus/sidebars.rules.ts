import { readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

type SidebarDocItem = {
    readonly id: string;
    readonly label: string;
    readonly type: "doc";
};

const sidebarDirectoryPath = dirname(fileURLToPath(import.meta.url));
const rulesDirectoryPath = join(sidebarDirectoryPath, "..", "rules");
const nonRuleDocIds = new Set(["getting-started", "overview"]);
const pinnedRuleDocIds = ["stylelint"];
const pinnedRuleDocIdSet = new Set(pinnedRuleDocIds);

const isMarkdownFile = (fileName: string): boolean => fileName.endsWith(".md");
const toRuleDocId = (fileName: string): string => fileName.slice(0, -3);

const discoveredRuleDocIds = readdirSync(rulesDirectoryPath, {
    withFileTypes: true,
})
    .filter((entry) => entry.isFile() && isMarkdownFile(entry.name))
    .map((entry) => toRuleDocId(entry.name))
    .filter((ruleDocId) => !nonRuleDocIds.has(ruleDocId));

const ruleDocIds = [
    ...pinnedRuleDocIds.filter((ruleDocId) =>
        discoveredRuleDocIds.includes(ruleDocId)
    ),
    ...discoveredRuleDocIds
        .filter((ruleDocId) => !pinnedRuleDocIdSet.has(ruleDocId))
        .sort((left, right) => left.localeCompare(right)),
];

const toNumberedRuleLabel = (ruleNumber: number, ruleDocId: string): string =>
    `${String(ruleNumber).padStart(2, "0")} ${ruleDocId}`;

const stylelintRuleItems: SidebarDocItem[] = ruleDocIds.map(
    (ruleDocId, index) => ({
        id: ruleDocId,
        label: toNumberedRuleLabel(index + 1, ruleDocId),
        type: "doc",
    })
);

/** Complete sidebar structure for docs site navigation. */
const sidebars: SidebarsConfig = {
    rules: [
        {
            className: "sb-doc-overview",
            id: "overview",
            label: "🏁 Overview",
            type: "doc",
        },
        {
            className: "sb-doc-getting-started",
            id: "getting-started",
            label: "🚀 Getting Started",
            type: "doc",
        },
        {
            className: "sb-cat-presets",
            collapsed: false,
            customProps: {
                badge: "presets",
            },
            type: "category",
            label: "Presets",
            link: {
                type: "doc",
                id: "presets/index",
            },
            items: [
                {
                    className: "sb-preset-recommended",
                    id: "presets/recommended",
                    label: "🟡 Recommended",
                    type: "doc",
                },
                {
                    className: "sb-preset-stylelint-only",
                    id: "presets/stylelint-only",
                    label: "🎨 Stylelint bridge only",
                    type: "doc",
                },
                {
                    className: "sb-preset-configuration",
                    id: "presets/configuration",
                    label: "🔧 Configuration only",
                    type: "doc",
                },
                {
                    className: "sb-preset-all",
                    id: "presets/all",
                    label: "🟣 All",
                    type: "doc",
                },
            ],
        },
        {
            className: "sb-cat-rules",
            collapsed: false,
            customProps: {
                badge: "rules",
            },
            type: "category",
            label: "Rules",
            link: {
                type: "generated-index",
                title: "Rule Reference",
                slug: "/",
                description:
                    "Rule documentation for every eslint-plugin-stylelint-2 rule.",
            },
            items: [
                {
                    className: "sb-cat-rules-stylelint",
                    collapsed: false,
                    collapsible: true,
                    customProps: {
                        badge: "stylelint",
                    },
                    type: "category",
                    label: "stylelint",
                    link: {
                        type: "generated-index",
                        title: "stylelint Rules",
                        description:
                            "Rules for bridging Stylelint into ESLint and standardizing Stylelint config authoring.",
                    },
                    items: stylelintRuleItems,
                },
            ],
        },
    ],
};

export default sidebars;

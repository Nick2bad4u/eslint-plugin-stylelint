/**
 * @packageDocumentation
 * Sidebars for the classic docs plugin (developer docs only).
 */
import { readdirSync } from "node:fs";
import { join } from "node:path";

import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const docsRootPath = join(process.cwd(), "docs", "docusaurus", "site-docs");
const typedocRootPath = join(docsRootPath, "developer", "api");

const isMarkdownFileName = (fileName: string): boolean =>
    /\.mdx?$/u.test(fileName);

const toDocId = (fileName: string): string =>
    `developer/api/${fileName.replace(/\.mdx?$/u, "")}`;

const toLabel = (docId: string): string => {
    if (docId.endsWith("/index")) {
        return "📘 API Overview";
    }

    const raw = docId
        .replace(/^developer\/api\//u, "")
        .replace(/^modules\//u, "")
        .replace(
            /\.(?:interface|type|class|enum|function|namespace|module)$/u,
            ""
        )
        .replaceAll("-", " ")
        .trim();

    const titleCase = raw.replace(
        /(^|\s)([a-zA-Z])/gu,
        (_match, prefix: string, character: string) =>
            `${prefix}${character.toUpperCase()}`
    );

    return titleCase.length > 0 ? titleCase : docId;
};

const typedocDocIds = readdirSync(typedocRootPath, { withFileTypes: true })
    .filter(
        (entry) =>
            entry.isFile() &&
            isMarkdownFileName(entry.name) &&
            entry.name !== "index.md"
    )
    .map((entry) => toDocId(entry.name))
    .sort((left, right) => left.localeCompare(right));

const sectionPrefixes = [
    "interfaces/",
    "classes/",
    "types/",
    "functions/",
    "variables/",
    "type-aliases/",
] as const;

const sectionCategories = sectionPrefixes
    .map((prefix) => {
        const sectionItems = typedocDocIds
            .filter((docId) => docId.includes(`/modules/${prefix}`))
            .map((docId) => ({
                id: docId,
                label: toLabel(docId),
                type: "doc" as const,
            }));

        if (sectionItems.length === 0) {
            return undefined;
        }

        const sectionLabel = prefix
            .replaceAll("/", "")
            .replaceAll("-", " ")
            .replace(
                /(^|\s)([a-zA-Z])/gu,
                (_m, p: string, c: string) => `${p}${c.toUpperCase()}`
            );

        return {
            collapsed: true,
            collapsible: true,
            items: sectionItems,
            label: sectionLabel,
            type: "category" as const,
        };
    })
    .filter((value) => value !== undefined);

const uncategorizedItems = typedocDocIds
    .filter(
        (docId) =>
            docId !== "developer/api/index" &&
            !sectionPrefixes.some((prefix) =>
                docId.includes(`/modules/${prefix}`)
            )
    )
    .map((docId) => ({
        id: docId,
        label: toLabel(docId),
        type: "doc" as const,
    }));

const developerItems = [
    {
        id: "developer/api/index",
        label: "📘 API Overview",
        type: "doc" as const,
    },
    ...sectionCategories,
    ...uncategorizedItems,
];

const sidebars: SidebarsConfig = {
    docs: [
        {
            collapsed: false,
            collapsible: true,
            items: developerItems,
            label: "🧩 Developer",
            type: "category" as const,
        },
    ],
};

export default sidebars;

import { existsSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

type SidebarDocItem = {
    className?: string;
    id: string;
    label: string;
    type: "doc";
};

type SidebarGeneratedIndexLink = {
    description?: string;
    title?: string;
    type: "generated-index";
};

type SidebarCategoryLink = {
    id: string;
    type: "doc";
};

type SidebarCategoryItem = {
    className?: string;
    collapsed?: boolean;
    collapsible?: boolean;
    items: SidebarItem[];
    label: string;
    link?: SidebarCategoryLink | SidebarGeneratedIndexLink;
    type: "category";
};

type SidebarItem = SidebarCategoryItem | SidebarDocItem;

const requireFromSidebar = createRequire(import.meta.url);
const sidebarDirectoryPath = dirname(fileURLToPath(import.meta.url));
const typedocSidebarPath = resolve(
    sidebarDirectoryPath,
    "site-docs",
    "developer",
    "api",
    "typedoc-sidebar.cjs"
);
const typedocIndexPath = resolve(
    sidebarDirectoryPath,
    "site-docs",
    "developer",
    "api",
    "index.md"
);

const isSidebarCategoryItem = (
    item: SidebarItem
): item is SidebarCategoryItem => item.type === "category";

const getTypedocClassName = (
    label: string,
    depth: number
): string | undefined => {
    if (depth === 0 && label === "plugin") {
        return "sb-cat-api-public";
    }

    if (depth === 0 && label === "_internal") {
        return "sb-cat-api-internal";
    }

    if (label === "Functions") {
        return "sb-cat-api-functions";
    }

    if (label === "Type Aliases") {
        return "sb-cat-api-types";
    }

    if (label === "Variables") {
        return "sb-cat-api-variables";
    }

    return undefined;
};

const normalizeTypedocDocId = (documentId: string): string =>
    documentId
        .replace(/^\.\.\/site-docs\//u, "")
        .replace(
            /stylelintconfig-references/gu,
            "stylelint2-config-references"
        );

const decorateTypedocSidebarItems = (
    items: SidebarItem[],
    depth = 0
): SidebarItem[] =>
    items.map((item) => {
        if (!isSidebarCategoryItem(item)) {
            return {
                ...item,
                id: normalizeTypedocDocId(item.id),
            };
        }

        const typedocClassName = getTypedocClassName(item.label, depth);

        return {
            ...item,
            ...(typedocClassName === undefined
                ? {}
                : { className: typedocClassName }),
            ...(item.link?.type === "doc"
                ? {
                      link: {
                          ...item.link,
                          id: normalizeTypedocDocId(item.link.id),
                      },
                  }
                : {}),
            items: decorateTypedocSidebarItems(item.items, depth + 1),
        };
    });

const loadTypedocSidebarItems = (): SidebarItem[] => {
    if (!existsSync(typedocSidebarPath)) {
        return [];
    }

    const loadedItems = requireFromSidebar(typedocSidebarPath) as unknown;

    if (!Array.isArray(loadedItems)) {
        return [];
    }

    return decorateTypedocSidebarItems(loadedItems as SidebarItem[]);
};

const typedocSidebarItems = loadTypedocSidebarItems();
const developerSidebarItems: SidebarItem[] = [];

if (existsSync(typedocIndexPath)) {
    developerSidebarItems.push({
        className: "sb-cat-api-overview",
        id: "developer/api/index",
        label: "📘 API Overview",
        type: "doc",
    });
}

if (typedocSidebarItems.length > 0) {
    developerSidebarItems.push({
        className: "sb-cat-api-runtime",
        collapsed: false,
        collapsible: true,
        items: typedocSidebarItems,
        label: "🧠 TypeDoc API",
        link: {
            description:
                "Generated API reference for the public plugin surface and internal helpers.",
            title: "TypeDoc API",
            type: "generated-index",
        },
        type: "category",
    });
}

const docsSidebarItems: SidebarItem[] = [
    {
        className: "sb-doc-overview",
        id: "intro",
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
        className: "sb-cat-guides",
        collapsed: false,
        items: [
            {
                className: "sb-guide-stylelint-bridge",
                id: "stylelint-bridge",
                label: "🎨 Stylelint bridge",
                type: "doc",
            },
            {
                className: "sb-guide-config-authoring",
                id: "config-authoring",
                label: "🛠️ Config authoring",
                type: "doc",
            },
            {
                className: "sb-guide-faq",
                id: "faq",
                label: "❓ FAQ",
                type: "doc",
            },
        ],
        label: "🧭 Guides",
        type: "category",
    },
];

if (developerSidebarItems.length > 0) {
    docsSidebarItems.push({
        className: "sb-cat-developer",
        collapsed: true,
        collapsible: true,
        items: developerSidebarItems,
        label: "🧩 Developer",
        link: {
            description:
                "Generated developer-facing API docs and plugin internals reference.",
            title: "Developer",
            type: "generated-index",
        },
        type: "category",
    });
}

const sidebars = {
    docs: docsSidebarItems,
} satisfies SidebarsConfig;

export default sidebars;

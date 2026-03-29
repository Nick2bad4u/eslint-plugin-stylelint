import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
    docs: [
        {
            id: "intro",
            label: "Overview",
            type: "doc",
        },
        {
            id: "getting-started",
            label: "Getting Started",
            type: "doc",
        },
        {
            items: [
                {
                    id: "stylelint-bridge",
                    label: "Stylelint bridge",
                    type: "doc",
                },
                {
                    id: "config-authoring",
                    label: "Config authoring",
                    type: "doc",
                },
                {
                    id: "benchmarks",
                    label: "Benchmarks",
                    type: "doc",
                },
                {
                    id: "faq",
                    label: "FAQ",
                    type: "doc",
                },
            ],
            label: "Guides",
            type: "category",
        },
    ],
};

export default sidebars;

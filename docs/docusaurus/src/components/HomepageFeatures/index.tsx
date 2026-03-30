import type { JSX } from "react";

import clsx from "clsx";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";

import styles from "./styles.module.css";

type ExternalFeature = Readonly<{
    badge: string;
    description: string;
    highlights: readonly string[];
    href: string;
    linkLabel: string;
    meta: string;
    toneClassName: string;
    title: string;
}>;

type InternalFeature = Readonly<{
    badge: string;
    description: string;
    highlights: readonly string[];
    linkLabel: string;
    meta: string;
    toneClassName: string;
    title: string;
    to: string;
}>;

type Feature = ExternalFeature | InternalFeature;

const features: readonly Feature[] = [
    {
        badge: "Docs surface",
        description:
            "Start with the rule catalog and preset guides when you need to answer what ships in each rollout path, fast.",
        highlights: [
            "Preset key legend linked to each preset guide",
            "Numbered rule catalog with quick scanning",
            "Overview and getting-started paths for rollout planning",
        ],
        linkLabel: "Browse preset and rule docs ↗",
        meta: "Reference-driven adoption path",
        title: "📚 Rule reference hub",
        toneClassName: styles["cardDocs"] ?? "",
        to: "/docs/rules/overview",
    },
    {
        badge: "Developer surface",
        description:
            "Open the public API and internal helpers when you need to trace how presets, rule metadata, and docs wiring fit together.",
        highlights: [
            "Generated TypeDoc with public and internal groupings",
            "Developer docs that stay collapsed until you need them",
            "Source-oriented navigation for rule and preset architecture",
        ],
        linkLabel: "Open developer docs ↗",
        meta: "API and implementation details",
        title: "🧩 Developer & API surface",
        toneClassName: styles["cardDeveloper"] ?? "",
        to: "/docs/developer/api",
    },
    {
        badge: "Validation tools",
        description:
            "Validate the docs against real resolved configs with the inspector tooling instead of trusting prose alone.",
        highlights: [
            "ESLint config inspector for flat-config output",
            "Stylelint inspector for config-level behavior",
            "Useful when checking rollout diffs before enabling presets",
        ],
        linkLabel: "Launch the inspector tools ↗",
        meta: "Generated tooling for reality checks",
        title: "🔎 Inspectors & rollout tooling",
        href: "https://nick2bad4u.github.io/eslint-plugin-stylelint-2/stylelint-inspector/",
        toneClassName: styles["cardInspectors"] ?? "",
    },
];

export default function HomepageFeatures(): JSX.Element {
    const cardClassName = styles["card"] ?? "";
    const featuresClassName = styles["features"] ?? "";
    const gridClassName = styles["grid"] ?? "";
    const linkClassName = styles["link"] ?? "";
    const badgeClassName = styles["badge"] ?? "";
    const bodyClassName = styles["body"] ?? "";
    const footerClassName = styles["footer"] ?? "";
    const listClassName = styles["list"] ?? "";
    const metaClassName = styles["meta"] ?? "";

    return (
        <section className={featuresClassName}>
            <div className="container">
                <div className={gridClassName}>
                    {features.map((feature) => (
                        <article
                            key={feature.title}
                            className={clsx(
                                "card",
                                cardClassName,
                                feature.toneClassName
                            )}
                            data-sb-hover="lift"
                        >
                            <p className={badgeClassName}>{feature.badge}</p>
                            <Heading as="h2">{feature.title}</Heading>
                            <p className={metaClassName}>{feature.meta}</p>
                            <div className={bodyClassName}>
                                <p>{feature.description}</p>
                                <ul className={listClassName}>
                                    {feature.highlights.map((highlight) => (
                                        <li key={highlight}>{highlight}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className={footerClassName}>
                                {"href" in feature ? (
                                    <Link
                                        className={linkClassName}
                                        href={feature.href}
                                    >
                                        {feature.linkLabel}
                                    </Link>
                                ) : (
                                    <Link
                                        className={linkClassName}
                                        to={feature.to}
                                    >
                                        {feature.linkLabel}
                                    </Link>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

import type { JSX } from "react";

import clsx from "clsx";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

import GitHubStats from "../components/GitHubStats";
import HomepageFeatures from "../components/HomepageFeatures";
import styles from "./index.module.css";

type WorkflowCard = Readonly<{
    badge: string;
    bullets: readonly string[];
    className: string;
    href: string;
    linkLabel: string;
    summary: string;
    title: string;
}>;

const workflowCards: readonly WorkflowCard[] = [
    {
        badge: "Preset · 🎨",
        bullets: [
            "Runs only `stylelint-2/stylelint` on stylesheet files.",
            "Surfaces Stylelint diagnostics and autofix edits through ESLint.",
            "Use `stylelint2.configs.stylelintOnly` when you only want CSS coverage.",
        ],
        className: styles["statCardBridge"] ?? "",
        href: "/docs/rules/presets/stylelint-only",
        linkLabel: "Open the Stylelint bridge preset ↗",
        summary:
            "Route only the Stylelint bridge through ESLint when you want stylesheet reporting and fixes, but zero config-authoring rules.",
        title: "🎨 Stylelint bridge only",
    },
    {
        badge: "Preset · 🔧",
        bullets: [
            "Targets `stylelint.config.*` and `.stylelintrc.*` modules only.",
            "Does not enable the stylesheet bridge or source-CSS autofixes.",
            "Use `stylelint2.configs.configuration` for pure config hygiene.",
        ],
        className: styles["statCardConfiguration"] ?? "",
        href: "/docs/rules/presets/configuration",
        linkLabel: "Open the configuration preset ↗",
        summary:
            "Choose this when you want safer, cleaner Stylelint config modules without changing how source stylesheets are linted.",
        title: "🔧 Configuration only",
    },
    {
        badge: "Preset · 🟡",
        bullets: [
            "Combines the Stylelint bridge and configuration-only workflows.",
            "Fits most repos that want one ESLint-first lint command.",
            "`stylelint2.configs.all` currently ships the same rule coverage.",
        ],
        className: styles["statCardRecommended"] ?? "",
        href: "/docs/rules/presets/recommended",
        linkLabel: "Open the recommended preset ↗",
        summary:
            "Start here when you want the default ESLint-first rollout that covers both stylesheet linting and config hygiene.",
        title: "🟡 Recommended rollout",
    },
];

export default function Home(): JSX.Element {
    const browseRulesButtonClassName = styles["browseRulesButton"] ?? "";
    const heroClassName = styles["hero"] ?? "";
    const heroContentClassName = styles["heroContent"] ?? "";
    const statGridClassName = styles["statGrid"] ?? "";
    const statLinkClassName = styles["statLink"] ?? "";
    const statListClassName = styles["statList"] ?? "";
    const statCardClassName = styles["statCard"] ?? "";
    const statCardBadgeClassName = styles["statCardBadge"] ?? "";
    const statSummaryClassName = styles["statSummary"] ?? "";
    const statsRowClassName = styles["statsRow"] ?? "";
    const taglineClassName = styles["tagline"] ?? "";
    const heroShellClassName = styles["heroShell"] ?? "";
    const heroVisualClassName = styles["heroVisual"] ?? "";
    const heroImageClassName = styles["heroImage"] ?? "";
    const heroImageSrc = useBaseUrl("/img/hero-stylelint-card.png");

    return (
        <Layout
            title="eslint-plugin-stylelint-2"
            description="Run Stylelint through ESLint and add Stylelint-focused config rules."
        >
            <header className={heroClassName}>
                <div className={"container"}>
                    <div className={heroShellClassName}>
                        <div className={heroContentClassName}>
                            <p>Stylelint + ESLint, one workflow</p>
                            <Heading as="h1">eslint-plugin-stylelint-2</Heading>
                            <p className={taglineClassName}>
                                Keep stylesheet linting in the same command,
                                editor, and autofix workflow as the rest of your
                                ESLint stack.
                            </p>
                            <div className={statsRowClassName}>
                                <Link
                                    className="button button--primary button--lg"
                                    data-sb-hover="button"
                                    to="/docs/intro"
                                >
                                    📖 Open docs
                                </Link>
                                <Link
                                    className={clsx(
                                        "button button--secondary button--lg",
                                        browseRulesButtonClassName
                                    )}
                                    data-sb-hover="button"
                                    to="/docs/rules/overview"
                                >
                                    📏 Browse rules
                                </Link>
                            </div>
                            <GitHubStats className={statsRowClassName} />
                        </div>
                        <aside className={heroVisualClassName}>
                            <img
                                alt="eslint-plugin-stylelint-2 logo"
                                className={heroImageClassName}
                                decoding="async"
                                height="720"
                                loading="eager"
                                src={heroImageSrc}
                                width="720"
                            />
                        </aside>
                    </div>
                    <div className={statGridClassName}>
                        {workflowCards.map((card) => (
                            <article
                                key={card.title}
                                className={clsx(
                                    statCardClassName,
                                    card.className
                                )}
                                data-sb-hover="lift"
                            >
                                <p className={statCardBadgeClassName}>
                                    {card.badge}
                                </p>
                                <Heading as="h2">{card.title}</Heading>
                                <p className={statSummaryClassName}>
                                    {card.summary}
                                </p>
                                <ul className={statListClassName}>
                                    {card.bullets.map((bullet) => (
                                        <li key={bullet}>{bullet}</li>
                                    ))}
                                </ul>
                                <Link
                                    className={statLinkClassName}
                                    to={card.href}
                                >
                                    {card.linkLabel}
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>
            </header>
            <HomepageFeatures />
        </Layout>
    );
}

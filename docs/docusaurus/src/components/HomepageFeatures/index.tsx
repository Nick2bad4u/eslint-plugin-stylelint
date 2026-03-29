import type { JSX } from "react";

import clsx from "clsx";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";

import styles from "./styles.module.css";

type Feature = Readonly<{
    description: string;
    title: string;
    to: string;
}>;

const features: readonly Feature[] = [
    {
        description:
            "Surface Stylelint findings in the same ESLint run and let `eslint --fix` apply Stylelint edit info when available.",
        title: "Stylelint bridge",
        to: "/docs/rules/stylelint",
    },
    {
        description:
            "Standardize modern Stylelint config authoring with `defineConfig()` and related config-hygiene rules.",
        title: "Config hygiene",
        to: "/docs/config-authoring",
    },
    {
        description:
            "Keep stylesheet linting, docs generation, and performance checks in one repo-level workflow.",
        title: "Tooling-friendly",
        to: "/docs/benchmarks",
    },
];

export default function HomepageFeatures(): JSX.Element {
    const cardClassName = styles["card"] ?? "";
    const featuresClassName = styles["features"] ?? "";
    const gridClassName = styles["grid"] ?? "";
    const linkClassName = styles["link"] ?? "";

    return (
        <section className={featuresClassName}>
            <div className="container">
                <div className={gridClassName}>
                    {features.map((feature) => (
                        <article
                            key={feature.title}
                            className={clsx("card", cardClassName)}
                        >
                            <Heading as="h2">{feature.title}</Heading>
                            <p>{feature.description}</p>
                            <Link className={linkClassName} to={feature.to}>
                                Learn more →
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

import type { JSX } from "react";

import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

import GitHubStats from "../components/GitHubStats";
import HomepageFeatures from "../components/HomepageFeatures";
import styles from "./index.module.css";

export default function Home(): JSX.Element {
    const heroClassName = styles["hero"] ?? "";
    const heroContentClassName = styles["heroContent"] ?? "";
    const statGridClassName = styles["statGrid"] ?? "";
    const statCardClassName = styles["statCard"] ?? "";
    const statsRowClassName = styles["statsRow"] ?? "";
    const taglineClassName = styles["tagline"] ?? "";

    return (
        <Layout
            title="eslint-plugin-stylelint-2"
            description="Run Stylelint through ESLint and add Stylelint-focused config rules."
        >
            <header className={heroClassName}>
                <div className={"container"}>
                    <div className={heroContentClassName}>
                        <p>Stylelint + ESLint, one workflow</p>
                        <Heading as="h1">eslint-plugin-stylelint-2</Heading>
                        <p className={taglineClassName}>
                            Keep stylesheet linting in the same command, editor,
                            and autofix workflow as the rest of your ESLint
                            stack.
                        </p>
                        <div className={statsRowClassName}>
                            <Link
                                className="button button--primary button--lg"
                                to="/docs/intro"
                            >
                                Open docs
                            </Link>
                            <Link
                                className="button button--secondary button--lg"
                                to="/docs/rules/overview"
                            >
                                Browse rules
                            </Link>
                        </div>
                        <GitHubStats className={statsRowClassName} />
                    </div>
                    <div className={statGridClassName}>
                        <article className={statCardClassName}>
                            <Heading as="h2">
                                Bridge Stylelint into ESLint
                            </Heading>
                            <p>
                                Run Stylelint through ESLint and expose
                                Stylelint edit info to `eslint --fix`.
                            </p>
                        </article>
                        <article className={statCardClassName}>
                            <Heading as="h2">Harden config hygiene</Heading>
                            <p>
                                Standardize `defineConfig()` and require
                                reporting for descriptionless Stylelint disable
                                comments.
                            </p>
                        </article>
                        <article className={statCardClassName}>
                            <Heading as="h2">Measure real performance</Heading>
                            <p>
                                Benchmark stylesheet and config workflows with
                                meaningful ESLint scenarios.
                            </p>
                        </article>
                    </div>
                </div>
            </header>
            <HomepageFeatures />
        </Layout>
    );
}

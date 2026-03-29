/**
 * @packageDocumentation
 * Contract tests that keep the Docusaurus rules sidebar synchronized with plugin rule docs.
 */
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { describe, expect, it } from "vitest";

import stylelint2Plugin from "../src/plugin";

describe("docusaurus rules sidebar sync", () => {
    it("includes every registered rule doc id in the rules sidebar source", async () => {
        const sidebarPath = path.join(
            process.cwd(),
            "docs",
            "docusaurus",
            "sidebars.rules.ts"
        );
        const sidebarSource = await fs.readFile(sidebarPath, "utf8");

        for (const ruleName of Object.keys(stylelint2Plugin.rules)) {
            expect(sidebarSource).toContain(`id: "${ruleName}"`);
        }
    });
});

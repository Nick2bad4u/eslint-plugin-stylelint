/**
 * @packageDocumentation
 * Shared helpers for reading and rewriting Stylelint config objects.
 */
import type { TSESTree } from "@typescript-eslint/utils";

import { basename } from "node:path";

const configBaseNamePattern =
    /^(?:stylelint\.config|\.stylelintrc)\.(?:[cm]?js|[cm]?ts)$/v;

/**
 * Check whether a filename looks like a Stylelint config module.
 *
 * @param filename - Absolute or relative filename.
 *
 * @returns `true` when the file name matches supported Stylelint config names.
 */
export const isStylelintConfigFile = (filename: string): boolean =>
    configBaseNamePattern.test(basename(filename));

/**
 * Check whether a property key matches a specific string literal name.
 *
 * @param property - Candidate object property.
 * @param name - Expected property name.
 *
 * @returns `true` when the property key matches the provided name.
 */
export const isPropertyNamed = (
    property: Readonly<TSESTree.Property>,
    name: string
): boolean => {
    if (property.computed) {
        return false;
    }

    if (property.key.type === "Identifier") {
        return property.key.name === name;
    }

    return property.key.type === "Literal" && property.key.value === name;
};

/**
 * Extract the top-level Stylelint config object from an export default
 * declaration.
 *
 * @param declaration - Export default declaration payload.
 *
 * @returns Config object expression when the export is supported.
 */
export const getExportedStylelintConfigObject = (
    declaration: Readonly<TSESTree.ExportDefaultDeclaration["declaration"]>
): TSESTree.ObjectExpression | undefined => {
    if (declaration.type === "ObjectExpression") {
        return declaration;
    }

    if (
        declaration.type === "CallExpression" &&
        declaration.callee.type === "Identifier" &&
        declaration.callee.name === "defineConfig"
    ) {
        const firstArgument = declaration.arguments[0];

        return firstArgument?.type === "ObjectExpression"
            ? firstArgument
            : undefined;
    }

    return undefined;
};

/**
 * Find one named top-level object property.
 *
 * @param objectExpression - Object expression to inspect.
 * @param name - Expected property name.
 *
 * @returns Matching property when present.
 */
export const getObjectPropertyByName = (
    objectExpression: Readonly<TSESTree.ObjectExpression>,
    name: string
): TSESTree.Property | undefined => {
    for (const property of objectExpression.properties) {
        if (property.type !== "Property") {
            continue;
        }

        if (isPropertyNamed(property, name)) {
            return property;
        }
    }

    return undefined;
};

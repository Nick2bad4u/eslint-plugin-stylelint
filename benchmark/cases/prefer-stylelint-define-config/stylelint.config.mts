const sharedRules = {
    "declaration-no-important": true,
    "font-family-no-missing-generic-family-keyword": true,
};

export default {
    ignoreDisables: false,
    overrides: [
        {
            customSyntax: "postcss-scss",
            files: ["**/*.scss"],
            rules: sharedRules,
        },
    ],
    rules: {
        ...sharedRules,
    },
};

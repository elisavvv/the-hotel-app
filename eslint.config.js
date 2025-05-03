// @ts-check
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = tseslint.config(
    {
        files: ["**/*.ts"],
        extends: [
            ...tseslint.configs.recommended,
            ...angular.configs.tsRecommended,
        ],
        processor: angular.processInlineTemplates,
        rules: {
            "@angular-eslint/directive-selector": [
                "error",
                {
                    type: "attribute",
                    prefix: "app",
                    style: "camelCase",
                },
            ],
            "@angular-eslint/component-selector": [
                "error",
                {
                    type: "element",
                    prefix: "app",
                    style: "kebab-case",
                },
            ],
            "@typescript-eslint/member-ordering": "error",
            "padding-line-between-statements": [
                "error",
                {
                    "blankLine": "always",
                    "prev": "*",
                    "next": "return"
                }
            ],
            "@typescript-eslint/naming-convention": [
                "error",
                {
                    "selector": "default",
                    "format": ["camelCase"],
                    "custom": {
                        "regex": "^[^А-ЯЁа-яё]*$",
                        "match": true
                    }
                },
                {
                    "selector": ["classProperty", "parameterProperty"],
                    "format": ["camelCase"],
                    "modifiers": ["private"],
                    "prefix": ["_"],
                    "custom": {
                        "regex": "^[^А-ЯЁа-яё]*$",
                        "match": true
                    }
                },
                {
                    "selector": ["classProperty"],
                    "modifiers": ["public", "static", "readonly"],
                    "format": ["camelCase", "UPPER_CASE"],
                    "custom": {
                        "regex": "^[^А-ЯЁа-яё]*$",
                        "match": true
                    }
                },
                {
                    "selector": "objectLiteralProperty",
                    "format": null,
                    "custom": {
                        "regex": "^[^А-ЯЁа-яё]*$",
                        "match": true
                    }
                },
                {
                    "selector": "typeLike",
                    "format": ["PascalCase"],
                    "custom": {
                        "regex": "^[^А-ЯЁа-яё]*$",
                        "match": true
                    }
                },
                {
                    "selector": ["variable"],
                    "modifiers": ["const", "exported"],
                    "format": ["camelCase", "UPPER_CASE"],
                    "custom": {
                        "regex": "^[^А-ЯЁа-яё]*$",
                        "match": true
                    }
                }
            ],
            "@typescript-eslint/array-type": [
                "error",
                {
                    "default": "array-simple"
                }
            ],
            "@angular-eslint/prefer-on-push-component-change-detection": "error",
            "@typescript-eslint/explicit-function-return-type": "error",
            "@typescript-eslint/no-shadow": "error",
            "quotes": [
                "error",
                "single",
                {
                    "avoidEscape": true,
                    "allowTemplateLiterals": true
                }
            ]
        },
    },
    {
        files: ["**/*.html"],
        extends: [
            ...angular.configs.templateRecommended,
            ...angular.configs.templateAccessibility,
        ],
        rules: {},
    }
);

import angularPlugin from '@angular-eslint/eslint-plugin';
import templatePlugin from '@angular-eslint/eslint-plugin-template';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [
  // Конфигурация для TypeScript файлов
  {
    files: ['**/*.ts'],
    plugins: {
      '@angular-eslint': angularPlugin,
      '@typescript-eslint': typescriptPlugin
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
        ecmaVersion: 2022
      }
    },
    rules: {
      // Правила Angular
      "@angular-eslint/prefer-standalone": "warn",
      "@angular-eslint/directive-selector": [
        "error",
        {
          "type": "attribute",
          "prefix": "app",
          "style": "camelCase"
        }
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          "type": "element",
          "prefix": "app",
          "style": "kebab-case"
        }
      ],
      
      // Правила TypeScript
      "@typescript-eslint/member-ordering": "error",
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
          "leadingUnderscore": "allow",
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
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/no-shadow": "error",
      
      // Общие правила
      "padding-line-between-statements": [
        "error",
        {
          "blankLine": "always",
          "prev": "*",
          "next": "return"
        }
      ],
      "quotes": [
        "error",
        "single",
        {
          "avoidEscape": true,
          "allowTemplateLiterals": true
        }
      ]
    }
  },
  // Конфигурация для HTML шаблонов
  {
    files: ['**/*.html'],
    plugins: {
      '@angular-eslint/template': templatePlugin
    },
    processor: '@angular-eslint/template/extract-inline-html',
    rules: {
      // Базовые правила для шаблонов
      "@angular-eslint/template/banana-in-box": "error",
      "@angular-eslint/template/no-negated-async": "error",
      
      // Отключенные правила
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-function": "off"
    }
  }
];
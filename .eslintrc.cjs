/**
 * @file Eslint Configuration file.
 * @see https://eslint.org/docs/latest/.
 */

/* eslint-disable sort-keys, sort-keys-fix/sort-keys-fix */
require('@rushstack/eslint-patch/modern-module-resolution');

const env = { browser: true, es6: true, node: true };
const indent = 4;
const lineLength = 140;
const ecmaVersion = 'latest';
const vueVersion = '^3.3.0';

// JSDoc documentation https://jsdoc.app/index.html
// JSDoc plugin documentation https://github.com/gajus/eslint-plugin-jsdoc
const jsdocRules = {
    'jsdoc/check-access': 'warn', // Recommended
    'jsdoc/check-alignment': 'warn', // Recommended
    'jsdoc/check-examples': 'off', // Not working in Eslint 8 yet
    'jsdoc/check-indentation': 'warn',
    'jsdoc/check-line-alignment': 'warn',
    'jsdoc/check-param-names': 'warn', // Recommended
    'jsdoc/check-property-names': 'warn', // Recommended
    'jsdoc/check-syntax': 'warn',
    'jsdoc/check-tag-names': 'warn', // Recommended
    'jsdoc/check-types': 'warn', // Recommended
    'jsdoc/check-values': 'warn', // Recommended
    'jsdoc/empty-tags': 'warn', // Recommended
    'jsdoc/implements-on-classes': 'warn', // Recommended
    'jsdoc/match-description': 'warn',
    'jsdoc/multiline-blocks': 'warn', // Recommended
    'jsdoc/newline-after-description': 'off', // Recommended
    'jsdoc/no-bad-blocks': 'warn',
    'jsdoc/no-defaults': 'warn',
    'jsdoc/no-missing-syntax': 'off',
    'jsdoc/no-multi-asterisks': 'warn', // Recommended
    'jsdoc/no-restricted-syntax': ['warn', { 'contexts': ['any'] }], // TODO
    'jsdoc/no-types': 'off',
    'jsdoc/no-undefined-types': 'warn', // Recommended
    'jsdoc/require-asterisk-prefix': 'warn',
    'jsdoc/require-description': 'off',
    'jsdoc/require-description-complete-sentence': 'warn',
    'jsdoc/require-example': 'off',
    'jsdoc/require-file-overview': 'warn',
    'jsdoc/require-hyphen-before-param-description': 'warn',
    'jsdoc/require-jsdoc': 'warn', // Recommended
    'jsdoc/require-param': 'warn', // Recommended
    'jsdoc/require-param-description': 'warn', // Recommended
    'jsdoc/require-param-name': 'warn', // Recommended
    'jsdoc/require-param-type': ['warn', { 'contexts': ['any'] }], // Recommended
    'jsdoc/require-property': 'warn', // Recommended
    'jsdoc/require-property-description': 'warn', // Recommended
    'jsdoc/require-property-name': 'warn', // Recommended
    'jsdoc/require-property-type': 'warn', // Recommended
    'jsdoc/require-returns': 'warn', // Recommended
    'jsdoc/require-returns-check': 'warn', // Recommended
    'jsdoc/require-returns-description': 'warn', // Recommended
    'jsdoc/require-returns-type': 'warn', // Recommended
    'jsdoc/require-throws': 'off',
    'jsdoc/require-yields': 'warn', // Recommended
    'jsdoc/require-yields-check': 'warn', // Recommended
    'jsdoc/sort-tags': 'off',
    'jsdoc/tag-lines': 'warn', // Recommended
    'jsdoc/valid-types': 'warn' // Recommended
};

/*
 * https://eslint.org/docs/rules/
 */
const baseRules = {
    'sort-keys-fix/sort-keys-fix': ['warn', 'asc', { caseSensitive: true, natural: true }],
    ...jsdocRules,

    // Possible Errors
    'no-await-in-loop': 'warn',
    'no-console': 'warn',
    'no-debugger': 'warn',
    'no-extra-parens': 'warn',
    'no-loss-of-precision': 'warn',
    'no-promise-executor-return': 'warn',
    'no-template-curly-in-string': 'warn',
    'no-unreachable-loop': 'warn',
    'no-unsafe-optional-chaining': 'warn',
    'no-useless-backreference': 'warn',
    'require-atomic-updates': 'warn',

    // Best Practices
    'accessor-pairs': 'warn',
    'array-callback-return': 'warn',
    'block-scoped-var': 'warn',
    'class-methods-use-this': 'warn',
    'complexity': ['off', { max: 15 }],
    'consistent-return': 'warn',
    'curly': ['warn', 'multi-line'],
    'default-case': 'warn',
    'default-case-last': 'warn',
    'default-param-last': 'warn',
    'dot-location': ['warn', 'property'],
    'dot-notation': 'warn',
    'eqeqeq': ['warn', 'smart'],
    'grouped-accessor-pairs': 'warn',
    'guard-for-in': 'warn',
    'max-classes-per-file': 'warn',
    'no-alert': 'warn',
    'no-caller': 'warn',
    'no-constructor-return': 'warn',
    'no-div-regex': 'warn',
    'no-else-return': 'warn',
    'no-empty-function': 'warn',
    'no-eq-null': 'off',
    'no-eval': 'warn',
    'no-extra-bind': 'warn',
    'no-extra-label': 'warn',
    'no-floating-decimal': 'warn',
    'no-implicit-coercion': 'off',
    'no-implicit-globals': 'warn',
    'no-implied-eval': 'warn',
    'no-invalid-this': 'warn',
    'no-iterator': 'warn',
    'no-labels': 'warn',
    'no-lone-blocks': 'warn',
    'no-loop-func': 'warn',
    'no-magic-numbers': ['off', { ignoreDefaultValues: true, ignoreArrayIndexes: true, detectObjects: false }],
    'no-multi-spaces': ['warn', { exceptions: { Property: true } }],
    'no-multi-str': 'warn',
    'no-new': 'warn',
    'no-new-func': 'warn',
    'no-new-wrappers': 'warn',
    'no-nonoctal-decimal-escape': 'warn',
    'no-octal-escape': 'warn',
    'no-param-reassign': 'warn',
    'no-proto': 'warn',
    'no-restricted-properties': 'warn',
    'no-return-assign': 'warn',
    'no-return-await': 'warn',
    'no-script-url': 'warn',
    'no-self-compare': 'warn',
    'no-sequences': 'warn',
    'no-throw-literal': 'warn',
    'no-unmodified-loop-condition': 'warn',
    'no-unused-expressions': 'warn',
    'no-useless-call': 'warn',
    'no-useless-concat': 'warn',
    'no-useless-return': 'warn',
    'no-void': 'off',
    'no-warning-comments': ['off', { terms: ['todo', 'fixme'], location: 'anywhere' }],
    'prefer-named-capture-group': 'warn',
    'prefer-promise-reject-errors': 'warn',
    'prefer-regex-literals': 'warn',
    'radix': 'warn',
    'require-await': 'warn',
    'require-unicode-regexp': 'off',
    'vars-on-top': 'warn',
    'wrap-iife': 'warn',
    'yoda': 'warn',

    // Strict Mode
    'strict': 'warn',

    // Variables
    'init-declarations': 'off',
    'no-label-var': 'warn',
    'no-shadow': 'off',
    'no-undef-init': 'warn',
    'no-undefined': 'warn',
    'no-use-before-define': 'warn',

    // Stylistic Issues
    'array-bracket-newline': ['warn', 'consistent'],
    'array-bracket-spacing': 'warn',
    'array-element-newline': ['warn', 'consistent'],
    'block-spacing': 'warn',
    'brace-style': 'warn',
    'camelcase': 'off',
    'capitalized-comments': 'off',
    'comma-dangle': 'warn',
    'comma-spacing': 'warn',
    'comma-style': 'warn',
    'computed-property-spacing': 'warn',
    'consistent-this': 'warn',
    'eol-last': 'warn',
    'func-call-spacing': 'warn',
    'func-name-matching': 'warn',
    'func-names': 'warn',
    'func-style': 'warn',
    'function-call-argument-newline': ['warn', 'consistent'],
    'function-paren-newline': ['warn', 'consistent'],
    'implicit-arrow-linebreak': 'off',
    'indent': ['warn', indent],
    'jsx-quotes': 'warn',
    'key-spacing': 'warn',
    'keyword-spacing': 'off',
    'line-comment-position': ['off', { position: 'beside' }],
    'linebreak-style': 'warn',
    'lines-around-comment': ['warn', { allowClassStart: true, beforeBlockComment: false }],
    'lines-between-class-members': 'warn',
    'max-depth': 'warn',
    'max-len': [
        'warn',
        {
            code: lineLength,
            comments: lineLength,
            ignoreComments: false,
            ignoreRegExpLiterals: false,
            ignoreStrings: false,
            ignoreTemplateLiterals: false,
            ignoreTrailingComments: false,
            ignoreUrls: false,
            tabWidth: indent
        }
    ],
    'max-lines': 'off',
    'max-lines-per-function': 'off',
    'max-nested-callbacks': 'warn',
    'max-params': 'off',
    'max-statements': 'off',
    'max-statements-per-line': 'warn',
    'multiline-comment-style': 'off',
    'multiline-ternary': ['off', 'never'],
    'new-cap': ['warn', { capIsNew: false }],
    'new-parens': 'warn',
    'newline-per-chained-call': 'off',
    'no-array-constructor': 'warn',
    'no-bitwise': 'off',
    'no-continue': 'warn',
    'no-inline-comments': 'off',
    'no-lonely-if': 'warn',
    'no-mixed-operators': 'warn',
    'no-multi-assign': 'off',
    'no-multiple-empty-lines': ['warn', { max: 1 }],
    'no-negated-condition': 'off',
    'no-nested-ternary': 'warn',
    'no-new-object': 'warn',
    'no-plusplus': 'warn',
    'no-restricted-syntax': 'warn',
    'no-tabs': 'warn',
    'no-ternary': 'off',
    'no-trailing-spaces': 'warn',
    'no-underscore-dangle': 'warn',
    'no-unneeded-ternary': 'warn',
    'no-whitespace-before-property': 'warn',
    'nonblock-statement-body-position': 'warn',
    'object-curly-newline': 'warn',
    'object-curly-spacing': ['warn', 'always'],
    'object-property-newline': ['warn', { allowMultiplePropertiesPerLine: true }],
    'one-var': ['warn', 'never'],
    'one-var-declaration-per-line': 'warn',
    'operator-assignment': 'warn',
    'operator-linebreak': 'warn',
    'padded-blocks': ['warn', 'never'],
    'padding-line-between-statements': 'warn',
    'prefer-exponentiation-operator': 'warn',
    'prefer-object-spread': 'warn',
    'quote-props': ['warn', 'consistent'],
    'quotes': ['warn', 'single'],
    'semi': 'warn',
    'semi-spacing': 'warn',
    'semi-style': 'warn',
    'sort-keys': ['warn', 'asc', { caseSensitive: true, minKeys: 2, natural: true }],
    'sort-vars': 'warn',
    'space-before-blocks': 'warn',
    'space-before-function-paren': ['warn', { anonymous: 'always', named: 'never', asyncArrow: 'always' }],
    'space-in-parens': 'warn',
    'space-infix-ops': 'warn',
    'space-unary-ops': 'warn',
    'spaced-comment': 'warn',
    'switch-colon-spacing': 'warn',
    'template-tag-spacing': 'warn',
    'unicode-bom': 'warn',
    'wrap-regex': 'warn',

    // ECMAScript 6
    'arrow-body-style': ['warn', 'as-needed'],
    'arrow-parens': 'warn',
    'arrow-spacing': 'warn',
    'generator-star-spacing': 'warn',
    'no-confusing-arrow': 'warn',
    'no-duplicate-imports': 'warn',
    'no-restricted-exports': 'warn',
    'no-restricted-imports': 'warn',
    'no-useless-computed-key': 'warn',
    'no-useless-constructor': 'warn',
    'no-useless-rename': 'warn',
    'no-var': 'warn',
    'object-shorthand': 'warn',
    'prefer-arrow-callback': 'warn',
    'prefer-const': 'warn',
    'prefer-destructuring': 'warn',
    'prefer-numeric-literals': 'warn',
    'prefer-rest-params': 'warn',
    'prefer-spread': 'warn',
    'prefer-template': 'warn',
    'rest-spread-spacing': 'warn',
    'sort-imports': ['off', {
        'ignoreCase': true,
        'ignoreDeclarationSort': false,
        'ignoreMemberSort': false,
        'memberSyntaxSortOrder': ['none', 'all', 'multiple', 'single'],
        'allowSeparatedGroups': true
    }],
    'symbol-description': 'warn',
    'template-curly-spacing': 'warn',
    'yield-star-spacing': 'warn'
};

const excludedBaseRulesFromTypescript = {
    'class-methods-use-this': 'off',
    'brace-style': 'off',
    'comma-dangle': 'off',
    'comma-spacing': 'off',
    'default-param-last': 'off',
    'dot-notation': 'off',
    'func-call-spacing': 'off',
    'indent': 'off',
    'init-declarations': 'off',
    'keyword-spacing': 'off',
    'lines-between-class-members': 'off',
    'no-array-constructor': 'off',
    'no-dupe-class-members': 'off',
    'no-duplicate-imports': 'off',
    'no-empty-function': 'off',
    'no-extra-parens': 'off',
    'no-extra-semi': 'off',
    'no-implied-eval': 'off',
    'no-invalid-this': 'off',
    'no-loop-func': 'off',
    'no-loss-of-precision': 'off',
    'no-magic-numbers': 'off',
    'no-redeclare': 'off',
    'no-shadow': 'off',
    'no-throw-literal': 'off',
    'no-unused-expressions': 'off',
    'no-unused-vars': 'off',
    'no-use-before-define': 'off',
    'no-useless-constructor': 'off',
    'object-curly-spacing': 'off',
    'quotes': 'off',
    'require-await': 'off',
    'return-await': 'off',
    'semi': 'off',
    'space-before-function-paren': 'off',
    'space-infix-ops': 'off'
};

/*
 * https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
 */
const typescriptRules = {

    // Overrided recommended rules
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-unsafe-return': 'warn',
    '@typescript-eslint/no-unsafe-assignment': 'warn',
    '@typescript-eslint/no-unsafe-member-access': 'warn',
    '@typescript-eslint/no-unsafe-call': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-empty-interface': ['warn', { allowSingleExtends: false }],
    '@typescript-eslint/no-unnecessary-type-constraint': 'warn',
    '@typescript-eslint/no-unsafe-argument': 'warn',
    '@typescript-eslint/no-unnecessary-type-assertion': 'warn',

    // Optional Rules
    '@typescript-eslint/array-type': ['warn', { default: 'generic' }],
    '@typescript-eslint/ban-tslint-comment': 'warn',
    '@typescript-eslint/class-literal-property-style': 'warn',
    '@typescript-eslint/consistent-indexed-object-style': 'warn',
    '@typescript-eslint/consistent-type-assertions': 'warn',
    '@typescript-eslint/consistent-type-definitions': 'warn',
    '@typescript-eslint/consistent-type-exports': 'warn',
    '@typescript-eslint/consistent-type-imports': ['off', { prefer: 'type-imports' }],
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/explicit-member-accessibility': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'warn',
    '@typescript-eslint/member-delimiter-style': 'warn',
    '@typescript-eslint/member-ordering': 'off',
    '@typescript-eslint/method-signature-style': 'off',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/no-base-to-string': 'warn',
    '@typescript-eslint/no-confusing-non-null-assertion': 'warn',
    '@typescript-eslint/no-confusing-void-expression': 'warn',
    '@typescript-eslint/no-duplicate-enum-values': 'warn',
    '@typescript-eslint/no-dynamic-delete': 'warn',
    '@typescript-eslint/no-extraneous-class': 'warn',
    '@typescript-eslint/no-invalid-void-type': 'warn',
    '@typescript-eslint/no-meaningless-void-operator': 'warn',
    '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'warn',
    '@typescript-eslint/no-redundant-type-constituents': 'warn',
    '@typescript-eslint/no-require-imports': 'warn',
    '@typescript-eslint/no-type-alias': 'off',
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'warn',
    '@typescript-eslint/no-unnecessary-condition': 'warn',
    '@typescript-eslint/no-unnecessary-qualifier': 'warn',
    '@typescript-eslint/no-unnecessary-type-arguments': 'warn',
    '@typescript-eslint/no-useless-empty-export': 'warn',
    '@typescript-eslint/non-nullable-type-assertion-style': 'off', // disables linting to ! form as
    '@typescript-eslint/parameter-properties': ['warn', { allow: ['public'] }],
    '@typescript-eslint/prefer-enum-initializers': 'warn',
    '@typescript-eslint/prefer-for-of': 'warn',
    '@typescript-eslint/prefer-function-type': 'warn',
    '@typescript-eslint/prefer-includes': 'warn',
    '@typescript-eslint/prefer-literal-enum-member': 'warn',
    '@typescript-eslint/prefer-nullish-coalescing': ['warn', { ignoreConditionalTests: true }],
    '@typescript-eslint/prefer-optional-chain': 'warn',
    '@typescript-eslint/prefer-readonly': 'warn',
    '@typescript-eslint/prefer-readonly-parameter-types': 'off',
    '@typescript-eslint/prefer-reduce-type-parameter': 'warn',
    '@typescript-eslint/prefer-regexp-exec': 'warn',
    '@typescript-eslint/prefer-return-this-type': 'warn',
    '@typescript-eslint/prefer-string-starts-ends-with': 'warn',
    '@typescript-eslint/prefer-ts-expect-error': 'warn',
    '@typescript-eslint/promise-function-async': 'warn',
    '@typescript-eslint/require-array-sort-compare': 'warn',
    '@typescript-eslint/sort-type-union-intersection-members': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/switch-exhaustiveness-check': 'warn',
    '@typescript-eslint/type-annotation-spacing': 'warn',
    '@typescript-eslint/typedef': 'warn',
    '@typescript-eslint/unbound-method': 'warn',
    '@typescript-eslint/unified-signatures': 'warn',

    // Extension Rules - same as base rules, but for typescript
    '@typescript-eslint/brace-style': 'warn',
    '@typescript-eslint/comma-dangle': 'warn',
    '@typescript-eslint/comma-spacing': 'warn',
    '@typescript-eslint/default-param-last': 'warn',
    '@typescript-eslint/dot-notation': 'warn',
    '@typescript-eslint/func-call-spacing': 'warn',
    '@typescript-eslint/indent': ['warn', indent],
    '@typescript-eslint/init-declarations': 'off',
    '@typescript-eslint/keyword-spacing': 'off',
    '@typescript-eslint/lines-between-class-members': 'warn',
    '@typescript-eslint/no-dupe-class-members': 'warn',
    '@typescript-eslint/no-extra-parens': 'off',
    '@typescript-eslint/no-invalid-this': 'warn',
    '@typescript-eslint/no-loop-func': 'warn',
    '@typescript-eslint/no-loss-of-precision': 'warn',
    '@typescript-eslint/no-magic-numbers': 'off',
    '@typescript-eslint/no-redeclare': 'warn',
    '@typescript-eslint/no-restricted-imports': 'warn',
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/no-throw-literal': 'warn',
    '@typescript-eslint/no-unused-expressions': 'warn',
    '@typescript-eslint/no-use-before-define': 'warn',
    '@typescript-eslint/no-useless-constructor': 'warn',
    '@typescript-eslint/object-curly-spacing': ['warn', 'always'],
    '@typescript-eslint/padding-line-between-statements': 'warn',
    '@typescript-eslint/quotes': ['warn', 'single'],
    '@typescript-eslint/return-await': 'warn',
    '@typescript-eslint/semi': 'warn',
    '@typescript-eslint/space-before-blocks': 'warn',
    '@typescript-eslint/space-before-function-paren': ['warn', { anonymous: 'always', named: 'never', asyncArrow: 'always' }],
    '@typescript-eslint/space-infix-ops': 'warn'
};

const lifecycleHooks =
    // eslint-disable-next-line max-len
    'beforeCreate|created|beforeMount|mounted|beforeUpdate|updated|beforeDestroy|destroyed|beforeEach|beforeRouteEnter|beforeRouteUpdate|beforeRouteLeave';

const typescriptPluginsRules = {
    'typescript-sort-keys/interface': ['warn', 'asc', { caseSensitive: true, natural: true }],
    'typescript-sort-keys/string-enum': 'warn',

    // https://github.com/bryanrsmith/eslint-plugin-sort-class-members
    'sort-class-members/sort-class-members': [
        'warn',
        {
            accessorPairPositioning: 'getThenSet',
            groups: {
                'inject': [{ groupByDecorator: 'Inject', type: 'property' }],
                'refs': [{ groupByDecorator: 'Ref', type: 'property' }],
                'props': [{ groupByDecorator: 'Prop', type: 'property' }],
                'lifecycle-hooks': [{ name: `/^(${lifecycleHooks})$/`, type: 'method' }],
                'watchers': [{ groupByDecorator: 'Watch', type: 'method' }],
                'emitters': [{ groupByDecorator: 'Emit', type: 'method' }],
                'mutations': [{ groupByDecorator: 'Mutation', type: 'method' }],
                'actions': [{ groupByDecorator: 'Action', type: 'method' }]
            },
            locale: 'en-US',
            order: [
                '[inject]',
                '[refs]',
                '[props]',
                '[static-properties]',
                '[properties]',
                '[conventional-private-properties]',
                'constructor',
                '[lifecycle-hooks]',
                '[accessor-pairs]',
                '[getters]',
                '[setters]',
                '[static-methods]',
                '[methods]',
                '[async-methods]',
                '[conventional-private-methods]',
                '[watchers]',
                '[emitters]',
                '[mutations]',
                '[actions]',
                '[everything-else]'
            ],
            stopAfterFirstProblem: false
        }
    ]
};

const excludedBaseRulesFromVue = {
    'eol-last': 'off',
    'max-len': 'off',
    'max-lines': 'off',
    'no-trailing-spaces': 'off',
    'unicode-bom': 'off'
};

const excludedTypescriptRulesFromVue = {
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/no-magic-numbers': 'off',
    '@typescript-eslint/member-ordering': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/sort-keys': 'off'
};

/*
 * https://eslint.vuejs.org/rules/
 */
const vueRules = {
    'vue/block-lang': ['warn', { script: { lang: 'ts' } }],
    'vue/component-api-style': 'off',
    'vue/component-name-in-template-casing': ['warn', 'PascalCase', { registeredComponentsOnly: true, ignores: [] }],
    'vue/component-options-name-casing': ['warn', 'PascalCase'],
    'vue/custom-event-name-casing': 'warn',
    'vue/html-button-has-type': 'warn',
    'vue/match-component-file-name': 'warn',
    'vue/match-component-import-name': 'warn',
    'vue/next-tick-style': 'warn',
    'vue/no-bare-strings-in-template': 'warn',
    'vue/no-boolean-default': ['warn', 'default-false'],
    'vue/no-child-content': 'warn',
    'vue/no-duplicate-attr-inheritance': 'warn',
    'vue/no-empty-component-block': 'warn',
    'vue/no-expose-after-await': 'warn',
    'vue/no-invalid-model-keys': 'warn',
    'vue/no-multiple-objects-in-class': 'warn',
    'vue/no-potential-component-option-typo': 'warn',
    'vue/no-reserved-component-names': 'warn',
    'vue/no-restricted-block': ['off'],
    'vue/no-restricted-call-after-await': ['off'],
    'vue/no-restricted-class': ['off'],
    'vue/no-restricted-component-options': ['off'],
    'vue/no-restricted-custom-event': ['off'],
    'vue/no-restricted-html-elements': ['off'],
    'vue/no-restricted-props': ['off'],
    'vue/no-restricted-static-attribute': ['off'],
    'vue/no-restricted-v-bind': ['off'],
    'vue/no-static-inline-styles': ['warn', { allowBinding: false }],
    'vue/no-template-target-blank': 'warn',
    'vue/no-this-in-before-route-enter': 'warn',
    'vue/no-undef-components': ['off', { ignorePatterns: ['v-'] }], // not working with Component decorator
    'vue/no-undef-properties': 'warn',
    'vue/no-unsupported-features': ['warn', { version: vueVersion, ignores: [] }],
    'vue/no-unused-properties': 'warn',
    'vue/no-unused-refs': 'off', // not working for decorators
    'vue/no-use-computed-property-like-method': 'warn',
    'vue/no-useless-mustaches': 'warn',
    'vue/no-useless-v-bind': 'warn',
    'vue/no-v-text-v-html-on-component': 'warn',
    'vue/no-v-text': 'warn',
    'vue/prefer-import-from-vue': 'warn',
    'vue/prefer-prop-type-boolean-first': 'warn',
    'vue/prefer-separate-static-class': 'warn',
    'vue/prefer-true-attribute-shorthand': 'warn',
    'vue/require-direct-export': ['off', { disallowFunctionalComponentFunction: false }],
    'vue/require-emit-validator': 'warn',
    'vue/require-expose': 'warn',
    'vue/require-name-property': 'off',
    'vue/script-indent': ['warn', indent, { baseIndent: 0, ignores: [], switchCase: 1 }],
    'vue/sort-keys': ['warn', 'asc', { caseSensitive: true, minKeys: 2, natural: true }],
    'vue/static-class-names-order': 'warn',
    'vue/v-for-delimiter-style': 'warn',
    'vue/v-on-function-call': ['warn', 'never'],

    // Style rules
    'vue/block-tag-newline': ['warn', {
        blocks: {
            script: {
                maxEmptyLines: 1
            }
        }
    }],
    'vue/define-macros-order': 'warn',
    'vue/html-comment-content-newline': 'warn',
    'vue/html-comment-content-spacing': 'warn',
    'vue/html-comment-indent': ['warn', indent],
    'vue/new-line-between-multi-line-property': ['warn'],
    'vue/padding-line-between-blocks': 'warn',

    // Extension Rules - base rules but for template
    'vue/array-bracket-newline': 'warn',
    'vue/array-bracket-spacing': 'warn',
    'vue/arrow-spacing': 'warn',
    'vue/block-spacing': 'warn',
    'vue/brace-style': 'warn',
    'vue/camelcase': 'off',
    'vue/comma-dangle': 'warn',
    'vue/comma-spacing': 'warn',
    'vue/comma-style': 'warn',
    'vue/dot-location': ['warn', 'property'],
    'vue/dot-notation': 'warn',
    'vue/eqeqeq': 'warn',
    'vue/func-call-spacing': 'warn',
    'vue/key-spacing': 'warn',
    'vue/keyword-spacing': 'warn',
    'vue/max-len': [
        'warn',
        {
            code: lineLength,
            template: lineLength,
            tabWidth: indent,
            comments: lineLength,
            ignorePattern: '',
            ignoreComments: false,
            ignoreTrailingComments: false,
            ignoreUrls: false,
            ignoreStrings: false,
            ignoreTemplateLiterals: false,
            ignoreRegExpLiterals: false,
            ignoreHTMLAttributeValues: false,
            ignoreHTMLTextContents: false
        }
    ],
    'vue/html-indent': [
        'warn',
        indent,
        {
            attribute: 1,
            baseIndent: 1,
            closeBracket: 0,
            alignAttributesVertically: false,
            ignores: []
        }
    ],
    'vue/no-constant-condition': 'warn',
    'vue/no-empty-pattern': 'warn',
    'vue/no-extra-parens': 'warn',
    'vue/no-irregular-whitespace': 'warn',
    'vue/no-loss-of-precision': 'warn',
    'vue/no-restricted-syntax': 'warn',
    'vue/no-sparse-arrays': 'warn',
    'vue/no-useless-concat': 'warn',
    'vue/object-curly-newline': 'warn',
    'vue/object-curly-spacing': ['warn', 'always'],
    'vue/object-property-newline': ['warn', { allowMultiplePropertiesPerLine: true }],
    'vue/object-shorthand': 'warn',
    'vue/operator-linebreak': 'warn',
    'vue/prefer-template': 'warn',
    'vue/quote-props': 'warn',
    'vue/space-in-parens': 'warn',
    'vue/space-infix-ops': 'warn',
    'vue/space-unary-ops': 'warn',
    'vue/template-curly-spacing': 'warn'
};

const packagejsonRules = {
    'jsonc/sort-array-values': [
        'warn',
        {
            pathPattern: '^files$', // Hits the files property
            order: { type: 'asc' }
        },
        {
            pathPattern: '^keywords$', // Hits the keywords property
            order: [
                'eslint',
                'eslintplugin',
                'eslint-plugin',
                {
                    order: { type: 'asc' }
                }
            ]
        }
    ],
    'jsonc/indent': ['warn', indent, {}],
    'jsonc/sort-keys': [
        'warn',
        {
            pathPattern: '^$', // Hits the root properties
            order: [
                'name',
                'version',
                'description',
                'scripts',
                'peerDependencies',
                'dependencies',
                'devDependencies',
                'optinalDependencies',
                'private',
                'contributors',
                'homepage',
                'bugs',
                'type',
                'main',
                'module',
                'types',
                'repository',
                'publishConfig',
                'files',
                'style',
                'sideEffects',
                { order: { type: 'asc', caseSensitive: true, natural: true } }

            ]
        },
        {
            pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies$',
            order: [{ order: { type: 'asc', caseSensitive: true, natural: true } }]
        },
        {
            pathPattern: '^scripts$',
            order: [{ order: { type: 'asc', caseSensitive: true, natural: true } }]
        }
    ]
};

const configJsonRules = {
    'jsonc/indent': ['warn', indent, {}],
    'jsonc/sort-keys': [
        'warn',
        {
            pathPattern: '^$', // Hits the root properties
            order: [
                'name',
                'version',
                'defaultLocale',
                'connections',
                'analytics',
                'keycloak',
                'sentryDsn',
                'tables',
                { order: { type: 'asc', caseSensitive: true, natural: true } }

            ]
        }
    ]
};

const jsoncRules = {
    'jsonc/sort-array-values': 'off',
    'jsonc/indent': ['warn', indent, {}],
    'jsonc/sort-keys': [
        'warn',
        {
            pathPattern: '.*', // Hits the root properties
            order: [{ order: { type: 'asc', caseSensitive: true, natural: true } }]
        }
    ]
};

const plugins = [
    'jsdoc',
    'import',
    'sort-keys-fix',
    '@typescript-eslint',
    'typescript-sort-keys',
    'sort-class-members'
];

const baseExtends = [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:jsdoc/recommended',
    'plugin:markdown/recommended'
];

const typescriptExtends = [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/typescript'
];
const vueExtends = [
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript'
];

const jsoncExtends = [
    'plugin:jsonc/base',
    'plugin:jsonc/recommended-with-json',
    'plugin:jsonc/recommended-with-jsonc'
];

module.exports = {
    root: true,
    env,
    extends: [...baseExtends],
    overrides: [
        // Html overrides
        {
            extends: ['plugin:@html-eslint/recommended'],
            plugins: ['@html-eslint'],
            parser: '@html-eslint/parser',
            files: ['**/*.html']
        },
        // Markdown overrides
        {
            extends: [...baseExtends],
            plugins: ['markdown'],
            files: ['**/*.md'],
            processor: 'markdown/markdown',
            rules: {
                ...baseRules
            }
        },
        // JSON overrides
        {
            files: ['**/*.json'],
            extends: [...baseExtends, ...jsoncExtends],
            parser: 'jsonc-eslint-parser',
            parserOptions: {
                jsonSyntax: 'JSON'
            },
            rules: jsoncRules
        },
        {
            files: ['package.json'],
            extends: [...baseExtends, ...jsoncExtends],
            parser: 'jsonc-eslint-parser',
            parserOptions: {
                jsonSyntax: 'JSON'
            },
            rules: packagejsonRules
        },
        {
            files: ['public/config*.json', 'tests/fixtures/public/config*.json'],
            extends: [...baseExtends, ...jsoncExtends],
            parser: 'jsonc-eslint-parser',
            parserOptions: {
                jsonSyntax: 'JSON'
            },
            rules: configJsonRules
        },
        // Javascript overrides
        {
            extends: [...baseExtends],
            env,
            files: ['**/*.js', '**/*.cjs'],
            parser: '@babel/eslint-parser',
            parserOptions: {
                ecmaVersion,
                requireConfigFile: false,
                babelOptions: {
                    babelrc: false,
                    configFile: false,
                    presets: ['@babel/preset-env']
                }
            },
            rules: {
                ...baseRules
            }
        },
        // Vue overrides
        {
            extends: [...baseExtends, ...vueExtends],
            env,
            files: ['**/*.vue'],
            parser: 'vue-eslint-parser',
            parserOptions: {
                parser: '@typescript-eslint/parser',
                ecmaVersion,
                sourceType: 'module',
                tsconfigRootDir: './',
                project: [
                    './tsconfig.app.json',
                    './tsconfig.node.json',
                    './tsconfig.vitest.json',
                    './tests/support/tsconfig.json'
                ]
            },
            plugins,
            rules: {
                ...baseRules,
                ...excludedBaseRulesFromTypescript,
                ...excludedBaseRulesFromVue,
                ...typescriptRules,
                ...typescriptPluginsRules,
                ...excludedTypescriptRulesFromVue,
                ...vueRules
            },
            settings: {
                'import/extensions': [
                    '.js',
                    '.jsx',
                    '.mjs',
                    '.ts',
                    '.tsx',
                    '.vue'
                ],
                'import/ignore': ['\\.(vue)$'],
                'import/resolver': {
                    'alias': {
                        map: [['@', './src']],
                        extensions: ['.vue', '.json', '.js', '.ts']
                    },
                    'typescript': {
                        tsconfigRootDir: './',
                        project: [
                            './tsconfig.app.json',
                            './tsconfig.node.json',
                            './tsconfig.vitest.json',
                            './tests/support/tsconfig.json'
                        ]
                    }
                },
                'import/parsers': {
                    '@typescript-eslint/parser': ['.ts', '.tsx']
                }
            }
        },
        // Typescript overrides
        {
            extends: [...baseExtends, ...typescriptExtends],
            env,
            files: ['**/*.ts', '**/*.tsx'],
            parserOptions: {
                parser: '@typescript-eslint/parser',
                ecmaVersion,
                sourceType: 'module',
                tsconfigRootDir: './',
                project: [
                    './tsconfig.app.json',
                    './tsconfig.node.json',
                    './tsconfig.vitest.json',
                    './tests/support/tsconfig.json'
                ],
                extraFileExtensions: ['.vue']
            },
            plugins,
            rules: {
                ...baseRules,
                ...excludedBaseRulesFromTypescript,
                ...typescriptRules,
                ...typescriptPluginsRules
            },
            settings: {
                'import/extensions': [
                    '.js',
                    '.jsx',
                    '.mjs',
                    '.ts',
                    '.tsx',
                    '.vue'
                ],
                'import/ignore': ['\\.(vue)$'],
                'import/core-modules': ['@intlify/unplugin-vue-i18n/messages'],
                'import/resolver': {
                    'alias': {
                        map: [['@', './src']],
                        extensions: ['.vue', '.json', '.js', '.ts']
                    },
                    'typescript': {
                        tsconfigRootDir: './',
                        project: [
                            './tsconfig.app.json',
                            './tsconfig.node.json',
                            './tsconfig.vitest.json',
                            './tests/support/tsconfig.json'
                        ]
                    }
                },
                'import/parsers': {
                    '@typescript-eslint/parser': ['.ts', '.tsx']
                }
            }
        },
        // Cypress tests overrides
        {
            extends: ['plugin:cypress/recommended', ...baseExtends, ...typescriptExtends],
            env: {
                'cypress/globals': true,
                'mocha': false
            },
            files: [
                'tests/e2e/**/*.{js,ts,jsx,tsx}',
                'tests/support/**/*.{js,ts,jsx,tsx}',
                'tests/component/**/*.{js,ts,jsx,tsx}'
            ],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                parser: '@typescript-eslint/parser',
                ecmaVersion,
                sourceType: 'module',
                tsconfigRootDir: './',
                project: [
                    './tsconfig.app.json',
                    './tsconfig.node.json',
                    './tsconfig.vitest.json',
                    './tests/support/tsconfig.json'
                ]
            },
            plugins: ['cypress', ...plugins],
            rules: {
                ...baseRules,
                ...excludedBaseRulesFromTypescript,
                ...typescriptRules,
                ...typescriptPluginsRules,
                'spaced-comment': 'off',
                '@typescript-eslint/triple-slash-reference': 'off',
                'cypress/no-unnecessary-waiting': 'warn'
            },
            settings: {
                'import/extensions': [
                    '.js',
                    '.jsx',
                    '.mjs',
                    '.ts',
                    '.tsx',
                    '.vue'
                ],
                'import/ignore': ['\\.(vue)$'],
                'import/resolver': {
                    'alias': {
                        map: [['@', './src']],
                        extensions: ['.vue', '.json', '.js', '.ts']
                    },
                    'typescript': {
                        tsconfigRootDir: './',
                        project: [
                            './tsconfig.app.json',
                            './tsconfig.node.json',
                            './tsconfig.vitest.json',
                            './tests/support/tsconfig.json'
                        ]
                    }
                },
                'import/parsers': {
                    '@typescript-eslint/parser': ['.ts', '.tsx']
                }
            }
        }
    ]
};

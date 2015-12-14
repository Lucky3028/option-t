/*eslint quote-props: [2, "always"] */

'use strict';

// ESLint Configuration Files enables to include comments.
// http://eslint.org/docs/configuring/#comments-in-configuration-files
module.exports = {
    'extends': 'eslint:recommended',

    'ecmaFeatures': {
        'arrowFunctions': true,
        'blockBindings': true,
        'classes': true,
        'objectLiteralComputedProperties': true,
        'objectLiteralDuplicateProperties': true,
        'objectLiteralShorthandMethods': true,
        'objectLiteralShorthandProperties': true
    },

    'env': {
        'node': true,
    },

    'root': true,

    'rules': {
        // Possible Errors
        'comma-dangle': [0, 'never'],
        'no-constant-condition': 1,
        'no-console': 0,
        'no-debugger': 1,
        'no-extra-boolean-cast': 0,
        'no-extra-parens': 0,
        'valid-jsdoc': [2, {
            'requireReturn': true,
            'requireParamDescription': false,
            'requireReturnDescription': false
        }],
        'no-unexpected-multiline': 1,

        // Best Practices
        'block-scoped-var': 1,
        'curly': 2,
        'no-alert': 1,
        'no-caller': 1,
        'no-div-regex': 2,
        'no-eq-null': 2,
        'no-invalid-this': 1,
        'no-param-reassign': [1, {
            'props': true
        }],
        'no-throw-literal': 2,
        'no-unused-expressions': 2,
        'no-useless-call': 1,
        'radix': 2,

        // Strict Mode
        'strict': [2, 'global'],

        // Variables
        'init-declarations': [2, 'always'],
        'no-shadow': 0,
        'no-unused-vars': 0,
        'no-use-before-define': 0,

        // Node.js
        'no-process-exit': 0,
        'global-require': 2,

        // Stylistic Issues
        'indent': [2, 4, {
            'SwitchCase': 1,
        }],
        'comma-spacing': [2, {
            'before': false,
            'after': true
        }],
        'comma-style': [2, 'last'],
        'linebreak-style': [2, 'unix'],
        'no-mixed-spaces-and-tabs': 2,
        'no-unneeded-ternary': 2,
        'no-underscore-dangle': 0,
        'operator-linebreak': [2, 'after'],
        'quotes': [2, 'single', 'avoid-escape'],
        'semi': [2, 'always'],
        'space-unary-ops': [2, {
            'words': true,
            'nonwords': false
        }],
        'spaced-comment': 0,

        // ECMAScript 6
        'arrow-parens': 1,
        'arrow-spacing': [1, {
            'before': true,
            'after': true
        }],
        'constructor-super': 2,
        'generator-star-spacing': [2, {
            'before': false,
            'after': true
        }],
        'no-class-assign': 2,
        'no-const-assign': 2,
        'no-dupe-class-members': 2,
        'no-this-before-super': 2,
        'no-var': 1,
        'object-shorthand': 0,
        'prefer-const': 1,
        'prefer-reflect': 1,
        'prefer-spread': 1,
        'require-yield': 2,
    }
};

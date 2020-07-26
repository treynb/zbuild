const program = require('commander');
const { ESLint } = require('eslint');

program
  .command('lint')
  .action(async () => {
    const eslint = new ESLint({
      extensions: ['.tsx', '.ts', '.js'],
      baseConfig: {
        parser: '@typescript-eslint/parser',
        plugins: [
          '@typescript-eslint',
        ],
        parserOptions: {
          tsconfigRootDir: process.cwd(),
          project: './tsconfig.json',
        },
        env: {
          browser: true,
        },
        extends: [
          'airbnb-typescript',
          'airbnb/hooks',
          'plugin:@typescript-eslint/recommended-requiring-type-checking'
        ],
        rules: {
          'import/prefer-default-export': 'off',
          'react/jsx-one-expression-per-line': 'off',
          'jsx-a11y/click-events-have-key-events': 'off',
          'jsx-a11y/no-static-element-interactions': 'off',
          '@typescript-eslint/no-floating-promises': ['error', { ignoreIIFE: true }],
          'jsx-a11y/no-noninteractive-element-interactions': 'off',
        },
      }
    });

    const results = await eslint.lintFiles(['src']);
    const formatter = await eslint.loadFormatter('stylish');
    const resultText = formatter.format(results);
    if (resultText) console.log(resultText);
  });

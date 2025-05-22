const baseConfig = require('./.eslintrc.json');

module.exports = {
  ...baseConfig,
  parserOptions: {
    ...baseConfig.parserOptions,
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  settings: {
    ...baseConfig.settings,
    'import/resolver': {
      ...baseConfig.settings?.['import/resolver'],
      typescript: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
  },
};

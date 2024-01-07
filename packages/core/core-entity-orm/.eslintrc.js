/** @type { import("eslint").ESLint.ConfigData } */
module.exports = {
  extends: '@nestjs-api-example/eslint-config',
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
};

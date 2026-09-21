// Conventional Commits: <type>(<scope>): <summary>. Types come from
// @commitlint/config-conventional (feat, fix, chore, docs, refactor...).
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 72],
    'subject-case': [0], // allow capitalized proper nouns (Figma, API...)
  },
};

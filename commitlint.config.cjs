/**
 * Conventional Commits: <tipo>(<scope opcional>): <resumen en imperativo>
 * Ej: "feat(cart): add remove item button"
 *
 * Tipos permitidos: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
 * (config-conventional). El scope es libre (nombre de vista/módulo).
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 72],
    'subject-case': [0], // permite mayúsculas en nombres propios (Figma, API, etc.)
  },
};

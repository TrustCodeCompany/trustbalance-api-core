module.exports = {
  //plugins: ['commitlint-plugin-es'],
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // Nuevas características
        'fix',      // Correcciones de errores
        'docs',     // Documentación
        'style',    // Cambios de estilo (formato, espacios, etc)
        'refactor', // Refactorización de código
        'perf',     // Mejoras de rendimiento
        'test',     // Añadir o modificar pruebas
        'chore',    // Tareas de mantenimiento
        'ci',       // Cambios en la integración continua
        'build',    // Sistema de construcción o dependencias externas
        'revert'    // Revierte un commit anterior
      ],
    ],
    'subject-case': [
      2,
      'always',
      ['lower-case', 'sentence-case'],
    ],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
  },
};

require('dotenv').config();

// jest.config.js o jest.config.ts
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testEnvironmentOptions: {
        url: 'http://localhost:8083/api'
    },
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1', // Ajusta esto según tu estructura de directorios
    },
    // Otras opciones de configuración de Jest aquí
};

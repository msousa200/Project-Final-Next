/* eslint-disable @typescript-eslint/no-require-imports */
// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Forneça o caminho para seu app Next.js
  dir: './',
})

// Configuração personalizada do Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.json',
    }],
  },
}

// createJestConfig é exportado para que possamos usá-lo em scripts adicionais
module.exports = createJestConfig(customJestConfig)
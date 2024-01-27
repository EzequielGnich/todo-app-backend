import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  rootDir: 'src',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node'
};

export default config;

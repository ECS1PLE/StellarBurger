module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testMatch: ["**/*.test.ts"], // Только файлы с расширением .test.ts
};
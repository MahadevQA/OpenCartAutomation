import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 30 * 1000,
  testDir: './tests',
  fullyParallel: true, 
  //retries: process.env.CI ? 2 : 0,
  retries: 1,
  //workers: process.env.CI ? 1 : undefined,
  workers: 1,

  reporter:[
    ['html', {outputFolder:'../reports/html-reports'}],
    ['allure-playwright', {outputFolder:'reports/allure-results'}],
    // ['dot'],
    // ['list']
  ],
   
  use: {
    baseURL: 'https://tutorialsninja.com/demo/',
    trace: 'on-first-retry',
    screenshot: 'on-first-failure',
    video: 'retain-on-failure',
    //headless: false,
    viewport: {width:1280, height:720},  // Set default viewport size for consistency
    ignoreHTTPSErrors: true,   // Ignore SSL errors if necessary
    permissions: ['geolocation'],  // Set necessary permission for geolocation-based tests
  },

  //grep:/@master/,
  
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] }},
    //{ name: 'firefox', use: { ...devices['Desktop Firefox'] }},
    //{ name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});




/**
 * open allure report 
 * allure generate ./allure-results -o ./allure-report --clean
 * allure generate ./allure-results -o ./allure-report
 * allure open ./allure-report
 */

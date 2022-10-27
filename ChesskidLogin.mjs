import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config({ path: `.env.local` });

import puppeteer from "puppeteer";

(async () => {
  console.log("env for", `${process.env.CHESSKID_USERNAME}`);

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://www.chesskid.com/login");
  await page.click('[data-cy="username"]');
  await page.type('[data-cy="username"]', `${process.env.CHESSKID_USERNAME}`);
  await page.click('[data-cy="password"]');
  await page.type('[data-cy="password"]', `${process.env.CHESSKID_PASSWORD}`);
  await page.click('[data-cy="login-button"]');
  // wait for the page
  await page.waitForNavigation();
  // get the cookie
  const cookies = await page.cookies();
  const cookie = cookies.find((c) => c.name == "PHPSESSID");

  console.log("cookie", cookie["value"]);

  // close the browser
  await browser.close();
})();

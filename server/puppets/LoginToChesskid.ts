import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config({ path: `.env.local` });

import puppeteer from "puppeteer";

export default async function loginToChesskid(
  username: string,
  password: string
): Promise<string> {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://www.chesskid.com/login");
  await page.click('[data-cy="username"]');
  await page.type('[data-cy="username"]', username);
  await page.click('[data-cy="password"]');
  await page.type('[data-cy="password"]', password);
  await page.click('[data-cy="login-button"]');
  // wait for the page
  await page.waitForNavigation();
  // get the cookie
  const cookies = await page.cookies();
  const cookie = cookies.find((c) => c.name == "PHPSESSID");
  if (!cookie) {
    throw new Error("No cookie found");
  }
  await browser.close();

  // close the browser
  return cookie["value"];
}

// @ts-check
import { test, expect } from '@playwright/test'

const LOCALHOST_URL = 'http://localhost:5173'
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

test('app show random facts and imge', async ({ page }) => {
  await page.goto(LOCALHOST_URL)

  // Expect a title "to contain" a substring.
 // await expect(page).toHaveTitle(/Playwright/);
  const text = await page.getByRole('paragraph')
  const image = await page.$$('img')

  const textContent = await text.textContent()
  const imageSrc = await image[0].getAttribute('src')
 
  await expect(textContent?.length).toBeGreaterThan(0)
  await expect(imageSrc?.startsWith(CAT_PREFIX_IMAGE_URL)).toBeTruthy()
})

/*
test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
});*/

const { test, expect } = require('@playwright/test');

async function runTranslatorTest(page, inputText) {
  await page.goto('https://www.pixelssuite.com/chat-translator', {
    waitUntil: 'domcontentloaded',
    timeout: 90000
  });

  const inputBox = page.locator('textarea').first();
  const outputBox = page.locator('textarea').nth(1);

  await inputBox.fill(inputText);
  await page.locator('button:has-text("Transliterate")').click();

  await expect.poll(async () => {
    return await outputBox.inputValue();
  }, { timeout: 30000 }).not.toBe('');
}

const testCases = [
  'api adarei',
  'phone eka denna',
  'wifi thiyenawada',
  'password eka denna',
  'mama dinner ganna yanava',
  'zoom class eka',
  'heta exam ekak',
  'lab eke inna',
  'machan mata poddak call ekak denna puluwanda?',
  'api on the way enava',
  'mama feeling tired nisa gedara yanava',
  'link eka balanna https://abc.com',
  'email ekak yanna abc@gmail.com',
  'Rs 200 denna',
  'USD 50 kiyakda?',
  '1st dawasa hodai',
  'meeting eka 7:30pm',
  'chutta chutta kanna',
  'ma😊 ma sathutui',
  'ASAP enna'
];

for (const input of testCases) {
  test(`Translate: ${input}`, async ({ page }) => {
    await runTranslatorTest(page, input);
  });
}

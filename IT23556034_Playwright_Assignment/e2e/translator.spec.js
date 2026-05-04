const { test, expect } = require('@playwright/test');
const XLSX = require('xlsx');
const path = require('path');

const excelPath = path.join(__dirname, '../../IT23556034.xlsx');

function getCell(row, names) {
  for (const name of names) {
    if (row[name] !== undefined) return row[name];
  }
  return '';
}

const workbook = XLSX.readFile(excelPath);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

let rows = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

async function runTranslatorTest(page, tc, rowIndex) {
  await page.goto('https://www.pixelssuite.com/chat-translator', {
    waitUntil: 'domcontentloaded',
    timeout: 90000
  });

  const inputBox = page.locator('textarea').first();
  const outputBox = page.locator('textarea').nth(1);

  await inputBox.fill(tc.input);
  await page.locator('button:has-text("Transliterate")').click();
  await page.waitForTimeout(2000);

  let actual = '';

  try {
    await expect.poll(async () => {
      return await outputBox.inputValue();
    }, { timeout: 60000 }).not.toBe('');

    actual = await outputBox.inputValue();
  } catch (e) {
    actual = 'No output';
  }

  const status = actual === tc.expected ? 'Pass' : 'Fail';

  rows[rowIndex]['Actual output'] = actual;
  rows[rowIndex]['Status'] = status;

  const newWorksheet = XLSX.utils.json_to_sheet(rows);
  workbook.Sheets[sheetName] = newWorksheet;
  XLSX.writeFile(workbook, excelPath);

  console.log(`\n${tc.id}`);
  console.log(`Input: ${tc.input}`);
  console.log(`Expected: ${tc.expected}`);
  console.log(`Actual: ${actual}`);
  console.log(`Status: ${status}`);

  expect(actual).toBe(tc.expected);
}

const testCases = rows.map((row, index) => ({
  id: getCell(row, ['TC ID', 'Test Case ID', 'ID']) || `TC_${index + 1}`,
  input: getCell(row, ['Input', 'Singlish Input', 'Input text']),
  expected: getCell(row, ['Expected output', 'Expected Output', 'Expected']),
  rowIndex: index
})).filter(tc => tc.input && tc.expected);

for (const tc of testCases) {
  test(`${tc.id} - ${tc.input}`, async ({ page }) => {
    await runTranslatorTest(page, tc, tc.rowIndex);
  });
}
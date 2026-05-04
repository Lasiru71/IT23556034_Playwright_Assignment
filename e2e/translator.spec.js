const { test, expect } = require('@playwright/test');

async function runTranslatorTest(page, tc) {
  await page.goto('https://www.pixelssuite.com/chat-translator', {
    waitUntil: 'domcontentloaded',
    timeout: 90000
  });

  const inputBox = page.locator('textarea').first();
  const outputBox = page.locator('textarea').nth(1);

  await inputBox.fill(tc.input);
  await page.locator('button:has-text("Transliterate")').click();
  await page.waitForTimeout(2000);

  await expect.poll(async () => {
    return await outputBox.inputValue();
  }, { timeout: 60000 }).not.toBe('');

  const actual = await outputBox.inputValue();

  console.log(`\n${tc.id}`);
  console.log(`Input: ${tc.input}`);
  console.log(`Expected: ${tc.expected}`);
  console.log(`Actual: ${actual}`);

  expect(actual).toBe(tc.expected);
}

const testCases = [
  { id: 'Neg_0001', input: 'oyta kawdda enne?', expected: 'ඔයාට කවදාද එන්නේ?' },
  { id: 'Neg_0002', input: 'mama yanava neda?', expected: 'මම යනවා නේද?' },
  { id: 'Neg_0003', input: 'wahma enna bn', expected: 'වහාම එන්න බන්' },
  { id: 'Neg_0004', input: 'mage potha denna', expected: 'මගේ පොතා දෙන්න' },
  { id: 'Neg_0005', input: 'ayubowan yaluwo', expected: 'ආයුබෝවන් යාලුවෝ' },
  { id: 'Neg_0006', input: 'suba dawasa', expected: 'සුභ දවසක්' },
  { id: 'Neg_0007', input: 'puluwannam enna', expected: 'පුළුවන්නම් එන්න' },
  { id: 'Neg_0008', input: 'podak balanna', expected: 'පොඩ්ඩක් බලන්න' },
  { id: 'Neg_0009', input: 'hari mm ennam', expected: 'හරි මම එන්නම්' },
  { id: 'Neg_0010', input: 'ane hari aiye call ekak denna', expected: 'අනේ හරි අයියේ කෝල් එකක් දෙන්න' },
  { id: 'Neg_0011', input: 'hari hari ennam…..', expected: 'හරි හරි එන්නම්' },
  { id: 'Neg_0012', input: 'chutta chutta kanna', expected: 'චුටා චුටා කන්න' },
  { id: 'Neg_0013', input: 'mama yanava…', expected: 'මම යනවා' },
  { id: 'Neg_0014', input: 'ane! phone ekak denna', expected: 'අනේ! ෆෝන් එකක් දෙන්න' },
  { id: 'Neg_0015', input: 'api adarei phone ekin', expected: 'අපි ආදරෙයි ෆෝන් එකින්' },
  { id: 'Neg_0016', input: 'api adareyiii', expected: 'අපි ආදරෙයි' },
  { id: 'Neg_0017', input: 'mama dinner ganna yanava', expected: 'මම ඩිනර් ගන්න යනවා' },
  { id: 'Neg_0018', input: 'phone eka denna', expected: 'ෆෝන් එක දෙන්න' },
  { id: 'Neg_0019', input: 'mama feeling tired nisa gedara yanava', expected: 'මම තෙහෙට්ටු වෙලා නිසා ගෙදර යනවා' },
  { id: 'Neg_0020', input: 'api on the way enava', expected: 'අපි එන ගමන්' },
  { id: 'Neg_0021', input: 'wifi thiyenawada', expected: 'වයිෆයි තියෙනවද' },
  { id: 'Neg_0022', input: 'password eka denna', expected: 'පාස්වර්ඩ් එක දෙන්න' },
  { id: 'Neg_0023', input: 'zoom class eka', expected: 'Zoom ක්ලාස් එක' },
  { id: 'Neg_0024', input: 'whatsapp msg ekak', expected: 'WhatsApp message එකක්' },
  { id: 'Neg_0025', input: 'ASAP enna', expected: 'ඉක්මනින් එන්න' },
  { id: 'Neg_0026', input: 'IT class ekak', expected: 'IT ක්ලාස් එකක්' },
  { id: 'Neg_0027', input: 'heta exam ekak', expected: 'හෙට එක්සෑම් එකක්' },
  { id: 'Neg_0028', input: 'lab eke inna', expected: 'ලැබ් එකේ ඉන්න' },
  { id: 'Neg_0029', input: 'api Colombo yanava', expected: 'අපි කොළඹ යනවා' },
  { id: 'Neg_0030', input: 'api Kandy giya', expected: 'අපි කැන්ඩි ගියා' },
  { id: 'Neg_0031', input: 'dasun hondatama gahala', expected: 'Dasun හොඳටම ගහලා' },
  { id: 'Neg_0032', input: 'sunil ada enava', expected: 'Sunil අද එනවා' },
  { id: 'Neg_0033', input: 'mama 3k gannawa', expected: 'මම තුනක් ගන්නවා' },
  { id: 'Neg_0034', input: '1st dawasa hodai', expected: 'පළමු දවස හොඳයි' },
  { id: 'Neg_0035', input: 'Rs 200 denna', expected: 'රුපියල් 200 දෙන්න' },
  { id: 'Neg_0036', input: 'USD 50 kiyakda?', expected: 'ඇමරිකානු ඩොලර් 50 කීයද?' },
  { id: 'Neg_0037', input: 'meeting eka 7:30pm', expected: 'මීටින් එක 7:30ට' },
  { id: 'Neg_0038', input: 'bus eka 12.00 yanava', expected: 'බස් එක 12.00 යනවා' },
  { id: 'Neg_0039', input: '2026-01-01 dinaya', expected: '2026-01-01 දිනය' },
  { id: 'Neg_0040', input: 'February 10 enna', expected: 'February 10 එන්න' },
  { id: 'Neg_0041', input: 'km 5 giya', expected: 'කිලෝමීටර් 5 ගියා' },
  { id: 'Neg_0042', input: 'adi 10 usa', expected: 'අඩි 10ක් උසයි' },
  { id: 'Neg_0043', input: 'uba mara hodai', expected: 'උබ මාර හොදයි' },
  { id: 'Neg_0044', input: 'elakiri bro', expected: 'එලකිරි බ්‍රෝ' },
  { id: 'Neg_0045', input: 'link eka balanna https://abc.com', expected: 'ලින්ක් එක බලන්න https://abc.com' },
  { id: 'Neg_0046', input: 'email ekak yanna abc@gmail.com', expected: 'ඊමේල් එකක් යන්න abc@gmail.com' },
  { id: 'Neg_0047', input: 'ma😊ma sathutui', expected: 'ම🙂ම සතුටුයි ' },
  { id: 'Neg_0048', input: 'mata ama😳rui', expected: 'මට අමාරුයි 😳' },
  { id: 'Neg_0049', input: 'machan mata poddak call ekak denna puluwanda?', expected: 'මචන් මට පොඩ්ඩක් කෝල් එකක් දෙන්න පුළුවන්ද?' },
  { id: 'Neg_0050', input: 'oya heta 8:15am ta Zoom meeting ekata enawada?', expected: 'ඔයා හෙට 8:15ට Zoom රැස්වීමට එනවද?' }
];

for (const tc of testCases) {
  test(`${tc.id} - ${tc.input}`, async ({ page }) => {
    await runTranslatorTest(page, tc);
  });
}

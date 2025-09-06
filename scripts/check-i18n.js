const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '..', 'src', 'i18n', 'locales');
const baselineLocale = 'en.json';

function flatten(obj, prefix = '') {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(result, flatten(value, fullKey));
    } else {
      result[fullKey] = true;
    }
  }
  return result;
}

function readJson(fp) {
  return JSON.parse(fs.readFileSync(fp, 'utf8'));
}

function main() {
  const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.json'));
  if (!files.includes(baselineLocale)) {
    console.error(`Baseline locale ${baselineLocale} not found in ${localesDir}`);
    process.exit(2);
  }
  const baseline = readJson(path.join(localesDir, baselineLocale));
  const baselineKeys = Object.keys(flatten(baseline));

  let hadMissing = false;

  for (const file of files) {
    if (file === baselineLocale) continue;
    const target = readJson(path.join(localesDir, file));
    const targetKeysMap = flatten(target);

    const missing = baselineKeys.filter(k => !targetKeysMap[k]);
    const extra = Object.keys(targetKeysMap).filter(k => !baselineKeys.includes(k));

    if (missing.length || extra.length) {
      console.log(`\nLocale: ${file}`);
      if (missing.length) {
        hadMissing = true;
        console.log(`  Missing keys (${missing.length}):`);
        for (const k of missing) console.log(`   - ${k}`);
      }
      if (extra.length) {
        console.log(`  Extra keys (${extra.length}):`);
        for (const k of extra) console.log(`   + ${k}`);
      }
    }
  }

  if (hadMissing) {
    console.error('\n❌ i18n coverage check failed: Some locales are missing keys.');
    process.exit(1);
  } else {
    console.log('\n✅ i18n coverage check passed: All locales have required keys.');
  }
}

main();

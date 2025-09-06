const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, '..', 'src', 'i18n', 'locales');
const baselineLocale = 'en.json';

function isPlainObject(v) {
  return v && typeof v === 'object' && !Array.isArray(v);
}

function addMissing(target, source) {
  let added = 0;
  for (const [key, srcVal] of Object.entries(source)) {
    if (!(key in target)) {
      target[key] = srcVal;
      added++;
      continue;
    }
    const tgtVal = target[key];
    if (isPlainObject(srcVal) && isPlainObject(tgtVal)) {
      added += addMissing(tgtVal, srcVal);
    }
  }
  return added;
}

function main() {
  const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.json'));
  if (!files.includes(baselineLocale)) {
    console.error(`Baseline locale ${baselineLocale} not found in ${localesDir}`);
    process.exit(2);
  }
  const baseline = JSON.parse(fs.readFileSync(path.join(localesDir, baselineLocale), 'utf8'));

  let totalAdded = 0;
  for (const file of files) {
    if (file === baselineLocale) continue;
    const fp = path.join(localesDir, file);
    const data = JSON.parse(fs.readFileSync(fp, 'utf8'));
    const before = JSON.stringify(data);
    const added = addMissing(data, baseline);
    if (added > 0) {
      fs.writeFileSync(fp, JSON.stringify(data, null, 2) + '\n', 'utf8');
      console.log(`Updated ${file}: +${added} keys`);
      totalAdded += added;
    }
  }
  if (totalAdded === 0) {
    console.log('All locales are already in sync with en.json.');
  } else {
    console.log(`\nSynced locales. Total keys added: ${totalAdded}`);
  }
}

main();

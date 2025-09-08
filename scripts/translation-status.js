const fs = require('fs');
const path = require('path');

// Function to check if a language file has complete roadmap and FAQ translations
function checkTranslationStatus(langCode) {
  const filePath = path.join(__dirname, '..', 'src', 'i18n', 'locales', `${langCode}.json`);
  
  try {
    if (!fs.existsSync(filePath)) {
      return { status: 'missing', roadmap: false, faq: false };
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    
    // Check roadmap translations
    const hasRoadmap = !!(
      data.roadmap?.phases?.phase1?.title && 
      data.roadmap?.phases?.phase1?.title !== "Launch & Foundation" &&
      data.roadmap?.phases?.phase1?.items?.smartContract &&
      data.roadmap?.phases?.phase2?.title &&
      data.roadmap?.phases?.phase3?.title
    );
    
    // Check FAQ translations
    const hasFAQ = !!(
      data.faq?.items?.sellAfterLaunch?.question &&
      data.faq?.items?.sellAfterLaunch?.question !== "Can I sell everything after launch?" &&
      data.faq?.items?.rewardsOnLocked?.question &&
      data.faq?.items?.afterBurnCap?.question
    );
    
    let status = 'incomplete';
    if (hasRoadmap && hasFAQ) {
      status = 'complete';
    } else if (hasRoadmap || hasFAQ) {
      status = 'partial';
    }
    
    return { status, roadmap: hasRoadmap, faq: hasFAQ };
    
  } catch (error) {
    return { status: 'error', roadmap: false, faq: false, error: error.message };
  }
}

// Main function to check all languages
function main() {
  console.log('🔍 Checking translation status across all languages...\n');
  
  // All supported languages
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'zh', name: 'Chinese (Simplified)' },
    { code: 'zh-Hant', name: 'Chinese (Traditional)' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'ar', name: 'Arabic' },
    { code: 'hi', name: 'Hindi' },
    { code: 'bn', name: 'Bengali' },
    { code: 'ur', name: 'Urdu' },
    { code: 'he', name: 'Hebrew' },
    { code: 'fa', name: 'Persian' },
    { code: 'uk', name: 'Ukrainian' },
    { code: 'sr', name: 'Serbian' },
    { code: 'sw', name: 'Swahili' },
    { code: 'kk', name: 'Kazakh' },
    { code: 'bg', name: 'Bulgarian' },
    { code: 'cs', name: 'Czech' },
    { code: 'nl', name: 'Dutch' },
    { code: 'el', name: 'Greek' },
    { code: 'hu', name: 'Hungarian' },
    { code: 'id', name: 'Indonesian' },
    { code: 'pl', name: 'Polish' },
    { code: 'ro', name: 'Romanian' },
    { code: 'sk', name: 'Slovak' },
    { code: 'sl', name: 'Slovenian' },
    { code: 'th', name: 'Thai' },
    { code: 'tr', name: 'Turkish' },
    { code: 'vi', name: 'Vietnamese' }
  ];
  
  const results = {
    complete: [],
    partial: [],
    incomplete: [],
    missing: [],
    error: []
  };
  
  languages.forEach(lang => {
    const status = checkTranslationStatus(lang.code);
    results[status.status].push({
      ...lang,
      ...status
    });
  });
  
  // Display results
  console.log('📊 TRANSLATION STATUS REPORT\n');
  console.log('=' .repeat(50));
  
  console.log(`\n✅ COMPLETE TRANSLATIONS (${results.complete.length}):`);
  results.complete.forEach(lang => {
    console.log(`   ${lang.name} (${lang.code})`);
  });
  
  if (results.partial.length > 0) {
    console.log(`\n⚠️  PARTIAL TRANSLATIONS (${results.partial.length}):`);
    results.partial.forEach(lang => {
      const roadmapStatus = lang.roadmap ? '✅' : '❌';
      const faqStatus = lang.faq ? '✅' : '❌';
      console.log(`   ${lang.name} (${lang.code}) - Roadmap: ${roadmapStatus} FAQ: ${faqStatus}`);
    });
  }
  
  if (results.incomplete.length > 0) {
    console.log(`\n❌ INCOMPLETE TRANSLATIONS (${results.incomplete.length}):`);
    results.incomplete.forEach(lang => {
      console.log(`   ${lang.name} (${lang.code}) - Still using English text`);
    });
  }
  
  if (results.missing.length > 0) {
    console.log(`\n🚫 MISSING FILES (${results.missing.length}):`);
    results.missing.forEach(lang => {
      console.log(`   ${lang.name} (${lang.code})`);
    });
  }
  
  if (results.error.length > 0) {
    console.log(`\n💥 ERROR FILES (${results.error.length}):`);
    results.error.forEach(lang => {
      console.log(`   ${lang.name} (${lang.code}) - ${lang.error}`);
    });
  }
  
  console.log('\n' + '=' .repeat(50));
  console.log(`\n📈 SUMMARY:`);
  console.log(`   Total Languages: ${languages.length}`);
  console.log(`   Complete: ${results.complete.length}`);
  console.log(`   Partial: ${results.partial.length}`);
  console.log(`   Incomplete: ${results.incomplete.length}`);
  console.log(`   Missing: ${results.missing.length}`);
  console.log(`   Errors: ${results.error.length}`);
  
  const completionRate = Math.round((results.complete.length / languages.length) * 100);
  console.log(`\n🎯 Completion Rate: ${completionRate}%`);
  
  if (results.incomplete.length > 0 || results.partial.length > 0) {
    console.log('\n💡 NEXT STEPS:');
    if (results.incomplete.length > 0) {
      console.log('   - Add translations for incomplete languages');
    }
    if (results.partial.length > 0) {
      console.log('   - Complete partial translations');
    }
    console.log('   - Run translation scripts to update remaining files');
  } else {
    console.log('\n🎉 All languages have complete roadmap and FAQ translations!');
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { checkTranslationStatus }; 
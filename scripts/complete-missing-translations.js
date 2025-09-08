const fs = require('fs');
const path = require('path');

// Complete missing translations for distribution and tax sections
const missingTranslations = {
  // Japanese translations
  ja: {
    "distribution": {
      "presale": "プレセール",
      "treasury": "トレジャリー",
      "liquidityPool": "流動性プール",
      "stakingPool": "ステーキングプール",
      "communityFund": "コミュニティファンド"
    },
    "tax": {
      "title": "全ての売買に{percentage}%の税金",
      "breakdown": {
        "stakingPool": "ステーキングプール",
        "treasury": "トレジャリー",
        "burn": "バーン"
      },
      "burnCapDescription": "2億$REKTがバーンされると、バーンは永続的に停止します。50%はトレジャリーに、50%はステーキングに配分され、長期的な成長を促進します。",
      "burnCapReached": "2億バーンキャップに到達するまで"
    }
  },

  // German translations
  de: {
    "distribution": {
      "presale": "Presale",
      "treasury": "Schatzkammer",
      "liquidityPool": "Liquiditätspool",
      "stakingPool": "Staking Pool",
      "communityFund": "Community Fonds"
    },
    "tax": {
      "title": "{percentage}% Steuer auf jeden Kauf/Verkauf",
      "breakdown": {
        "stakingPool": "Staking Pool",
        "treasury": "Schatzkammer",
        "burn": "Verbrennen"
      },
      "burnCapDescription": "Sobald 200M $REKT verbrannt wurden, wird das Verbrennen dauerhaft gestoppt. 50% gehen an die Schatzkammer und 50% an das Staking, um langfristiges Wachstum zu fördern.",
      "burnCapReached": "Bis 200M Burn-Obergrenze erreicht"
    }
  },

  // Korean translations
  ko: {
    "distribution": {
      "presale": "프리세일",
      "treasury": "트레저리",
      "liquidityPool": "유동성 풀",
      "stakingPool": "스테이킹 풀",
      "communityFund": "커뮤니티 펀드"
    },
    "tax": {
      "title": "모든 구매/판매에 {percentage}% 세금",
      "breakdown": {
        "stakingPool": "스테이킹 풀",
        "treasury": "트레저리",
        "burn": "번"
      },
      "burnCapDescription": "2억 $REKT가 번되면 번은 영구적으로 중단됩니다. 50%는 트레저리에, 50%는 스테이킹에 배분되어 장기적인 성장을 촉진합니다.",
      "burnCapReached": "2억 번 캐서 도달까지"
    }
  },

  // Russian translations
  ru: {
    "distribution": {
      "presale": "Пресейл",
      "treasury": "Казна",
      "liquidityPool": "Пул Ликвидности",
      "stakingPool": "Пул Стейкинга",
      "communityFund": "Фонд Сообщества"
    },
    "tax": {
      "title": "{percentage}% Налог с Каждой Покупки/Продажи",
      "breakdown": {
        "stakingPool": "Пул Стейкинга",
        "treasury": "Казна",
        "burn": "Сжигание"
      },
      "burnCapDescription": "Как только 200M $REKT будут сожжены, сжигание остановится навсегда. 50% пойдет в казну, и 50% в стейкинг для поощрения долгосрочного роста.",
      "burnCapReached": "До достижения лимита сжигания 200M"
    }
  },

  // Arabic translations
  ar: {
    "distribution": {
      "presale": "البيع المسبق",
      "treasury": "الخزينة",
      "liquidityPool": "مجموعة السيولة",
      "stakingPool": "مجموعة الستاكينغ",
      "communityFund": "صندوق المجتمع"
    },
    "tax": {
      "title": "ضريبة {percentage}% على كل شراء/بيع",
      "breakdown": {
        "stakingPool": "مجموعة الستاكينغ",
        "treasury": "الخزينة",
        "burn": "حرق"
      },
      "burnCapDescription": "بمجرد حرق 200 مليون $REKT، سيتوقف الحرق نهائياً. 50% ستذهب للخزينة، و50% للستاكينغ لتشجيع النمو طويل الأمد.",
      "burnCapReached": "حتى الوصول لحد الحرق 200 مليون"
    }
  },

  // Italian translations
  it: {
    "distribution": {
      "presale": "Prevendita",
      "treasury": "Tesoreria",
      "liquidityPool": "Pool di Liquidità",
      "stakingPool": "Pool di Staking",
      "communityFund": "Fondo Comunità"
    },
    "tax": {
      "title": "Tassa del {percentage}% su Ogni Acquisto/Vendita",
      "breakdown": {
        "stakingPool": "Pool di Staking",
        "treasury": "Tesoreria",
        "burn": "Bruciatura"
      },
      "burnCapDescription": "Una volta bruciati 200M $REKT, la bruciatura si fermerà permanentemente. Il 50% andrà alla tesoreria e il 50% allo staking per incoraggiare la crescita a lungo termine.",
      "burnCapReached": "Fino al raggiungimento del limite di bruciatura di 200M"
    }
  },

  // Portuguese translations
  pt: {
    "distribution": {
      "presale": "Pré-venda",
      "treasury": "Tesouraria",
      "liquidityPool": "Pool de Liquidez",
      "stakingPool": "Pool de Staking",
      "communityFund": "Fundo da Comunidade"
    },
    "tax": {
      "title": "Taxa de {percentage}% em Cada Compra/Venda",
      "breakdown": {
        "stakingPool": "Pool de Staking",
        "treasury": "Tesouraria",
        "burn": "Queima"
      },
      "burnCapDescription": "Uma vez que 200M $REKT sejam queimados, a queima parará permanentemente. 50% irá para a tesouraria e 50% para o staking para encorajar o crescimento a longo prazo.",
      "burnCapReached": "Até atingir o limite de queima de 200M"
    }
  },

  // Dutch translations
  nl: {
    "distribution": {
      "presale": "Presale",
      "treasury": "Schatkist",
      "liquidityPool": "Liquiditeitspool",
      "stakingPool": "Staking Pool",
      "communityFund": "Gemeenschapsfonds"
    },
    "tax": {
      "title": "{percentage}% Belasting op Elke Koop/Verkoop",
      "breakdown": {
        "stakingPool": "Staking Pool",
        "treasury": "Schatkist",
        "burn": "Verbranden"
      },
      "burnCapDescription": "Zodra 200M $REKT verbrand zijn, stopt het verbranden permanent. 50% gaat naar de schatkist en 50% naar staking om langetermijngroei aan te moedigen.",
      "burnCapReached": "Tot 200M verbrandingslimiet bereikt"
    }
  },

  // Polish translations
  pl: {
    "distribution": {
      "presale": "Presale",
      "treasury": "Skarbiec",
      "liquidityPool": "Pula Płynności",
      "stakingPool": "Pula Staking",
      "communityFund": "Fundusz Społeczności"
    },
    "tax": {
      "title": "{percentage}% Podatek od Każdego Zakupu/Sprzedaży",
      "breakdown": {
        "stakingPool": "Pula Staking",
        "treasury": "Skarbiec",
        "burn": "Spalanie"
      },
      "burnCapDescription": "Po spaleniu 200M $REKT, spalanie zatrzyma się na stałe. 50% pójdzie do skarbca, a 50% do stakingu, aby zachęcić do długoterminowego wzrostu.",
      "burnCapReached": "Do osiągnięcia limitu spalania 200M"
    }
  },

  // Bulgarian translations
  bg: {
    "distribution": {
      "presale": "Предварителна продажба",
      "treasury": "Съкровищница",
      "liquidityPool": "Пул за Ликвидност",
      "stakingPool": "Пул за Стейкинг",
      "communityFund": "Фонд на Общността"
    },
    "tax": {
      "title": "{percentage}% Данък върху Всяка Покупка/Продажба",
      "breakdown": {
        "stakingPool": "Пул за Стейкинг",
        "treasury": "Съкровищница",
        "burn": "Изгаряне"
      },
      "burnCapDescription": "След като се изгорят 200M $REKT, изгарянето ще спре завинаги. 50% ще отидат в съкровищницата и 50% в стейкинга за насърчаване на дългосрочния растеж.",
      "burnCapReached": "До достигане на лимита за изгаряне от 200M"
    }
  },

  // Bengali translations
  bn: {
    "distribution": {
      "presale": "প্রিসেল",
      "treasury": "ট্রেজারি",
      "liquidityPool": "লিকুইডিটি পুল",
      "stakingPool": "স্ট্যাকিং পুল",
      "communityFund": "কমিউনিটি ফান্ড"
    },
    "tax": {
      "title": "প্রতিটি কেনা/বেচায় {percentage}% ট্যাক্স",
      "breakdown": {
        "stakingPool": "স্ট্যাকিং পুল",
        "treasury": "ট্রেজারি",
        "burn": "বার্ন"
      },
      "burnCapDescription": "একবার 200M $REKT বার্ন হয়ে গেলে, বার্ন চিরতরে বন্ধ হয়ে যাবে। 50% ট্রেজারিতে যাবে এবং 50% স্ট্যাকিং এ যাবে দীর্ঘমেয়াদী বৃদ্ধি উৎসাহিত করতে।",
      "burnCapReached": "200M বার্ন ক্যাপ পৌঁছানো পর্যন্ত"
    }
  },

  // Czech translations
  cs: {
    "distribution": {
      "presale": "Předprodej",
      "treasury": "Pokladna",
      "liquidityPool": "Pool Likvidity",
      "stakingPool": "Staking Pool",
      "communityFund": "Komunitní Fond"
    },
    "tax": {
      "title": "{percentage}% Daň z Každé Koupě/Prodeje",
      "breakdown": {
        "stakingPool": "Staking Pool",
        "treasury": "Pokladna",
        "burn": "Spalování"
      },
      "burnCapDescription": "Jakmile se spálí 200M $REKT, spalování se zastaví natrvalo. 50% půjde do pokladny a 50% do stakingu pro podporu dlouhodobého růstu.",
      "burnCapReached": "Do dosažení limitu spalování 200M"
    }
  },

  // Thai translations
  th: {
    "distribution": {
      "presale": "พรีเซล",
      "treasury": "คลัง",
      "liquidityPool": "พูลสภาพคล่อง",
      "stakingPool": "พูลสเตคกิ้ง",
      "communityFund": "กองทุนชุมชน"
    },
    "tax": {
      "title": "ภาษี {percentage}% ในทุกการซื้อ/ขาย",
      "breakdown": {
        "stakingPool": "พูลสเตคกิ้ง",
        "treasury": "คลัง",
        "burn": "เบิร์น"
      },
      "burnCapDescription": "เมื่อ $REKT 200M ถูกเบิร์นแล้ว การเบิร์นจะหยุดถาวร 50% จะไปที่คลังและ 50% จะไปที่สเตคกิ้งเพื่อส่งเสริมการเติบโตระยะยาว",
      "burnCapReached": "จนถึงขีดจำกัดเบิร์น 200M"
    }
  },

  // Turkish translations
  tr: {
    "distribution": {
      "presale": "Ön Satış",
      "treasury": "Hazine",
      "liquidityPool": "Likidite Havuzu",
      "stakingPool": "Staking Havuzu",
      "communityFund": "Topluluk Fonu"
    },
    "tax": {
      "title": "Her Alım/Satımda {percentage}% Vergi",
      "breakdown": {
        "stakingPool": "Staking Havuzu",
        "treasury": "Hazine",
        "burn": "Yakma"
      },
      "burnCapDescription": "200M $REKT yakıldığında, yakma kalıcı olarak duracak. %50 hazineye, %50 uzun vadeli büyümeyi teşvik etmek için staking'e gidecek.",
      "burnCapReached": "200M yakma limitine kadar"
    }
  },

  // Ukrainian translations
  uk: {
    "distribution": {
      "presale": "Передпродаж",
      "treasury": "Скарбниця",
      "liquidityPool": "Пул Ліквідності",
      "stakingPool": "Пул Стейкінгу",
      "communityFund": "Фонд Спільноти"
    },
    "tax": {
      "title": "{percentage}% Податок з Кожної Покупки/Продажу",
      "breakdown": {
        "stakingPool": "Пул Стейкінгу",
        "treasury": "Скарбниця",
        "burn": "Спалювання"
      },
      "burnCapDescription": "Як тільки 200M $REKT будуть спалені, спалювання зупиниться назавжди. 50% піде в скарбницю і 50% в стейкінг для заохочення довгострокового зростання.",
      "burnCapReached": "До досягнення ліміту спалювання 200M"
    }
  }
};

// Function to deep merge objects
function deepMerge(target, source) {
  const output = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target))
          Object.assign(output, { [key]: source[key] });
        else
          output[key] = deepMerge(target[key], source[key]);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

function isObject(item) {
  return (item && typeof item === "object" && !Array.isArray(item));
}

// Function to update a language file
function updateLanguageFile(langCode) {
  const filePath = path.join(__dirname, '..', 'src', 'i18n', 'locales', `${langCode}.json`);
  
  try {
    // Read existing file
    let existingData = {};
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      existingData = JSON.parse(fileContent);
    }
    
    // Add translations if available for this language
    if (missingTranslations[langCode]) {
      const updatedData = deepMerge(existingData, missingTranslations[langCode]);
      
      // Write updated file
      fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2), 'utf8');
      console.log(`✅ Updated ${langCode}.json with distribution and tax translations`);
      return true;
    } else {
      console.log(`⚠️  No missing translations available for ${langCode}`);
      return false;
    }
    
  } catch (error) {
    console.error(`❌ Error updating ${langCode}.json:`, error.message);
    return false;
  }
}

// Main function
function main() {
  console.log('🚀 Adding missing distribution and tax translations...\n');
  
  // Languages that have missing translations
  const languagesToUpdate = [
    'ja', 'de', 'ko', 'ru', 'ar', 'it', 'pt', 'nl', 'pl', 'bg', 'bn', 'cs', 'th', 'tr', 'uk'
  ];
  
  let updatedCount = 0;
  
  // Update each language file
  languagesToUpdate.forEach(langCode => {
    if (updateLanguageFile(langCode)) {
      updatedCount++;
    }
  });
  
  console.log(`\n🎉 Missing translations update completed!`);
  console.log(`📊 Updated ${updatedCount} language files`);
  console.log('\n💡 The following sections have been added/updated:');
  console.log('   - Distribution breakdown (Presale, Treasury, Liquidity Pool, etc.)');
  console.log('   - Tax breakdown (Staking Pool, Treasury, Burn)');
  console.log('   - Tax descriptions and burn cap information');
  console.log('\n🔄 Please refresh your application to see the changes!');
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { updateLanguageFile, deepMerge, missingTranslations }; 
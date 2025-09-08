const fs = require('fs');
const path = require('path');

// Additional translations for remaining languages
const additionalTranslations = {
  // Spanish (if missing)
  es: {
    "distribution": {
      "presale": "Preventa",
      "treasury": "Tesorería",
      "liquidityPool": "Pool de Liquidez",
      "stakingPool": "Pool de Staking",
      "communityFund": "Fondo Comunitario"
    },
    "tax": {
      "title": "{percentage}% de Impuesto en Cada Compra/Venta",
      "breakdown": {
        "stakingPool": "Pool de Staking",
        "treasury": "Tesorería",
        "burn": "Quema"
      },
      "burnCapDescription": "Una vez que se quemen 200M $REKT, la quema se detendrá permanentemente. 50% irá a la tesorería y 50% al staking para fomentar el crecimiento a largo plazo.",
      "burnCapReached": "Hasta alcanzar el límite de quema de 200M"
    }
  },

  // Chinese Simplified (if missing)
  zh: {
    "distribution": {
      "presale": "预售",
      "treasury": "国库",
      "liquidityPool": "流动性池",
      "stakingPool": "质押池",
      "communityFund": "社区基金"
    },
    "tax": {
      "title": "每次买卖{percentage}%税收",
      "breakdown": {
        "stakingPool": "质押池",
        "treasury": "国库",
        "burn": "销毁"
      },
      "burnCapDescription": "一旦销毁2亿$REKT，销毁将永久停止。50%将进入国库，50%将进入质押以鼓励长期增长。",
      "burnCapReached": "直到达到2亿销毁上限"
    }
  },

  // French (if missing)
  fr: {
    "distribution": {
      "presale": "Prévente",
      "treasury": "Trésorerie",
      "liquidityPool": "Pool de Liquidité",
      "stakingPool": "Pool de Staking",
      "communityFund": "Fonds Communautaire"
    },
    "tax": {
      "title": "{percentage}% de Taxe sur Chaque Achat/Vente",
      "breakdown": {
        "stakingPool": "Pool de Staking",
        "treasury": "Trésorerie",
        "burn": "Brûlage"
      },
      "burnCapDescription": "Une fois que 200M $REKT sont brûlés, le brûlage s'arrêtera définitivement. 50% iront à la trésorerie et 50% au staking pour encourager la croissance à long terme.",
      "burnCapReached": "Jusqu'à atteindre la limite de brûlage de 200M"
    }
  },

  // Add more languages that might be missing these sections
  hi: {
    "distribution": {
      "presale": "प्रीसेल",
      "treasury": "ट्रेजरी",
      "liquidityPool": "लिक्विडिटी पूल",
      "stakingPool": "स्टेकिंग पूल",
      "communityFund": "कम्यूनिटी फंड"
    },
    "tax": {
      "title": "हर खरीद/बिक्री पर {percentage}% टैक्स",
      "breakdown": {
        "stakingPool": "स्टेकिंग पूल",
        "treasury": "ट्रेजरी",
        "burn": "बर्न"
      },
      "burnCapDescription": "एक बार 200M $REKT बर्न हो जाने पर, बर्निंग स्थायी रूप से बंद हो जाएगी। 50% ट्रेजरी में और 50% स्टेकिंग में जाएगा दीर्घकालिक विकास को प्रोत्साहित करने के लिए।",
      "burnCapReached": "200M बर्न कैप तक पहुंचने तक"
    }
  },

  vi: {
    "distribution": {
      "presale": "Bán trước",
      "treasury": "Kho bạc",
      "liquidityPool": "Pool thanh khoản",
      "stakingPool": "Pool staking",
      "communityFund": "Quỹ cộng đồng"
    },
    "tax": {
      "title": "Thuế {percentage}% trên mỗi giao dịch mua/bán",
      "breakdown": {
        "stakingPool": "Pool staking",
        "treasury": "Kho bạc",
        "burn": "Đốt"
      },
      "burnCapDescription": "Khi 200M $REKT đã được đốt, việc đốt sẽ dừng vĩnh viễn. 50% sẽ vào kho bạc và 50% vào staking để khuyến khích tăng trưởng dài hạn.",
      "burnCapReached": "Cho đến khi đạt giới hạn đốt 200M"
    }
  },

  id: {
    "distribution": {
      "presale": "Penjualan Awal",
      "treasury": "Perbendaharaan",
      "liquidityPool": "Pool Likuiditas",
      "stakingPool": "Pool Staking",
      "communityFund": "Dana Komunitas"
    },
    "tax": {
      "title": "Pajak {percentage}% pada Setiap Beli/Jual",
      "breakdown": {
        "stakingPool": "Pool Staking",
        "treasury": "Perbendaharaan",
        "burn": "Bakar"
      },
      "burnCapDescription": "Setelah 200M $REKT dibakar, pembakaran akan berhenti secara permanen. 50% akan masuk ke perbendaharaan dan 50% ke staking untuk mendorong pertumbuhan jangka panjang.",
      "burnCapReached": "Sampai mencapai batas pembakaran 200M"
    }
  },

  ro: {
    "distribution": {
      "presale": "Prevânzare",
      "treasury": "Trezorerie",
      "liquidityPool": "Pool de Lichiditate",
      "stakingPool": "Pool de Staking",
      "communityFund": "Fond Comunitar"
    },
    "tax": {
      "title": "Taxa de {percentage}% pe Fiecare Cumpărare/Vânzare",
      "breakdown": {
        "stakingPool": "Pool de Staking",
        "treasury": "Trezorerie",
        "burn": "Ardere"
      },
      "burnCapDescription": "Odată ce 200M $REKT sunt arse, arderea se va opri permanent. 50% va merge la trezorerie și 50% la staking pentru a încuraja creșterea pe termen lung.",
      "burnCapReached": "Până la atingerea limitei de ardere de 200M"
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

// Function to check if distribution/tax translations exist
function hasDistributionTax(data) {
  return !!(
    data.distribution?.presale &&
    data.tax?.breakdown?.stakingPool
  );
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
    
    // Check if already has distribution/tax translations
    if (hasDistributionTax(existingData)) {
      console.log(`✅ ${langCode}.json already has distribution and tax translations`);
      return false;
    }
    
    // Add translations if available for this language
    if (additionalTranslations[langCode]) {
      const updatedData = deepMerge(existingData, additionalTranslations[langCode]);
      
      // Write updated file
      fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2), 'utf8');
      console.log(`✅ Updated ${langCode}.json with distribution and tax translations`);
      return true;
    } else {
      console.log(`⚠️  No additional translations available for ${langCode}`);
      return false;
    }
    
  } catch (error) {
    console.error(`❌ Error updating ${langCode}.json:`, error.message);
    return false;
  }
}

// Main function
function main() {
  console.log('🚀 Adding distribution and tax translations to remaining languages...\n');
  
  // All languages to check
  const allLanguages = [
    'es', 'zh', 'fr', 'hi', 'vi', 'id', 'ro', 'hu', 'el', 'sk', 'sl', 'kk', 'sr', 'sw',
    'ur', 'he', 'fa', 'zh-Hant'
  ];
  
  let updatedCount = 0;
  
  // Update each language file
  allLanguages.forEach(langCode => {
    if (updateLanguageFile(langCode)) {
      updatedCount++;
    }
  });
  
  console.log(`\n🎉 Additional translations update completed!`);
  console.log(`📊 Updated ${updatedCount} language files`);
  
  if (updatedCount > 0) {
    console.log('\n💡 The following sections have been added:');
    console.log('   - Distribution breakdown (Presale, Treasury, Liquidity Pool, etc.)');
    console.log('   - Tax breakdown (Staking Pool, Treasury, Burn)');
    console.log('   - Tax descriptions and burn cap information');
    console.log('\n🔄 Please refresh your application to see the changes!');
  } else {
    console.log('\n✨ All checked languages already have complete translations!');
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { updateLanguageFile, deepMerge, additionalTranslations }; 
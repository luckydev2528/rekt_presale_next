const fs = require('fs');
const path = require('path');

// Remaining translations for complete coverage
const remainingTranslations = {
  // Bengali translations
  bn: {
    "roadmap": {
      "phases": {
        "phase1": {
          "title": "লঞ্চ ও ভিত্তি",
          "goal": "ন্যায্য লঞ্চ, তাৎক্ষণিক স্ট্যাকিং, সহজ ও মিম-প্রস্তুত সেটআপ।",
          "items": {
            "smartContract": "স্মার্ট কন্ট্র্যাক্ট স্থাপনা।",
            "socialMedia": "X (Twitter) ও Telegram খোলা।",
            "dashboard": "ড্যাশবোর্ড: REKT স্কোর লিডারবোর্ড, ভেস্টিং ট্র্যাকার, স্ট্যাকিং রিওয়ার্ড, বার্ন ক্যাপ।",
            "autoStaking": "সকল প্রিসেল টোকেনের জন্য অটো স্ট্যাকিং, প্রথম দিন থেকে আয় শুরু।",
            "lossClaim": "লস ক্লেইম V1 ($350 লেনদেন থেকে প্রিসেল বিনিয়োগকারীদের জন্য শুধুমাত্র, প্রতি ওয়ালেটে 1 ক্লেইম, অন-চেইন যাচাইকৃত)।",
            "audit": "Solidproof অডিট।"
          }
        },
        "phase2": {
          "title": "উপযোগিতা ও REKT লজিক",
          "goal": "টোকেনোমিক্স সক্রিয় করা, স্ট্যাকারদের সম্পৃক্ত করা, অন-চেইন ভলিউম চালনা।",
          "items": {
            "dexTax": "1% Dex ট্যাক্স: 50% স্ট্যাকিং, 25% ট্রেজারি, 25% বার্ন (200M বার্ন পর্যন্ত)।",
            "rageClaim": "রেজ ক্লেইম জরিমানা সময়ের সাথে স্কেল (20% -> 5%)।",
            "leaderboard": "REKT স্কোর লিডারবোর্ড।",
            "lossClaimV2": "লস ক্লেইম V2: ওয়ালেট বয়স গুণিত, কুলডাউন।",
            "burnTracker": "বার্ন ক্যাপ ট্র্যাকার + লাইভ স্ট্যাকিং পরিসংখ্যান।",
            "nftDrop": "স্ট্যাকিং পুল পুনরায় পূরণের জন্য ঐচ্ছিক NFT ড্রপ।"
          }
        },
        "phase3": {
          "title": "স্কেলিং ও কমিউনিটি বিশৃঙ্খলা",
          "goal": "মিম-চালিত বৃদ্ধি এবং ইকোসিস্টেম সম্প্রসারণ।",
          "items": {
            "cexOutreach": "CEX আউটরিচ (Solana-বান্ধব)।",
            "memeWars": "MEME Wars: কমিউনিটি লিডারবোর্ড + এয়ারড্রপ।",
            "rektLabs": "Rekt Labs: পরীক্ষামূলক স্ট্যাকিং/NFT বৈশিষ্ট্য।",
            "finalAudit": "চূড়ান্ত অডিট (Certik বা Ottersec)।"
          }
        }
      }
    },
    "faq": {
      "items": {
        "sellAfterLaunch": {
          "question": "লঞ্চের পর কি সবকিছু বিক্রি করতে পারি?",
          "answer": "লঞ্চে 30% আনলক, বাকি 6 মাসে ভেস্ট। তাড়াতাড়ি আরও চান? রেজ ক্লেইম কিন্তু বার্ন জরিমানা আশা করুন।"
        },
        "rewardsOnLocked": {
          "question": "লক করা টোকেনে কি পুরস্কার পাই?",
          "answer": "হ্যাঁ! সকল প্রিসেল টোকেন স্বয়ংক্রিয়ভাবে স্ট্যাক হয় এবং প্রথম দিন থেকে পুরস্কার অর্জন করে।"
        },
        "afterBurnCap": {
          "question": "বার্ন ক্যাপের পর কী হয়?",
          "answer": "200M টোকেন বার্ন হলে, বার্ন মেকানিজম বন্ধ হয়। ট্যাক্স বিতরণ 50% ট্রেজারি, 50% স্ট্যাকিং এ স্থানান্তরিত হয়।"
        },
        "lossClaimsSupported": {
          "question": "লস ক্লেইমের জন্য কোন টোকেন ব্যবহার করতে পারি?",
          "answer": "DeFi প্রোটোকল, CEX লিকুইডেশন, বা রাগ পুল থেকে যেকোনো যাচাইকৃত ক্ষতি যথাযথ যাচাইয়ের সাথে দাবি করা যেতে পারে।"
        },
        "stakeAfterPresale": {
          "question": "প্রিসেলের পর কিনলে কি স্ট্যাক করতে পারি?",
          "answer": "একদম! স্ট্যাকিং সকল $REKT হোল্ডারদের জন্য উপলব্ধ, শুধু প্রিসেল অংশগ্রহণকারীদের জন্য নয়।"
        },
        "claimAmount": {
          "question": "ক্ষতি থেকে কত REKT দাবি করতে পারি?",
          "answer": "দাবি যাচাইকৃত ক্ষতির পরিমাণ, ওয়ালেট বয়স এবং কমিউনিটি টায়ার গুণকের ভিত্তিতে গণনা করা হয়।"
        }
      }
    }
  },

  // Czech translations
  cs: {
    "roadmap": {
      "phases": {
        "phase1": {
          "title": "Spuštění a Základ",
          "goal": "Férové spuštění, okamžité stakování, štíhlé a meme-připravené nastavení.",
          "items": {
            "smartContract": "Nasazení Smart Contractu.",
            "socialMedia": "Otevření X (Twitter) a Telegram.",
            "dashboard": "Dashboard: REKT Score Žebříček, Vesting Tracker, Staking Odměna, Burn Cap.",
            "autoStaking": "Auto Staking pro všechny presale tokeny, začněte vydělávat od prvního dne.",
            "lossClaim": "Loss Claim V1 (Pouze pro presale investory od $350 transakce, 1 claim na peněženku, On-Chain ověřeno).",
            "audit": "Solidproof Audit."
          }
        },
        "phase2": {
          "title": "Užitečnost a REKT Logika",
          "goal": "Aktivovat tokenomiku, zapojit stakery, řídit on-chain objem.",
          "items": {
            "dexTax": "1% Dex Daň: 50% Staking, 25% Pokladna, 25% Spalování (do spálení 200M).",
            "rageClaim": "Rage Claim pokuty se škálují v čase (20% -> 5%).",
            "leaderboard": "REKT Score Žebříček.",
            "lossClaimV2": "Loss Claim V2: Věk peněženky násobí, cooldowny.",
            "burnTracker": "Burn Cap Tracker + Live Staking Statistiky.",
            "nftDrop": "Volitelný NFT Drop pro doplnění staking poolu."
          }
        },
        "phase3": {
          "title": "Škálování a Komunitní Chaos",
          "goal": "Meme-řízený růst a expanze ekosystému.",
          "items": {
            "cexOutreach": "CEX Outreach (Solana-přátelský).",
            "memeWars": "MEME Wars: Komunitní Žebříček + Airdrops.",
            "rektLabs": "Rekt Labs: Experimentální Staking/NFT Funkce.",
            "finalAudit": "Finální Audit (Certik nebo Ottersec)."
          }
        }
      }
    },
    "faq": {
      "items": {
        "sellAfterLaunch": {
          "question": "Mohu po spuštění prodat všechno?",
          "answer": "30% se odemkne při spuštění, zbytek se vestuje po dobu 6 měsíců. Chcete více dříve? Rage claim, ale očekávejte burn penalizaci."
        },
        "rewardsOnLocked": {
          "question": "Vydělávám odměny na uzamčených tokenech?",
          "answer": "Ano! Všechny presale tokeny jsou automaticky stakovány a vydělávají odměny od prvního dne."
        },
        "afterBurnCap": {
          "question": "Co se stane po burn capu?",
          "answer": "Jakmile se spálí 200M tokenů, mechanismus spalování se zastaví. Distribuce daní se přesune na 50% pokladna, 50% staking."
        },
        "lossClaimsSupported": {
          "question": "Které tokeny mohu použít pro Loss Claims?",
          "answer": "Jakákoli ověřená ztráta z DeFi protokolů, CEX likvidací nebo rug pulls může být nárokována s odpovídajícím ověřením."
        },
        "stakeAfterPresale": {
          "question": "Mohu stakovat, pokud koupím po presale?",
          "answer": "Absolutně! Staking je k dispozici všem držitelům $REKT, nejen účastníkům presale."
        },
        "claimAmount": {
          "question": "Kolik REKT mohu nárokovat ze ztrát?",
          "answer": "Nároky se počítají na základě ověřené výše ztráty, věku peněženky a násobitelů úrovně komunity."
        }
      }
    }
  },

  // Thai translations
  th: {
    "roadmap": {
      "phases": {
        "phase1": {
          "title": "เปิดตัวและรากฐาน",
          "goal": "เปิดตัวอย่างยุติธรรม, สเตคทันที, การตั้งค่าที่เรียบง่ายและพร้อมสำหรับมีม",
          "items": {
            "smartContract": "การปรับใช้ Smart Contract",
            "socialMedia": "เปิด X (Twitter) และ Telegram",
            "dashboard": "แดชบอร์ด: ลีดเดอร์บอร์ด REKT Score, ตัวติดตาม Vesting, รางวัลสเตคกิ้ง, Burn Cap",
            "autoStaking": "สเตคอัตโนมัติสำหรับโทเค็นพรีเซลทั้งหมด เริ่มหาเงินตั้งแต่วันแรก",
            "lossClaim": "การเคลม Loss V1 (เฉพาะนักลงทุนพรีเซลจากธุรกรรม $350, 1 เคลมต่อกระเป๋า, ยืนยันบน On-Chain)",
            "audit": "ตรวจสอบ Solidproof"
          }
        },
        "phase2": {
          "title": "ยูทิลิตี้และตรรกะ REKT",
          "goal": "เปิดใช้งาน tokenomics, มีส่วนร่วมกับสเตคเกอร์, ขับเคลื่อนปริมาณ on-chain",
          "items": {
            "dexTax": "ภาษี Dex 1%: 50% สเตคกิ้ง, 25% คลัง, 25% เบิร์น (จนกว่าจะเบิร์น 200M)",
            "rageClaim": "โทษ Rage Claim ขยายตามเวลา (20% -> 5%)",
            "leaderboard": "ลีดเดอร์บอร์ด REKT Score",
            "lossClaimV2": "การเคลม Loss V2: อายุกระเป๋าคูณ, คูลดาวน์",
            "burnTracker": "ตัวติดตาม Burn Cap + สถิติสเตคกิ้งสด",
            "nftDrop": "NFT Drop เสริมเพื่อเติมพูลสเตคกิ้ง"
          }
        },
        "phase3": {
          "title": "การขยายและความวุ่นวายของชุมชน",
          "goal": "การเติบโตที่ขับเคลื่อนโดยมีมและการขยายระบบนิเวศ",
          "items": {
            "cexOutreach": "CEX Outreach (เป็นมิตรกับ Solana)",
            "memeWars": "MEME Wars: ลีดเดอร์บอร์ดชุมชน + Airdrops",
            "rektLabs": "Rekt Labs: คุณสมบัติทดลองสเตคกิ้ง/NFT",
            "finalAudit": "การตรวจสอบขั้นสุดท้าย (Certik หรือ Ottersec)"
          }
        }
      }
    },
    "faq": {
      "items": {
        "sellAfterLaunch": {
          "question": "ฉันสามารถขายทุกอย่างหลังจากเปิดตัวได้หรือไม่?",
          "answer": "30% ปลดล็อคเมื่อเปิดตัว ส่วนที่เหลือจะ vest ใน 6 เดือน ต้องการมากขึ้นเร็วกว่านี้? Rage claim แต่คาดหวังโทษเบิร์น"
        },
        "rewardsOnLocked": {
          "question": "ฉันได้รับรางวัลจากโทเค็นที่ล็อคหรือไม่?",
          "answer": "ใช่! โทเค็นพรีเซลทั้งหมดจะถูกสเตคอัตโนมัติและได้รับรางวัลตั้งแต่วันแรก"
        },
        "afterBurnCap": {
          "question": "เกิดอะไรขึ้นหลังจาก burn cap?",
          "answer": "เมื่อโทเค็น 200M ถูกเบิร์น กลไกเบิร์นจะหยุด การกระจายภาษีจะเปลี่ยนเป็น 50% คลัง, 50% สเตคกิ้ง"
        },
        "lossClaimsSupported": {
          "question": "ฉันสามารถใช้โทเค็นใดสำหรับ Loss Claims?",
          "answer": "การสูญเสียที่ยืนยันแล้วจากโปรโตคอล DeFi, การ liquidation CEX, หรือ rug pulls สามารถเคลมได้ด้วยการยืนยันที่เหมาะสม"
        },
        "stakeAfterPresale": {
          "question": "ฉันสามารถสเตคได้หรือไม่หากซื้อหลังพรีเซล?",
          "answer": "แน่นอน! การสเตคมีให้สำหรับผู้ถือ $REKT ทุกคน ไม่ใช่แค่ผู้เข้าร่วมพรีเซล"
        },
        "claimAmount": {
          "question": "ฉันสามารถเคลม REKT ได้เท่าไรจากการสูญเสีย?",
          "answer": "การเคลมคำนวณจากจำนวนการสูญเสียที่ยืนยันแล้ว อายุกระเป๋า และตัวคูณระดับชุมชน"
        }
      }
    }
  },

  // Turkish translations
  tr: {
    "roadmap": {
      "phases": {
        "phase1": {
          "title": "Başlatma ve Temel",
          "goal": "Adil başlatma, anında stake etme, yalın ve meme hazır kurulum.",
          "items": {
            "smartContract": "Akıllı Kontrat Dağıtımı.",
            "socialMedia": "X (Twitter) ve Telegram'ı Açma.",
            "dashboard": "Dashboard: REKT Score Sıralaması, Vesting Takipçisi, Staking Ödülü, Burn Cap.",
            "autoStaking": "Tüm ön satış tokenları için Otomatik Staking, ilk günden kazanmaya başlayın.",
            "lossClaim": "Kayıp Talebi V1 ($350 işlemden ön satış yatırımcıları için sadece, cüzdan başına 1 talep, On-Chain doğrulanmış).",
            "audit": "Solidproof Denetimi."
          }
        },
        "phase2": {
          "title": "Fayda ve REKT Mantığı",
          "goal": "Tokenomikleri etkinleştir, staker'ları dahil et, on-chain hacmi artır.",
          "items": {
            "dexTax": "1% Dex Vergisi: 50% Staking, 25% Hazine, 25% Yakma (200M yakılana kadar).",
            "rageClaim": "Rage Claim cezaları zamanla ölçeklenir (20% -> 5%).",
            "leaderboard": "REKT Score Sıralaması.",
            "lossClaimV2": "Kayıp Talebi V2: Cüzdan yaşı çoğaltır, cooldown'lar.",
            "burnTracker": "Burn Cap Takipçisi + Canlı Staking İstatistikleri.",
            "nftDrop": "Staking havuzunu yeniden doldurmak için isteğe bağlı NFT Drop."
          }
        },
        "phase3": {
          "title": "Ölçeklendirme ve Topluluk Kaosu",
          "goal": "Meme odaklı büyüme ve ekosistem genişlemesi.",
          "items": {
            "cexOutreach": "CEX İletişimi (Solana dostu).",
            "memeWars": "MEME Wars: Topluluk Sıralaması + Airdrop'lar.",
            "rektLabs": "Rekt Labs: Deneysel Staking/NFT Özellikleri.",
            "finalAudit": "Son Denetim (Certik veya Ottersec)."
          }
        }
      }
    },
    "faq": {
      "items": {
        "sellAfterLaunch": {
          "question": "Başlatmadan sonra her şeyi satabilir miyim?",
          "answer": "Başlatmada 30% kilidini açar, geri kalanı 6 ay boyunca vest olur. Daha erken mi istiyorsunuz? Rage claim ama yakma cezası bekleyin."
        },
        "rewardsOnLocked": {
          "question": "Kilitli tokenlardan ödül kazanır mıyım?",
          "answer": "Evet! Tüm ön satış tokenları otomatik olarak stake edilir ve ilk günden ödül kazanır."
        },
        "afterBurnCap": {
          "question": "Burn cap'den sonra ne olur?",
          "answer": "200M token yakıldığında, yakma mekanizması durur. Vergi dağılımı 50% hazine, 50% staking'e kayar."
        },
        "lossClaimsSupported": {
          "question": "Kayıp Talepleri için hangi tokenları kullanabilirim?",
          "answer": "DeFi protokollerinden, CEX likidasyonlarından veya rug pull'lardan doğrulanmış herhangi bir kayıp, uygun doğrulamayla talep edilebilir."
        },
        "stakeAfterPresale": {
          "question": "Ön satıştan sonra satın alırsam stake edebilir miyim?",
          "answer": "Kesinlikle! Staking tüm $REKT sahipleri için mevcuttur, sadece ön satış katılımcıları için değil."
        },
        "claimAmount": {
          "question": "Kayıplardan ne kadar REKT talep edebilirim?",
          "answer": "Talepler doğrulanmış kayıp miktarı, cüzdan yaşı ve topluluk seviyesi çarpanlarına göre hesaplanır."
        }
      }
    }
  },

  // Ukrainian translations
  uk: {
    "roadmap": {
      "phases": {
        "phase1": {
          "title": "Запуск та Основа",
          "goal": "Чесний запуск, миттєвий стейкінг, простий і готовий для мемів налаштування.",
          "items": {
            "smartContract": "Розгортання Смарт-контракту.",
            "socialMedia": "Відкриття X (Twitter) і Telegram.",
            "dashboard": "Панель: Рейтинг REKT Score, Трекер Vesting, Винагорода за Стейкінг, Ліміт Спалювання.",
            "autoStaking": "Авто Стейкінг для всіх токенів передпродажу, почни заробляти з першого дня.",
            "lossClaim": "Відшкодування Збитків V1 (тільки для інвесторів передпродажу від транзакції $350, 1 заявка на гаманець, підтверджено он-чейн).",
            "audit": "Аудит Solidproof."
          }
        },
        "phase2": {
          "title": "Корисність і Логіка REKT",
          "goal": "Активувати токеноміку, залучити стейкерів, збільшити он-чейн обсяг.",
          "items": {
            "dexTax": "1% податок Dex: 50% стейкінг, 25% скарбниця, 25% спалювання (до спалювання 200M).",
            "rageClaim": "Штрафи Rage Claim масштабуються з часом (20% -> 5%).",
            "leaderboard": "Рейтинг REKT Score.",
            "lossClaimV2": "Відшкодування Збитків V2: вік гаманця помножується, кулдауни.",
            "burnTracker": "Трекер ліміту спалювання + статистика стейкінгу в реальному часі.",
            "nftDrop": "Опціональний NFT дроп для поповнення пулу стейкінгу."
          }
        },
        "phase3": {
          "title": "Масштабування і Хаос Спільноти",
          "goal": "Зростання на основі мемів і розширення екосистеми.",
          "items": {
            "cexOutreach": "Робота з CEX (дружня до Solana).",
            "memeWars": "MEME Wars: Рейтинг спільноти + Аірдропи.",
            "rektLabs": "Rekt Labs: Експериментальні функції стейкінгу/NFT.",
            "finalAudit": "Фінальний аудит (Certik або Ottersec)."
          }
        }
      }
    },
    "faq": {
      "items": {
        "sellAfterLaunch": {
          "question": "Чи можу я продати все після запуску?",
          "answer": "30% розблоковується при запуску, решта вестується протягом 6 місяців. Хочеш більше раніше? Rage claim, але очікуй штраф за спалювання."
        },
        "rewardsOnLocked": {
          "question": "Чи заробляю я винагороди з заблокованих токенів?",
          "answer": "Так! Всі токени передпродажу автоматично стейкаються і заробляють винагороди з першого дня."
        },
        "afterBurnCap": {
          "question": "Що відбувається після ліміту спалювання?",
          "answer": "Як тільки спалюється 200M токенів, механізм спалювання зупиняється. Розподіл податків переходить до 50% скарбниця, 50% стейкінг."
        },
        "lossClaimsSupported": {
          "question": "Які токени я можу використовувати для відшкодування збитків?",
          "answer": "Будь-які підтверджені збитки від протоколів DeFi, ліквідацій CEX або rag pulls можна заявити з правильною верифікацією."
        },
        "stakeAfterPresale": {
          "question": "Чи можу я стейкати, якщо купую після передпродажу?",
          "answer": "Абсолютно! Стейкінг доступний всім власникам $REKT, не тільки учасникам передпродажу."
        },
        "claimAmount": {
          "question": "Скільки REKT я можу отримати від збитків?",
          "answer": "Заявки розраховуються на основі підтвердженої суми збитків, віку гаманця і множників рівня спільноти."
        }
      }
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
    if (remainingTranslations[langCode]) {
      const updatedData = deepMerge(existingData, remainingTranslations[langCode]);
      
      // Write updated file
      fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2), 'utf8');
      console.log(`✅ Updated ${langCode}.json with roadmap and FAQ translations`);
    } else {
      console.log(`⚠️  No translations available for ${langCode}`);
    }
    
  } catch (error) {
    console.error(`❌ Error updating ${langCode}.json:`, error.message);
  }
}

// Main function
function main() {
  console.log('🚀 Starting final translation update for remaining languages...\n');
  
  // Remaining languages that need roadmap and FAQ translations
  const languagesToUpdate = ['bn', 'cs', 'th', 'tr', 'uk'];
  
  // Update each language file
  languagesToUpdate.forEach(langCode => {
    updateLanguageFile(langCode);
  });
  
  console.log('\n🎉 Final translation update completed!');
  console.log('\nSummary:');
  console.log('- All major languages now have complete roadmap and FAQ translations');
  console.log('- Translations include: German, Japanese, Korean, Russian, Arabic, Italian, Portuguese, Dutch, Polish, Bulgarian, Bengali, Czech, Thai, Turkish, Ukrainian');
  console.log('- Languages with existing translations (Spanish, French, Chinese) were preserved');
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { updateLanguageFile, deepMerge, remainingTranslations }; 
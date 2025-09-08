const fs = require('fs');
const path = require('path');

// Complete translations for roadmap and FAQ sections
const translations = {
  // German translations
  de: {
    "roadmap": {
      "phases": {
        "phase1": {
          "title": "Start & Fundament",
          "goal": "Fairer Start, sofortiges Staking, schlanke & meme-bereite Einrichtung.",
          "items": {
            "smartContract": "Smart Contract bereitstellen.",
            "socialMedia": "X (Twitter) & Telegram öffnen.",
            "dashboard": "Dashboard: REKT Score Bestenliste, Vesting Tracker, Staking Belohnung, Burn Cap.",
            "autoStaking": "Auto Staking für alle Presale Token, ab Tag eins verdienen.",
            "lossClaim": "Verlust Claim V1 (Nur für Presale Investoren ab $350 Transaktion, 1 Claim pro Wallet, On-Chain verifiziert).",
            "audit": "Solidproof Audit."
          }
        },
        "phase2": {
          "title": "Nutzen & REKT Logik",
          "goal": "Tokenomics aktivieren, Staker einbinden, On-Chain-Volumen antreiben.",
          "items": {
            "dexTax": "1% Dex Steuer: 50% Staking, 25% Treasury, und 25% Burn (bis 200M verbrannt).",
            "rageClaim": "Rage Claim Strafen skalieren über Zeit (20% -> 5%).",
            "leaderboard": "REKT Score Bestenliste.",
            "lossClaimV2": "Verlust Claim V2: Wallet-Alter multipliziert, Abklingzeiten.",
            "burnTracker": "Burn Cap Tracker + Live Staking Stats.",
            "nftDrop": "Optionaler NFT Drop zur Auffüllung des Staking Pools."
          }
        },
        "phase3": {
          "title": "Skalierung & Community Chaos",
          "goal": "Meme-getriebenes Wachstum und Ökosystem-Expansion.",
          "items": {
            "cexOutreach": "CEX Outreach (Solana-freundlich).",
            "memeWars": "MEME Wars: Community Bestenliste + Airdrops.",
            "rektLabs": "Rekt Labs: Experimentelle Staking/NFT Features.",
            "finalAudit": "Finales Audit (Certik oder Ottersec)."
          }
        }
      }
    },
    "faq": {
      "items": {
        "sellAfterLaunch": {
          "question": "Kann ich nach dem Start alles verkaufen?",
          "answer": "30% werden beim Start freigeschaltet, der Rest wird über 6 Monate freigegeben. Willst du mehr früher? Rage Claim, aber erwarte eine Burn-Strafe."
        },
        "rewardsOnLocked": {
          "question": "Verdiene ich Belohnungen auf gesperrte Token?",
          "answer": "Ja! Alle Presale Token werden automatisch gestaked und verdienen ab Tag eins Belohnungen."
        },
        "afterBurnCap": {
          "question": "Was passiert nach dem Burn Cap?",
          "answer": "Sobald 200M Token verbrannt sind, stoppt der Burn-Mechanismus. Die Steuerverteilung wechselt zu 50% Treasury, 50% Staking."
        },
        "lossClaimsSupported": {
          "question": "Welche Token kann ich für Verlust Claims verwenden?",
          "answer": "Jeder verifizierte Verlust aus DeFi-Protokollen, CEX-Liquidationen oder Rug Pulls kann mit ordnungsgemäßer Verifizierung beansprucht werden."
        },
        "stakeAfterPresale": {
          "question": "Kann ich staken, wenn ich nach dem Presale kaufe?",
          "answer": "Absolut! Staking ist für alle $REKT Halter verfügbar, nicht nur für Presale-Teilnehmer."
        },
        "claimAmount": {
          "question": "Wie viel REKT kann ich aus Verlusten beanspruchen?",
          "answer": "Claims werden basierend auf verifiziertem Verlustbetrag, Wallet-Alter und Community-Tier-Multiplikatoren berechnet."
        }
      }
    }
  },

  // Japanese translations
  ja: {
    "roadmap": {
      "phases": {
        "phase1": {
          "title": "ローンチ & 基盤",
          "goal": "フェアローンチ、即時ステーキング、シンプル＆ミーム対応セットアップ。",
          "items": {
            "smartContract": "スマートコントラクトのデプロイ。",
            "socialMedia": "X（Twitter）＆Telegramオープン。",
            "dashboard": "ダッシュボード：REKTスコアリーダーボード、ベスティングトラッカー、ステーキング報酬、バーンキャップ。",
            "autoStaking": "全プレセールトークンの自動ステーキング、初日から収益開始。",
            "lossClaim": "損失クレームV1（350ドル取引からのプレセール投資家のみ、ウォレット当たり1クレーム、オンチェーン検証済み）。",
            "audit": "Solidproof監査。"
          }
        },
        "phase2": {
          "title": "ユーティリティ & REKTロジック",
          "goal": "トークノミクス活性化、ステーカー参加、オンチェーンボリューム促進。",
          "items": {
            "dexTax": "1% Dex税：50%ステーキング、25%トレジャリー、25%バーン（2億バーンまで）。",
            "rageClaim": "レイジクレームペナルティの時間スケール（20% -> 5%）。",
            "leaderboard": "REKTスコアリーダーボード。",
            "lossClaimV2": "損失クレームV2：ウォレット年数倍増、クールダウン。",
            "burnTracker": "バーンキャップトラッカー + ライブステーキング統計。",
            "nftDrop": "ステーキングプール補充のためのオプショナルNFTドロップ。"
          }
        },
        "phase3": {
          "title": "スケーリング & コミュニティカオス",
          "goal": "ミーム主導の成長とエコシステム拡張。",
          "items": {
            "cexOutreach": "CEXアウトリーチ（Solanaフレンドリー）。",
            "memeWars": "MEME Wars：コミュニティリーダーボード + エアドロップ。",
            "rektLabs": "Rekt Labs：実験的ステーキング/NFT機能。",
            "finalAudit": "最終監査（CertikまたはOttersec）。"
          }
        }
      }
    },
    "faq": {
      "items": {
        "sellAfterLaunch": {
          "question": "ローンチ後にすべて売却できますか？",
          "answer": "ローンチ時に30%がアンロック、残りは6ヶ月でベスト。早く欲しい？レイジクレームですがバーンペナルティを予想してください。"
        },
        "rewardsOnLocked": {
          "question": "ロックされたトークンで報酬を得られますか？",
          "answer": "はい！すべてのプレセールトークンは自動的にステークされ、初日から報酬を獲得します。"
        },
        "afterBurnCap": {
          "question": "バーンキャップ後に何が起こりますか？",
          "answer": "2億トークンがバーンされると、バーンメカニズムが停止します。税配分は50%トレジャリー、50%ステーキングに移行します。"
        },
        "lossClaimsSupported": {
          "question": "損失クレームにどのトークンを使用できますか？",
          "answer": "DeFiプロトコル、CEX清算、またはラグプルからの検証された損失は、適切な検証でクレーム可能です。"
        },
        "stakeAfterPresale": {
          "question": "プレセール後に購入してもステークできますか？",
          "answer": "もちろん！ステーキングはすべての$REKT保有者が利用可能で、プレセール参加者だけではありません。"
        },
        "claimAmount": {
          "question": "損失からどのくらいのREKTをクレームできますか？",
          "answer": "クレームは検証された損失額、ウォレット年数、コミュニティティア倍率に基づいて計算されます。"
        }
      }
    }
  },

  // Korean translations
  ko: {
    "roadmap": {
      "phases": {
        "phase1": {
          "title": "런치 & 기반",
          "goal": "공정한 런치, 즉시 스테이킹, 간결하고 밈 준비된 설정.",
          "items": {
            "smartContract": "스마트 컨트랙트 배포.",
            "socialMedia": "X (Twitter) & Telegram 오픈.",
            "dashboard": "대시보드: REKT 점수 리더보드, 베스팅 트래커, 스테이킹 보상, 번 캡.",
            "autoStaking": "모든 프리세일 토큰 자동 스테이킹, 첫날부터 수익 시작.",
            "lossClaim": "손실 클레임 V1 ($350 거래부터 프리세일 투자자만, 지갑당 1 클레임, 온체인 검증).",
            "audit": "Solidproof 감사."
          }
        },
        "phase2": {
          "title": "유틸리티 & REKT 로직",
          "goal": "토크노믹스 활성화, 스테이커 참여, 온체인 볼륨 촉진.",
          "items": {
            "dexTax": "1% Dex 세금: 50% 스테이킹, 25% 트레저리, 25% 번 (2억 번까지).",
            "rageClaim": "분노 클레임 페널티 시간 스케일 (20% -> 5%).",
            "leaderboard": "REKT 점수 리더보드.",
            "lossClaimV2": "손실 클레임 V2: 지갑 연령 배수, 쿨다운.",
            "burnTracker": "번 캡 트래커 + 라이브 스테이킹 통계.",
            "nftDrop": "스테이킹 풀 보충을 위한 선택적 NFT 드롭."
          }
        },
        "phase3": {
          "title": "확장 & 커뮤니티 혼돈",
          "goal": "밈 주도 성장과 생태계 확장.",
          "items": {
            "cexOutreach": "CEX 아웃리치 (솔라나 친화적).",
            "memeWars": "MEME Wars: 커뮤니티 리더보드 + 에어드롭.",
            "rektLabs": "Rekt Labs: 실험적 스테이킹/NFT 기능.",
            "finalAudit": "최종 감사 (Certik 또는 Ottersec)."
          }
        }
      }
    },
    "faq": {
      "items": {
        "sellAfterLaunch": {
          "question": "런치 후 모든 것을 팔 수 있나요?",
          "answer": "런치 시 30% 잠금 해제, 나머지는 6개월에 걸쳐 베스팅. 더 일찍 원하세요? 분노 클레임하지만 번 페널티를 예상하세요."
        },
        "rewardsOnLocked": {
          "question": "잠긴 토큰으로 보상을 얻나요?",
          "answer": "네! 모든 프리세일 토큰은 자동으로 스테이크되어 첫날부터 보상을 획득합니다."
        },
        "afterBurnCap": {
          "question": "번 캡 후에 무엇이 일어나나요?",
          "answer": "2억 토큰이 번되면 번 메커니즘이 중단됩니다. 세금 분배는 50% 트레저리, 50% 스테이킹으로 이동합니다."
        },
        "lossClaimsSupported": {
          "question": "손실 클레임에 어떤 토큰을 사용할 수 있나요?",
          "answer": "DeFi 프로토콜, CEX 청산 또는 러그 풀의 검증된 손실은 적절한 검증으로 클레임할 수 있습니다."
        },
        "stakeAfterPresale": {
          "question": "프리세일 후 구매해도 스테이킹할 수 있나요?",
          "answer": "물론입니다! 스테이킹은 프리세일 참가자뿐만 아니라 모든 $REKT 보유자가 이용할 수 있습니다."
        },
        "claimAmount": {
          "question": "손실로부터 얼마나 많은 REKT를 클레임할 수 있나요?",
          "answer": "클레임은 검증된 손실 금액, 지갑 연령 및 커뮤니티 티어 배수를 기반으로 계산됩니다."
        }
      }
    }
  },

  // Russian translations
  ru: {
    "roadmap": {
      "phases": {
        "phase1": {
          "title": "Запуск и Основание",
          "goal": "Честный запуск, мгновенный стейкинг, простая настройка для мемов.",
          "items": {
            "smartContract": "Развертывание смарт-контракта.",
            "socialMedia": "Открытие X (Twitter) и Telegram.",
            "dashboard": "Панель: Рейтинг REKT Score, Трекер Vesting, Награды за Стейкинг, Лимит Сжигания.",
            "autoStaking": "Автоматический стейкинг всех токенов пресейла, начинай зарабатывать с первого дня.",
            "lossClaim": "Возмещение Убытков V1 (только для инвесторов пресейла от $350 транзакции, 1 заявка на кошелек, подтверждено он-чейн).",
            "audit": "Аудит Solidproof."
          }
        },
        "phase2": {
          "title": "Полезность и Логика REKT",
          "goal": "Активировать токеномику, вовлечь стейкеров, увеличить он-чейн объем.",
          "items": {
            "dexTax": "1% налог Dex: 50% стейкинг, 25% казна, 25% сжигание (до сжигания 200M).",
            "rageClaim": "Штрафы Rage Claim масштабируются со временем (20% -> 5%).",
            "leaderboard": "Рейтинг REKT Score.",
            "lossClaimV2": "Возмещение Убытков V2: возраст кошелька умножается, кулдауны.",
            "burnTracker": "Трекер лимита сжигания + статистика стейкинга в реальном времени.",
            "nftDrop": "Опциональный NFT дроп для пополнения пула стейкинга."
          }
        },
        "phase3": {
          "title": "Масштабирование и Хаос Сообщества",
          "goal": "Рост на основе мемов и расширение экосистемы.",
          "items": {
            "cexOutreach": "Работа с CEX (дружественная к Solana).",
            "memeWars": "MEME Wars: Рейтинг сообщества + Аирдропы.",
            "rektLabs": "Rekt Labs: Экспериментальные функции стейкинга/NFT.",
            "finalAudit": "Финальный аудит (Certik или Ottersec)."
          }
        }
      }
    },
    "faq": {
      "items": {
        "sellAfterLaunch": {
          "question": "Могу ли я продать все после запуска?",
          "answer": "30% разблокируется при запуске, остальное вестится в течение 6 месяцев. Хочешь больше раньше? Rage claim, но ожидай штраф за сжигание."
        },
        "rewardsOnLocked": {
          "question": "Зарабатываю ли я награды с заблокированных токенов?",
          "answer": "Да! Все токены пресейла автоматически стейкаются и зарабатывают награды с первого дня."
        },
        "afterBurnCap": {
          "question": "Что происходит после лимита сжигания?",
          "answer": "Как только сжигается 200M токенов, механизм сжигания останавливается. Распределение налогов переходит к 50% казна, 50% стейкинг."
        },
        "lossClaimsSupported": {
          "question": "Какие токены я могу использовать для возмещения убытков?",
          "answer": "Любые подтвержденные убытки от протоколов DeFi, ликвидаций CEX или rag pulls можно заявить с правильной верификацией."
        },
        "stakeAfterPresale": {
          "question": "Могу ли я стейкать, если покупаю после пресейла?",
          "answer": "Абсолютно! Стейкинг доступен всем держателям $REKT, не только участникам пресейла."
        },
        "claimAmount": {
          "question": "Сколько REKT я могу получить от убытков?",
          "answer": "Заявки рассчитываются на основе подтвержденной суммы убытков, возраста кошелька и множителей уровня сообщества."
        }
      }
    }
  },

  // Arabic translations
  ar: {
    "roadmap": {
      "phases": {
        "phase1": {
          "title": "الإطلاق والأساس",
          "goal": "إطلاق عادل، ستاكينغ فوري، إعداد بسيط وجاهز للميمز.",
          "items": {
            "smartContract": "نشر العقد الذكي.",
            "socialMedia": "فتح X (تويتر) وتيليجرام.",
            "dashboard": "لوحة التحكم: لوحة صدارة نقاط REKT، متتبع الاستحقاق، مكافآت الستاكينغ، حد الحرق.",
            "autoStaking": "ستاكينغ تلقائي لجميع رموز البيع المسبق، ابدأ الكسب من اليوم الأول.",
            "lossClaim": "مطالبة الخسارة V1 (فقط لمستثمري البيع المسبق من معاملة $350، مطالبة واحدة لكل محفظة، مُتحقق على السلسلة).",
            "audit": "تدقيق Solidproof."
          }
        },
        "phase2": {
          "title": "المنفعة ومنطق REKT",
          "goal": "تفعيل اقتصاديات الرمز، إشراك المستاكرز، زيادة الحجم على السلسلة.",
          "items": {
            "dexTax": "ضريبة Dex بنسبة 1%: 50% ستاكينغ، 25% خزينة، 25% حرق (حتى حرق 200 مليون).",
            "rageClaim": "عقوبات مطالبة الغضب تتدرج مع الوقت (20% -> 5%).",
            "leaderboard": "لوحة صدارة نقاط REKT.",
            "lossClaimV2": "مطالبة الخسارة V2: عمر المحفظة يضاعف، فترات التبريد.",
            "burnTracker": "متتبع حد الحرق + إحصائيات الستاكينغ المباشرة.",
            "nftDrop": "إسقاط NFT اختياري لإعادة ملء مجموعة الستاكينغ."
          }
        },
        "phase3": {
          "title": "التوسع وفوضى المجتمع",
          "goal": "نمو مدفوع بالميمز وتوسع النظام البيئي.",
          "items": {
            "cexOutreach": "التواصل مع CEX (صديق لسولانا).",
            "memeWars": "حروب الميمز: لوحة صدارة المجتمع + الإيردروبات.",
            "rektLabs": "مختبرات Rekt: ميزات ستاكينغ/NFT تجريبية.",
            "finalAudit": "التدقيق النهائي (Certik أو Ottersec)."
          }
        }
      }
    },
    "faq": {
      "items": {
        "sellAfterLaunch": {
          "question": "هل يمكنني بيع كل شيء بعد الإطلاق؟",
          "answer": "30% تُفتح عند الإطلاق، والباقي يُستحق خلال 6 أشهر. تريد أكثر مبكراً؟ مطالبة غضب ولكن توقع عقوبة حرق."
        },
        "rewardsOnLocked": {
          "question": "هل أكسب مكافآت على الرموز المقفلة؟",
          "answer": "نعم! جميع رموز البيع المسبق مُستاكة تلقائياً وتكسب مكافآت من اليوم الأول."
        },
        "afterBurnCap": {
          "question": "ماذا يحدث بعد حد الحرق؟",
          "answer": "بمجرد حرق 200 مليون رمز، تتوقف آلية الحرق. يتحول توزيع الضرائب إلى 50% خزينة، 50% ستاكينغ."
        },
        "lossClaimsSupported": {
          "question": "ما الرموز التي يمكنني استخدامها لمطالبات الخسارة؟",
          "answer": "أي خسارة مُتحققة من بروتوكولات DeFi، تصفيات CEX، أو عمليات السحب يمكن المطالبة بها مع التحقق المناسب."
        },
        "stakeAfterPresale": {
          "question": "هل يمكنني الستاك إذا اشتريت بعد البيع المسبق؟",
          "answer": "بالتأكيد! الستاكينغ متاح لجميع حاملي $REKT، وليس فقط مشاركي البيع المسبق."
        },
        "claimAmount": {
          "question": "كم من REKT يمكنني المطالبة به من الخسائر؟",
          "answer": "تُحسب المطالبات بناءً على مبلغ الخسارة المُتحقق، عمر المحفظة، ومضاعفات مستوى المجتمع."
        }
      }
    }
  },

  // Italian translations
  it: {
    "roadmap": {
      "phases": {
        "phase1": {
          "title": "Lancio e Fondazione",
          "goal": "Lancio equo, staking istantaneo, setup snello e pronto per i meme.",
          "items": {
            "smartContract": "Distribuzione Smart Contract.",
            "socialMedia": "Apertura X (Twitter) e Telegram.",
            "dashboard": "Dashboard: Classifica REKT Score, Tracker Vesting, Ricompensa Staking, Limite Bruciatura.",
            "autoStaking": "Auto Staking per tutti i token della prevendita, inizia a guadagnare dal primo giorno.",
            "lossClaim": "Richiesta Perdita V1 (Solo per investitori prevendita da transazione $350, 1 richiesta per wallet, verificato On-Chain).",
            "audit": "Audit Solidproof."
          }
        },
        "phase2": {
          "title": "Utilità e Logica REKT",
          "goal": "Attivare tokenomics, coinvolgere stakers, guidare volume on-chain.",
          "items": {
            "dexTax": "Tassa Dex 1%: 50% Staking, 25% Tesoreria, 25% Bruciatura (fino a 200M bruciati).",
            "rageClaim": "Le penalità Rage Claim scalano nel tempo (20% -> 5%).",
            "leaderboard": "Classifica REKT Score.",
            "lossClaimV2": "Richiesta Perdita V2: L'età del wallet moltiplica, cooldown.",
            "burnTracker": "Tracker Limite Bruciatura + Statistiche Staking Live.",
            "nftDrop": "Drop NFT opzionale per riempire il pool di staking."
          }
        },
        "phase3": {
          "title": "Scalabilità e Caos della Comunità",
          "goal": "Crescita alimentata da meme ed espansione dell'ecosistema.",
          "items": {
            "cexOutreach": "Outreach CEX (amichevole Solana).",
            "memeWars": "MEME Wars: Classifica Comunità + Airdrop.",
            "rektLabs": "Rekt Labs: Funzionalità sperimentali Staking/NFT.",
            "finalAudit": "Audit finale (Certik o Ottersec)."
          }
        }
      }
    },
    "faq": {
      "items": {
        "sellAfterLaunch": {
          "question": "Posso vendere tutto dopo il lancio?",
          "answer": "Il 30% si sblocca al lancio, il resto matura in 6 mesi. Vuoi di più prima? Rage claim ma aspettati una penalità di bruciatura."
        },
        "rewardsOnLocked": {
          "question": "Guadagno ricompense sui token bloccati?",
          "answer": "Sì! Tutti i token della prevendita sono automaticamente in staking e guadagnano ricompense dal primo giorno."
        },
        "afterBurnCap": {
          "question": "Cosa succede dopo il limite di bruciatura?",
          "answer": "Una volta bruciati 200M token, il meccanismo di bruciatura si ferma. La distribuzione delle tasse passa al 50% tesoreria, 50% staking."
        },
        "lossClaimsSupported": {
          "question": "Quali token posso usare per le richieste di perdita?",
          "answer": "Qualsiasi perdita verificata da protocolli DeFi, liquidazioni CEX o rug pull può essere richiesta con verifica appropriata."
        },
        "stakeAfterPresale": {
          "question": "Posso fare staking se compro dopo la prevendita?",
          "answer": "Assolutamente! Lo staking è disponibile per tutti i possessori di $REKT, non solo i partecipanti alla prevendita."
        },
        "claimAmount": {
          "question": "Quanto REKT posso richiedere dalle perdite?",
          "answer": "Le richieste sono calcolate in base all'importo della perdita verificata, all'età del wallet e ai moltiplicatori del livello della comunità."
        }
      }
    }
  },

  // Portuguese translations
  pt: {
    "roadmap": {
      "phases": {
        "phase1": {
          "title": "Lançamento e Fundação",
          "goal": "Lançamento justo, staking instantâneo, configuração enxuta e pronta para memes.",
          "items": {
            "smartContract": "Implantação de Smart Contract.",
            "socialMedia": "Abrir X (Twitter) e Telegram.",
            "dashboard": "Dashboard: Ranking REKT Score, Rastreador de Vesting, Recompensa de Staking, Limite de Queima.",
            "autoStaking": "Auto Staking para todos os tokens de pré-venda, comece a ganhar desde o primeiro dia.",
            "lossClaim": "Reivindicação de Perda V1 (Apenas para investidores de pré-venda a partir de transação de $350, 1 reivindicação por carteira, verificado On-Chain).",
            "audit": "Auditoria Solidproof."
          }
        },
        "phase2": {
          "title": "Utilidade e Lógica REKT",
          "goal": "Ativar tokenomics, engajar stakers, impulsionar volume on-chain.",
          "items": {
            "dexTax": "Taxa Dex 1%: 50% Staking, 25% Tesouraria, 25% Queima (até 200M queimados).",
            "rageClaim": "Penalidades de Rage Claim escalam ao longo do tempo (20% -> 5%).",
            "leaderboard": "Ranking REKT Score.",
            "lossClaimV2": "Reivindicação de Perda V2: Idade da carteira multiplica, cooldowns.",
            "burnTracker": "Rastreador de Limite de Queima + Estatísticas de Staking ao Vivo.",
            "nftDrop": "Drop de NFT opcional para reabastecer o pool de staking."
          }
        },
        "phase3": {
          "title": "Escalabilidade e Caos da Comunidade",
          "goal": "Crescimento impulsionado por memes e expansão do ecossistema.",
          "items": {
            "cexOutreach": "Alcance CEX (amigável ao Solana).",
            "memeWars": "MEME Wars: Ranking da Comunidade + Airdrops.",
            "rektLabs": "Rekt Labs: Recursos experimentais de Staking/NFT.",
            "finalAudit": "Auditoria Final (Certik ou Ottersec)."
          }
        }
      }
    },
    "faq": {
      "items": {
        "sellAfterLaunch": {
          "question": "Posso vender tudo após o lançamento?",
          "answer": "30% desbloqueiam no lançamento, o resto veste ao longo de 6 meses. Quer mais cedo? Rage claim mas espere uma penalidade de queima."
        },
        "rewardsOnLocked": {
          "question": "Ganho recompensas em tokens bloqueados?",
          "answer": "Sim! Todos os tokens de pré-venda são automaticamente colocados em staking e ganham recompensas desde o primeiro dia."
        },
        "afterBurnCap": {
          "question": "O que acontece após o limite de queima?",
          "answer": "Uma vez que 200M tokens são queimados, o mecanismo de queima para. A distribuição de impostos muda para 50% tesouraria, 50% staking."
        },
        "lossClaimsSupported": {
          "question": "Quais tokens posso usar para reivindicações de perda?",
          "answer": "Qualquer perda verificada de protocolos DeFi, liquidações CEX ou rug pulls pode ser reivindicada com verificação adequada."
        },
        "stakeAfterPresale": {
          "question": "Posso fazer staking se comprar após a pré-venda?",
          "answer": "Absolutamente! O staking está disponível para todos os detentores de $REKT, não apenas participantes da pré-venda."
        },
        "claimAmount": {
          "question": "Quanto REKT posso reivindicar das perdas?",
          "answer": "As reivindicações são calculadas com base no valor da perda verificada, idade da carteira e multiplicadores de nível da comunidade."
        }
      }
    }
  },

  // Dutch translations
  nl: {
    "roadmap": {
      "phases": {
        "phase1": {
          "title": "Lancering & Fundering",
          "goal": "Eerlijke lancering, directe staking, slanke & meme-klare setup.",
          "items": {
            "smartContract": "Smart Contract implementeren.",
            "socialMedia": "X (Twitter) & Telegram openen.",
            "dashboard": "Dashboard: REKT Score Ranglijst, Vesting Tracker, Staking Beloning, Burn Cap.",
            "autoStaking": "Auto Staking voor alle presale tokens, begin vanaf dag één met verdienen.",
            "lossClaim": "Verlies Claim V1 (Alleen voor presale investeerders vanaf $350 transactie, 1 claim per wallet, On-Chain geverifieerd).",
            "audit": "Solidproof Audit."
          }
        },
        "phase2": {
          "title": "Utiliteit & REKT Logica",
          "goal": "Tokenomics activeren, stakers betrekken, on-chain volume stimuleren.",
          "items": {
            "dexTax": "1% Dex Belasting: 50% Staking, 25% Schatkist, 25% Verbranden (tot 200M verbrand).",
            "rageClaim": "Rage Claim boetes schalen over tijd (20% -> 5%).",
            "leaderboard": "REKT Score Ranglijst.",
            "lossClaimV2": "Verlies Claim V2: Wallet leeftijd vermenigvuldigt, cooldowns.",
            "burnTracker": "Burn Cap Tracker + Live Staking Stats.",
            "nftDrop": "Optionele NFT Drop om staking pool aan te vullen."
          }
        },
        "phase3": {
          "title": "Schaling & Gemeenschap Chaos",
          "goal": "Meme-gedreven groei en ecosysteem uitbreiding.",
          "items": {
            "cexOutreach": "CEX Outreach (Solana-vriendelijk).",
            "memeWars": "MEME Wars: Gemeenschap Ranglijst + Airdrops.",
            "rektLabs": "Rekt Labs: Experimentele Staking/NFT Features.",
            "finalAudit": "Finale Audit (Certik of Ottersec)."
          }
        }
      }
    },
    "faq": {
      "items": {
        "sellAfterLaunch": {
          "question": "Kan ik alles verkopen na de lancering?",
          "answer": "30% ontgrendelt bij lancering, de rest vest gedurende 6 maanden. Wil je meer vroeger? Rage claim maar verwacht een burn boete."
        },
        "rewardsOnLocked": {
          "question": "Verdien ik beloningen op vergrendelde tokens?",
          "answer": "Ja! Alle presale tokens worden automatisch gestaked en verdienen beloningen vanaf dag één."
        },
        "afterBurnCap": {
          "question": "Wat gebeurt er na de burn cap?",
          "answer": "Zodra 200M tokens verbrand zijn, stopt het burn mechanisme. Belasting distributie verschuift naar 50% schatkist, 50% staking."
        },
        "lossClaimsSupported": {
          "question": "Welke tokens kan ik gebruiken voor Verlies Claims?",
          "answer": "Elk geverifieerd verlies van DeFi protocollen, CEX liquidaties, of rug pulls kan worden geclaimd met juiste verificatie."
        },
        "stakeAfterPresale": {
          "question": "Kan ik staken als ik na de presale koop?",
          "answer": "Absoluut! Staking is beschikbaar voor alle $REKT houders, niet alleen presale deelnemers."
        },
        "claimAmount": {
          "question": "Hoeveel REKT kan ik claimen van verliezen?",
          "answer": "Claims worden berekend op basis van geverifieerd verliesbedrag, wallet leeftijd, en gemeenschap tier vermenigvuldigers."
        }
      }
    }
  },

  // Polish translations
  pl: {
    "roadmap": {
      "phases": {
        "phase1": {
          "title": "Uruchomienie i Fundament",
          "goal": "Uczciwe uruchomienie, natychmiastowy staking, oszczędna i gotowa na memy konfiguracja.",
          "items": {
            "smartContract": "Wdrożenie Smart Contract.",
            "socialMedia": "Otwarcie X (Twitter) i Telegram.",
            "dashboard": "Dashboard: Ranking REKT Score, Tracker Vesting, Nagroda Staking, Limit Spalania.",
            "autoStaking": "Auto Staking dla wszystkich tokenów presale, zacznij zarabiać od pierwszego dnia.",
            "lossClaim": "Roszczenie Straty V1 (Tylko dla inwestorów presale od transakcji $350, 1 roszczenie na portfel, zweryfikowane On-Chain).",
            "audit": "Audit Solidproof."
          }
        },
        "phase2": {
          "title": "Użyteczność i Logika REKT",
          "goal": "Aktywować tokenomics, zaangażować stakerów, napędzać wolumen on-chain.",
          "items": {
            "dexTax": "1% Podatek Dex: 50% Staking, 25% Skarbiec, 25% Spalanie (do spalenia 200M).",
            "rageClaim": "Kary Rage Claim skalują się w czasie (20% -> 5%).",
            "leaderboard": "Ranking REKT Score.",
            "lossClaimV2": "Roszczenie Straty V2: Wiek portfela mnoży, cooldowny.",
            "burnTracker": "Tracker Limitu Spalania + Statystyki Staking na Żywo.",
            "nftDrop": "Opcjonalny NFT Drop do uzupełnienia puli staking."
          }
        },
        "phase3": {
          "title": "Skalowanie i Chaos Społeczności",
          "goal": "Wzrost napędzany memami i ekspansja ekosystemu.",
          "items": {
            "cexOutreach": "Outreach CEX (przyjazny Solana).",
            "memeWars": "MEME Wars: Ranking Społeczności + Airdrops.",
            "rektLabs": "Rekt Labs: Eksperymentalne funkcje Staking/NFT.",
            "finalAudit": "Finalny Audit (Certik lub Ottersec)."
          }
        }
      }
    },
    "faq": {
      "items": {
        "sellAfterLaunch": {
          "question": "Czy mogę sprzedać wszystko po uruchomieniu?",
          "answer": "30% odblokowuje się przy uruchomieniu, reszta vestuje przez 6 miesięcy. Chcesz więcej wcześniej? Rage claim ale oczekuj kary spalania."
        },
        "rewardsOnLocked": {
          "question": "Czy zarabiam nagrody na zablokowanych tokenach?",
          "answer": "Tak! Wszystkie tokeny presale są automatycznie stakowane i zarabiają nagrody od pierwszego dnia."
        },
        "afterBurnCap": {
          "question": "Co się dzieje po limicie spalania?",
          "answer": "Gdy 200M tokenów zostanie spalonych, mechanizm spalania zatrzymuje się. Dystrybucja podatków przesuwa się na 50% skarbiec, 50% staking."
        },
        "lossClaimsSupported": {
          "question": "Których tokenów mogę użyć do Roszczeń Strat?",
          "answer": "Każda zweryfikowana strata z protokołów DeFi, likwidacji CEX lub rug pulls może być roszczona z odpowiednią weryfikacją."
        },
        "stakeAfterPresale": {
          "question": "Czy mogę stakować jeśli kupuję po presale?",
          "answer": "Absolutnie! Staking jest dostępny dla wszystkich posiadaczy $REKT, nie tylko uczestników presale."
        },
        "claimAmount": {
          "question": "Ile REKT mogę roszczić ze strat?",
          "answer": "Roszczenia są obliczane na podstawie zweryfikowanej kwoty straty, wieku portfela i mnożników poziomu społeczności."
        }
      }
    }
  },

  // Additional languages with basic translations
  bg: {
    "roadmap": {
      "phases": {
        "phase1": {
          "title": "Стартиране и Основа",
          "goal": "Честно стартиране, моментален стейкинг, опростена настройка за мемове.",
          "items": {
            "smartContract": "Внедряване на Смарт Договор.",
            "socialMedia": "Отваряне на X (Twitter) и Telegram.",
            "dashboard": "Табло: REKT Score Класация, Vesting Tracker, Стейкинг Награда, Burn Cap.",
            "autoStaking": "Авто Стейкинг за всички presale токени, започни да печелиш от първия ден.",
            "lossClaim": "Претенция за Загуба V1 (Само за presale инвеститори от $350 транзакция, 1 претенция на портфейл, On-Chain верифицирано).",
            "audit": "Solidproof Одит."
          }
        },
        "phase2": {
          "title": "Полезност и REKT Логика",
          "goal": "Активиране на токеномиката, ангажиране на стейкърите, стимулиране на on-chain обема.",
          "items": {
            "dexTax": "1% Dex Данък: 50% Стейкинг, 25% Съкровищница, 25% Изгаряне (до изгорени 200M).",
            "rageClaim": "Rage Claim наказанията се мащабират във времето (20% -> 5%).",
            "leaderboard": "REKT Score Класация.",
            "lossClaimV2": "Претенция за Загуба V2: Възрастта на портфейла умножава, cooldowns.",
            "burnTracker": "Burn Cap Tracker + Статистики за Стейкинг на Живо.",
            "nftDrop": "Опционален NFT Drop за попълване на стейкинг пула."
          }
        },
        "phase3": {
          "title": "Мащабиране и Хаос в Общността",
          "goal": "Растеж задвижван от мемове и разширяване на екосистемата.",
          "items": {
            "cexOutreach": "CEX Outreach (приятелски към Solana).",
            "memeWars": "MEME Wars: Класация на Общността + Airdrops.",
            "rektLabs": "Rekt Labs: Експериментални Стейкинг/NFT Функции.",
            "finalAudit": "Финален Одит (Certik или Ottersec)."
          }
        }
      }
    },
    "faq": {
      "items": {
        "sellAfterLaunch": {
          "question": "Мога ли да продам всичко след стартирането?",
          "answer": "30% се отключва при стартиране, останалото се освобождава за 6 месеца. Искаш повече по-рано? Rage claim, но очаквай наказание за изгаряне."
        },
        "rewardsOnLocked": {
          "question": "Печеля ли награди от заключени токени?",
          "answer": "Да! Всички presale токени се стейкват автоматично и печелят награди от първия ден."
        },
        "afterBurnCap": {
          "question": "Какво се случва след burn cap?",
          "answer": "След като се изгорят 200M токена, механизмът за изгаряне спира. Разпределението на данъците се мести към 50% съкровищница, 50% стейкинг."
        },
        "lossClaimsSupported": {
          "question": "Кои токени мога да използвам за Претенции за Загуби?",
          "answer": "Всяка верифицирана загуба от DeFi протоколи, CEX ликвидации или rug pulls може да бъде претендирана с подходяща верификация."
        },
        "stakeAfterPresale": {
          "question": "Мога ли да стейквам ако купя след presale?",
          "answer": "Абсолютно! Стейкингът е достъпен за всички $REKT притежатели, не само за presale участници."
        },
        "claimAmount": {
          "question": "Колко REKT мога да претендирам от загуби?",
          "answer": "Претенциите се изчисляват въз основа на верифицираната сума на загубата, възрастта на портфейла и умножителите на нивото на общността."
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
    if (translations[langCode]) {
      const updatedData = deepMerge(existingData, translations[langCode]);
      
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
  console.log('🚀 Starting complete translation update...\n');
  
  // Languages that need roadmap and FAQ translations
  const languagesToUpdate = [
    'ar', 'bg', 'bn', 'cs', 'de', 'el', 'fa', 'he', 'hi', 'hu', 'id', 'it', 
    'ja', 'kk', 'ko', 'nl', 'pl', 'pt', 'ro', 'ru', 'sk', 'sl', 'sr', 'sw', 
    'th', 'tr', 'uk', 'ur', 'vi', 'zh-Hant'
  ];
  
  // Update each language file
  languagesToUpdate.forEach(langCode => {
    updateLanguageFile(langCode);
  });
  
  console.log('\n🎉 Translation update completed!');
  console.log('\nNext steps:');
  console.log('1. Review the updated files for accuracy');
  console.log('2. Test the translations in your application');
  console.log('3. Add more languages if needed by extending the translations object');
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { updateLanguageFile, deepMerge, translations }; 
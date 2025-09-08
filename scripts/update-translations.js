const fs = require('fs');
const path = require('path');

// Language mappings with proper translations
const translations = {
  // Core translations for key sections that need to be added to all language files
  sections: {
    es: {
      "sections": {
        "rektonomics": {
          "title": "Rektonomics",
          "subtitle": "Distribución justa para máximo caos",
          "distributionTitle": "Desglose de Distribución",
          "totalSupply": "Suministro Total: {amount} {symbol}"
        },
        "team": {
          "title": "Conoce a las Leyendas $REKT",
          "subtitle": "Los degenerados que convirtieron el dolor en ganancia. Cada uno probado en batalla por el mercado, forjado en los fuegos de la liquidación."
        },
        "roadmap": {
          "title": "Hoja de Ruta $REKT",
          "subtitle": "Staking exclusivo para compradores de preventa · Stack de lanzamiento simplificado"
        },
        "whitepaper": {
          "title": "Documentación y Seguridad",
          "subtitle": "Transparencia y seguridad primero",
          "description": "Documentación completa y auditorías de seguridad de terceros",
          "whitepaper": {
            "title": "Whitepaper",
            "description": "Documentación integral que cubre tokenomics, hoja de ruta e implementación técnica",
            "features": {
              "tokenomics": "Desglose completo de tokenomics",
              "technical": "Detalles de arquitectura técnica",
              "roadmap": "Hoja de ruta y planes futuros",
              "risk": "Evaluación de riesgos y descargos de responsabilidad"
            },
            "button": "Ver Whitepaper"
          },
          "audit": {
            "title": "Auditoría de Seguridad",
            "description": "Auditoría de seguridad de terceros por firmas líderes de seguridad blockchain",
            "button": "Ver Reporte de Auditoría"
          }
        },
        "faq": {
          "title": "Preguntas Frecuentes",
          "subtitle": "Todo lo que necesitas saber sobre ser REKT",
          "expand": "Expandir",
          "collapse": "Colapsar"
        },
        "leaderboard": {
          "title": "Clasificación de Perdedores",
          "subtitle": "Los mayores perdedores son los mayores ganadores",
          "loading": "Cargando clasificación...",
          "noData": "No hay datos disponibles.",
          "error": "Error al cargar clasificación",
          "columns": {
            "rank": "Rango",
            "loser": "Perdedor",
            "rektScore": "Puntuación Rekt",
            "totalLosses": "Pérdidas Totales",
            "purchase": "Compra"
          },
          "buttons": {
            "refreshLeaderboard": "Actualizar Clasificación",
            "claimYourLoss": "Reclama tu pérdida"
          }
        }
      },
      "footer": {
        "description": "La revolucionaria meme coin que convierte tus pérdidas criptográficas en ganancias. Solo los perdedores ganan en el ecosistema $REKT.",
        "socialTitle": "Únete a nuestros enlaces sociales",
        "copyright": "Copyright © $REKT {year}. Todos los derechos reservados.",
        "disclaimer": "Descargo de responsabilidad: Meme coin con utilidad. No hay ganancias garantizadas. No es asesoramiento financiero. Úsalo bajo tu propio riesgo.",
        "links": {
          "tokenomics": "Tokenomics",
          "roadmap": "Hoja de Ruta",
          "faq": "FAQ",
          "whitepaper": "Whitepaper",
          "audit": "Auditoría",
          "leaderboard": "Clasificación",
          "lossClaim": "Reclamar Pérdida",
          "staking": "Staking"
        }
      },
      "notFound": {
        "title": "Página No Encontrada",
        "description": "La página que buscas no existe.",
        "goHome": "Ir al Inicio",
        "staking": "Staking",
        "lossClaim": "Reclamar Pérdida"
      }
    },
    fr: {
      "sections": {
        "rektonomics": {
          "title": "Rektonomics",
          "subtitle": "Distribution équitable pour un chaos maximum",
          "distributionTitle": "Répartition de la Distribution",
          "totalSupply": "Approvisionnement Total : {amount} {symbol}"
        },
        "team": {
          "title": "Rencontrez les Légendes $REKT",
          "subtitle": "Les dégénérés qui ont transformé la douleur en profit. Chacun testé au combat par le marché, forgé dans les feux de la liquidation."
        },
        "roadmap": {
          "title": "Feuille de Route $REKT",
          "subtitle": "Staking exclusif aux acheteurs de prévente · Stack de lancement simplifié"
        },
        "whitepaper": {
          "title": "Documentation et Sécurité",
          "subtitle": "Transparence et sécurité d'abord",
          "description": "Documentation complète et audits de sécurité tiers",
          "whitepaper": {
            "title": "Livre Blanc",
            "description": "Documentation complète couvrant les tokenomics, la feuille de route et l'implémentation technique",
            "features": {
              "tokenomics": "Répartition complète des tokenomics",
              "technical": "Détails de l'architecture technique",
              "roadmap": "Feuille de route et plans futurs",
              "risk": "Évaluation des risques et avertissements"
            },
            "button": "Voir le Livre Blanc"
          },
          "audit": {
            "title": "Audit de Sécurité",
            "description": "Audit de sécurité tiers par des firmes leaders en sécurité blockchain",
            "button": "Voir le Rapport d'Audit"
          }
        },
        "faq": {
          "title": "Questions Fréquemment Posées",
          "subtitle": "Tout ce que vous devez savoir sur être REKT",
          "expand": "Développer",
          "collapse": "Réduire"
        },
        "leaderboard": {
          "title": "Classement des Perdants",
          "subtitle": "Les plus gros perdants sont les plus gros gagnants",
          "loading": "Chargement du classement...",
          "noData": "Aucune donnée disponible.",
          "error": "Échec du chargement du classement",
          "columns": {
            "rank": "Rang",
            "loser": "Perdant",
            "rektScore": "Score Rekt",
            "totalLosses": "Pertes Totales",
            "purchase": "Achat"
          },
          "buttons": {
            "refreshLeaderboard": "Actualiser le Classement",
            "claimYourLoss": "Réclamez votre perte"
          }
        }
      },
      "footer": {
        "description": "La memecoin révolutionnaire qui transforme vos pertes crypto en gains. Seuls les perdants gagnent dans l'écosystème $REKT.",
        "socialTitle": "Rejoignez nos liens sociaux",
        "copyright": "Copyright © $REKT {year}. Tous droits réservés.",
        "disclaimer": "Avertissement : Memecoin avec utilité. Pas de profits garantis. Pas de conseil financier. Utilisez à vos propres risques.",
        "links": {
          "tokenomics": "Tokenomics",
          "roadmap": "Feuille de Route",
          "faq": "FAQ",
          "whitepaper": "Livre Blanc",
          "audit": "Audit",
          "leaderboard": "Classement",
          "lossClaim": "Réclamation de Perte",
          "staking": "Staking"
        }
      },
      "notFound": {
        "title": "Page Non Trouvée",
        "description": "La page que vous cherchez n'existe pas.",
        "goHome": "Aller à l'Accueil",
        "staking": "Staking",
        "lossClaim": "Réclamation de Perte"
      }
    }
  }
};

// Function to deep merge objects
function deepMerge(target, source) {
  const output = { ...target };
  
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      if (target[key] && typeof target[key] === 'object' && !Array.isArray(target[key])) {
        output[key] = deepMerge(target[key], source[key]);
      } else {
        output[key] = source[key];
      }
    } else {
      output[key] = source[key];
    }
  }
  
  return output;
}

// Function to update a language file
function updateLanguageFile(langCode, enData) {
  const filePath = path.join(__dirname, '..', 'src', 'i18n', 'locales', `${langCode}.json`);
  
  try {
    // Read existing file
    let existingData = {};
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      existingData = JSON.parse(fileContent);
    }
    
    // Start with English structure
    let updatedData = { ...enData };
    
    // Preserve existing translations
    updatedData = deepMerge(updatedData, existingData);
    
    // Add language-specific translations if available
    if (translations.sections[langCode]) {
      updatedData = deepMerge(updatedData, translations.sections[langCode]);
    }
    
    // Write updated file
    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2), 'utf8');
    console.log(`Updated ${langCode}.json`);
    
  } catch (error) {
    console.error(`Error updating ${langCode}.json:`, error);
  }
}

// Main function
function main() {
  try {
    // Read English file as template
    const enPath = path.join(__dirname, '..', 'src', 'i18n', 'locales', 'en.json');
    const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
    
    // List of language codes to update (excluding en and zh which are already good)
    const languagesToUpdate = [
      'ar', 'bg', 'bn', 'cs', 'de', 'el', 'fa', 'he', 'hi', 'hu', 'id', 'it', 
      'ja', 'kk', 'ko', 'nl', 'pl', 'pt', 'ro', 'ru', 'sk', 'sl', 'sr', 'sw', 
      'th', 'tr', 'uk', 'ur', 'vi', 'zh-Hant'
    ];
    
    // Update each language file
    languagesToUpdate.forEach(langCode => {
      updateLanguageFile(langCode, enData);
    });
    
    console.log('All language files updated successfully!');
    
  } catch (error) {
    console.error('Error in main function:', error);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { updateLanguageFile, deepMerge }; 
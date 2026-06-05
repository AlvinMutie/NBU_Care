/**
 * NeoBot Clinical & System Knowledge Base
 * This file serves as the "source of truth" for the AI assistant.
 * It contains standardized clinical protocols and system navigation rules.
 */

export const NEOBOT_KNOWLEDGE = {
  clinical: {
    respiratory: {
      cpap: {
        indication: "Respiratory distress, grunting, nasal flaring, SpO2 < 90% on room air.",
        settings: "Standard starting pressure: 5-8 cm H2O. Flow: 6-8 L/min.",
        monitoring: "Monitor SpO2 every 1-2 hours. Maintain saturations 90-95%.",
        weaning: "Wean when distress resolves and SpO2 is stable on FiO2 21%."
      },
      oxygen: {
        preterm: "Target SpO2: 90-94% (High risk of ROP if >95%)",
        term: "Target SpO2: 94-98%",
        administration: "Use nasal prongs or head box. Titrate to lowest effective FiO2."
      }
    },
    medications: {
      gentamicin: {
        dose: "5 mg/kg once daily (OD).",
        dilution: "Dilute in Normal Saline to 2mg/ml.",
        safety: "Check renal function if therapy > 7 days."
      },
      benzylpenicillin: {
        dose: "50 mg/kg every 12 hours (BD).",
        dilution: "Reconstitute with Sterile Water."
      },
      vitaminK: {
        dose: "1 mg IM once at birth for >1.5kg. 0.5mg for <1.5kg."
      }
    },
    fluids: {
      dailyRates: {
        day1: "60 ml/kg/day",
        day2: "80 ml/kg/day",
        day3: "100 ml/kg/day",
        day4: "120 ml/kg/day",
        day5plus: "150 ml/kg/day"
      },
      fluidType: "10% Dextrose for first 48 hours, then switch to specialized NBU fluid."
    },
    vitals: {
      heartRate: "Normal: 120-160 bpm",
      respRate: "Normal: 40-60 breaths/min",
      temperature: "Normal: 36.5 - 37.5 °C (Axillary)"
    }
  },
  system: {
    navigation: {
      add_neonate: "To register a new baby, go to the 'Neonate Registry' and click the '+' button at the top right.",
      verification: "Admins can verify staff in the 'Verification Queue' found in the sidebar.",
      audit_logs: "Shift activities can be viewed in 'Shift Records' (Audit Logs).",
      handover: "Use the 'Shift Handovers' section to record patient status for the incoming team.",
      drug_calculator: "Access 'Drug Pipeline' from the sidebar for automated clinical calculations."
    },
    roles: {
      in_charge: "Full access to unit management, staff verification, and audit logs.",
      nurse: "Access to registry, handovers, and clinical calculators.",
      student: "Access to Learning Hub, Flashcards, and Practice Calculators."
    }
  },
  personality: {
    tone: "Professional, supportive, and safety-conscious.",
    disclaimer: "IMPORTANT: Always verify AI-suggested doses with the Unit In-Charge or a second clinician before administration."
  }
};

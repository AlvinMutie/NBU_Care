const express = require('express');
const { query } = require('../db/pool');

const router = express.Router();

function mapFlashcardRow(row) {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    icon: row.icon,
    whenToPerform: row.when_to_perform,
    steps: JSON.parse(row.steps_json),
    criticalWarnings: row.critical_warnings,
    tips: row.tips,
    image: row.image_id
      ? {
          id: row.image_id,
          url: `/uploads/${row.file_name}`,
        }
      : null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// Display Mode / public read-only routes.
// Intended for LAN TVs/kiosks. Consider protecting via network ACLs.
router.get('/flashcards', async (req, res, next) => {
  try {
    const rows = await query(
      `
      SELECT f.*, i.file_name
      FROM flashcards f
      LEFT JOIN images i ON i.id = f.image_id
      ORDER BY f.updated_at DESC
      LIMIT 200
      `,
    );
    res.json({ flashcards: rows.map(mapFlashcardRow) });
  } catch (err) {
    next(err);
  }
});

module.exports = router;


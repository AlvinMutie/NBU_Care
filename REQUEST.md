✅ GEMINI CLI PROMPT (Render 500 Fix)

Fix the Laravel deployment error causing a 500 server error on Render.

Error details:
Deployment fails during migrations
Logs show:
syntax error, unexpected token "default"
File:
database/migrations/2026_06_05_100002_create_clinical_intervention_tables.php
Tasks:
Open and analyze the migration file
Locate the syntax error on or near line 20
Fix incorrect Laravel schema syntax (especially misuse of default)
Ensure all Schema::create() and $table->... definitions follow valid Laravel Blueprint syntax
Do NOT change business logic or table structure unless necessary for correctness
Ensure the migration runs successfully with:
php artisan migrate
Confirm no other syntax errors exist in the migration
Output:
Show corrected migration file
Briefly explain what was fixed
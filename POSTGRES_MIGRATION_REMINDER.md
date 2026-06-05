# 🚨 REMINDER: PostgreSQL Service Expiration

## Context
Render's **Free Tier PostgreSQL** is a trial service that **expires after 30 days**. Once it expires, the database and all its data will be **permanently deleted** unless upgraded to a paid plan.

---

## 📅 Action Dates
- **Created On:** June 5, 2026
- **Expiration Date:** ~July 5, 2026
- **Critical Migration Window:** June 30 - July 4, 2026

---

## 🛠️ Migration Options

### Option A: Upgrade Render Database (Paid)
If the project gets funding, upgrade the database instance in the Render dashboard to a "Starter" plan ($7/mo) to keep the data and remove the expiration.

### Option B: Switch to a Free Perpetual Provider (Recommended)
Switch to a provider that offers a "Free Forever" tier (with limits) to avoid data loss.
- **[Neon.tech](https://neon.tech/)**: Serverless Postgres, very fast, generous free tier.
- **[Supabase](https://supabase.com/)**: Full Backend-as-a-Service with Postgres.

---

## 📋 Migration Checklist

1. **Backup Current Data:**
   - Use `pg_dump` to export the current data from Render.
   ```bash
   pg_dump -h <render_host> -U <user> <database_name> > backup.sql
   ```

2. **Setup New Database:**
   - Create a project on Neon or Supabase.
   - Copy the new connection string.

3. **Update Render Environment Variables:**
   - In the `nbu-laravel-unified` service on Render, remove the `fromDatabase` links in the Environment tab.
   - Manually add:
     - `DB_HOST`: <new_host>
     - `DB_PORT`: 5432
     - `DB_DATABASE`: <new_db_name>
     - `DB_USERNAME`: <new_user>
     - `DB_PASSWORD`: <new_password>

4. **Import Data:**
   ```bash
   psql -h <new_host> -U <new_user> <new_db_name> < backup.sql
   ```

5. **Verify:**
   - Check the application logs in Render to ensure the connection is successful.

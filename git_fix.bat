@echo off
git add .
git commit -m "Fix missing route modules (stats, audit) for Render deployment"
git push https://github.com/AlvinMutie/NBU_Care.git main

The following are errors encountered during deployment:

#15 0.413   Problem 11
#15 0.413     - symfony/process is locked to version v8.1.0 and an update of this package was not requested.
#15 0.413     - symfony/process v8.1.0 requires php >=8.4.1 -> your php version (8.3.31) does not satisfy that requirement.
#15 0.413   Problem 12
#15 0.413     - symfony/routing is locked to version v8.1.0 and an update of this package was not requested.
#15 0.413     - symfony/routing v8.1.0 requires php >=8.4.1 -> your php version (8.3.31) does not satisfy that requirement.
#15 0.413   Problem 13
#15 0.413     - symfony/string is locked to version v8.1.0 and an update of this package was not requested.
#15 0.413     - symfony/string v8.1.0 requires php >=8.4.1 -> your php version (8.3.31) does not satisfy that requirement.
#15 0.413   Problem 14
#15 0.413     - symfony/translation is locked to version v8.1.0 and an update of this package was not requested.
#15 0.413     - symfony/translation v8.1.0 requires php >=8.4.1 -> your php version (8.3.31) does not satisfy that requirement.
#15 0.413   Problem 15
#15 0.413     - symfony/uid is locked to version v8.1.0 and an update of this package was not requested.
#15 0.413     - symfony/uid v8.1.0 requires php >=8.4.1 -> your php version (8.3.31) does not satisfy that requirement.
#15 0.413   Problem 16
#15 0.413     - symfony/var-dumper is locked to version v8.1.0 and an update of this package was not requested.
#15 0.413     - symfony/var-dumper v8.1.0 requires php >=8.4.1 -> your php version (8.3.31) does not satisfy that requirement.
#15 0.413   Problem 17
#15 0.413     - psy/psysh is locked to version v0.12.23 and an update of this package was not requested.
#15 0.413     - psy/psysh v0.12.23 requires symfony/console ^8.0 || ^7.0 || ^6.0 || ^5.0 || ^4.0 || ^3.4 -> satisfiable by symfony/console[v8.1.0].
#15 0.413     - symfony/console v8.1.0 requires php >=8.4.1 -> your php version (8.3.31) does not satisfy that requirement.
#15 0.413 
#15 ERROR: process "/bin/sh -c composer install --no-interaction --no-dev --optimize-autoloader" did not complete successfully: exit code: 2
------
 > importing cache manifest from image-registry-v2.aws-us-west-2-7.internal.render.com/srv-d8klv83bc2fs73cnsc10:buildcache:
------
------
 > [stage-0 6/7] RUN composer install --no-interaction --no-dev --optimize-autoloader:
0.413     - symfony/uid is locked to version v8.1.0 and an update of this package was not requested.
0.413     - symfony/uid v8.1.0 requires php >=8.4.1 -> your php version (8.3.31) does not satisfy that requirement.
0.413   Problem 16
0.413     - symfony/var-dumper is locked to version v8.1.0 and an update of this package was not requested.
0.413     - symfony/var-dumper v8.1.0 requires php >=8.4.1 -> your php version (8.3.31) does not satisfy that requirement.
0.413   Problem 17
0.413     - psy/psysh is locked to version v0.12.23 and an update of this package was not requested.
0.413     - psy/psysh v0.12.23 requires symfony/console ^8.0 || ^7.0 || ^6.0 || ^5.0 || ^4.0 || ^3.4 -> satisfiable by symfony/console[v8.1.0].
0.413     - symfony/console v8.1.0 requires php >=8.4.1 -> your php version (8.3.31) does not satisfy that requirement.
0.413 
------
Dockerfile:22
--------------------
  20 |     
  21 |     # Install PHP dependencies
  22 | >>> RUN composer install --no-interaction --no-dev --optimize-autoloader
  23 |     
  24 |     # Ensure database directory exists and permissions are set
--------------------
error: failed to solve: process "/bin/sh -c composer install --no-interaction --no-dev --optimize-autoloader" did not complete successfully: exit code: 2
error: exit status 1

src/pages/Academy.tsx(5,3): error TS6133: 'Info' is declared but its value is never read.
src/pages/Academy.tsx(5,15): error TS6133: 'Edit2' is declared but its value is never read.
src/pages/Academy.tsx(5,22): error TS6133: 'Trash2' is declared but its value is never read.
src/pages/Academy.tsx(5,33): error TS6133: 'Save' is declared but its value is never read.
src/pages/Academy.tsx(5,39): error TS6133: 'ChevronDown' is declared but its value is never read.
src/pages/AcademyAnalytics.tsx(3,10): error TS6133: 'BarChart3' is declared but its value is never read.
src/pages/AcademyAnalytics.tsx(4,17): error TS6133: 'Clock' is declared but its value is never read.
src/pages/AcademyAnalytics.tsx(4,32): error TS6133: 'Filter' is declared but its value is never read.
src/pages/AuditLogs.tsx(3,24): error TS6133: 'Filter' is declared but its value is never read.
src/pages/Calculators.tsx(3,25): error TS6133: 'ChevronRight' is declared but its value is never read.
src/pages/Calculators.tsx(5,10): error TS6133: 'Info' is declared but its value is never read.
src/pages/Calculators.tsx(16,10): error TS6133: 'loadingPatients' is declared but its value is never read.
src/pages/Dashboard.tsx(4,15): error TS6133: 'ClipboardCheck' is declared but its value is never read.
src/pages/Dashboard.tsx(5,15): error TS6133: 'BookOpen' is declared but its value is never read.
src/pages/DutyRota.tsx(3,3): error TS6133: 'ChevronLeft' is declared but its value is never read.
src/pages/DutyRota.tsx(3,16): error TS6133: 'ChevronRight' is declared but its value is never read.
src/pages/DutyRota.tsx(5,3): error TS6133: 'Phone' is declared but its value is never read.
src/pages/DutyRota.tsx(5,10): error TS6133: 'ArrowRight' is declared but its value is never read.
src/pages/DutyRota.tsx(6,3): error TS6133: 'CalendarDays' is declared but its value is never read.
src/pages/DutyRota.tsx(6,17): error TS6133: 'Download' is declared but its value is never read.
src/pages/DutyRota.tsx(6,38): error TS6133: 'UserIcon' is declared but its value is never read.
src/pages/Handovers.tsx(3,3): error TS6133: 'Clock' is declared but its value is never read.
src/pages/LandingPage.tsx(6,16): error TS6133: 'Activity' is declared but its value is never read.
src/pages/LandingPage.tsx(6,26): error TS6133: 'Bell' is declared but its value is never read.
src/pages/LandingPage.tsx(6,32): error TS6133: 'Users' is declared but its value is never read.
src/pages/LandingPage.tsx(6,39): error TS6133: 'FileText' is declared but its value is never read.
src/pages/LandingPage.tsx(7,3): error TS6133: 'Heart' is declared but its value is never read.
src/pages/LandingPage.tsx(7,10): error TS6133: 'CheckCircle2' is declared but its value is never read.
src/pages/LandingPage.tsx(7,24): error TS6133: 'Shield' is declared but its value is never read.
src/pages/LandingPage.tsx(8,9): error TS6133: 'MapPin' is declared but its value is never read.
src/pages/LandingPage.tsx(9,38): error TS6133: 'Send' is declared but its value is never read.
src/pages/LandingPage.tsx(11,39): error TS6133: 'Calendar' is declared but its value is never read.
src/pages/LandingPage.tsx(62,10): error TS6133: 'formData' is declared but its value is never read.
src/pages/LandingPage.tsx(62,20): error TS6133: 'setFormData' is declared but its value is never read.
src/pages/Login.tsx(3,10): error TS6133: 'ShieldCheck' is declared but its value is never read.
src/pages/ManageStaff.tsx(3,3): error TS6133: 'Users2' is declared but its value is never read.
src/pages/ManageStaff.tsx(3,33): error TS6133: 'Phone' is declared but its value is never read.
src/pages/ManageStaff.tsx(5,15): error TS6133: 'CheckCircle2' is declared but its value is never read.
src/pages/ManageStaff.tsx(5,48): error TS6133: 'Save' is declared but its value is never read.
src/pages/Neonates.tsx(2,10): error TS6133: 'Link' is declared but its value is never read.
src/pages/Neonates.tsx(5,69): error TS6133: 'Scale' is declared but its value is never read.
src/pages/Neonates.tsx(5,76): error TS6133: 'Baby' is declared but its value is never read.
src/pages/Neonates.tsx(5,82): error TS6133: 'Info' is declared but its value is never read.
src/pages/Neonates.tsx(15,10): error TS6133: 'error' is declared but its value is never read.
src/pages/Register.tsx(3,76): error TS6133: 'CheckCircle2' is declared but its value is never read.
src/pages/Register.tsx(3,90): error TS6133: 'ChevronLeft' is declared but its value is never read.
src/pages/Settings.tsx(1,27): error TS6133: 'useEffect' is declared but its value is never read.
src/pages/VerificationQueue.tsx(13,10): error TS6133: 'error' is declared but its value is never read.
==> Build failed 😞
==> Common ways to troubleshoot your deploy: https://render.com/docs/troubleshooting-deploys

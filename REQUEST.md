the following are the issues encountred from deploy logs: 
==> Downloading cache...
==> Cloning from https://github.com/AlvinMutie/NBU_Care
==> Checking out commit 86838dff5565ba7b71eb561b4c6a72d7ccc43c8d in branch main
==> Downloaded 42MB in 2s. Extraction took 0s.
==> Running build command 'cd nbu-nurse-assistant && npm install && npm run build'...
==> Using Node.js version 24.14.1 (default)
==> Docs on specifying a Node.js version: https://render.com/docs/node-version
added 244 packages, and audited 245 packages in 9s
52 packages are looking for funding
  run `npm fund` for details
found 0 vulnerabilities
> nbu-nurse-assistant@0.0.0 build
> tsc -b && vite build
src/pages/Dashboard.tsx(244,31): error TS2304: Cannot find name 'Plus'.
==> Build failed 😞
==> Common ways to troubleshoot your deploy: https://render.com/docs/troubleshooting-deploys
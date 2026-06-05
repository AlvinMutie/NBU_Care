
#13 2.904 npm notice New major version of npm available! 10.8.2 -> 11.16.0
#13 2.904 npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.16.0
#13 2.904 npm notice To update run: npm install -g npm@11.16.0
#13 2.904 npm notice
#13 2.904 npm error A complete log of this run can be found in: /root/.npm/_logs/2026-06-05T13_39_11_734Z-debug-0.log
#13 ...
#10 [stage-1  1/11] FROM docker.io/library/php:8.3-apache@sha256:239772b092f6f21965834817c8419152251263859e563a5625d3f4b7309f17ba
#10 extracting sha256:0aa392ebbb80c0466c93d5892fb4a3884563f6ab46bf66de2cae60677f1ff219 7.0s done
#10 DONE 11.1s
#10 [stage-1  1/11] FROM docker.io/library/php:8.3-apache@sha256:239772b092f6f21965834817c8419152251263859e563a5625d3f4b7309f17ba
#10 extracting sha256:ba11284aac47a9af86f6d60cad8304115b15bfb6d1dc09a8416bd48f5ba97896
#10 ...
#13 [assets-builder 4/6] RUN npm install
#13 ERROR: process "/bin/sh -c npm install" did not complete successfully: exit code: 1
#10 [stage-1  1/11] FROM docker.io/library/php:8.3-apache@sha256:239772b092f6f21965834817c8419152251263859e563a5625d3f4b7309f17ba
#10 extracting sha256:ba11284aac47a9af86f6d60cad8304115b15bfb6d1dc09a8416bd48f5ba97896 3.6s done
#10 DONE 14.7s
#14 [stage-1  2/11] RUN apt-get update && apt-get install -y     libpng-dev     libjpeg-dev     libfreetype6-dev     libpq-dev     libzip-dev     zip     unzip     git     && docker-php-ext-configure gd --with-freetype --with-jpeg     && docker-php-ext-install -j$(nproc) gd pdo_pgsql zip
#14 CANCELED
------
 > importing cache manifest from image-registry-v2.aws-us-west-2-7.internal.render.com/srv-d8hd2t77f7vs73ce3feg:buildcache:
------
------
 > [assets-builder 4/6] RUN npm install:
2.901 npm error
2.901 npm error
2.901 npm error For a full report see:
2.901 npm error /root/.npm/_logs/2026-06-05T13_39_11_734Z-eresolve-report.txt
2.904 npm notice
2.904 npm notice New major version of npm available! 10.8.2 -> 11.16.0
2.904 npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.16.0
2.904 npm notice To update run: npm install -g npm@11.16.0
2.904 npm notice
2.904 npm error A complete log of this run can be found in: /root/.npm/_logs/2026-06-05T13_39_11_734Z-debug-0.log
------
Dockerfile:5
--------------------
   3 |     WORKDIR /app
   4 |     COPY package*.json ./
   5 | >>> RUN npm install
   6 |     COPY . .
   7 |     RUN npm run build
--------------------
error: failed to solve: process "/bin/sh -c npm install" did not complete successfully: exit code: 1
error: exit status 1
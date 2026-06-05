# RuntimeException - Internal Server Error

Unsupported cipher or incorrect key length. Supported ciphers are: aes-128-cbc, aes-256-cbc, aes-128-gcm, aes-256-gcm.

PHP 8.3.31
Laravel 13.9.0
nbu-laravel-unified-suan.onrender.com

## Stack Trace

0 - vendor/laravel/framework/src/Illuminate/Encryption/Encrypter.php:61
1 - vendor/laravel/framework/src/Illuminate/Encryption/EncryptionServiceProvider.php:32
2 - vendor/laravel/framework/src/Illuminate/Container/Container.php:1118
3 - vendor/laravel/framework/src/Illuminate/Container/Container.php:936
4 - vendor/laravel/framework/src/Illuminate/Foundation/Application.php:1078
5 - vendor/laravel/framework/src/Illuminate/Container/Container.php:864
6 - vendor/laravel/framework/src/Illuminate/Foundation/Application.php:1058
7 - vendor/laravel/framework/src/Illuminate/Container/Container.php:1339
8 - vendor/laravel/framework/src/Illuminate/Container/Container.php:1240
9 - vendor/laravel/framework/src/Illuminate/Container/Container.php:1165
10 - vendor/laravel/framework/src/Illuminate/Container/Container.php:936
11 - vendor/laravel/framework/src/Illuminate/Foundation/Application.php:1078
12 - vendor/laravel/framework/src/Illuminate/Container/Container.php:864
13 - vendor/laravel/framework/src/Illuminate/Foundation/Application.php:1058
14 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:208
15 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:137
16 - vendor/laravel/framework/src/Illuminate/Routing/Router.php:821
17 - vendor/laravel/framework/src/Illuminate/Routing/Router.php:800
18 - vendor/laravel/framework/src/Illuminate/Routing/Router.php:764
19 - vendor/laravel/framework/src/Illuminate/Routing/Router.php:753
20 - vendor/laravel/framework/src/Illuminate/Foundation/Http/Kernel.php:200
21 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:180
22 - vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/TransformsRequest.php:21
23 - vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/ConvertEmptyStringsToNull.php:31
24 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:219
25 - vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/TransformsRequest.php:21
26 - vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/TrimStrings.php:51
27 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:219
28 - vendor/laravel/framework/src/Illuminate/Http/Middleware/ValidatePostSize.php:27
29 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:219
30 - vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/PreventRequestsDuringMaintenance.php:109
31 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:219
32 - vendor/laravel/framework/src/Illuminate/Http/Middleware/HandleCors.php:61
33 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:219
34 - vendor/laravel/framework/src/Illuminate/Http/Middleware/TrustProxies.php:58
35 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:219
36 - vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/InvokeDeferredCallbacks.php:22
37 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:219
38 - vendor/laravel/framework/src/Illuminate/Http/Middleware/ValidatePathEncoding.php:28
39 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:219
40 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:137
41 - vendor/laravel/framework/src/Illuminate/Foundation/Http/Kernel.php:175
42 - vendor/laravel/framework/src/Illuminate/Foundation/Http/Kernel.php:144
43 - vendor/laravel/framework/src/Illuminate/Foundation/Application.php:1220
44 - public/index.php:20


## Request

GET /

## Headers

* **host**: nbu-laravel-unified-suan.onrender.com
* **user-agent**: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36
* **accept**: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8
* **accept-encoding**: gzip, br
* **accept-language**: en-US,en;q=0.8
* **cdn-loop**: cloudflare; loops=1
* **cf-connecting-ip**: 41.90.172.62
* **cf-ipcountry**: KE
* **cf-ray**: a06fd8e6ff8cb195-SEA
* **cf-visitor**: {"scheme":"https"}
* **priority**: u=0, i
* **render-proxy-ttl**: 4
* **rndr-id**: aa08fbbb-9795-44a4
* **sec-ch-ua**: "Brave";v="149", "Chromium";v="149", "Not)A;Brand";v="24"
* **sec-ch-ua-mobile**: ?0
* **sec-ch-ua-platform**: "Windows"
* **sec-fetch-dest**: document
* **sec-fetch-mode**: navigate
* **sec-fetch-site**: cross-site
* **sec-fetch-user**: ?1
* **sec-gpc**: 1
* **true-client-ip**: 41.90.172.62
* **upgrade-insecure-requests**: 1
* **x-forwarded-for**: 41.90.172.62, 172.71.146.70, 10.28.44.1
* **x-forwarded-proto**: https
* **x-request-start**: 1780669533626235

## Route Context

controller: Closure
middleware: web

## Route Parameters

No route parameter data available.

## Database Queries

No database queries detected.

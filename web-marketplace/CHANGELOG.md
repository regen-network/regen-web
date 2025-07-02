# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.9.4](https://github.com/regen-network/regen-web/compare/v2.9.3...v2.9.4) (2025-07-02)

### Bug Fixes

- update labels and tooltip texts in ProjectBatchTotals component; adjust amounts ([87ff7d8](https://github.com/regen-network/regen-web/commit/87ff7d83f995ffe1ab303b22d6a36d9f21474aa4))
- update tooltip text ([f702292](https://github.com/regen-network/regen-web/commit/f7022924862e101a5ac02248b42938692396d3b0))

## [2.9.2](https://github.com/regen-network/regen-web/compare/v2.9.1...v2.9.2) (2025-06-05)

### Bug Fixes

- isLoading on ProjectEdit ([e64e6ca](https://github.com/regen-network/regen-web/commit/e64e6caee228789ea1cb1bc681ba55c97e759ad4))

## [2.9.1](https://github.com/regen-network/regen-web/compare/v2.9.0...v2.9.1) (2025-06-04)

### Bug Fixes

- estimated issuance formatting ([e648286](https://github.com/regen-network/regen-web/commit/e648286caf63e973a6d74046c643d10409fabfca))

# [2.9.0](https://github.com/regen-network/regen-web/compare/v2.8.1...v2.9.0) (2025-05-19)

### Bug Fixes

- AP-617 network errors handling ([#2630](https://github.com/regen-network/regen-web/issues/2630)) ([7ad3837](https://github.com/regen-network/regen-web/commit/7ad383741e3be73af932e311d859b54d429373f6))
- APP-540 add support for commas in editable input ([#2598](https://github.com/regen-network/regen-web/issues/2598)) ([232e4cc](https://github.com/regen-network/regen-web/commit/232e4cc4376e0bd5409dfa885240e2728624d4a6))
- APP-582 User dropdown and "my orders" using Wallet Connect ([#2610](https://github.com/regen-network/regen-web/issues/2610)) ([a0c760f](https://github.com/regen-network/regen-web/commit/a0c760f9f256ad72d6c7016fb660976202d73710))
- APP-585 one time password input ([#2624](https://github.com/regen-network/regen-web/issues/2624)) ([f7e9d44](https://github.com/regen-network/regen-web/commit/f7e9d441a868f4f5aabb092fcb669229bb50e2e3))
- APP-588 layout alignment improvements ([#2627](https://github.com/regen-network/regen-web/issues/2627)) ([02690d3](https://github.com/regen-network/regen-web/commit/02690d3f2a2bb7cf33d53de9150ff7af5eb670f3))
- APP-594 clear localStorage items related to buy credits on logout ([#2615](https://github.com/regen-network/regen-web/issues/2615)) ([25ae3e0](https://github.com/regen-network/regen-web/commit/25ae3e04ea0872ff1bd9e43ea02b418d85173f87))
- APP-598 filters 'apply' and 'close' buttons position on mobile ([#2622](https://github.com/regen-network/regen-web/issues/2622)) ([a34b833](https://github.com/regen-network/regen-web/commit/a34b8338ed9a529821cd2b04e69174b10bd1f4e1))
- APP-618 encode name parameter in certificate navigation URLs ([#2631](https://github.com/regen-network/regen-web/issues/2631)) ([4750d67](https://github.com/regen-network/regen-web/commit/4750d67aee5dd8ce82987c7dbca5cf9573738f6b))
- APP-624 use getHashUrl for blockchain record link ([#2626](https://github.com/regen-network/regen-web/issues/2626)) ([59347c2](https://github.com/regen-network/regen-web/commit/59347c25d3a4188477ffee23273d2fe34c339322))
- APP-634 hide prefinance projects from menu if none ([#2643](https://github.com/regen-network/regen-web/issues/2643)) ([10f66db](https://github.com/regen-network/regen-web/commit/10f66db518d6ad59c40c603b84ec5dece00c6760))
- APP-641 make orders page only accessible when logged in or connected to keplr ([#2648](https://github.com/regen-network/regen-web/issues/2648)) ([b3c77d9](https://github.com/regen-network/regen-web/commit/b3c77d9652584bc85a59a233ee77bb4dd21697e7))
- APP-644 credit class page UI issues ([#2647](https://github.com/regen-network/regen-web/issues/2647)) ([93b785e](https://github.com/regen-network/regen-web/commit/93b785e795d188bdb59518001b2a704f157e5c2a))
- APP-648 purchase button multiple submissions ([#2651](https://github.com/regen-network/regen-web/issues/2651)) ([b19a637](https://github.com/regen-network/regen-web/commit/b19a637c9fc6c72c739964dec34533b8b158d65d))
- APP-682 update PrivateBadge positioning in PostCard component ([#2656](https://github.com/regen-network/regen-web/issues/2656)) ([cb268e0](https://github.com/regen-network/regen-web/commit/cb268e0881a022308bdf0147d8b2bdff42be1699))

### Features

- APP-578 regen api upgrade ([#2638](https://github.com/regen-network/regen-web/issues/2638)) ([d3299e1](https://github.com/regen-network/regen-web/commit/d3299e1afd350e8e8ae6af52dd9b9f7b20f07f0a))
- APP-579 add new buy events ([#2629](https://github.com/regen-network/regen-web/issues/2629)) ([5af4d13](https://github.com/regen-network/regen-web/commit/5af4d13adbcf50a2039aff53d4281796fb1a5484))
- APP-587 "looking for over the counter sales" card on buy choose credits page ([#2632](https://github.com/regen-network/regen-web/issues/2632)) ([fda064a](https://github.com/regen-network/regen-web/commit/fda064a5330712dcc986b4ed283a85119f9cd6ad))
- APP-610 move checking email to payment info step ([#2646](https://github.com/regen-network/regen-web/issues/2646)) ([a3d19f9](https://github.com/regen-network/regen-web/commit/a3d19f9871b64c77fe2885ee9d61dcaae00ef42c))
- APP-611 standardise number formats ([#2652](https://github.com/regen-network/regen-web/issues/2652)) ([d93e468](https://github.com/regen-network/regen-web/commit/d93e468ef3311ea81a0cd0ccee7b93301e65392b))
- APP-626 retirement certificate wording update ([#2636](https://github.com/regen-network/regen-web/issues/2636)) ([76df5da](https://github.com/regen-network/regen-web/commit/76df5dafb017c152842f3e9c779a84e90d2fec2a))
- APP-627 order email confirmation for retiring crypto + pass metadata to… ([#2637](https://github.com/regen-network/regen-web/issues/2637)) ([8f11514](https://github.com/regen-network/regen-web/commit/8f1151445d83bc36a32bde7c881aa341b51ef3d2))
- APP-631 more projects by admin ([#2642](https://github.com/regen-network/regen-web/issues/2642)) ([c3b75f5](https://github.com/regen-network/regen-web/commit/c3b75f54750e5b53917c8821c0db5f836829a631))
- APP-635 remove decimals from credits amounts ([#2644](https://github.com/regen-network/regen-web/issues/2644)) ([06d4f59](https://github.com/regen-network/regen-web/commit/06d4f59d141ec09fc0a0d302bb9e011388580b2a))
- APP-636 add seller dashboard for on boarding/viewing stripe connected accounts ([#2649](https://github.com/regen-network/regen-web/issues/2649)) ([49f9aba](https://github.com/regen-network/regen-web/commit/49f9aba73cbf4c67aa882004cdfd9098985b42f6))
- APP-659 Add "for sale" to the project page credits and change "credits available" to "credits for sale" on project card ([#2653](https://github.com/regen-network/regen-web/issues/2653)) ([8535be6](https://github.com/regen-network/regen-web/commit/8535be61cfb43c72a0200242c514c4e065bbc5fd))

## [2.8.1](https://github.com/regen-network/regen-web/compare/v2.8.0...v2.8.1) (2025-02-27)

### Bug Fixes

- query usdPrice so getCardSellOrders does not return empty array ([5d949fd](https://github.com/regen-network/regen-web/commit/5d949fd9b8b1f73584f3dbc3450949aeac32465c))
- use location search params when navigate to different pages ([02a7a10](https://github.com/regen-network/regen-web/commit/02a7a10eaf689865695ba658f2aaf365f2524b27))

# [2.8.0](https://github.com/regen-network/regen-web/compare/v2.7.5...v2.8.0) (2025-02-26)

### Bug Fixes

- adjust projectNotFound ([#2534](https://github.com/regen-network/regen-web/issues/2534)) ([4ed6830](https://github.com/regen-network/regen-web/commit/4ed6830a068c4502e8b02d4d6594914cb22be0c3))
- adjust spacing on project page ([#2560](https://github.com/regen-network/regen-web/issues/2560)) ([aa05ad6](https://github.com/regen-network/regen-web/commit/aa05ad65d9e7525db5b58a32e08ca176f314a2f9))
- APP-309 batch denom name in getCancelCardItems function ([#2489](https://github.com/regen-network/regen-web/issues/2489)) ([1f30605](https://github.com/regen-network/regen-web/commit/1f306059c5f5a0b3229ddf1f9464a0a938f19e53))
- APP-383 align create project button ([#2568](https://github.com/regen-network/regen-web/issues/2568)) ([d0457d3](https://github.com/regen-network/regen-web/commit/d0457d308998f9192be1e5acb866f08c53e4193a))
- APP-394 disable the cursor pointer on hover steps ([#2538](https://github.com/regen-network/regen-web/issues/2538)) ([44eb460](https://github.com/regen-network/regen-web/commit/44eb460ca62e9aff7a3c27a54b2759eb70eec51f))
- APP-404 update field and trigger validation instead of using onChange ([#2514](https://github.com/regen-network/regen-web/issues/2514)) ([e06bd1e](https://github.com/regen-network/regen-web/commit/e06bd1e6b6d0d30946458d5091d3d9913500ed59))
- APP-406 email always required when buying with credit card ([#2580](https://github.com/regen-network/regen-web/issues/2580)) ([b31bd3d](https://github.com/regen-network/regen-web/commit/b31bd3ddaed7fbdd3130a1bbaa79251a10939499))
- APP-409 set retiring to true when payment is card ([#2545](https://github.com/regen-network/regen-web/issues/2545)) ([3c44ecd](https://github.com/regen-network/regen-web/commit/3c44ecd939ab889b19a200a117f256d8d13d8c84))
- APP-410 save buy flow on last user interaction ([#2574](https://github.com/regen-network/regen-web/issues/2574)) ([6cccc6e](https://github.com/regen-network/regen-web/commit/6cccc6ef9d46b164d84ea472521e29d143d6cdf9))
- APP-411 use errors to set Next button state ([#2511](https://github.com/regen-network/regen-web/issues/2511)) ([e8abe0b](https://github.com/regen-network/regen-web/commit/e8abe0b38317de5576153abea89940a03ca3067a))
- APP-413 Show project admin from offchain data on project page ([#2584](https://github.com/regen-network/regen-web/issues/2584)) ([94400c0](https://github.com/regen-network/regen-web/commit/94400c0046b8c7d799d9c79bbc14c62e5589c4b2))
- APP-434 include offchain projects to more projects section for terrasos ([#2526](https://github.com/regen-network/regen-web/issues/2526)) ([a2e84ae](https://github.com/regen-network/regen-web/commit/a2e84aed17faf20aa5ee5cdcebeb4eff3a19a045))
- APP-438 change wording buy fiat flow ([#2579](https://github.com/regen-network/regen-web/issues/2579)) ([d765528](https://github.com/regen-network/regen-web/commit/d765528e91ec73b435e114ddcf9b0e33ac472fba))
- APP-447 remove dropdown when only one crypto currency available ([#2593](https://github.com/regen-network/regen-web/issues/2593)) ([8c5378b](https://github.com/regen-network/regen-web/commit/8c5378b26da089520317e7e1749ea0b2ecf61525))
- APP-450 handle undefined errors in buy page when seller is logged in ([#2536](https://github.com/regen-network/regen-web/issues/2536)) ([0854102](https://github.com/regen-network/regen-web/commit/08541023c0dac90b2633b1f0f3d037a8a2ae8901))
- APP-459 open data post on terrasos in new tab ([#2540](https://github.com/regen-network/regen-web/issues/2540)) ([b29f85f](https://github.com/regen-network/regen-web/commit/b29f85fc32d86ae4336814db11573494a48efc32))
- APP-472 remove agreeerpa checkbox error ([#2594](https://github.com/regen-network/regen-web/issues/2594)) ([ecbf0fb](https://github.com/regen-network/regen-web/commit/ecbf0fbb1c09ac3ae87a7f527759119cd2a797af))
- APP-473 all projects grid items spacing with filters ([#2546](https://github.com/regen-network/regen-web/issues/2546)) ([e2cecf7](https://github.com/regen-network/regen-web/commit/e2cecf7f6e9e04a77ced3bec01b3be5a33b9c775))
- APP-474 tebu factors UI ([#2548](https://github.com/regen-network/regen-web/issues/2548)) ([150bd0f](https://github.com/regen-network/regen-web/commit/150bd0ff7b4a514d78e5b6a6f41c715e39b5d527))
- APP-477 various Terrasos design tweaks ([#2551](https://github.com/regen-network/regen-web/issues/2551)) ([772f925](https://github.com/regen-network/regen-web/commit/772f925e92e2fc2a97648b945fce89b6b51ebc67))
- APP-478 remove color override for credibility cards on terrasos ([#2547](https://github.com/regen-network/regen-web/issues/2547)) ([bf002dc](https://github.com/regen-network/regen-web/commit/bf002dc2e3b7b435a522e51b8a1c2dbc165e6edf))
- APP-481 keep origin language for external links ([#2549](https://github.com/regen-network/regen-web/issues/2549)) ([fce4585](https://github.com/regen-network/regen-web/commit/fce4585dfc14f887d1395530801522b334165b49))
- APP-482 hide filters with no projects at all ([#2550](https://github.com/regen-network/regen-web/issues/2550)) ([83be5d3](https://github.com/regen-network/regen-web/commit/83be5d3afb9b9a149f733f9eced7974628f4b8a4))
- APP-486 handle social and cultural card ([#2554](https://github.com/regen-network/regen-web/issues/2554)) ([6b15a05](https://github.com/regen-network/regen-web/commit/6b15a05d259cc49624b20b9e492567117aed6f03))
- APP-487 sanity localized data fallback ([#2552](https://github.com/regen-network/regen-web/issues/2552)) ([15d90c3](https://github.com/regen-network/regen-web/commit/15d90c3316756481edc331f8bd5c0be02fe721af))
- APP-491 empty choose credits form appears for ms ([#2591](https://github.com/regen-network/regen-web/issues/2591)) ([f966436](https://github.com/regen-network/regen-web/commit/f9664363cbc32de56f153258d3cecd0539789737))
- APP-493 white box at the bottom of the projects page ([#2559](https://github.com/regen-network/regen-web/issues/2559)) ([abfaa46](https://github.com/regen-network/regen-web/commit/abfaa4614239a85dc41adbb5fbc73d5a07d91e4c))
- APP-494 tebu factors card grid display ([#2557](https://github.com/regen-network/regen-web/issues/2557)) ([4373e31](https://github.com/regen-network/regen-web/commit/4373e31af8f06b0d586e6405603468cc13308ab3))
- APP-502 tebu factors small UI issues ([#2563](https://github.com/regen-network/regen-web/issues/2563)) ([f97c1c7](https://github.com/regen-network/regen-web/commit/f97c1c73679ef8ba0dd9aacc4ff687008cdcf0af))
- APP-528 registered credits in compliance credits tab ([#2569](https://github.com/regen-network/regen-web/issues/2569)) ([49c42cd](https://github.com/regen-network/regen-web/commit/49c42cdd53454a62eec6b583134847ceca2a90f2))
- APP-530 spacing in Project top section ([#2582](https://github.com/regen-network/regen-web/issues/2582)) ([28eb55b](https://github.com/regen-network/regen-web/commit/28eb55bf2cf9ccd2b2cc53219330b3b8bb3723e6))
- APP-531 create batch form button label missing and other bugs ([#2583](https://github.com/regen-network/regen-web/issues/2583)) ([f1394ca](https://github.com/regen-network/regen-web/commit/f1394ca141e6b601a468ef072b40799b9f7cd119))
- APP-536 show regen address instead of account id in user profile ([#2585](https://github.com/regen-network/regen-web/issues/2585)) ([c40755e](https://github.com/regen-network/regen-web/commit/c40755eccab79fd26b16f58d80f3121040f358ef))
- APP-547 UI issues on projects page ([#2600](https://github.com/regen-network/regen-web/issues/2600)) ([b14c91b](https://github.com/regen-network/regen-web/commit/b14c91be5abe98892a8df5f92ae480e7146cc559))
- APP-556 orders UI ([#2597](https://github.com/regen-network/regen-web/issues/2597)) ([277b269](https://github.com/regen-network/regen-web/commit/277b269eaadd4e9c88777645275fdaa90235b50c))
- APP-571 disable credit card option when available fiat credits are below $0.5 ([#2592](https://github.com/regen-network/regen-web/issues/2592)) ([5d5d78d](https://github.com/regen-network/regen-web/commit/5d5d78d6ed5c4949a61d7ba0d2122c6d35a0d69c))
- APP-581 scroll to top of page on next ([#2607](https://github.com/regen-network/regen-web/issues/2607)) ([6d81b07](https://github.com/regen-network/regen-web/commit/6d81b07460886dfe7700f3bfb98883e77bfb4012))
- APP-590 name displayed as object edit profile ([#2609](https://github.com/regen-network/regen-web/issues/2609)) ([e7ea96b](https://github.com/regen-network/regen-web/commit/e7ea96bfb19707d29f7ce04f64c016851f48151e))
- APP-591 back arrow button on choose credits form ([#2616](https://github.com/regen-network/regen-web/issues/2616)) ([5b4d93a](https://github.com/regen-network/regen-web/commit/5b4d93ae40ad4fe8ae4085d6e2272076b227ad38))
- APP-595 invalidate payment methods query on login/logout ([#2605](https://github.com/regen-network/regen-web/issues/2605)) ([cb50881](https://github.com/regen-network/regen-web/commit/cb50881a1f25ce8d0f8bc9948eaa2cf8795918bf))
- APP-596 reload my orders after purchase ([#2614](https://github.com/regen-network/regen-web/issues/2614)) ([2b42c67](https://github.com/regen-network/regen-web/commit/2b42c67bb39cde03b143a8cbd41d9fc98b014430))
- APP-597 APP-602 reload credits after buying credits ([#2606](https://github.com/regen-network/regen-web/issues/2606)) ([04390ce](https://github.com/regen-network/regen-web/commit/04390ce48007a5b92453832720e16cf5fba47fb9))
- APP-612 improve credits calculation and currency formatting precision ([#2611](https://github.com/regen-network/regen-web/issues/2611)) ([353dee6](https://github.com/regen-network/regen-web/commit/353dee6519fed2e5a7a4d7f40a8a688a3e72b7ca))
- APP-616 refresh profile after processing so it doesn't reload the whole page ([#2618](https://github.com/regen-network/regen-web/issues/2618)) ([33cb0d4](https://github.com/regen-network/regen-web/commit/33cb0d4e10cfcc0a08b33a37835e91a368fd461f))
- compliance tooltip on project card ([#2541](https://github.com/regen-network/regen-web/issues/2541)) ([f3388e8](https://github.com/regen-network/regen-web/commit/f3388e8fa1130b6923f20d2e2e18444cca14b506))
- get sanity project using slug if any in useGetProject ([#2619](https://github.com/regen-network/regen-web/issues/2619)) ([ab6ef15](https://github.com/regen-network/regen-web/commit/ab6ef156d5d3571ebee71d367d228a3d667d7063))
- handle custom description for terrasos credibility card section ([#2555](https://github.com/regen-network/regen-web/issues/2555)) ([efa3d8f](https://github.com/regen-network/regen-web/commit/efa3d8fa462a591919657c21ba34ba996d7bf470))
- hide program on terrasos in project card ([#2561](https://github.com/regen-network/regen-web/issues/2561)) ([b0181e7](https://github.com/regen-network/regen-web/commit/b0181e748d9f07a66f8389d40fe378039a6de049))
- improve MetaDetail layout ([#2558](https://github.com/regen-network/regen-web/issues/2558)) ([67da47f](https://github.com/regen-network/regen-web/commit/67da47ff401ab21cb3927c9298e7261521d600b9))
- make provider import dynamic ([#2492](https://github.com/regen-network/regen-web/issues/2492)) ([d016f29](https://github.com/regen-network/regen-web/commit/d016f292e058c61b73f9947c80f7fb8184c79a8c))
- navigate to slug based project url on buy page ([#2507](https://github.com/regen-network/regen-web/issues/2507)) ([55c9689](https://github.com/regen-network/regen-web/commit/55c968926352ae85b7afeacea82b0890b3d8b8c5))
- Prevent rendering LedgerProvider until wallet is loaded ([fca9f05](https://github.com/regen-network/regen-web/commit/fca9f0521d2ef03cc78a36603bb2f06d09d93159))
- remove duplicate compliance info ([#2571](https://github.com/regen-network/regen-web/issues/2571)) ([b2c761a](https://github.com/regen-network/regen-web/commit/b2c761a3832078de7aabdbb7178c3f70e264f571))
- terrasos additional info ([#2543](https://github.com/regen-network/regen-web/issues/2543)) ([db1d003](https://github.com/regen-network/regen-web/commit/db1d00334f92ccf44c3a4d91dbc07dcebdc56240))
- Terrasos region filter translations ([#2567](https://github.com/regen-network/regen-web/issues/2567)) ([de77bea](https://github.com/regen-network/regen-web/commit/de77beaa10b5ccde3171c3b320a069f5796664a5))

### Features

- add new project stakeholders ([#2524](https://github.com/regen-network/regen-web/issues/2524)) ([bb17810](https://github.com/regen-network/regen-web/commit/bb178105f13fcc6f6325342a7af56a1de342ecf4))
- add tebu and hectares tag ([#2520](https://github.com/regen-network/regen-web/issues/2520)) ([3f61f7c](https://github.com/regen-network/regen-web/commit/3f61f7c025750f6a0ff1031c1ada252d3ed49f97))
- add Terrasos Header ([#2508](https://github.com/regen-network/regen-web/issues/2508)) ([089a1e0](https://github.com/regen-network/regen-web/commit/089a1e0efdd298c876a389e2e785f1cb6d758293))
- APP-163 custodial wallet design implementation ([#2470](https://github.com/regen-network/regen-web/issues/2470)) ([0502b30](https://github.com/regen-network/regen-web/commit/0502b306deff636c49237d70e0d5059499d67619))
- APP-204 buy credits ([#2477](https://github.com/regen-network/regen-web/issues/2477)) ([9a5fb65](https://github.com/regen-network/regen-web/commit/9a5fb654e27cea626f338b16e536b5542068d321))
- APP-222 web3 confirmation email ([#2590](https://github.com/regen-network/regen-web/issues/2590)) ([04307c0](https://github.com/regen-network/regen-web/commit/04307c080fa21eba8a394ab85a54d3b19ae33c03))
- APP-267 accounts orders page ([#2483](https://github.com/regen-network/regen-web/issues/2483)) ([4a295a8](https://github.com/regen-network/regen-web/commit/4a295a88a3286920c5d1578a6ecce8332668ce1c))
- APP-269 update user menu and profile edit sidebar with orders ([#2486](https://github.com/regen-network/regen-web/issues/2486)) ([7984e39](https://github.com/regen-network/regen-web/commit/7984e399913ee12452e7e94275dabf40fa3e73d4))
- APP-305 update projects page color ([#2504](https://github.com/regen-network/regen-web/issues/2504)) ([d6bdecb](https://github.com/regen-network/regen-web/commit/d6bdecbcf6e9b6103d406aedd455782596620f7d))
- APP-321 APP-389 add language switcher ([#2515](https://github.com/regen-network/regen-web/issues/2515)) ([abb031e](https://github.com/regen-network/regen-web/commit/abb031e14485b188add9466603f78866ca51f024))
- APP-324 Tebu Banner ([#2485](https://github.com/regen-network/regen-web/issues/2485)) ([61ba690](https://github.com/regen-network/regen-web/commit/61ba6908ad885cc7c9112f4483091dd9aff19d8e))
- APP-328 compliance market info ([#2537](https://github.com/regen-network/regen-web/issues/2537)) ([7ffee7b](https://github.com/regen-network/regen-web/commit/7ffee7bdeac35f3040a6e4ec0908bfe1ce3e2984))
- APP-330 disable "edit profile" and "settings" user menu items if using … ([#2475](https://github.com/regen-network/regen-web/issues/2475)) ([7699a01](https://github.com/regen-network/regen-web/commit/7699a01dfd31907c9c9e2d5d2f9dacc9df311433))
- APP-342 user profile certificate multiple denom ([#2533](https://github.com/regen-network/regen-web/issues/2533)) ([16eed46](https://github.com/regen-network/regen-web/commit/16eed465582b7292cb7f64354ded2d3446a19210))
- APP-352 buying options filter ([#2575](https://github.com/regen-network/regen-web/issues/2575)) ([7e52853](https://github.com/regen-network/regen-web/commit/7e528539589ae32af0a22bbc452f11c06ddfbcb1))
- APP-360 redirect to project buy after google login ([#2494](https://github.com/regen-network/regen-web/issues/2494)) ([183d001](https://github.com/regen-network/regen-web/commit/183d00109fa81fa0167c6c9d73c6e1ddbd125f9f))
- APP-361 buy success ([#2519](https://github.com/regen-network/regen-web/issues/2519)) ([bbb9cc7](https://github.com/regen-network/regen-web/commit/bbb9cc763eb9f2c6f8f24489a1ce4b8c398c439c))
- APP-364 order summary card ([#2498](https://github.com/regen-network/regen-web/issues/2498)) ([01f2590](https://github.com/regen-network/regen-web/commit/01f259017bfdb7ac357c5019483b03a3c4e7ced9))
- APP-365 use new buy credits flow on Project cards ([#2503](https://github.com/regen-network/regen-web/issues/2503)) ([082e8aa](https://github.com/regen-network/regen-web/commit/082e8aac781a4bfac40f0a7e356a20ffbffaeb2f))
- APP-366 account orders ([#2566](https://github.com/regen-network/regen-web/issues/2566)) ([55d411d](https://github.com/regen-network/regen-web/commit/55d411d18cf6c26b6a5077bedb2c6f5891637072))
- APP-368 add user balance error in buy credits form ([#2501](https://github.com/regen-network/regen-web/issues/2501)) ([9965e6c](https://github.com/regen-network/regen-web/commit/9965e6c51cc2fa2059d7b960963d62f23b40b076))
- APP-375 update /profile routes to be under /dashboard and /dashboard/admin ([#2505](https://github.com/regen-network/regen-web/issues/2505)) ([91d5a6d](https://github.com/regen-network/regen-web/commit/91d5a6d7fb0c033f68795355093abcb6a55a27ef))
- APP-395 hide in the UI the anonymous purchasing ([#2535](https://github.com/regen-network/regen-web/issues/2535)) ([50e7039](https://github.com/regen-network/regen-web/commit/50e7039b3e76ac35a119d7dccc2817cdea3170ab))
- APP-396 two decimal digits for usd amount ([#2544](https://github.com/regen-network/regen-web/issues/2544)) ([27e158b](https://github.com/regen-network/regen-web/commit/27e158b8d3198694a6fa6beb33a01e20542ced79))
- APP-399 "how to purchase credits" popup when user is not logged in with keplr and no fiat credits available ([#2577](https://github.com/regen-network/regen-web/issues/2577)) ([4604e43](https://github.com/regen-network/regen-web/commit/4604e435dda7290effd3e3006edb642cff257578))
- APP-412 add NotFoundPage when no project is found ([#2521](https://github.com/regen-network/regen-web/issues/2521)) ([1d91cfb](https://github.com/regen-network/regen-web/commit/1d91cfb3bec609e572ee232b8204e75da8759a85))
- APP-419 use Montserrat font by default ([#2513](https://github.com/regen-network/regen-web/issues/2513)) ([8efd5cf](https://github.com/regen-network/regen-web/commit/8efd5cf2b8a4710d3213afac6b0bea97d82384cc))
- APP-427 terrasos footer update ([#2532](https://github.com/regen-network/regen-web/issues/2532)) ([ea549b1](https://github.com/regen-network/regen-web/commit/ea549b13bcb27cf3d3e491b3507e611e431be9c6))
- APP-439 display additional info for offchain project too if custom/unknown fields ([#2527](https://github.com/regen-network/regen-web/issues/2527)) ([3421b46](https://github.com/regen-network/regen-web/commit/3421b4694a3c3b37ecac273424e3998959331f1b))
- APP-440 get project impact from project metadata ([#2528](https://github.com/regen-network/regen-web/issues/2528)) ([d17e8b9](https://github.com/regen-network/regen-web/commit/d17e8b95bd5d93237ec6732cdf56c3d3ade38a8e))
- APP-441 update account name during buy credits flow ([#2596](https://github.com/regen-network/regen-web/issues/2596)) ([661ff7f](https://github.com/regen-network/regen-web/commit/661ff7f10b3d07b0c97aa96a1ccfeff67b693955))
- APP-442 Update app title and metatags for Terrasos app ([#2530](https://github.com/regen-network/regen-web/issues/2530)) ([361139d](https://github.com/regen-network/regen-web/commit/361139ddfc1683175b7d60cdc28146044c864f96))
- APP-444 Navigate to Regen marketplace app for certain internal links from Terrasos app ([#2531](https://github.com/regen-network/regen-web/issues/2531)) ([edf7c8f](https://github.com/regen-network/regen-web/commit/edf7c8ffb53a6822098b9814239e049879fb71c5))
- APP-461 remove filters for Terrasos and change pagination to 9 ([#2542](https://github.com/regen-network/regen-web/issues/2542)) ([acdb18b](https://github.com/regen-network/regen-web/commit/acdb18b3c24ce2d3229e207e9f81d3cd9235133b))
- APP-508 show book call button on terrasos project bottom banner ([#2565](https://github.com/regen-network/regen-web/issues/2565)) ([7c5dc18](https://github.com/regen-network/regen-web/commit/7c5dc18e45139fe052d22e3fcb09a46a707223cd))
- APP-526 buy flow newsletter checkbox ([#2588](https://github.com/regen-network/regen-web/issues/2588)) ([2d4fdcb](https://github.com/regen-network/regen-web/commit/2d4fdcbe0f390dd75879d5470d09c31dfc62dbeb))
- APP-529 receipt modal for crypto purchases ([#2586](https://github.com/regen-network/regen-web/issues/2586)) ([4051daa](https://github.com/regen-network/regen-web/commit/4051daa8fe061c94957e6f1664cf8225a0c0c405))
- APP-545 mobile projects filters ([#2595](https://github.com/regen-network/regen-web/issues/2595)) ([56601df](https://github.com/regen-network/regen-web/commit/56601df47ef9ce3e233f1041e628b6690bf8368f))
- APP-551 crypto purchase email ([#2599](https://github.com/regen-network/regen-web/issues/2599)) ([c820042](https://github.com/regen-network/regen-web/commit/c820042db60ada0552ecc1529e7a40b12274350f))
- clean up BuyCreditsModal in /storefront ([5ebc3a8](https://github.com/regen-network/regen-web/commit/5ebc3a899781b2d35b1ad1f2eaed89bd57d65a48))
- filter projects by type ([#2510](https://github.com/regen-network/regen-web/issues/2510)) ([1067b69](https://github.com/regen-network/regen-web/commit/1067b694ebe3a5a4211d9ebea2bebb6da5c3ae2d))
- handle remaining translations ([#2478](https://github.com/regen-network/regen-web/issues/2478)) ([7679e9d](https://github.com/regen-network/regen-web/commit/7679e9d328ede43c13dd231ab571a37adfeb1a75))
- hide unused elements ([#2518](https://github.com/regen-network/regen-web/issues/2518)) ([4e96f56](https://github.com/regen-network/regen-web/commit/4e96f56bfbb60f524a5a39ba3d75964d49e461fc))
- remove "Trade" menu item from RegistryLayout.config.tsx ([a3bf3f1](https://github.com/regen-network/regen-web/commit/a3bf3f1dfe3ca8e73c4c31a5ec71d6569af18a06))
- translate components part3 ([#2451](https://github.com/regen-network/regen-web/issues/2451)) ([1990dd1](https://github.com/regen-network/regen-web/commit/1990dd19072edc01628a88eb2410abd327152cf9))
- translate web-components from header to inputs ([#2468](https://github.com/regen-network/regen-web/issues/2468)) ([1813741](https://github.com/regen-network/regen-web/commit/181374134d5afd983c7577cf037dec8ec6605765))
- translate web-components from map to views ([#2476](https://github.com/regen-network/regen-web/issues/2476)) ([5f4f26d](https://github.com/regen-network/regen-web/commit/5f4f26dc7edb6081c106ce50bd1e47a5cb0dfe2d))

## [2.7.5](https://github.com/regen-network/regen-web/compare/v2.7.3...v2.7.5) (2025-01-27)

### Bug Fixes

- remove walletLoaded in Terrasos.Providers ([b0afb16](https://github.com/regen-network/regen-web/commit/b0afb16e70c6fd0bd1de94373e569c7b8de03ea8))
- remove walletLoaded prop from LedgerProvider ([9f0eebf](https://github.com/regen-network/regen-web/commit/9f0eebfae93ee4cc114ca98038d56e87fd04f28f))
- remove walletLoaded prop from LedgerProvider and simplify API fetching logic ([7ef4f3f](https://github.com/regen-network/regen-web/commit/7ef4f3fe8e1e9babec19b49816137235c7ae5ece))
- update API when wallet is loaded ([ebc2096](https://github.com/regen-network/regen-web/commit/ebc209645bfd393e0ae56592b9650610d167c29d))

## [2.7.4](https://github.com/regen-network/regen-web/compare/v2.7.3...v2.7.4) (2024-10-25)

**Note:** Version bump only for package web-marketplace

## [2.7.3](https://github.com/regen-network/regen-web/compare/v2.7.2...v2.7.3) (2024-09-24)

### Bug Fixes

- add overflow-hidden class to PostForm gallery items ([d35613b](https://github.com/regen-network/regen-web/commit/d35613bf9fe1361a6afc20ec72a3fbbe3886d59b))

## [2.7.1](https://github.com/regen-network/regen-web/compare/v2.7.0...v2.7.1) (2024-09-11)

### Bug Fixes

- delete post success banner and redirect ([cca8177](https://github.com/regen-network/regen-web/commit/cca8177a21e0f645e029c37c1d8b92fff3807935))

# [2.7.0](https://github.com/regen-network/regen-web/compare/v2.6.5...v2.7.0) (2024-09-11)

### Bug Fixes

- render photo credit field only for images in EditFileForm ([#2432](https://github.com/regen-network/regen-web/issues/2432)) ([b82ad04](https://github.com/regen-network/regen-web/commit/b82ad048aca187056d9b6f582fceae1e41a1e199))
- add condition for private post with token ([#2430](https://github.com/regen-network/regen-web/issues/2430)) ([ea19fd9](https://github.com/regen-network/regen-web/commit/ea19fd9a0cb74816fc69319e93aa2806a8a86161))
- all posts link icon hover color ([#2429](https://github.com/regen-network/regen-web/issues/2429)) ([5a01bbf](https://github.com/regen-network/regen-web/commit/5a01bbf94257400c1578cc4d7c8f64d24cff0cfd))
- APP-135 update Save button disabled functionality and styles ([#2396](https://github.com/regen-network/regen-web/issues/2396)) ([2bb89d9](https://github.com/regen-network/regen-web/commit/2bb89d93aff5bd99a7377327b9136f662a01c7dd))
- APP-138 long story text width ([#2392](https://github.com/regen-network/regen-web/issues/2392)) ([19cc159](https://github.com/regen-network/regen-web/commit/19cc159364f8b681481fb134b0e10cf2d7afae2a))
- APP-147 project size always displayed as hectares in BasicInfoForm ([#2386](https://github.com/regen-network/regen-web/issues/2386)) ([7e84ca8](https://github.com/regen-network/regen-web/commit/7e84ca899a9603c30ad7f74d46abdd7557a0c581))
- APP-178 display UTC batch start/end dates ([#2391](https://github.com/regen-network/regen-web/issues/2391)) ([78dd52e](https://github.com/regen-network/regen-web/commit/78dd52ebb9fca188ecb0a18023c5cac60c87fdd9))
- APP-237 use offChainProjectId in PostFlow on onchain project data stream ([#2426](https://github.com/regen-network/regen-web/issues/2426)) ([879da08](https://github.com/regen-network/regen-web/commit/879da08a05dc36a374df6df364341afb0dcc1f1c))
- APP-262 APP-303 create post files rendering ([#2436](https://github.com/regen-network/regen-web/issues/2436)) ([13f1d7e](https://github.com/regen-network/regen-web/commit/13f1d7e2ec4153a6f4f9c5e0e2a05542d73e5a49))
- APP-277 entering latitude, longitude in the location field ([#2448](https://github.com/regen-network/regen-web/issues/2448)) ([dd31dae](https://github.com/regen-network/regen-web/commit/dd31dae250961aaabd2de48c6a457301531b2623))
- APP-295 set Edit Profile form as dirty on image change ([#2459](https://github.com/regen-network/regen-web/issues/2459)) ([3f40499](https://github.com/regen-network/regen-web/commit/3f40499b943a8a60ba203c9f475d89cadf1c53f2))
- APP-296 set published to true after on chain project created ([#2458](https://github.com/regen-network/regen-web/issues/2458)) ([af3a622](https://github.com/regen-network/regen-web/commit/af3a6223cf3f5e0e4e1f4006d4ba51ab34142af8))
- APP-307 user menu translate issue ([#2445](https://github.com/regen-network/regen-web/issues/2445)) ([cd4ea08](https://github.com/regen-network/regen-web/commit/cd4ea082aee93e03c59fe1f6628f805bb5556f53))
- APP-310 create post draft disabled ([#2457](https://github.com/regen-network/regen-web/issues/2457)) ([5a1fcb8](https://github.com/regen-network/regen-web/commit/5a1fcb83450b14f7dc9ee462c40f1f08455e66a9))
- APP-316 decoding file URLs ([#2462](https://github.com/regen-network/regen-web/issues/2462)) ([7f0f673](https://github.com/regen-network/regen-web/commit/7f0f6739e0933ad7121c07246de8c5748d3dc16e))
- APP-331 close PostFlow modal on sign tx success ([#2465](https://github.com/regen-network/regen-web/issues/2465)) ([065adcc](https://github.com/regen-network/regen-web/commit/065adccf93f35bb8c88417fe19f3eaf5d1838ca6))
- profile portfolio issue ([#2446](https://github.com/regen-network/regen-web/issues/2446)) ([d3f2b91](https://github.com/regen-network/regen-web/commit/d3f2b9192f4b1c6a8373ce3419f03c326c700feb))
- temporarily remove `regen:projectDeveloper` from Project Metadata form omitted keys ([#2400](https://github.com/regen-network/regen-web/issues/2400)) ([3d343b0](https://github.com/regen-network/regen-web/commit/3d343b0732061f1eab8fcba30d3c8f3875b4b6c6))

### Features

- APP-115 account merging ([#2370](https://github.com/regen-network/regen-web/issues/2370)) ([d2f91e6](https://github.com/regen-network/regen-web/commit/d2f91e603a6ca361a5a2d92aff3719b0ee17f092))
- APP-150 add featured projects sorting on /projects page ([#2387](https://github.com/regen-network/regen-web/issues/2387)) ([0937aa9](https://github.com/regen-network/regen-web/commit/0937aa96d2b27dd29c1939b23b930eb6537c7c1d))
- APP-155 update VideoInput to detect valid url and display error ([#2385](https://github.com/regen-network/regen-web/issues/2385)) ([e272b77](https://github.com/regen-network/regen-web/commit/e272b77a09f5c7ec04feacb0b18da7e4f2a416b3))
- APP-176 fallback to on-chain image if no off-chain project metadata is defined ([#2397](https://github.com/regen-network/regen-web/issues/2397)) ([34892f3](https://github.com/regen-network/regen-web/commit/34892f3ec617da91dbef82c36fdfb4df74a6c8e9))
- APP-183 attach signature to data post + APP-240 ([#2423](https://github.com/regen-network/regen-web/issues/2423)) ([5373c43](https://github.com/regen-network/regen-web/commit/5373c4319ac8bfe7e87c88783a8a4492278a1c72))
- APP-188 delete post ([#2409](https://github.com/regen-network/regen-web/issues/2409)) ([b9220b5](https://github.com/regen-network/regen-web/commit/b9220b5ed159a3d667337b36d082cf5ecae43e7f))
- APP-189 post secret link ([#2401](https://github.com/regen-network/regen-web/issues/2401)) ([be1e1e6](https://github.com/regen-network/regen-web/commit/be1e1e69b1912ca7717bbdc7c72483c5ac5e0b0e))
- APP-194 add prev/next post functionality ([#2398](https://github.com/regen-network/regen-web/issues/2398)) ([7ba2017](https://github.com/regen-network/regen-web/commit/7ba2017786251aca5f6e19018e517c97b82182f3))
- APP-195 files preview ([#2403](https://github.com/regen-network/regen-web/issues/2403)) ([a295de2](https://github.com/regen-network/regen-web/commit/a295de25be2d39cfe9809895aa5008e3f6ac0410))
- APP-200 create post close confirmation modal ([#2405](https://github.com/regen-network/regen-web/issues/2405)) ([8c914f6](https://github.com/regen-network/regen-web/commit/8c914f6a1958d8b5a22726df1805375a2594db22))
- APP-201 buy credits flow step 1 ([#2408](https://github.com/regen-network/regen-web/issues/2408)) ([a622abb](https://github.com/regen-network/regen-web/commit/a622abb5e2329869490bf8714dc93991f4d8d404))
- APP-202 buy credits step 2 ([#2418](https://github.com/regen-network/regen-web/issues/2418)) ([30e0bcb](https://github.com/regen-network/regen-web/commit/30e0bcb7e629ced57b301b9d51e4723015b7fafd))
- APP-203 buy credits step 3 ([#2419](https://github.com/regen-network/regen-web/issues/2419)) ([9eac1f0](https://github.com/regen-network/regen-web/commit/9eac1f0f6963f94c8d6b822fb4e49acb3a4b787a))
- APP-214 sold out projects ([#2414](https://github.com/regen-network/regen-web/issues/2414)) ([7287d5f](https://github.com/regen-network/regen-web/commit/7287d5f58682578dbcb0341063ed3a9702e2c370))
- APP-218 add create post to SellOrdersActionsBar ([#2427](https://github.com/regen-network/regen-web/issues/2427)) ([fb9c906](https://github.com/regen-network/regen-web/commit/fb9c906d84adb5e96293042e1238a51dd5cc12d9))
- APP-228 draft posts ([#2453](https://github.com/regen-network/regen-web/issues/2453)) ([dfd6a23](https://github.com/regen-network/regen-web/commit/dfd6a232494282ff1932b0bc8640d25e820ebafb))
- APP-23 project data stream ([#2390](https://github.com/regen-network/regen-web/issues/2390)) ([d28906d](https://github.com/regen-network/regen-web/commit/d28906de6f57befbcc16f5e1a4c545ecaffacae8))
- APP-24 create post ([#2381](https://github.com/regen-network/regen-web/issues/2381)) ([bad6016](https://github.com/regen-network/regen-web/commit/bad6016ceb9f365a9150588d1ac7883b22c5213b))
- APP-243 disable create post button in keplr mobile ([#2433](https://github.com/regen-network/regen-web/issues/2433)) ([df0908f](https://github.com/regen-network/regen-web/commit/df0908f2b0f65c1cdf17697a28e0af3007f2c8dd))
- APP-25 post page ([#2384](https://github.com/regen-network/regen-web/issues/2384)) ([23581c8](https://github.com/regen-network/regen-web/commit/23581c8ca0c2f00dd3e76dac5c0ebca85d0a1507))
- APP-297 render urls in post comment as hyperlinks ([#2460](https://github.com/regen-network/regen-web/issues/2460)) ([4c84ce4](https://github.com/regen-network/regen-web/commit/4c84ce4e3824f3e6d8b6106fff173a0a4cf1575f))
- enable marketplace customization ([#2407](https://github.com/regen-network/regen-web/issues/2407)) ([eed7ab9](https://github.com/regen-network/regen-web/commit/eed7ab9181f226b5d516557f9683f639eb5b455a))
- pages translation part 2 ([#2415](https://github.com/regen-network/regen-web/issues/2415)) ([9306fb2](https://github.com/regen-network/regen-web/commit/9306fb28f62d06b9fe7aa41e446e2c88004df7d2))
- pages translation part4 ([#2444](https://github.com/regen-network/regen-web/issues/2444)) ([7381ba9](https://github.com/regen-network/regen-web/commit/7381ba9e7b5411778398f9cb6e99e38ec6583696))
- trad components part1 ([#2447](https://github.com/regen-network/regen-web/issues/2447)) ([30b2f42](https://github.com/regen-network/regen-web/commit/30b2f42c841dd7c178192ad78628e68090fdcaf1))
- trad components part2 ([#2449](https://github.com/regen-network/regen-web/issues/2449)) ([6ab5e84](https://github.com/regen-network/regen-web/commit/6ab5e84cc9f829851bd9c91ccb67c4a42535453f))
- trad pages part3 ([#2441](https://github.com/regen-network/regen-web/issues/2441)) ([5dbd517](https://github.com/regen-network/regen-web/commit/5dbd517efc9a0b1cb883d421c056cb52679182a4))
- translate features ([#2450](https://github.com/regen-network/regen-web/issues/2450)) ([71ea2c4](https://github.com/regen-network/regen-web/commit/71ea2c466261f0ecd4fe99f14aedf3ddf54127dc))
- translate web components part1 ([#2454](https://github.com/regen-network/regen-web/issues/2454)) ([80e59d0](https://github.com/regen-network/regen-web/commit/80e59d0e7d12a0fdc50cf125fdd53ca7fcb568c2))
- translate web-components from Document to forms ([#2464](https://github.com/regen-network/regen-web/issues/2464)) ([4570801](https://github.com/regen-network/regen-web/commit/4570801995f047d11c2ee61bc4d7bf10830e9114))

## [2.6.5](https://github.com/regen-network/regen-web/compare/v2.6.4...v2.6.5) (2024-08-16)

### Bug Fixes

- APP-283 file upload ([#2435](https://github.com/regen-network/regen-web/issues/2435)) ([e4eb2f3](https://github.com/regen-network/regen-web/commit/e4eb2f35ad64e836dbfe9246f67f0c23491442f3))

## [2.6.4](https://github.com/regen-network/regen-web/compare/v2.6.3...v2.6.4) (2024-08-08)

**Note:** Version bump only for package web-marketplace

## [2.6.3](https://github.com/regen-network/regen-web/compare/v2.6.2...v2.6.3) (2024-07-29)

### Bug Fixes

- enable autoretire checked by default ([14c1d48](https://github.com/regen-network/regen-web/commit/14c1d48363656854ed67c5d2c9e32a38af78cfe0))
- enableAutoRetire default value and sell orders query ([e057611](https://github.com/regen-network/regen-web/commit/e057611cbb7e61722b0db8ad6fbc354452eb17bb))

## [2.6.2](https://github.com/regen-network/regen-web/compare/v2.6.1...v2.6.2) (2024-07-29)

### Bug Fixes

- use @netlify/plugin-nextjs v4 and separate netlify.toml files ([ece146f](https://github.com/regen-network/regen-web/commit/ece146f0d7893f4b355424129363b82714b9d213))

## [2.6.1](https://github.com/regen-network/regen-web/compare/v2.6.0...v2.6.1) (2024-06-06)

### Bug Fixes

- add missing allImages to Gallery on project page ([07ff8c9](https://github.com/regen-network/regen-web/commit/07ff8c9dfac2ff3141e6713c4edf4f5169b05ec7))

# [2.6.0](https://github.com/regen-network/regen-web/compare/v2.5.1...v2.6.0) (2024-05-30)

### Bug Fixes

- add prefinance sanity content to /projects/prefinance ([#2361](https://github.com/regen-network/regen-web/issues/2361)) ([6c0550a](https://github.com/regen-network/regen-web/commit/6c0550a436070468efe4e3a8a56b5d296e6c9ddc))
- APP-104 show prefinance projects in all projects ([#2352](https://github.com/regen-network/regen-web/issues/2352)) ([7630bfc](https://github.com/regen-network/regen-web/commit/7630bfc3086d714e1b2104135c11a7ce5923d8e0))
- APP-112 project and credit class pagination ([#2356](https://github.com/regen-network/regen-web/issues/2356)) ([cbe749f](https://github.com/regen-network/regen-web/commit/cbe749f4447adf11c48d57f346d5d98f2df1d5ed))
- APP-113 logging in from buy button ([#2371](https://github.com/regen-network/regen-web/issues/2371)) ([529cdbf](https://github.com/regen-network/regen-web/commit/529cdbf92f10ff85eb07dcd8bbc5fcb434dcaa22))
- APP-114 edit profile ([#2355](https://github.com/regen-network/regen-web/issues/2355)) ([a84b291](https://github.com/regen-network/regen-web/commit/a84b2912e7cbc4639e1c88c081f862a59ee8f0ab))
- APP-126 adding multiple files at once to MediaForm gallery photos ([#2357](https://github.com/regen-network/regen-web/issues/2357)) ([60117a3](https://github.com/regen-network/regen-web/commit/60117a39e0ba4e90781e462c78cb79f91546ae13))
- APP-128 only display 'or, log in with email/social' if wallets available in log in modal ([#2364](https://github.com/regen-network/regen-web/issues/2364)) ([75f53cb](https://github.com/regen-network/regen-web/commit/75f53cb58e7fc5983248e9775a370d819119440a))
- APP-88 fix certificate share URL ([#2337](https://github.com/regen-network/regen-web/issues/2337)) ([55dfec0](https://github.com/regen-network/regen-web/commit/55dfec0adc6fe3543726000d578dbd996af013d6))
- APP-89 story text covered by media on project page ([#2343](https://github.com/regen-network/regen-web/issues/2343)) ([edc9e6f](https://github.com/regen-network/regen-web/commit/edc9e6fd25267273dcf7e48a929849d23ff3939a))
- APP-92 create batch form projects dropdown shows projects by admin instead of class issuers ([#2342](https://github.com/regen-network/regen-web/issues/2342)) ([01512b8](https://github.com/regen-network/regen-web/commit/01512b80a822b8eaa83627adced7d871a88b6724))
- APP-95 projects from a Keplr wallet login show up when logged in via a new account ([#2345](https://github.com/regen-network/regen-web/issues/2345)) ([7735616](https://github.com/regen-network/regen-web/commit/773561621dc0914c91572976ce495d7b1406cba7))
- connecting with wallet connect on mobile ([#2377](https://github.com/regen-network/regen-web/issues/2377)) ([2ca5d73](https://github.com/regen-network/regen-web/commit/2ca5d73db1e2501df48bd0d5c6cbea603ab4fac5))

### Features

- APP-108 edit/view project buttons ([#2351](https://github.com/regen-network/regen-web/issues/2351)) ([60a37eb](https://github.com/regen-network/regen-web/commit/60a37ebb8539e0b7de400f9b2555f644d7ac93ff))
- APP-136 show warning when clicking "view project" from project edit with unsaved changes ([#2363](https://github.com/regen-network/regen-web/issues/2363)) ([dfc343b](https://github.com/regen-network/regen-web/commit/dfc343bc8e3f19c6123e55f9c96f1a7daa244d89))
- APP-140 add a popup with basic info about offchain project pages for users ([#2374](https://github.com/regen-network/regen-web/issues/2374)) ([b3e06e8](https://github.com/regen-network/regen-web/commit/b3e06e81911b94bb90d332c48a7b47e9f74acf39))
- APP-16 files drag & drop ([#2338](https://github.com/regen-network/regen-web/issues/2338)) ([5fe29d7](https://github.com/regen-network/regen-web/commit/5fe29d78e7ede07d6525200be85bfa3bb449344b))
- APP-19 generate project slug based on project name ([#2335](https://github.com/regen-network/regen-web/issues/2335)) ([0313c8c](https://github.com/regen-network/regen-web/commit/0313c8c50ca40e998e55c9aa6bb28b20eea05d19))
- APP-39 draft project tag ([#2341](https://github.com/regen-network/regen-web/issues/2341)) ([469d0b1](https://github.com/regen-network/regen-web/commit/469d0b1fdf36daaae0bffbdabd962e4e7fb8268c))
- APP-9 Add a banner at top of project pages and individual profile page on first view ([#2336](https://github.com/regen-network/regen-web/issues/2336)) ([4cb477b](https://github.com/regen-network/regen-web/commit/4cb477baaad89481d7484dbb4ec1cfba1132480d))
- APP-98 project cards update ([#2372](https://github.com/regen-network/regen-web/issues/2372)) ([59b1067](https://github.com/regen-network/regen-web/commit/59b10677e24640ac9dfc4b082237c19f95cb094f))
- change default filters on project list page. ([#2365](https://github.com/regen-network/regen-web/issues/2365)) ([611872d](https://github.com/regen-network/regen-web/commit/611872d5a4ec446c52414949266c8c1e02a7c9c1))
- get ecosystemType primarily from projectMetadata ([e1d74df](https://github.com/regen-network/regen-web/commit/e1d74df726ab2c81c384e81a25d76491b75c37aa))
- post files map / gallery view UI APP-48 ([#2273](https://github.com/regen-network/regen-web/issues/2273)) ([154502d](https://github.com/regen-network/regen-web/commit/154502dfcf3355b66b56381ec3f7c73d9d0d8a5b))

## [2.5.1](https://github.com/regen-network/regen-web/compare/v2.5.0...v2.5.1) (2024-05-23)

### Bug Fixes

- APP-167 use atomscan as block explorer ([#2373](https://github.com/regen-network/regen-web/issues/2373)) ([44300ea](https://github.com/regen-network/regen-web/commit/44300ea2b60fc3f21aa68cf7919f674c4fb50142))

# [2.5.0](https://github.com/regen-network/regen-web/compare/v2.4.1...v2.5.0) (2024-05-15)

### Features

- get ecosystemType primarily from projectMetadata ([a05c800](https://github.com/regen-network/regen-web/commit/a05c800eb8ccd8798646a8ed52f1984b0b1cfaf5))

## [2.4.1](https://github.com/regen-network/regen-web/compare/v2.4.0...v2.4.1) (2024-05-09)

### Bug Fixes

- use useQueryIsIssuer hook instead of useProfileItems ([6f795e1](https://github.com/regen-network/regen-web/commit/6f795e1cbf46ec7623c7badf550888ebb162b8bf))

# [2.4.0](https://github.com/regen-network/regen-web/compare/v2.3.0...v2.4.0) (2024-04-24)

### Bug Fixes

- add ListProject ([af27d19](https://github.com/regen-network/regen-web/commit/af27d195787f85d19478311f5ce56f23b72888ad))
- clean up ([93fc78d](https://github.com/regen-network/regen-web/commit/93fc78d0afd8d780ae33bf09c106a9015dc173f4))
- mobile font size ([9c821af](https://github.com/regen-network/regen-web/commit/9c821af1d237722012f7d0c2d53af5c0a5b5beab))
- ts error ([46b1377](https://github.com/regen-network/regen-web/commit/46b1377cb1d01a863a8bc3ae1b593655f6807f52))

### Features

- add list project CTA ([3c951e9](https://github.com/regen-network/regen-web/commit/3c951e9529048ff9d1942b189f684324b5aa2547))

# [2.3.0](https://github.com/regen-network/regen-web/compare/v2.2.1...v2.3.0) (2024-04-09)

### Bug Fixes

- add dropdown items to projects menu item ([#2307](https://github.com/regen-network/regen-web/issues/2307)) ([f3a6cae](https://github.com/regen-network/regen-web/commit/f3a6cae7b0b6834479ca8ec7fb931d9842ccc875))
- APP-83 keep unapproved projects on public profile projects tab ([#2334](https://github.com/regen-network/regen-web/issues/2334)) ([ff21f68](https://github.com/regen-network/regen-web/commit/ff21f68f8b1fef83623f85d6200c3afc76c79382))
- ledger/projects queries optimization ([#2315](https://github.com/regen-network/regen-web/issues/2315)) ([dd22eae](https://github.com/regen-network/regen-web/commit/dd22eaeddb1c3bbc58cc0dddf8cadd1b0393157c))
- redirect project page from off chain UUID to slug based URL ([#2317](https://github.com/regen-network/regen-web/issues/2317)) ([fd9d895](https://github.com/regen-network/regen-web/commit/fd9d8950459a393bc204750529237c37195a39a3))
- roles form missing image upload and empty wallet address bug ([#2305](https://github.com/regen-network/regen-web/issues/2305)) ([a89a743](https://github.com/regen-network/regen-web/commit/a89a7433db9d432f4ee2d915ea7c1192bea33026))
- safari horizontal scroll with content overflow APP-1 ([#2328](https://github.com/regen-network/regen-web/issues/2328)) ([55231bb](https://github.com/regen-network/regen-web/commit/55231bbffbafe4c167750ad561f62462c1edf7b6))
- use activeAccount addr in profile link ([#2320](https://github.com/regen-network/regen-web/issues/2320)) ([cc7dc4f](https://github.com/regen-network/regen-web/commit/cc7dc4f15ed26e94fb9f64b6af91f7407f451149))

### Features

- add loading spinner when file gets uploaded APP-10 ([#2326](https://github.com/regen-network/regen-web/issues/2326)) ([c0fc8b3](https://github.com/regen-network/regen-web/commit/c0fc8b31669bacd95b4e945ed69f6cb22b0d4206))
- add new web2 login tracking events ([#2310](https://github.com/regen-network/regen-web/issues/2310)) ([fa2347a](https://github.com/regen-network/regen-web/commit/fa2347aea088c0a3b840a0f0f4914af127f7f0a2))
- add overrides for credit type and unit information in Sanity for Credit Class pages APP-2 ([#2324](https://github.com/regen-network/regen-web/issues/2324)) ([4eb5a22](https://github.com/regen-network/regen-web/commit/4eb5a22456fe2319fbb5cf5f6c0724a4a3af481f))
- APP-81 Hide ecocredits tab or certificates tab on profiles if tab is "hidden" or if user has no Keplr wallet ([#2333](https://github.com/regen-network/regen-web/issues/2333)) ([ceaa502](https://github.com/regen-network/regen-web/commit/ceaa502053dea3ae62f60d237f373e1569b2e139))

## [2.2.1](https://github.com/regen-network/regen-web/compare/v2.2.0...v2.2.1) (2024-03-06)

### Bug Fixes

- show MobileSigningModal only for keplr mobile ([9bfb120](https://github.com/regen-network/regen-web/commit/9bfb120929b24014653280f2a8e83bf920d2e02d))

# [2.2.0](https://github.com/regen-network/regen-web/compare/v2.1.1...v2.2.0) (2024-03-05)

### Bug Fixes

- save and next button behavior ([#2298](https://github.com/regen-network/regen-web/issues/2298)) ([c1d2fc9](https://github.com/regen-network/regen-web/commit/c1d2fc957dd8abb5a77fe8625fe3fee6333195ec))

### Features

- add project partners ([#2301](https://github.com/regen-network/regen-web/issues/2301)) ([45abc16](https://github.com/regen-network/regen-web/commit/45abc1602c6c127ecfab6731529ba29c023de60a))

## [2.1.1](https://github.com/regen-network/regen-web/compare/v2.1.0...v2.1.1) (2024-02-27)

### Bug Fixes

- use projects context instead of re-using useProjects hook ([a4fe201](https://github.com/regen-network/regen-web/commit/a4fe201c426521f6bc517f618a2eb71101c04ce7))

# [2.1.0](https://github.com/regen-network/regen-web/compare/v2.0.0...v2.1.0) (2024-02-27)

### Bug Fixes

- projects filters ([#2286](https://github.com/regen-network/regen-web/issues/2286)) ([5434c8f](https://github.com/regen-network/regen-web/commit/5434c8f686f2236d39c49c758e472b8644fd8746))

### Features

- add prefinance project and credit class timeline modal ([#2296](https://github.com/regen-network/regen-web/issues/2296)) ([a466f47](https://github.com/regen-network/regen-web/commit/a466f477748602ee2787a40872eb676e2cf900a2))
- prefinance project card ([#2288](https://github.com/regen-network/regen-web/issues/2288)) ([d37e7c7](https://github.com/regen-network/regen-web/commit/d37e7c7e070539d70659bed5f7a469e223169d86))
- use offchain credit class to get primary impact/project benefits ([#2294](https://github.com/regen-network/regen-web/issues/2294)) ([384dbac](https://github.com/regen-network/regen-web/commit/384dbacbe3d7149105f8175a46043fb37b730264))

# [2.0.0](https://github.com/regen-network/regen-web/compare/v1.14.1...v2.0.0) (2024-02-20)

### Bug Fixes

- csrf token refetch ([#2196](https://github.com/regen-network/regen-web/issues/2196)) ([53af644](https://github.com/regen-network/regen-web/commit/53af6448fd20c90629a85b7158f9679b272737c5))
- edit metadata for on-chain project ([#2242](https://github.com/regen-network/regen-web/issues/2242)) ([f9c0c2e](https://github.com/regen-network/regen-web/commit/f9c0c2e02ab779c32cce6df6a3fd1636fcaac9b1))
- ESLint + existing lints ([#2252](https://github.com/regen-network/regen-web/issues/2252)) ([d9879cf](https://github.com/regen-network/regen-web/commit/d9879cfdd8c2d35b4e2e9215ea902198e73abc9d))
- hide credit class entry if no credit class ([#2214](https://github.com/regen-network/regen-web/issues/2214)) ([f9afea6](https://github.com/regen-network/regen-web/commit/f9afea6d52f86a4e8f424eb57bd65a23dcc2c1b5))
- hide empty additional info on project and credit class pages ([#2231](https://github.com/regen-network/regen-web/issues/2231)) ([0cf312d](https://github.com/regen-network/regen-web/commit/0cf312d088cd98087d78a9c86f05921e123c35a6))
- hide menu items for wc users ([#2241](https://github.com/regen-network/regen-web/issues/2241)) ([ee0e031](https://github.com/regen-network/regen-web/commit/ee0e03127ee56f755ee8a517d1cae0eca5da4033))
- issues with Wallet Connect ([#2269](https://github.com/regen-network/regen-web/issues/2269)) ([56dadef](https://github.com/regen-network/regen-web/commit/56dadefa36be87df870d0c12fb0703b4d412cd65))
- link to view profile ([#2280](https://github.com/regen-network/regen-web/issues/2280)) ([758dece](https://github.com/regen-network/regen-web/commit/758dece2d4ef1bc258769998b90c200f9bbe9b59))
- navigate to profile page on back click on mobile ([#2274](https://github.com/regen-network/regen-web/issues/2274)) ([3c8b84b](https://github.com/regen-network/regen-web/commit/3c8b84b6e7ecca39c9d63270a28eb2a979501c58))
- persist projects filters ([#2215](https://github.com/regen-network/regen-web/issues/2215)) ([1f7edd4](https://github.com/regen-network/regen-web/commit/1f7edd4e17095311c1d70fdeadc7a40b7e51caa0))
- QR code not displayed on first attempt to connect via Wallet Connect on desktop / chromium browsers ([#2279](https://github.com/regen-network/regen-web/issues/2279)) ([69b330a](https://github.com/regen-network/regen-web/commit/69b330a7124b64a49d3ffdd12176126f9c231de5))
- refetch current account projects after project published ([#2270](https://github.com/regen-network/regen-web/issues/2270)) ([9b6a67e](https://github.com/regen-network/regen-web/commit/9b6a67e7a25e6a7c4e404ea41ada7150dc452d3b))
- replay http requests with expired CSRF token ([#2245](https://github.com/regen-network/regen-web/issues/2245)) ([b1f8842](https://github.com/regen-network/regen-web/commit/b1f8842f1f5ba3fede671a38450a3831267dd264))
- UI issues on account settings page ([#2230](https://github.com/regen-network/regen-web/issues/2230)) ([ba2e6b2](https://github.com/regen-network/regen-web/commit/ba2e6b275bde7b2bc6a35d98ff9710d3aa6c2393))
- updates for jaguar pilot ([#2239](https://github.com/regen-network/regen-web/issues/2239)) ([e280d3a](https://github.com/regen-network/regen-web/commit/e280d3a7e88ea9045ed861bc57d438df35bdb107))
- useCallback to define retryCsrfRequest to avoid infinite loop ([#2259](https://github.com/regen-network/regen-web/issues/2259)) ([8e84d3e](https://github.com/regen-network/regen-web/commit/8e84d3ef34d2b33214338b3c34d0d618f5327332))

### Features

- add and switch accounts ([#2220](https://github.com/regen-network/regen-web/issues/2220)) ([508a8d9](https://github.com/regen-network/regen-web/commit/508a8d9aadebefe61af1a14ede7c0ad477b9f5b6))
- add buy button for Sharamentsa pilot ([05a8b02](https://github.com/regen-network/regen-web/commit/05a8b0217d6617552bff37720b0d72e7be553020))
- add email address and social login options to login popup ([#2172](https://github.com/regen-network/regen-web/issues/2172)) ([7640245](https://github.com/regen-network/regen-web/commit/7640245c6b18eda14e9557dc5a152c5eedfc4181))
- add email from settings for web3 account ([#2229](https://github.com/regen-network/regen-web/issues/2229)) ([c3b7aae](https://github.com/regen-network/regen-web/commit/c3b7aae82d8748740cfc0c43cbfb16a25fd2add9))
- add new post form ([#2251](https://github.com/regen-network/regen-web/issues/2251)) ([1890e12](https://github.com/regen-network/regen-web/commit/1890e12234a192fa420a4432cddb094ad114d277))
- add pinnedIds to useProjectsWithOrders ([#2191](https://github.com/regen-network/regen-web/issues/2191)) ([92d23c9](https://github.com/regen-network/regen-web/commit/92d23c97886ea7e3f541248f898c87b8743ecd17))
- add secondary button to EcologicalCreditCard ([#2237](https://github.com/regen-network/regen-web/issues/2237)) ([6966caa](https://github.com/regen-network/regen-web/commit/6966caafc22795e5588d0c28e725f954a0613766))
- add timer to resend passcode action ([#2222](https://github.com/regen-network/regen-web/issues/2222)) ([83d2391](https://github.com/regen-network/regen-web/commit/83d2391c67a9f559751cc3841270ba0adb1b0156))
- adjust front-end based on web2 login server updates ([#2198](https://github.com/regen-network/regen-web/issues/2198)) ([03e65b6](https://github.com/regen-network/regen-web/commit/03e65b6244c24577443bf08a07995331ecd77df3))
- change schedule call link ([#2200](https://github.com/regen-network/regen-web/issues/2200)) ([d3f8572](https://github.com/regen-network/regen-web/commit/d3f8572c3ab732f4518946cd011c1a08ccf4b7a1))
- connect wallet to web2 account on action ([#2219](https://github.com/regen-network/regen-web/issues/2219)) ([06bffa7](https://github.com/regen-network/regen-web/commit/06bffa72b8c4a56d20707ac0a632765c9624ac81))
- connect/disconnect to/from google ([#2221](https://github.com/regen-network/regen-web/issues/2221)) ([fd541ad](https://github.com/regen-network/regen-web/commit/fd541ad533f1a5efe651f8adafe7326e380b7ab6))
- display credit class cards on account and profile ([#2181](https://github.com/regen-network/regen-web/issues/2181)) ([96d8025](https://github.com/regen-network/regen-web/commit/96d80257ff62addb476954676f28a82ddcb414fd))
- edit file form UI ([#2257](https://github.com/regen-network/regen-web/issues/2257)) ([6aea52d](https://github.com/regen-network/regen-web/commit/6aea52d392117935b506c169a0c663c4f27ae359))
- switch wallet warning modal ([#2227](https://github.com/regen-network/regen-web/issues/2227)) ([3935271](https://github.com/regen-network/regen-web/commit/393527106722148320048a9d85d13358afe4e2f6))
- update create/edit project forms to handle projects without credit class ([#2178](https://github.com/regen-network/regen-web/issues/2178)) ([4a731ed](https://github.com/regen-network/regen-web/commit/4a731ed3b506fef6d3f53ad3bee3d2e121308610))
- wire email confirmation code ([#2218](https://github.com/regen-network/regen-web/issues/2218)) ([e1f1135](https://github.com/regen-network/regen-web/commit/e1f1135cf8e19b8f548c08233198a6a5af7e054f))

# [1.15.0](https://github.com/regen-network/regen-web/compare/v1.14.1...v1.15.0) (2023-12-20)

### Features

- add buy button for Sharamentsa pilot ([a6953ff](https://github.com/regen-network/regen-web/commit/a6953ffad28e6336349471493e482f0e0bb0b8fd))

## [1.14.1](https://github.com/regen-network/regen-web/compare/v1.14.0...v1.14.1) (2023-11-13)

### Bug Fixes

- credit class buy button ([7a2d952](https://github.com/regen-network/regen-web/commit/7a2d95259adc38607ba911e312756ffa7b829359))

# [1.14.0](https://github.com/regen-network/regen-web/compare/v1.13.0...v1.14.0) (2023-10-23)

### Bug Fixes

- ecocredit table with ghost credits on first page ([#2176](https://github.com/regen-network/regen-web/issues/2176)) ([ae97495](https://github.com/regen-network/regen-web/commit/ae97495c5ed5d93e55110ce29aae734f70668b80))
- formatting for xsd:gYear rdf type ([#2185](https://github.com/regen-network/regen-web/issues/2185)) ([72492cc](https://github.com/regen-network/regen-web/commit/72492ccf8e05df7bb137013c62aeb8b1e8cea646))
- max button for create sell order ([#2184](https://github.com/regen-network/regen-web/issues/2184)) ([d8ab4f9](https://github.com/regen-network/regen-web/commit/d8ab4f9630a74f9e6c80b64e47677e7a574b218e))
- offchain project cards on /projects page ([#2165](https://github.com/regen-network/regen-web/issues/2165)) ([bba7669](https://github.com/regen-network/regen-web/commit/bba7669497dadadef8352d069e30b27de66e8b1a))
- refactor batches fetching ([#2152](https://github.com/regen-network/regen-web/issues/2152)) ([0d8b3de](https://github.com/regen-network/regen-web/commit/0d8b3defebe268b048268b94214db4af2a5a9d50))
- show only approved off chain projects on projects page ([#2150](https://github.com/regen-network/regen-web/issues/2150)) ([3908c61](https://github.com/regen-network/regen-web/commit/3908c61679dbbafc16de4a660fbeffcc4f80ddc8))
- use portfolio as profile index route ([#2162](https://github.com/regen-network/regen-web/issues/2162)) ([9eb3984](https://github.com/regen-network/regen-web/commit/9eb398433d708ff57263ffac198da7a76b99abd8))

### Features

- add create project without credit class option ([#2170](https://github.com/regen-network/regen-web/issues/2170)) ([8799232](https://github.com/regen-network/regen-web/commit/87992323367b3ff8581c2924445e3b23d3eb0942))
- add dynamic certificate label and icon ([#2166](https://github.com/regen-network/regen-web/issues/2166)) ([eeb6a0b](https://github.com/regen-network/regen-web/commit/eeb6a0be61996e0031943a308348ed171a4720a6))
- add projects and batches to user account dropdown ([#2146](https://github.com/regen-network/regen-web/issues/2146)) ([b2ad8c9](https://github.com/regen-network/regen-web/commit/b2ad8c9a932eb6d3a7b0d1e4fdb0afd66c8f396c))
- add user account settings page ([#2167](https://github.com/regen-network/regen-web/issues/2167)) ([f1a1d77](https://github.com/regen-network/regen-web/commit/f1a1d77055f3d63f79919badca3a09744feed943))
- add warning modal on profile edit ([#2144](https://github.com/regen-network/regen-web/issues/2144)) ([d4231d1](https://github.com/regen-network/regen-web/commit/d4231d1a5634cf042a202cb8e51ba38fcd8b9b16))
- display all tabs on public profile ([#2141](https://github.com/regen-network/regen-web/issues/2141)) ([cc03e5c](https://github.com/regen-network/regen-web/commit/cc03e5c5b79814953faec710cf65b925f357d70c))
- edit project slug ([#2164](https://github.com/regen-network/regen-web/issues/2164)) ([3f15421](https://github.com/regen-network/regen-web/commit/3f154210f2fa5c4f1b6f7a3544f3cdc8e138b377))
- update project page for off-chain projects ([#2153](https://github.com/regen-network/regen-web/issues/2153)) ([68421c8](https://github.com/regen-network/regen-web/commit/68421c8b7360079dcf15112b75e2c601baed3d15))

# [1.13.0](https://github.com/regen-network/regen-web/compare/v1.12.2...v1.13.0) (2023-09-27)

### Bug Fixes

- buy modal options trigger ([#2128](https://github.com/regen-network/regen-web/issues/2128)) ([b48bbf6](https://github.com/regen-network/regen-web/commit/b48bbf69a861a69bababeeddd20664c86e61fc00))
- make sure project admin wallet id is always set ([#2109](https://github.com/regen-network/regen-web/issues/2109)) ([ba90c27](https://github.com/regen-network/regen-web/commit/ba90c276de31d0a6e1246a7d5ddf52c98c828b02))
- projects page reloading on buy ([#2103](https://github.com/regen-network/regen-web/issues/2103)) ([b8ca81d](https://github.com/regen-network/regen-web/commit/b8ca81d22189cd366dc425a7e62ae006ded7b608))
- run tsc at build time and fix ts errors ([#2104](https://github.com/regen-network/regen-web/issues/2104)) ([4cbad70](https://github.com/regen-network/regen-web/commit/4cbad701bbf070e8f226ddc51682856bd1a47ef7))
- update project metadata submit to account for [@context](https://github.com/context) overwrite ([#2110](https://github.com/regen-network/regen-web/issues/2110)) ([fdbdabb](https://github.com/regen-network/regen-web/commit/fdbdabb263cd8c5b3fa1027d4c7ab131a6f2b57b))
- update Storefront actions using isConnected state ([#2134](https://github.com/regen-network/regen-web/issues/2134)) ([1764093](https://github.com/regen-network/regen-web/commit/17640939b6b35d64f6e31d97ff4934d772a6842a))

### Features

- add faucet page ([#2092](https://github.com/regen-network/regen-web/issues/2092)) ([4690403](https://github.com/regen-network/regen-web/commit/4690403af2904da4f895ea15a0b5e78656323a4d))
- add off-chain projects to projects page ([#2101](https://github.com/regen-network/regen-web/issues/2101)) ([7f2ad07](https://github.com/regen-network/regen-web/commit/7f2ad07b4d3702ebd8ed96a3ddbafcea62b2b898))
- display user projects on public profile ([#2099](https://github.com/regen-network/regen-web/issues/2099)) ([d27746b](https://github.com/regen-network/regen-web/commit/d27746b66c3bf3f01062fb7fbb47a1f22f4b5669))
- edit profiles created with the Project Roles Form ([#2100](https://github.com/regen-network/regen-web/issues/2100)) ([f4687e7](https://github.com/regen-network/regen-web/commit/f4687e732f3a93c2f09163278bae1881e8fa2792))
- handle not found profile ([#2136](https://github.com/regen-network/regen-web/issues/2136)) ([dcc9565](https://github.com/regen-network/regen-web/commit/dcc9565480f9f6e4ce0eb2a5b8feccae9d37ce0d))
- migrate CreateSellOrderForm to react-hook-form ([#2132](https://github.com/regen-network/regen-web/issues/2132)) ([95ac829](https://github.com/regen-network/regen-web/commit/95ac829804b3ac65b634f865bd5d3b41b5c7bbd9))
- open project page to off-chain projects ([#2130](https://github.com/regen-network/regen-web/issues/2130)) ([a71f666](https://github.com/regen-network/regen-web/commit/a71f666d30f48c8937e01eabb98518adeee72323))
- refactor denom handling and add documentation ([#2111](https://github.com/regen-network/regen-web/issues/2111)) ([fb71068](https://github.com/regen-network/regen-web/commit/fb710681ae259d7714ee2d34468c26f01287cb28))
- share profile link ([#2108](https://github.com/regen-network/regen-web/issues/2108)) ([61b0d11](https://github.com/regen-network/regen-web/commit/61b0d11db561d6181654b0fccecd457564f85b23))
- update batches fetching ([#2121](https://github.com/regen-network/regen-web/issues/2121)) ([c6df671](https://github.com/regen-network/regen-web/commit/c6df671f4972cd715b85815cebb3549a1ec69f90))
- use resized image on profile and gallery ([#2106](https://github.com/regen-network/regen-web/issues/2106)) ([448db6f](https://github.com/regen-network/regen-web/commit/448db6fcdb42dfdf721620879509f1ec37f582ce))

# [1.12.0](https://github.com/regen-network/regen-web/compare/v1.11.0...v1.12.0) (2023-09-19)

### Bug Fixes

- A user should be able to add/update a project created outside the app ([#2060](https://github.com/regen-network/regen-web/issues/2060)) ([cb97a1e](https://github.com/regen-network/regen-web/commit/cb97a1e0ac45d6ca27916178d0b2614475372779))
- clear cache for getProjectById after select credit class step ([#2062](https://github.com/regen-network/regen-web/issues/2062)) ([140409f](https://github.com/regen-network/regen-web/commit/140409f282601652ff9b0754182ac860ec867926))
- entities spacing and refactor with Stakeholders component ([#2070](https://github.com/regen-network/regen-web/issues/2070)) ([ac52d2f](https://github.com/regen-network/regen-web/commit/ac52d2f5b86f3ead0c2e9ece50ffbf3c6851f9f9))
- handle projects with invalide medata ([#2031](https://github.com/regen-network/regen-web/issues/2031)) ([58c5a92](https://github.com/regen-network/regen-web/commit/58c5a92d346f3c156550a9977630b900242d10df))
- handle save and exit in creation form ([#2078](https://github.com/regen-network/regen-web/issues/2078)) ([1e4a966](https://github.com/regen-network/regen-web/commit/1e4a966061a6cbbca5d0cbe040edfda7d0932451))
- key in activity table ([#2095](https://github.com/regen-network/regen-web/issues/2095)) ([b53941f](https://github.com/regen-network/regen-web/commit/b53941f27cd6c94cfb4d25adc60bb9abf9039d64))
- project cards loading ([#2079](https://github.com/regen-network/regen-web/issues/2079)) ([57ff309](https://github.com/regen-network/regen-web/commit/57ff309267f772659687e41286b53bd988bfc075))
- Project creation metadata wording ([#2059](https://github.com/regen-network/regen-web/issues/2059)) ([64c2936](https://github.com/regen-network/regen-web/commit/64c2936b339cb2e89ce6bd03e3a3c96b395ad0dc))
- project edit bg color and form border color and registry header borderBottom ([#2048](https://github.com/regen-network/regen-web/issues/2048)) ([e23f66c](https://github.com/regen-network/regen-web/commit/e23f66ce19b4f32c1300e1e27e5dd8125b44654d))
- react-player issue ([#2056](https://github.com/regen-network/regen-web/issues/2056)) ([49611f6](https://github.com/regen-network/regen-web/commit/49611f61939cfc5ad3a405ffa3dffe547f4042a3))
- redirect onchain project to edit flow ([#2050](https://github.com/regen-network/regen-web/issues/2050)) ([fe5d213](https://github.com/regen-network/regen-web/commit/fe5d213e6a9fd1eaa4d37bf7b1e310316cb772b6))
- spacing credit class + handle empty sections ([#2028](https://github.com/regen-network/regen-web/issues/2028)) ([bac0a0c](https://github.com/regen-network/regen-web/commit/bac0a0c003a0b55c7afa76647fe77e4d33a0d779))
- storybook local environment ([#2038](https://github.com/regen-network/regen-web/issues/2038)) ([7d46d23](https://github.com/regen-network/regen-web/commit/7d46d232d0b80e4c2dd04f53c65f77272df574b5))
- trigger form validation on preview photo upload ([#2069](https://github.com/regen-network/regen-web/issues/2069)) ([bb2faff](https://github.com/regen-network/regen-web/commit/bb2faff59bcefb3e9c8c63505b836c413edbd6cb))
- unable to load project with initial metadata ([#2043](https://github.com/regen-network/regen-web/issues/2043)) ([2ff7495](https://github.com/regen-network/regen-web/commit/2ff749506db314c910e7732a75f80e142568dafc))
- unhandled https require ([#2066](https://github.com/regen-network/regen-web/issues/2066)) ([b63b52d](https://github.com/regen-network/regen-web/commit/b63b52dba1de1242c17d86094151d45795e18aca))
- update offchainProject props in ChooseCreditClass ([#2091](https://github.com/regen-network/regen-web/issues/2091)) ([424be8d](https://github.com/regen-network/regen-web/commit/424be8d6605db3284622f59e65eb9aeef65f605a))

### Features

- add jurisdiction fallback ([#2033](https://github.com/regen-network/regen-web/issues/2033)) ([7b5e232](https://github.com/regen-network/regen-web/commit/7b5e232a1868f74d81e3db3f094f45746059d697))
- add percentage on project creation ([#2082](https://github.com/regen-network/regen-web/issues/2082)) ([4d78142](https://github.com/regen-network/regen-web/commit/4d78142ee4725a61bd1335165a591441ed2678dc))
- add program registry to cards ([#2015](https://github.com/regen-network/regen-web/issues/2015)) ([25aca9d](https://github.com/regen-network/regen-web/commit/25aca9dd3a0c03b92fe5b1bad50a1da43b796364))
- add project impact description ([#2067](https://github.com/regen-network/regen-web/issues/2067)) ([71ec31b](https://github.com/regen-network/regen-web/commit/71ec31bf0c0c353e76f340e9f3b49e8ebf16206b))
- Add support for measured/project co-benefits and use default impact image ([#2022](https://github.com/regen-network/regen-web/issues/2022)) ([ba6a057](https://github.com/regen-network/regen-web/commit/ba6a057be382f30212c60f78bb173e93e47a22f4))
- add tracking events for filterPermissionlessCredits and filterCreditClass ([#2065](https://github.com/regen-network/regen-web/issues/2065)) ([17807da](https://github.com/regen-network/regen-web/commit/17807da1045b4f40ce993a2559cc4b9a219f9033))
- adjust spacing project page ([#2027](https://github.com/regen-network/regen-web/issues/2027)) ([bfc4b8a](https://github.com/regen-network/regen-web/commit/bfc4b8a446eb26ea6f01af4cdf5505d5411f967d))
- complete project form migration ([#2055](https://github.com/regen-network/regen-web/issues/2055)) ([75cebea](https://github.com/regen-network/regen-web/commit/75cebea5684d6ab6b2ac0ce311e1cbe70bfdd472))
- credit classes issuers perf ([#2049](https://github.com/regen-network/regen-web/issues/2049)) ([76e8842](https://github.com/regen-network/regen-web/commit/76e8842bbb59196c054383c1a08c35f82aee3a16))
- display community projects on credit class page ([#2044](https://github.com/regen-network/regen-web/issues/2044)) ([0c604d1](https://github.com/regen-network/regen-web/commit/0c604d1ba95c26e18e6c87c17ac4e04293675ce3))
- Edit project admin from the Roles edit form ([#2054](https://github.com/regen-network/regen-web/issues/2054)) ([aabf541](https://github.com/regen-network/regen-web/commit/aabf5412a826ad49a1ff4f428b5dcf8f9594cee1))
- handle profile without address ([#2086](https://github.com/regen-network/regen-web/issues/2086)) ([10582f3](https://github.com/regen-network/regen-web/commit/10582f37319d4df8dae98cb6cd3372e0a4589413))
- move buyers page www ([#2026](https://github.com/regen-network/regen-web/issues/2026)) ([b77d538](https://github.com/regen-network/regen-web/commit/b77d538425338125c7e9fac31341ffe974de500a))
- project credit batches perf ([#2041](https://github.com/regen-network/regen-web/issues/2041)) ([d62f8a9](https://github.com/regen-network/regen-web/commit/d62f8a956fc91543b89b6eef3e3cc5d405ea31c2))
- save project creation current step in local storage ([#2080](https://github.com/regen-network/regen-web/issues/2080)) ([458d80d](https://github.com/regen-network/regen-web/commit/458d80d5e3c6c0896e3d5f3b9b561ce0fed7dfb8))
- use indexer for activity page ([#2018](https://github.com/regen-network/regen-web/issues/2018)) ([6c49ed8](https://github.com/regen-network/regen-web/commit/6c49ed81b181a5c8a0f1bf71f4537c8e87f5016a))

# [1.11.0](https://github.com/regen-network/regen-web/compare/v1.10.0...v1.11.0) (2023-08-09)

### Bug Fixes

- batch balances which didn't always correspond to batches on portfolio ecocredits table ([#1979](https://github.com/regen-network/regen-web/issues/1979)) ([1e4319f](https://github.com/regen-network/regen-web/commit/1e4319f0492134c2c873c016211258519868499e))
- calculate median using cumulative quantity ([#1998](https://github.com/regen-network/regen-web/issues/1998)) ([5b5fba5](https://github.com/regen-network/regen-web/commit/5b5fba5e78100fab760786da6f214d6922d4eb13))
- credit class admin link on credit class page ([#1986](https://github.com/regen-network/regen-web/issues/1986)) ([2e237bf](https://github.com/regen-network/regen-web/commit/2e237bfde85048f2c260ce24582453e35bbc024b))
- Do not display project forms if trying to access them for a project that does not exist or not admin of ([#1984](https://github.com/regen-network/regen-web/issues/1984)) ([6ad1bbe](https://github.com/regen-network/regen-web/commit/6ad1bbe9cf7cf4a687e8567bd79b38ecd4a1eda5))
- fix registry and guide links ([#2017](https://github.com/regen-network/regen-web/issues/2017)) ([e11c5b4](https://github.com/regen-network/regen-web/commit/e11c5b4c9e92fa81a4ddca3e95755df9e7c6eb41))
- incorrect font for project stakeholders ([#2001](https://github.com/regen-network/regen-web/issues/2001)) ([a722a4e](https://github.com/regen-network/regen-web/commit/a722a4ea27a629e6da9fbf0644449e46dfa772ba))
- only display classes that the user is an issuer for on ChooseCreditClass ([#1987](https://github.com/regen-network/regen-web/issues/1987)) ([5dc1d69](https://github.com/regen-network/regen-web/commit/5dc1d6982d90242c797b61413f60687c843eec05))
- project certification and ratings title ([#1999](https://github.com/regen-network/regen-web/issues/1999)) ([39157ad](https://github.com/regen-network/regen-web/commit/39157ad72e4dedb53e2ff0e5924e46c7c1d83e44))
- remove walletConnect from params in useAddAddress ([#1990](https://github.com/regen-network/regen-web/issues/1990)) ([6dd3a7c](https://github.com/regen-network/regen-web/commit/6dd3a7c85c15eaa03822479e03d13c678665c6a0))
- Swap out icons on profile tabs, in user "..." menus, and "not found" icons ([#2005](https://github.com/regen-network/regen-web/issues/2005)) ([e9c9017](https://github.com/regen-network/regen-web/commit/e9c901700b8d47f349f6f6a66606292aa18641ab))
- yarn format-and-fix to ignore generated code ([#2011](https://github.com/regen-network/regen-web/issues/2011)) ([1610102](https://github.com/regen-network/regen-web/commit/1610102e162172d91608952ff4e54be06878cd73))

### Features

- add credit class details section with credibility cards ([#1970](https://github.com/regen-network/regen-web/issues/1970)) ([188564a](https://github.com/regen-network/regen-web/commit/188564a3afdeb051f0e214a50758e961dd2e49f9))
- credit class issuance and info table ([#1985](https://github.com/regen-network/regen-web/issues/1985)) ([6b16b3d](https://github.com/regen-network/regen-web/commit/6b16b3d6aef0d8736229fd14771353a5377b6943))
- Credit Class Page "Additional Info" improvements ([#1980](https://github.com/regen-network/regen-web/issues/1980)) ([26ccc7c](https://github.com/regen-network/regen-web/commit/26ccc7c6a72aff92a8b89a25bd9614b3955b74bf))
- use default class image ([#2004](https://github.com/regen-network/regen-web/issues/2004)) ([056c215](https://github.com/regen-network/regen-web/commit/056c21555559b9eedc8d4acfa85e4db56cc57e3a))

# [1.10.0](https://github.com/regen-network/regen-web/compare/v1.9.0...v1.10.0) (2023-07-20)

### Bug Fixes

- upgrade to wallet connect v2 using [@cosmos-kit](https://github.com/cosmos-kit) ([#1976](https://github.com/regen-network/regen-web/issues/1976)) ([168875e](https://github.com/regen-network/regen-web/commit/168875ebc8bbacba872a99b7e183dff9f3f48516))

### Features

- add ecosystem and eligible activity tags to credit class page ([#1965](https://github.com/regen-network/regen-web/issues/1965)) ([2ab0796](https://github.com/regen-network/regen-web/commit/2ab07967479977f60feb82b2468f8a5e6de6552b))
- update credit class page ([#1968](https://github.com/regen-network/regen-web/issues/1968)) ([012a4b1](https://github.com/regen-network/regen-web/commit/012a4b1749612e2b86619e882c25990af8b72f5a))

# [1.9.0](https://github.com/regen-network/regen-web/compare/v1.8.2...v1.9.0) (2023-07-11)

### Bug Fixes

- rename "credit generation method" to "offset generation method" ([#1959](https://github.com/regen-network/regen-web/issues/1959)) ([b4fe55a](https://github.com/regen-network/regen-web/commit/b4fe55aabcb8550c49c8b467b219f3dcac76f71e))

### Features

- ecosystem activity tags project page ([#1936](https://github.com/regen-network/regen-web/issues/1936)) ([f3ea811](https://github.com/regen-network/regen-web/commit/f3ea811c0241c9c820de8bf321ae6ae5a99aacd5))
- add avg median price on project and credit class pages ([#1939](https://github.com/regen-network/regen-web/issues/1939)) ([88b31d1](https://github.com/regen-network/regen-web/commit/88b31d1eeca46bb79a60d81a8205d5402ef8e999))
- add certifications and ratings ([#1942](https://github.com/regen-network/regen-web/issues/1942)) ([5914dd2](https://github.com/regen-network/regen-web/commit/5914dd21b4be3b1d991b9e08d91f2ff370696306))
- add community projects filter ([#1934](https://github.com/regen-network/regen-web/issues/1934)) ([cb8cf72](https://github.com/regen-network/regen-web/commit/cb8cf724079911587067be354bc6ee630829c2cc))
- add infos credit class card ([#1928](https://github.com/regen-network/regen-web/issues/1928)) ([188158a](https://github.com/regen-network/regen-web/commit/188158a005863102ef4ff89236e5d3ae51de1f0a))
- add support for unknown metadata fields ([#1954](https://github.com/regen-network/regen-web/issues/1954)) ([fd51fcd](https://github.com/regen-network/regen-web/commit/fd51fcda4e97c1b3c7fb916225b2b6f1fa244005))
- credit class page impact entities ([#1945](https://github.com/regen-network/regen-web/issues/1945)) ([efce8ae](https://github.com/regen-network/regen-web/commit/efce8aea67a6ad6de87c9b241ffd3af20bb20b4d))
- disable OTC flow for community credits ([#1932](https://github.com/regen-network/regen-web/issues/1932)) ([24640c5](https://github.com/regen-network/regen-web/commit/24640c570807863c3a352e2ac45abe241c2d5440))
- Fallback to data module resolvers from regen-ledger for fetching metadata ([#1931](https://github.com/regen-network/regen-web/issues/1931)) ([4c6164d](https://github.com/regen-network/regen-web/commit/4c6164d59d832aa0c7ef5a1e55986d98fd42527f))
- filter community projects ([#1933](https://github.com/regen-network/regen-web/issues/1933)) ([e9443bb](https://github.com/regen-network/regen-web/commit/e9443bb754736388901129fb6801bab7f0069a82))
- move additional info section to table ([#1937](https://github.com/regen-network/regen-web/issues/1937)) ([d7647f0](https://github.com/regen-network/regen-web/commit/d7647f0506675d27b808f625bff6dedd87430005))
- move impact cards to top right and entities down to the project details section on project pages ([#1940](https://github.com/regen-network/regen-web/issues/1940)) ([616f02e](https://github.com/regen-network/regen-web/commit/616f02ebf839cf590c22c6811bcb5f51c638bc5e))
- OTC module on project page ([#1938](https://github.com/regen-network/regen-web/issues/1938)) ([971e353](https://github.com/regen-network/regen-web/commit/971e353bf6663c9d4a3d65980f60716a2c0cf045))
- update project roles form to use profiles ([#1918](https://github.com/regen-network/regen-web/issues/1918)) ([f919e8b](https://github.com/regen-network/regen-web/commit/f919e8b88ac6bdca77f0c4ab47c30659f9be7890)), closes [#1920](https://github.com/regen-network/regen-web/issues/1920)
- use credit class metadata in addition to sanity credit class data ([#1935](https://github.com/regen-network/regen-web/issues/1935)) ([23970bd](https://github.com/regen-network/regen-web/commit/23970bd551d361ee1397fb69badb3774efe2921b))
- wire certificate table and page ([#1953](https://github.com/regen-network/regen-web/issues/1953)) ([afdc939](https://github.com/regen-network/regen-web/commit/afdc939f0288a53f39f8ebe8fe5e2cf659de170d))

## [1.8.2](https://github.com/regen-network/regen-web/compare/v1.8.1...v1.8.2) (2023-07-06)

### Bug Fixes

- encode project media uris ([5081e62](https://github.com/regen-network/regen-web/commit/5081e62a9126b05c36c3772b78b3ffe63c0c972c))
- only show project story media if url ([96c2e37](https://github.com/regen-network/regen-web/commit/96c2e374857dcb46f8412a2c21a019a6ea9fcad7))

## [1.8.1](https://github.com/regen-network/regen-web/compare/v1.8.0...v1.8.1) (2023-06-29)

### Bug Fixes

- add missing document link ([4916ca1](https://github.com/regen-network/regen-web/commit/4916ca1858b197828f5ba46910dacff263887b01))
- use optinal chaining for url ([3f8e28a](https://github.com/regen-network/regen-web/commit/3f8e28aee3882b56be1da7ddceaeae5fa4f765b7))

# [1.8.0](https://github.com/regen-network/regen-web/compare/v1.7.0...v1.8.0) (2023-06-13)

### Bug Fixes

- default org icons not showing ([099efc0](https://github.com/regen-network/regen-web/commit/099efc0fee629213f83d8233ef7a39cfb50a9d90))
- handle case where party info comes from DB ([b010909](https://github.com/regen-network/regen-web/commit/b010909978ffa0513e43b4377895d8fe201e8f36))
- link to portfolio for project admin ([9868635](https://github.com/regen-network/regen-web/commit/9868635b6dfba64ecabf68c435d3865f2e87a935))
- menu dropdown that do not close properly ([#1912](https://github.com/regen-network/regen-web/issues/1912)) ([26492f2](https://github.com/regen-network/regen-web/commit/26492f29625cac4ec3e5e3069d5c0177d693e973))
- show newly created projected directly ([#1909](https://github.com/regen-network/regen-web/issues/1909)) ([b8c9113](https://github.com/regen-network/regen-web/commit/b8c911309e895049aea4e453e3321f4bcf8f0eef))

### Features

- add address to account ([#1896](https://github.com/regen-network/regen-web/issues/1896)) ([8da6e3b](https://github.com/regen-network/regen-web/commit/8da6e3b5755f92be5941ed49b6d6a5897c8cbbd9))
- add certificate table and page ([#1919](https://github.com/regen-network/regen-web/issues/1919)) ([02cf959](https://github.com/regen-network/regen-web/commit/02cf959cec1bb50501617e48795f985aa14303b6))
- add profile switch warning modal ([#1916](https://github.com/regen-network/regen-web/issues/1916)) ([79bcae6](https://github.com/regen-network/regen-web/commit/79bcae6361e89cf556604c50df7011ce7a37e818))
- add verifier to project page ([#1915](https://github.com/regen-network/regen-web/issues/1915)) ([a015e27](https://github.com/regen-network/regen-web/commit/a015e27916fb939a1b222539cc4a28d1a24dcd6b))
- hide create credit class button ([#1927](https://github.com/regen-network/regen-web/issues/1927)) ([69d9fe8](https://github.com/regen-network/regen-web/commit/69d9fe888b5349be604470b83a3b5edf9416e5ea))
- project details section ([#1901](https://github.com/regen-network/regen-web/issues/1901)) ([05d3aed](https://github.com/regen-network/regen-web/commit/05d3aedb7a998d175072818a9491865051d58334))
- quote buyers page ([#1923](https://github.com/regen-network/regen-web/issues/1923)) ([6228e78](https://github.com/regen-network/regen-web/commit/6228e7836e7d020b24e8f188e2f3125f96796f7f))
- show proper default image from metadata depending on profile type ([60b3243](https://github.com/regen-network/regen-web/commit/60b3243006d2310ee0c3f4c26741145f122ab791))
- update project review ([#1905](https://github.com/regen-network/regen-web/issues/1905)) ([40ebacb](https://github.com/regen-network/regen-web/commit/40ebacb0adb94cbf10975038a08cc14bed82b6fc))
- use dark topographic section ([#1917](https://github.com/regen-network/regen-web/issues/1917)) ([defc080](https://github.com/regen-network/regen-web/commit/defc0803f6ecef9471d768dcf44976807ba520e0))

# [1.7.0](https://github.com/regen-network/regen-web/compare/v1.6.0...v1.7.0) (2023-06-06)

### Bug Fixes

- use base denom as fallback ([6b1fcfb](https://github.com/regen-network/regen-web/commit/6b1fcfb7b87c1b84c4a3a32e832b3cbcbf34e3a7))

### Features

- handle EVMOS denom ([cd03f1e](https://github.com/regen-network/regen-web/commit/cd03f1ef7bd231c1c2cf0883869d4ffca7dcc5f6))
- update base denom ([2396be7](https://github.com/regen-network/regen-web/commit/2396be759eb77d16a59d6790ff0a02aad5c2f87d))

# [1.6.0](https://github.com/regen-network/regen-web/compare/v1.5.2...v1.6.0) (2023-05-17)

### Bug Fixes

- default org icons not showing ([8fd1c98](https://github.com/regen-network/regen-web/commit/8fd1c98079ca2b0704a0d33ca2a57957e3e330ca))
- handle case where party info comes from DB ([c4e264d](https://github.com/regen-network/regen-web/commit/c4e264d764543fc1bddabb174f13f95f432dd140))
- link to portfolio for project admin ([4f45b19](https://github.com/regen-network/regen-web/commit/4f45b197ff48e6ec80eda434649add77a2e3df76))

### Features

- show proper default image from metadata depending on profile type ([a642054](https://github.com/regen-network/regen-web/commit/a642054c206de78efa09cc0485fe4fe4700539fc))

## [1.5.2](https://github.com/regen-network/regen-web/compare/v1.5.1...v1.5.2) (2023-05-17)

### Bug Fixes

- project card on credit class page ([3c20301](https://github.com/regen-network/regen-web/commit/3c20301535093f94d5e5d0d05a02a5abf24a9f3e))

## [1.5.1](https://github.com/regen-network/regen-web/compare/v1.5.0...v1.5.1) (2023-05-10)

### Bug Fixes

- missing images on EcologicalCreditCard ([94e58ab](https://github.com/regen-network/regen-web/commit/94e58ab5502898846bd96e4d8e5936aab3baf1e6))

# [1.5.0](https://github.com/regen-network/regen-web/compare/v1.4.6...v1.5.0) (2023-05-09)

### Bug Fixes

- display project tabs if there are documents or batches ([#1893](https://github.com/regen-network/regen-web/issues/1893)) ([7d091c2](https://github.com/regen-network/regen-web/commit/7d091c21944a6bbb37b1a3ef61cc4cfa112fb91c))

### Features

- add gallery project pages ([#1840](https://github.com/regen-network/regen-web/issues/1840)) ([5766cb7](https://github.com/regen-network/regen-web/commit/5766cb7e2b1d91eb8193e5373adc611eda5f8b5e))
- add SDGs to impact cards ([#1846](https://github.com/regen-network/regen-web/issues/1846)) ([36cab24](https://github.com/regen-network/regen-web/commit/36cab2426c2b2653a090a1758ab684c6a70ae8fe))
- add story section to project pages ([#1869](https://github.com/regen-network/regen-web/issues/1869)) ([1f59b4a](https://github.com/regen-network/regen-web/commit/1f59b4ad8898ff9feeaa68eddf0c840290a7ef1d))
- documentation table project page ([#1875](https://github.com/regen-network/regen-web/issues/1875)) ([f30ac9d](https://github.com/regen-network/regen-web/commit/f30ac9d83d6e0b70a91fb050b46f697533a42647))
- hide old gallery photos ([#1870](https://github.com/regen-network/regen-web/issues/1870)) ([084516d](https://github.com/regen-network/regen-web/commit/084516d556ffbc46af6831c5a141385d189ec8a5))
- link project page admin to profile ([#1886](https://github.com/regen-network/regen-web/issues/1886)) ([7c5bb92](https://github.com/regen-network/regen-web/commit/7c5bb92e1e4b6c620a974f3eafece77c55d81584))
- tracking for buyScheduleCall and buyKeplr events ([#1868](https://github.com/regen-network/regen-web/issues/1868)) ([14f569b](https://github.com/regen-network/regen-web/commit/14f569bcfb1f1411c36119f97c93a9fac84ba43f))
- Update description form to include story fields ([#1880](https://github.com/regen-network/regen-web/issues/1880)) ([81ec839](https://github.com/regen-network/regen-web/commit/81ec83991bc59fd84e2860208c3ae73c64a5324a))
- update media form for gallery photos ([#1884](https://github.com/regen-network/regen-web/issues/1884)) ([4f99beb](https://github.com/regen-network/regen-web/commit/4f99beb6c1776e98518cb85f6ad861c0fda66f1e)), closes [#1888](https://github.com/regen-network/regen-web/issues/1888)

### Performance Improvements

- NextJS POC ([#1867](https://github.com/regen-network/regen-web/issues/1867)) ([9a46fad](https://github.com/regen-network/regen-web/commit/9a46fadaf56d5afaceca3f7b89f41c955f4a3475))

## [1.4.6](https://github.com/regen-network/regen-web/compare/v1.4.5...v1.4.6) (2023-04-26)

### Bug Fixes

- set keplr mobile web on connectWallet for autoconnect ([149c347](https://github.com/regen-network/regen-web/commit/149c347cebb13620f58d0b007a4b525dcf49b812))

## [1.4.5](https://github.com/regen-network/regen-web/compare/v1.4.4...v1.4.5) (2023-04-26)

### Bug Fixes

- login on keplr mobile ([5d73d4d](https://github.com/regen-network/regen-web/commit/5d73d4d3634e92d06442bb07587625d04a278a00))

## [1.4.4](https://github.com/regen-network/regen-web/compare/v1.4.3...v1.4.4) (2023-04-20)

### Bug Fixes

- close buy modal on tx rejection ([e4bd62f](https://github.com/regen-network/regen-web/commit/e4bd62f1f8cee141392ad1e38685d31abe80ee61))
- close buy modal on tx rejection for BuySellOrderFlow ([81f3def](https://github.com/regen-network/regen-web/commit/81f3def8ea6c45e1cdbb8c3996423fae659e6976))
- csrf party requests ([f329d92](https://github.com/regen-network/regen-web/commit/f329d9211c77625aabffae481faa15bcddbad688))
- immer issue on tx rejection ([e711595](https://github.com/regen-network/regen-web/commit/e711595ddc40cc519c30709a5b9e98bb04f28c8d))

## [1.4.3](https://github.com/regen-network/regen-web/compare/v1.4.2...v1.4.3) (2023-04-14)

**Note:** Version bump only for package web-marketplace

## [1.4.2](https://github.com/regen-network/regen-web/compare/v1.4.1...v1.4.2) (2023-04-11)

### Bug Fixes

- edit user profile on first connection ([d4b830b](https://github.com/regen-network/regen-web/commit/d4b830bbcc827fe6a61eb7ba9888421a1697b592))

## [1.4.1](https://github.com/regen-network/regen-web/compare/v1.4.0...v1.4.1) (2023-04-06)

### Bug Fixes

- remove profile header and account from public profile ([d01925f](https://github.com/regen-network/regen-web/commit/d01925f1d2ddd1998bdd17ed1e301e08670b53f1))

# [1.4.0](https://github.com/regen-network/regen-web/compare/v1.3.0...v1.4.0) (2023-04-06)

### Bug Fixes

- apollo init race condition ([68517bd](https://github.com/regen-network/regen-web/commit/68517bd7c29827c62468ba98eebcc377a5a3b509))
- remove account id check in profile edit ([51a0345](https://github.com/regen-network/regen-web/commit/51a03457dd709e21de469769352f237ee52360d0))
- use address from route param ([dd017ec](https://github.com/regen-network/regen-web/commit/dd017ec36890a786445ec0a4b2bb1c6d7297ecaa))

### Features

- add profile header to public profile ([ddfac4d](https://github.com/regen-network/regen-web/commit/ddfac4d9a929c7c1c81125daa670303a216561f8))

# [1.3.0](https://github.com/regen-network/regen-web/compare/v1.2.3...v1.3.0) (2023-04-05)

### Bug Fixes

- basket fractional balance ([#1852](https://github.com/regen-network/regen-web/issues/1852)) ([6b1a982](https://github.com/regen-network/regen-web/commit/6b1a9829d3d0736a300838eab9c3475e658eb531))
- display toucan vintage token id even when no toucanURI ([#1854](https://github.com/regen-network/regen-web/issues/1854)) ([2cada01](https://github.com/regen-network/regen-web/commit/2cada01d0185733be5e955187c79f7f7fd906799))
- enable balances query only if wallet addr available ([#1818](https://github.com/regen-network/regen-web/issues/1818)) ([956392b](https://github.com/regen-network/regen-web/commit/956392bf3eadbd8c8c8afbedbe4b93f294c07a1b))
- filter credits with 0 on all columns ([#1853](https://github.com/regen-network/regen-web/issues/1853)) ([e13f7d1](https://github.com/regen-network/regen-web/commit/e13f7d1a44a024af52d7c58f7d24d728fb508c4e))
- Handle missing fields on TCO2 credit class page ([#1817](https://github.com/regen-network/regen-web/issues/1817)) ([b80659d](https://github.com/regen-network/regen-web/commit/b80659d44b5cbdf9341866d1d1e72f0cb8690358))
- start process button onClick ([#1813](https://github.com/regen-network/regen-web/issues/1813)) ([bae5496](https://github.com/regen-network/regen-web/commit/bae549603c938e31fb37ff8ee370795514a7c297))
- use 2 maximumFractionDigits on credit batch page ([#1816](https://github.com/regen-network/regen-web/issues/1816)) ([62a77c9](https://github.com/regen-network/regen-web/commit/62a77c976b2b058ba124f931b0f1b843cf13a74f))
- use quantityFormatNumberOptions in BatchTotalsGrid ([#1843](https://github.com/regen-network/regen-web/issues/1843)) ([867cafd](https://github.com/regen-network/regen-web/commit/867cafd43840f545edbb937dae90c36c11a286c8))
- various UI issues on project page ([#1825](https://github.com/regen-network/regen-web/issues/1825)) ([87b57ef](https://github.com/regen-network/regen-web/commit/87b57ef4ac74efc0588ba55bb5eb55868e9ce655))

### Features

- add OTC sales option ([#1801](https://github.com/regen-network/regen-web/issues/1801)) ([504a253](https://github.com/regen-network/regen-web/commit/504a2537fef6da7d619c9d2c4e1b7bebd7a0a776))
- add user profile header ([#1821](https://github.com/regen-network/regen-web/issues/1821)) ([a7cbc3a](https://github.com/regen-network/regen-web/commit/a7cbc3a04108b4cc4be6f0f1ef7a69ea1ffcf863))
- edit project button ([#1805](https://github.com/regen-network/regen-web/issues/1805)) ([734b715](https://github.com/regen-network/regen-web/commit/734b715a8b1034c8ab72f00ade5fac4d199782ec))
- implement double-csrf pattern and enable withCredentials for the registry-server graphql client ([#1798](https://github.com/regen-network/regen-web/issues/1798)) ([0b945a3](https://github.com/regen-network/regen-web/commit/0b945a30bb27245beace802be96cfeec79ba94dc))
- Implement Keplr login flow ([#1814](https://github.com/regen-network/regen-web/issues/1814)) ([3c89133](https://github.com/regen-network/regen-web/commit/3c89133fef4a1e44c2d5e104ea04413fd021d405))
- Implement Keplr logout ([#1819](https://github.com/regen-network/regen-web/issues/1819)) ([6047ce5](https://github.com/regen-network/regen-web/commit/6047ce5ddf6f0939b2b559f426e9fb182a92bc67))
- profile social links ([#1839](https://github.com/regen-network/regen-web/issues/1839)) ([7654ec0](https://github.com/regen-network/regen-web/commit/7654ec0f11f195b0fe03427319cc87432d7b321b))
- protect project edit page ([#1806](https://github.com/regen-network/regen-web/issues/1806)) ([15ac3df](https://github.com/regen-network/regen-web/commit/15ac3df5215078c1b073877eba812a4d6d9887b3))
- update /land-stewards to /project-developers and add redirect ([#1797](https://github.com/regen-network/regen-web/issues/1797)) ([9bf9ccd](https://github.com/regen-network/regen-web/commit/9bf9ccd7f4884e5ceb41bd2c478818bbbc11dbf0))
- Update project creation to use currently logged in user ([#1823](https://github.com/regen-network/regen-web/issues/1823)) ([bd63f24](https://github.com/regen-network/regen-web/commit/bd63f244c658a70d6ebf7c9e4cfbd04c30ff5c93))
- use credit credit for default project image ([#1835](https://github.com/regen-network/regen-web/issues/1835)) ([10daafd](https://github.com/regen-network/regen-web/commit/10daafd33d329fe7267e65929d5204030ae37176))
- user profile edit ([#1826](https://github.com/regen-network/regen-web/issues/1826)) ([2e53631](https://github.com/regen-network/regen-web/commit/2e53631b6637a769d35c0f2ca19fbf728a24c65b))
- wallet connection page ([#1815](https://github.com/regen-network/regen-web/issues/1815)) ([c7668da](https://github.com/regen-network/regen-web/commit/c7668da1642723c131071886819a2b0387991591))
- warning modal when user tries to navigate away after changing data on Project edit forms ([#1809](https://github.com/regen-network/regen-web/issues/1809)) ([024c74c](https://github.com/regen-network/regen-web/commit/024c74c96d44ca79f7feac32ce01f05f7a7cabd1))

## [1.2.3](https://github.com/regen-network/regen-web/compare/v1.2.2...v1.2.3) (2023-03-28)

### Bug Fixes

- handle coingecko api failure ([60f19a3](https://github.com/regen-network/regen-web/commit/60f19a353bb0cfc48e0e655a1189d69cea9313c3))

## [1.2.2](https://github.com/regen-network/regen-web/compare/v1.2.1...v1.2.2) (2023-03-24)

### Bug Fixes

- missing # ([2fa962d](https://github.com/regen-network/regen-web/commit/2fa962d3d570b402b15c1577fb8c965a0d42cfda))
- use new regen IRI for compacting credit class metadata ([a2950bd](https://github.com/regen-network/regen-web/commit/a2950bd6b57501137f8304008f0728b8a18012e9))

## [1.2.1](https://github.com/regen-network/regen-web/compare/v1.2.0...v1.2.1) (2023-02-28)

### Bug Fixes

- price usd computation ([812aef3](https://github.com/regen-network/regen-web/commit/812aef3923e429df5c73e668c37e8622f72027be))

# [1.2.0](https://github.com/regen-network/regen-web/compare/v1.1.0...v1.2.0) (2023-02-27)

### Bug Fixes

- CI build failing on node v18 ([#1796](https://github.com/regen-network/regen-web/issues/1796)) ([b4488c1](https://github.com/regen-network/regen-web/commit/b4488c131b1f0c6fafc99b0bc97f56817d792934))
- public account page data fetching ([#1760](https://github.com/regen-network/regen-web/issues/1760)) ([314f866](https://github.com/regen-network/regen-web/commit/314f8666bbd6fa9534958ae5105fbc79b57aa336))
- text alignment on ProjectImpactCard ([#1795](https://github.com/regen-network/regen-web/issues/1795)) ([39df91f](https://github.com/regen-network/regen-web/commit/39df91f7026dbbefbd852b08f4bc07e8a78d32e0))
- use explorer on public account page ([#1761](https://github.com/regen-network/regen-web/issues/1761)) ([2c6d0ba](https://github.com/regen-network/regen-web/commit/2c6d0ba3b03f8f89ac93a88ba6b60f3332b4a576))

### Features

- add react query to basket page and upgrade table ([#1751](https://github.com/regen-network/regen-web/issues/1751)) ([27c00de](https://github.com/regen-network/regen-web/commit/27c00de67fc89ea989d6d0b7ac137b5774efd9d3))
- add resources card to BasketDetails page ([#1729](https://github.com/regen-network/regen-web/issues/1729)) ([df4fb47](https://github.com/regen-network/regen-web/commit/df4fb47ddf7c09618623a1cb5b5f45d2dc013db8))
- add social buttons on confirmations modals ([#1772](https://github.com/regen-network/regen-web/issues/1772)) ([d5ac721](https://github.com/regen-network/regen-web/commit/d5ac7212b5256c3c79b9062a53d0fb55f13fc244))
- add support for tco2 metadata ([#1745](https://github.com/regen-network/regen-web/issues/1745)) ([737f690](https://github.com/regen-network/regen-web/commit/737f69077000e90166992d48549a2ef68e20decd))
- handle sold out projects ([#1773](https://github.com/regen-network/regen-web/issues/1773)) ([1002bfb](https://github.com/regen-network/regen-web/commit/1002bfb8abadb1b64dab9ebf4491c0ea3a3d5e22))
- new buyers page ([#1799](https://github.com/regen-network/regen-web/issues/1799)) ([c959944](https://github.com/regen-network/regen-web/commit/c9599448b57709ec563148e8eb1a75d0580c7c79))
- price column and sorting ([#1738](https://github.com/regen-network/regen-web/issues/1738)) ([8fd8856](https://github.com/regen-network/regen-web/commit/8fd8856c740599eba6d5a7ee20375cee801eb0cb))
- project forms validation ([#1794](https://github.com/regen-network/regen-web/issues/1794)) ([7335597](https://github.com/regen-network/regen-web/commit/7335597b0c03046c7c7d2184b92f85b7eba93f20))
- project non-queryable metadata ([#1701](https://github.com/regen-network/regen-web/issues/1701)) ([edb3ddf](https://github.com/regen-network/regen-web/commit/edb3ddf3c9583d028283deca16717763fb0b2038))
- sort SDGs and Impacts based on initial ordering ([#1785](https://github.com/regen-network/regen-web/issues/1785)) ([22aa75a](https://github.com/regen-network/regen-web/commit/22aa75a47116bb2f0bad6bc90310db176a26cec2))
- Update project create/edit flows to use anchored/unanchored metadata and some bug fixes ([#1746](https://github.com/regen-network/regen-web/issues/1746)) ([7469ee8](https://github.com/regen-network/regen-web/commit/7469ee85d01229428af6ca62067c19a8402ee753))

### Performance Improvements

- use react query in bridge tabs ([#1771](https://github.com/regen-network/regen-web/issues/1771)) ([2122a74](https://github.com/regen-network/regen-web/commit/2122a74879627fc4876922c56e1a489d6b16fe26))

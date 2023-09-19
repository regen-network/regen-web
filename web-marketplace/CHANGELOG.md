# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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

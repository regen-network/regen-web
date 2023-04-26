# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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

**Note:** Version bump only for package web-registry

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

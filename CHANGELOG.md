# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [0.11.0](https://github.com/melfallas/financial-tracker/compare/v0.10.0...v0.11.0) (2026-03-07)


### Features

* introduce Cost of Waiting feature to calculate and display inflation's impact on savings. ([dccdb7a](https://github.com/melfallas/financial-tracker/commit/dccdb7ab5a1b8a507f4a27023d437d799e91672d))


### Bug Fixes

* **cost-of-waiting:** add capital erosion display ([c7f0b7d](https://github.com/melfallas/financial-tracker/commit/c7f0b7de608dd3b179a443cd98f866eaea36096f))

## [0.10.0](https://github.com/melfallas/financial-tracker/compare/v0.9.0...v0.10.0) (2026-03-06)


### Features

* Add documentation for PDF report generation and email delivery user stories, and update project version. ([f1a7277](https://github.com/melfallas/financial-tracker/commit/f1a7277e22258cff9b42580796929b5d1e62d90e))
* add user story US2.2 detailing requirements for PDF report generation. ([870d326](https://github.com/melfallas/financial-tracker/commit/870d326cc21c1be09da685d0efa6a9bab82156b3))
* **email:** US2.3 Delegate email sending to Supabase Edge Function ([00c72b4](https://github.com/melfallas/financial-tracker/commit/00c72b4c0f7fc63aa67b6210886350487755decc))
* **email:** US2.3 Embed PDF directly in email download link ([cbf5728](https://github.com/melfallas/financial-tracker/commit/cbf572841435255f0aa2f149d3e53d84a97b6f89))
* **email:** US2.3 Implementing first draft version of email sending edge function ([395b789](https://github.com/melfallas/financial-tracker/commit/395b7894aee0cfe3df8da361cbd882226e079f2e))
* Implement home page with financial plan generation, email dispatch feedback UI, and version bump. ([555080b](https://github.com/melfallas/financial-tracker/commit/555080b52e40e5e4ed3e7184da9394676c3a951d))
* update  initial hero section with title, description, CTA button, and graphic. ([c0069f0](https://github.com/melfallas/financial-tracker/commit/c0069f0a8cb8e3a3958d597a1dda615195679b58))
* update `mergeB` script to merge into `US2.3_PDF_Email_Delivery` branch instead of `develop`. ([aeffc0f](https://github.com/melfallas/financial-tracker/commit/aeffc0ff240cb0714da15afc7dd890c09bfaf137))
* US.2.2 Implement personalized PDF report generation service, including tests and sprint documentation. ([cc3fa27](https://github.com/melfallas/financial-tracker/commit/cc3fa279baa98a9959a61639e4de0bb7507a7c5e))
* US2.1 Add lead form and retirement simulator components, along with new documentation and package updates. ([91185b5](https://github.com/melfallas/financial-tracker/commit/91185b5571b4ca8077c596ab4261c2e9ae633935))
* US2.2 Implement PDF report generation, financial simulation components, and language selection. ([0089b2a](https://github.com/melfallas/financial-tracker/commit/0089b2a219e8c7415a2d691233af57a30d4459a2))
* US2.3 Add lead form and retirement simulator features with supporting project configuration and documentation. ([893784e](https://github.com/melfallas/financial-tracker/commit/893784ece022b8b14437b16aade00a7f9b6be4a1))
* US2.3 Add secrets to GitHub Actions workflow to build and deploy the Angular application to GitHub Pages. ([387e6de](https://github.com/melfallas/financial-tracker/commit/387e6de5ac5b3869f2b5aac21e3540dfdb4500e0))
* US2.3 Implement email dispatch feedback UI on the home page and add documentation for Sprint 3 and user story US2.3. ([729f91d](https://github.com/melfallas/financial-tracker/commit/729f91d375cd76fc3a8f3834b4221d96ef8c86e2))
* US2.3 Implement email sending functionality with an adapter pattern using Resend, define environment variable types, and add a new home page. ([b552a5e](https://github.com/melfallas/financial-tracker/commit/b552a5edd8486eea5b6e99108bb11c6e5a87c080))
* US2.3 Implement home page fallback UI error modal for email dispatch failures. ([270e051](https://github.com/melfallas/financial-tracker/commit/270e051aa1fcfb88113eb3f63fc288dc7113a93b))


### Bug Fixes

* 2.3 introduce HomePage component to generate financial plan reports and handle email dispatch mockup. ([1a5ad4a](https://github.com/melfallas/financial-tracker/commit/1a5ad4aadcc1fcce4c4512f4814cc0f214e5df96))
* **ci-workflow:** configure email sending function secrets ([3729b08](https://github.com/melfallas/financial-tracker/commit/3729b08b9c2f20b3f45f336ce6864a60e5ded6be))
* **github-pages:** link deployment job to github-pages environment ([325875e](https://github.com/melfallas/financial-tracker/commit/325875e650bdf0d3d9d2eeacb9c6de6f665777ac))
* **pdf-report:** adjust QR code module import handling ([2dab6dd](https://github.com/melfallas/financial-tracker/commit/2dab6ddfb028fb7edde9518be60048b105572d8c))
* **ui:** use centered modal for email sending status ([e155f89](https://github.com/melfallas/financial-tracker/commit/e155f89d292cab101bd19b70f0dae7faaf70f788))

## [0.9.0](https://github.com/melfallas/financial-tracker/compare/v0.8.0...v0.9.0) (2026-02-26)


### Features

* Establish project-wide language standards and integrate them into agent rules and compliance checks. ([402a2fc](https://github.com/melfallas/financial-tracker/commit/402a2fc1440779f0d499bd202d04f5c85a219f86))
* Implement WealthGapChart UI and add unit tests for Hero and WealthGapChart components with Vitest setup. ([06d3956](https://github.com/melfallas/financial-tracker/commit/06d3956a67cd505b9dbd425ad8659ad3158e4912))
* migrate component selectors to define `ft-` selector prefix rule. ([d1e62d9](https://github.com/melfallas/financial-tracker/commit/d1e62d94342c314686b49a22858ab641c39e6479))
* US3.1 Implement the wealth gap chart feature with reactive calculations and integrate it into the home page. ([88c8018](https://github.com/melfallas/financial-tracker/commit/88c8018f80d1b4b1eead911bb8d4f390cde2b9bc))
* US3.1 Implement wealth-gap-chart feature, with visual refresh and dynamic styling, including component, styles, tests, and Angular testing environment configuration. ([a123941](https://github.com/melfallas/financial-tracker/commit/a123941092e502348cfd3f51c366a52d9d5c5640))
* US3.2 Implement retirement simulator with interactive steps and integrate it into the home page. ([a4f846a](https://github.com/melfallas/financial-tracker/commit/a4f846aa05f893f95c3b5e70eb4906690723d89b))
* US3.2 Introduce retirement simulator with doc files chantes to close Sprint 2. ([750816d](https://github.com/melfallas/financial-tracker/commit/750816d04777f5e1e82b0f98caa9aad06837db67))
* US4.1 Add initial Navbar and Hero components, integrate into home page, and include tests and Storybook stories. ([3470d03](https://github.com/melfallas/financial-tracker/commit/3470d03db82831ff98d87685bf7925ec73d8a07a))
* US4.2 Implement Cost of Waiting banner with interactive inputs and accessibility improvements. ([fab919a](https://github.com/melfallas/financial-tracker/commit/fab919a97168740df1c5c46013397096b97dacc3))


### Bug Fixes

* US3.1 Standardize unit tests on Angular CLI / Karma, adding unit tests for infrastructure, utilities, and features, and formalize the testing framework strategy to use Karma/Jasmine with Testing Library. ([39bbd7d](https://github.com/melfallas/financial-tracker/commit/39bbd7de9ba787583ca1ee2cdb803d7eb84a6a4e))
* US4.1 Fixing set up of Tailwind CSS with PostCSS, migrate project styling to CSS, and configure Vitest. ([9cb9a27](https://github.com/melfallas/financial-tracker/commit/9cb9a27bc8c0524f8424193ff8a83dfba1bb8e41))

## [0.8.0](https://github.com/melfallas/financial-tracker/compare/v0.7.0...v0.8.0) (2026-02-23)


### Features

* add financial math utilities for wealth gap and retirement projections with corresponding types and tests. ([91a9c16](https://github.com/melfallas/financial-tracker/commit/91a9c165713be9fb0f4336b789ac92a601a3665a))
* add Vitest configuration and update package version ([c208f72](https://github.com/melfallas/financial-tracker/commit/c208f7207a0aec700c91101ce83ebc6a5f189d55))
* Implement Vitest testing, introduce a shared button component, configure Storybook, and define financial projection interfaces. ([a4c076c](https://github.com/melfallas/financial-tracker/commit/a4c076c27b21f6a8929d4e25af33c26d2a7b0a08))
* Introduce GitHub Actions CI workflow and bump package version. ([3d38d14](https://github.com/melfallas/financial-tracker/commit/3d38d14382d4ac69e28d160beaf99273eac8e175))
* US1.1 Integrate Storybook for UI component development, documentation, and asset management, alongside new UI dependencies. ([406823f](https://github.com/melfallas/financial-tracker/commit/406823f09b2b53d9810055f0d819ea54a42e22f0))
* US1.5 Add core data types, repository interfaces, and local storage implementations for leads and interaction logs, including financial projection models. ([856ee8a](https://github.com/melfallas/financial-tracker/commit/856ee8ae9597f3f9d5fdba4b18fb553339fcdf58))

## [0.7.0](https://github.com/melfallas/financial-tracker/compare/v0.6.0...v0.7.0) (2026-02-23)


### Features

* Add a comprehensive project knowledge index and the initial high-fidelity design specification for the hero and navbar. ([f0cbda2](https://github.com/melfallas/financial-tracker/commit/f0cbda27b936a09ff2a3a69bb26d4fed68137f20))
* Add BMad AI agent framework including agents, tasks, templates, and workflows for various AI models. ([5b570c9](https://github.com/melfallas/financial-tracker/commit/5b570c957f5cd4457b0f1655f28d31ab6932b72f))
* Add comprehensive product design specification, wireframes and mockups for Atoms and Molecules UI components. ([9e64a5c](https://github.com/melfallas/financial-tracker/commit/9e64a5cab1fe91e046ca51753d0f5be6b474f2da))
* Add comprehensive product design specification, wireframes and mockups for rest of Atoms and Molecules UI components. ([cd08c65](https://github.com/melfallas/financial-tracker/commit/cd08c6556840ed304cd7e12a220921b1a3049c87))
* Add initial documentation for architecture, product requirements, backlog, and PO checklist. ([3702ad2](https://github.com/melfallas/financial-tracker/commit/3702ad293d8a39d7544b5e545e7b696575c112a7))
* Add initial epics and user stories documentation for the project. ([fd05dbe](https://github.com/melfallas/financial-tracker/commit/fd05dbee0331274b3675a8ad6fc6f3be38482dc2))
* Add initial home page HTML with a welcome message. ([adbfea0](https://github.com/melfallas/financial-tracker/commit/adbfea0d0586e7eaf0f0f43d00697700afb61a03))
* add initial project backlog document outlining epics and user stories. ([399e2d5](https://github.com/melfallas/financial-tracker/commit/399e2d5ac5ffa5a37c27e0363849e713ed1272b4))
* Add initial project documentation, design specifications, and prototype assets for BMAD context. ([9ab2e3f](https://github.com/melfallas/financial-tracker/commit/9ab2e3f8a866875565ec2b455b11afabde64f23e))
* add project knowledge index and high-fidelity design specifications for market intelligence widgets and the retirement simulator. ([16e4eee](https://github.com/melfallas/financial-tracker/commit/16e4eeebea7c74f05e47fb569bebec5ec7e804b0))
* Add project knowledge index and high-fidelity design specifications for the Booking Screen and Cost of Waiting Banner. ([9a25c57](https://github.com/melfallas/financial-tracker/commit/9a25c57fdbd34f79db46eadfc3baa60e2dde2751))
* cleaning the components and routing. ([3b8903b](https://github.com/melfallas/financial-tracker/commit/3b8903b496340c7cc1030e45a391ca8da90c59fd))
* **docs:** add detailed frontend UX/UI specification document. ([6153fcb](https://github.com/melfallas/financial-tracker/commit/6153fcbe1c28689625881f6b49bf021f70b304af))
* **docs:** enriching user story US2.2 and technical specification for the Compound Interest Simulator. ([b05e574](https://github.com/melfallas/financial-tracker/commit/b05e5741742591dbbeff81cceb18cfd3f4d17933))
* Establish initial project documentation, including backlog, architecture, PRD, and various agent-generated artifacts. ([8555187](https://github.com/melfallas/financial-tracker/commit/85551875b28a869d4161dc628e986d9f9475d372))
* Introduce a comprehensive project knowledge index and new high-fidelity product design specifications for the footer and PDF report. ([372248f](https://github.com/melfallas/financial-tracker/commit/372248f1bbc7163b24ae357e9231ad986addfe78))
* Introduce initial BMAD-core configuration and a comprehensive project knowledge index. ([53bc9d9](https://github.com/melfallas/financial-tracker/commit/53bc9d910c43d895ca6a1216e1b8eaf7224e57bc))
* Introduce project knowledge index and detailed design specification for the Wishlist Board. ([f9a611e](https://github.com/melfallas/financial-tracker/commit/f9a611e7dd550cdf923c2ec4f51cc327cc2d070a))
* Introduce project knowledge index, detailed i18n and currency localization specification, and technical architecture documentation. ([5e0aca5](https://github.com/melfallas/financial-tracker/commit/5e0aca5c70ec210ff8eea8bd237d17a3fdb79b73))
* introduce the Atoms & Molecules design specification document for the financial tracker design system. ([8aef50c](https://github.com/melfallas/financial-tracker/commit/8aef50c23308b5b0c92d3575b50ec889a46db4c0))
* modifying project documentation including project backlog, PRD, PO checklist, and architecture. ([868087a](https://github.com/melfallas/financial-tracker/commit/868087aac807bffd5c8e5c8e7ef79d67bafc1e0f))
* rewrite core documentation (PRD, Architecture, Backlog) and integrate new tech stack components and design system standards. ([44765c5](https://github.com/melfallas/financial-tracker/commit/44765c56182a5497c6204132689cf25e9f0d7ffb))
* Updating detailed frontend specification and compliance report documenting PRD rewrite, tech stack updates, and design standards. ([6c85db6](https://github.com/melfallas/financial-tracker/commit/6c85db68264561dabf27d5578072c2a874bb6e85))
* updating detailed UX/UI frontend specification document outlining design, interaction, and component mapping for the financial tracker. ([3f0c7cd](https://github.com/melfallas/financial-tracker/commit/3f0c7cd50c86bcbf6a970f08fe9da25225a6fa7c))
* Updating detailed UX/UI frontend specification document with localization for Emails and PDFs. ([a4d09fc](https://github.com/melfallas/financial-tracker/commit/a4d09fc807b5822a51e1fd38e525b311a2b78bdb))
* updating technical architecture documentation for the project. ([45f1dff](https://github.com/melfallas/financial-tracker/commit/45f1dffff218c5ffaedafd9d77b61223080e1b55))

## [0.6.0](https://github.com/melfallas/financial-tracker/compare/v0.5.0...v0.6.0) (2026-02-22)


### Features

* **contact-page:** add dedicated contact page ([3db0c57](https://github.com/melfallas/financial-tracker/commit/3db0c57a46a4a42815427e61a4d174b82fd2c691))
* **setup:** initialize new Angular project structure ([bd157ae](https://github.com/melfallas/financial-tracker/commit/bd157aec242e4b803430bd6608991e60b874b7dc))
* **testimonials:** implement testimonials page and update navigation ([40523b8](https://github.com/melfallas/financial-tracker/commit/40523b8971e9bed29c2eddda114fadb9d4aa31c3))
* **versioning:** display application version on home page ([28cfe30](https://github.com/melfallas/financial-tracker/commit/28cfe30fa4e33b017a86fd2e2cf5f7ec536de478))

## [0.5.0](https://github.com/melfallas/financial-tracker/compare/v0.4.0...v0.5.0) (2026-02-21)


### Features

* **about:** add About Us page with premium design ([8dda76c](https://github.com/melfallas/financial-tracker/commit/8dda76cc4a434b7cc08cf8afffa05a6d106b7be4))
* **financial-tools:** add compound interest calculator ([ee4cb4b](https://github.com/melfallas/financial-tracker/commit/ee4cb4b03fc964d1d32aec1dc1cd2059198122df))
* **navigation:** enhance dynamic internal/external links ([16de1a4](https://github.com/melfallas/financial-tracker/commit/16de1a49406378204ad066bbb1a5968176d436eb))

## [0.4.0](https://github.com/melfallas/financial-tracker/compare/v0.3.0...v0.4.0) (2026-02-19)


### Features

* **docs:** introduce internal documentation page ([b5b589f](https://github.com/melfallas/financial-tracker/commit/b5b589fae328c82429f147fe279960ca92b67238))
* **project:** initialize new Angular application structure ([7028aef](https://github.com/melfallas/financial-tracker/commit/7028aefe44455c020262afe1685497fcb309e5ad))
* **routing:** add hash location strategy ([2887b9c](https://github.com/melfallas/financial-tracker/commit/2887b9ca6e2f39df8f55f4003fccc24312b21eae))


### Bug Fixes

* **ci:** correct Angular build command in workflow ([579ac40](https://github.com/melfallas/financial-tracker/commit/579ac40e141d1077ebf608c983ea06b17032c436))

## 0.3.0 (2026-02-18)


### Features

* **agent:** add initial operational rules and guidelines ([4e2d1c8](https://github.com/melfallas/financial-tracker/commit/4e2d1c87c98376c8fcb23d0b8934125682ad1d77))
* **cdp:** introduce investment term calculator ([c846fb5](https://github.com/melfallas/financial-tracker/commit/c846fb5d7d58dd2d9b57c936fae5a1481600d08b))
* refine commit rules and update project metadata ([754b674](https://github.com/melfallas/financial-tracker/commit/754b67431d5d7130ee2e5e6e10c497e528049cce))

## 0.2.0 (2026-02-18)


### Features

* **agent:** add initial operational rules and guidelines ([4e2d1c8](https://github.com/melfallas/financial-tracker/commit/4e2d1c87c98376c8fcb23d0b8934125682ad1d77))
* **cdp:** introduce investment term calculator ([c846fb5](https://github.com/melfallas/financial-tracker/commit/c846fb5d7d58dd2d9b57c936fae5a1481600d08b))

## 0.1.0 (2026-02-12)


### Features

* **agent:** add initial operational rules and guidelines ([4e2d1c8](https://github.com/melfallas/financial-tracker/commit/4e2d1c87c98376c8fcb23d0b8934125682ad1d77))

## 0.0.5 (2026-02-01)


### Features

* **agent:** add initial operational rules and guidelines ([4e2d1c8](https://github.com/melfallas/financial-tracker/commit/4e2d1c87c98376c8fcb23d0b8934125682ad1d77))

## Get Started

- `yarn` - install dependencies
- `npx prisma generate` - generate prisma client
- `npx prisma migrate dev` - apply all migrations to local database


## Technical documentation
- Prisma & Supabase
  - several outstanding issues: https://github.com/supabase/supabase/discussions/7659
  - main issue: supabase RLS (row level security) -
    - maybe with [prisma middleware](https://www.prisma.io/docs/concepts/components/prisma-client/middleware)
    - maybe with [multi schema support](https://github.com/prisma/prisma/issues/1122)
    - maybe with [SET request context](https://github.com/prisma/prisma/issues/5128)

## Todo's

- [x] Add mechanic to upload csv files
- [x] Add local database and base models
- [x] Add simple data view
- [x] Add mechanic to manage and assign categories
  - [x] Split app into pages (home -> simple data view, category management, upload)
  - [x] Add category CRUD logic
  - [x] Add category management handles
- [x] Add Automation Rules
  - [x] CRUD for Automation Rules
  - [x] Add manual run with Automation Rules
- [x] Refactor upload process
  - [x] Test out different parameters of csv-parser
  - [x] Add Preview Page
  - [x] Add automatic category assignment to hardcoded strings
  - [x] Add management tooling for dynamic category assignment
  - [x] add Transactions CRUD
  - [ ] upload -> add to db -> display added / updated transactions -> category assignment
- [x] Extend Transactions API with filtering sorting for charts
- [x] Charts!
  - [x] General over-time-chart
  - [x] monthly charts
  - [x] categories charts
  - [x] Add percentage to categories chart ("1234€ total - 32% of all", monthly all time)
  - [x] Ordering of Categories in chart (Desc)
  - [x] Optional: uncategorized rest value as "category" in chart
- [x] Refactoring of Automation rules
- [x] In-Table-Handling:
  - [x] Add category from table
  - [x] Add automation rule from table
- [ ] Create views for questions:
  - [ ] "How much more did I spend over regular spendings?"
  - [ ] "Whats the average spending per category? per month?"
- [ ] Add recurring spendings (abonnements), detection, management
  - [ ] Mark specific transactions as recurring?
- [ ] Add "Monthly-Base Spendings"
  - [ ] maybe via category property "essential"
  - [ ] maybe via recurring spendings
- [ ] Authentication via [next-auth](https://next-auth.js.org/getting-started/introduction)
- [ ] i18n
  - [ ] add i18n provider
  - [ ] add i18n management handle
  - [ ] add strings etc.
- [ ] Duplicate entries handling (same day, same data, same amount, different balance?)
- [ ] Make data editable?
- [ ] Testing!
  - [ ] Unit testing
  - [ ] E2E testing with playwright
- [ ] Stability!
  - [ ] Runtypes in API
  - [ ] Optimize data usage (useSWR, API)
  - [ ] User Setting: main currency
  - [x] Add double currency (https://www.npmjs.com/package/currency-codes + https://github.com/ZakZubair/currency-map-symbol)
- [ ] Deployments, migrations, dev/staging
- [ ] Convert into Electron app (https://github.com/saltyshiomix/nextron)
  - [ ] https://blog.logrocket.com/electron-ipc-response-request-architecture-with-typescript/
  - [ ] https://github.com/vercel/next.js/tree/canary/examples/with-electron-typescript
  - [ ] https://github.com/prisma/prisma/issues/9613
  - [ ] https://github.com/prisma/prisma/issues/4703

## Premium Todo's

- [ ] Add combo-automation-rules (create AND/OR combined rulesets, hierachy: category -> rule1, rule2...)
- [ ] Add Paypal transactions
- [ ] Add ETF tracker: https://marketstack.com/
- [ ] Planned spendings, maybe in combination with ->
- [ ] Forecasting balances, demo project tensorflow: https://github.com/jinglescode/time-series-forecasting-tensorflowjs
- [ ] Import data from Kontoauszug? (pdf-to-csv, pdf-to-json) (https://www.npmjs.com/package/pdf2json)
- [ ] Online stuff:
  - [ ] Add possibility for online database (https://github.com/prisma/prisma/issues/2443#issuecomment-630679118)
  - [ ] Add Login functionality

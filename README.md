## Get Started
- `npm install` - install dependencies
- `npx prisma generate` - generate prisma client
- `npx prisma migrate dev` - apply all migrations to local database

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
  - [ ] Add percentage to categories chart ("1234€ total - 32% of all", monthly all time)
  - [ ] Diverging Bar Chart for categories chart (plus, minus per category)
  - [x] Ordering of Categories in chart (Desc)
  - [x] Optional: uncategorized rest value as "category" in chart
  - [ ] Maybe max. height for bar (income bar too high for other bars)
- [ ] Refactoring of Automation rules
  - [ ] "assign this category, when: issuer a, issuer b, purpose a, purpose b"
- [ ] In-Table-Handling:
  - [x] Add category from table
  - [ ] Add automation rule from table
- [ ] Create views for questions:
  - [ ] "How much more did I spend over regular spendings?"
  - [ ] "Whats the average spending per category? per month?"
- [ ] Add recurring spendings (abonnements), detection, management
  - [ ] Mark specific transactions as recurring?
- [ ] Add "Monthly-Base Spendings"
  - [ ] maybe via category property "essential"
  - [ ] maybe via recurring spendings
- [ ] i18n
  - [ ] add i18n provider
  - [ ] add i18n management handle
  - [ ] add strings etc.
- [ ] Duplicate entries handling (same day, same data, same amount, different balance?)
- [ ] Optional: Make data editable
- [ ] Create TAGS:
  - [x] Transaction with single category
  - [ ] Transaction with multiple tags
  - [ ] Tags get dedicated section for things
- [ ] Stability!
  - [ ] Runtypes in API
  - [ ] Optimize data usage (useSWR, API)
  - [ ] User Setting: main currency
  - [x] Add double currency (https://www.npmjs.com/package/currency-codes + https://github.com/ZakZubair/currency-map-symbol)
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

---

## Business?
- Free: one category assignment per transaction | Prem: multiple categories
- Free: Simple charts | Prem: expert charts (brush etc)

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

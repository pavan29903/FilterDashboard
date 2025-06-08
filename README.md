# Smart Filter Dashboard

A high-performance React + TypeScript dashboard that dynamically filters large datasets using a multi-select dropdown interface — inspired by Amazon-like filtering UX.

---

## Features

- CSV-based table with dynamic filters (mod3, mod4, mod5…)
- Cross-filter sync — filters update based on each other’s selection
- Global state using React Context (clean, scalable architecture)
- React Select + DataTable integration for elegant filtering and pagination
- Optimized for large datasets (tested with 800+ rows)
- Unit tested filtering logic using Jest
- Fully styled with Tailwind CSS
- Reset all filters button

---

## Tech Stack

- React + Vite + TypeScript
- React Context API
- Tailwind CSS
- react-select
- react-data-table-component
- Jest (ts-jest) for testing
- PapaParse (CSV loading)

---

## Run Locally

Clone the project:

```bash
git clone https://github.com/pavan29903/FilterDashboard.git
cd smart-filter-dashboard
```

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Run tests:

```bash
npm test
```

---

## Sample Datasets

- dataset_small.csv — used for development
- dataset_large.csv — used to test performance and filtering logic

---



## Live 
- https://track-it-auyb.vercel.app/
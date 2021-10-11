# NETGIT

[![Netlify Status](https://api.netlify.com/api/v1/badges/d78c4c47-d539-4cd4-9f25-71e61caf88cd/deploy-status)](https://app.netlify.com/sites/netgit/deploys)

UI That Renders Netflix's Github Repositories and Information, Built With ReactJS and Typescript

## Local Development
1. In the root directory, run `yarn install` to install/update dependencies
2. Run `yarn start`, the UI will be hosted on `localhost:3000`

## Structure
```
./src
└── components
    ├── Header.tsx           // Renders header, darkmode toggle UI
    ├── Footer.tsx           // Static, renders bottom div and info
    ├── RepoCard.tsx         // Renders repository information at a glance. Toggles CommitDrawer
    ├── SearchOrgs.tsx       // Dialog component that contains search input form
    └── OrgNotFound.tsx      // Renders notfound message based on type (e.g. isEmpty)
└── containers
    ├── CommitDrawer.tsx     // Container component that renders a given repo's recent commit history
    └── Home.tsx             // Main view component, contains org/repo fetch logic, renders cards, high-level state
└── shared
    └── types.d.ts           // Contains types for all entities in netgit (due to small size, only one file atm)
└── utils
    ├── config.ts            // Contants for API routes, params, darkmode
    └── netgitapi.ts         // Library functions for API calls and caching
├── index.tsx                // Root component that renders the "App", high-level state
├── react-app-env.d.ts       // Module types
└── theme.tsx                // Contains custom MUI theme definitions for light/dark modes
```

# Objectives
- Create a web application that allows users to view GitHub data from Netflix OSS
  - Allow users to query for other organizations of their choosing
- Have the app be able to consume data from an API/external source
- Integrate Material UI style framework with the application
- Ensure application is both desktop and mobile optimized
- Allow for state changes and persistence through the use of session and local storage
  - Caching API response data
  - Storing darkmode preferences in browser local storage

# Future Ideas

Unfortunately wasn't able to get to all due to time restrictions

- Allow for the use of keyboard shortcuts for quick access (e.g. '/' to open search, arrow keys to highlight cards)
- Further compartmentalized components (e.g. `CommitItem` and `CommitList` from `CommitDrawer`)
- More nuanced typing directory (currently all under `shared/types.d.ts`)
- Additional styling overrides to deviate further from Material standard
  - fewer style overrides (i.e. `sx`), more reliance on style HOC's or a more comprehensive palette
- Unit testing with Jest (e.g. testing API wrapper functions, other library components)
- Better caching system to prevent overfill of session storage (see [netgitapi.ts](./src/utils/netgitapi.ts))


#### Brian Hong, 2021

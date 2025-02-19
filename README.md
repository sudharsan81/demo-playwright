# demo-playwright

This repository demostrates how Playwright test framework can be used for both API and WEB based e2e tests.

For demo purpose, 

we call these APIs endpoints 
- https://poc-assurance-savita.azurewebsites.net/api/read_all_summary
- https://poc-assurance-savita.azurewebsites.net/api/read_all_records

we use this we app
- https://wwwviewautocomp.z33.web.core.windows.net/index.html

## Pre-requisites

- node, version >= 23.6.1
- npm, version >= 10.9.2

## Run tests

> Open a new ternimal.

> Ensure you are in the home directory of this repo.

1. Install the project
```bash
npm install
```

2. Execute all tests
> In headed mode
```bash
npx playwright test ./e2e/ --headed
```

> In headless mode
```bash
npx playwright test ./e2e/
```

3. View Test Report

```bash
npx playwright show-report
```

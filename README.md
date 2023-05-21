# kidebot-auth-server

Kidebot authorization server authorizes users to use KideBot website. Users authorizes by kideId thats only requirment to indentify is user authorized to use kidebot or admin tools.

## Used Main technologies:

- [Node.js](https://nodejs.org/en)
- [graphql](https://graphql.org)
- [Apollo server](https://www.apollographql.com)
- [Express](https://expressjs.com)
- [TypeScript](https://www.typescriptlang.org)
- [Jest](https://jestjs.io)

<a href="https://nodejs.org">
<img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" width="64" alt="https://nodejs.org" title="https://nodejs.org">
</a>
<a href="https://expressjs.com">
<img src="https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" width="64" alt="https://expressjs.com" title="https://expressjs.com">
</a>
<a href="https://www.apollographql.com">
<img src="https://global.discourse-cdn.com/business5/uploads/apollographql/original/1X/25bd5104d61020fe4dc0777a5919cd009bca633e.png" width="64" alt="https://www.apollographql.com" title="https://www.apollographql.com">
</a>
<a href="https://www.typescriptlang.org">
<img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" width="64" alt="https://www.typescriptlang.org" title="https://www.typescriptlang.org">
</a>
<a href="https://graphql.org">
<img src="https://graphql.org/img/logo.svg" width="64" alt="https://graphql.org" title="https://graphql.org">
</a>
<a href="https://jestjs.io">
<img src="https://camo.githubusercontent.com/f2c80b28082b1568bf6ae3e4b999dcf6916e4f7ef611aa48efed85198ebe53a9/68747470733a2f2f6a6573746a732e696f2f696d672f6a6573742e706e67" width="64" alt="https://jestjs.io" title="https://jestjs.io">
</a>

## Setting up development

Clone repo to your selected folder and install node modules

```powershell
git clone https://github.com/leba9999/kidebot-auth-server.git
```

```powershell
npm install
```

Setup .env file to root of the project

.env attributes:

```typescript
NODE_ENV = "development" | "production"; // In production graphql sandbox is not avaible thats it
PORT = number; // Port number
DATABASE_URL = string; // connection string to mongo/nosql database
JWT_SECRET = string; // random
```

## Api Paths

| Path               | Request methods | Description                                        |
| ------------------ | --------------- | -------------------------------------------------- |
| /api/v1/auth/token | get             | Check is token still valid in authorization header |
| /api/v1/auth/token | post            | Create ne authorization token                      |
| /graphql           | post            | Handles all graphql requests                       |

## Authors:

- [Leevi Koskinen](https://github.com/leba9999)

# Markdown-Notes

## Postgres Setup

- Setup database locally (refer to /db/postgres/sequelize_config.js)
- `yarn run sequelize db:migrate`

## Running

- `yarn install`
- Create `.env` file with the following:

```
DEBUG=mardown-notes*
NODE_ENV=development
PORT=3000
DB_URL=127.0.0.1
DB_USER=markdown
DB_PASS=password
SESSION_SECRET=<session_secret>
DB_NAME=markdown
GOOGLE_CLIENT_ID=<client_id>
GOOGLE_CLIENT_SECRET=<client_secret>
GOOGLE_CALLBACK_URL=http://localhost:3000/redirect/google
```

Run server: `yarn run dev`

Run server tests: `yarn test`

Run client tests: `yarn run test-ui`

### About DocMate

DocMate is an AI tool to chat with your PDF and TXT files

## Local Development setup

To Setup the application in your local machine ensure that you have `rbenv`,
`nvm`, `yarn`, `node`, `redis` and `postgresql` is working properly.

Use the following commands to set up and start the application.

```
./bin/setup

foreman start -f Procfile.dev
```

For ruby versions not supporting foreman:

1. To run the rails server:

   ```bash
     bundle exec rails server
   ```

2. To start the webpacker:

   ```bash
   ./bin/webpacker-dev-server
   ```

Visit http://localhost:3000/ and login with email `oliver@example.com` and
password `welcome`.

### Setup the API Key

We are using `GooglePalm LLM (Large Language Model)`.

1. Go to https://makersuite.google.com/app/apikey and generate the API key.

2. Replace the `API_KEY` with your API key in `.env.development` and `.env.test`
   files.

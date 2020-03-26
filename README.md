<h1 align="center" style="display: block; text-align: center;">🌠 Scryfall API</h1>
<p align="center"><a href="https://travis-ci.com/Saeris/Scryfall-API"><img src="https://travis-ci.com/Saeris/Scryfall-API.svg?branch=master" alt="Build Status" /></a><a href="https://codecov.io/gh/Saeris/Scryfall-API"><img src="https://codecov.io/gh/Saeris/Scryfall-API/branch/master/graph/badge.svg" alt="Code Coverage"/></a></p>
<p align="center">A GraphQL API wrapper for Scryfall built with <a href="https://www.apollographql.com/docs/apollo-server/features/data-sources.html">Apollo Data Sources</a>.</p>

## 🛠️ Setup

Install dependencies by running `yarn`. That's it!

If you want to track usage metrics for your API, you'll need to get an API key from Apollo Graph Manager. For instructions on how to do that, please read the [Apollo Graph Manager docs](https://www.apollographql.com/docs/graph-manager/). Then create a new file in the root directory named `.env`. In it, copy + paste the following and replace the text following the `=` sign with your newly create API key.

```
ENGINE_API_KEY=<insert your apollo graph manager api key here>
```

Once that's done, you can now start up a development server using `yarn start`. By default this will use Serverless Offline, but if you would instead like to use Netlify Lamba, you can run `yarn start:netlify` instead. Once the development server is listening, you can pull up a GraphQL Playground by visiting one of the following URLs:

Lambda: http://localhost:1337/dev
Netlify: http://localhost:1337/.netlify/functions/scryfall-api

## 🕹️ Demo

You can try out the API using the GraphQL Playground hosted at https://scryfall.saeris.io/.netlify/functions/scryfall-api

## 🧪 Testing

Testing is provided via `jest` and is pre-configured to run with `codecov` as well. While tests for this project are far from complete, they can be found under `src/__TEST__` and follow a naming format of `[filename].spec.ts`. Additionally, this project uses `eslint`, `typescript`, and `prettier`, all three of which are automatically run on each commit via `husky` + `lint-staged`. To manually lint and test, use the following commands:

Lint:
```bash
yarn lint
```

Typecheck:
```bash
yarn typecheck
```

Test and watch for changes:
```bash
yarn test:watch
```

Lint + Typecheck + Test:
```bash
yarn test
```

## 🚢 Deployment

To deploy the server, you'll need to follow the Serverless Framework's [Setup Guide](https://serverless.com/framework/docs/providers/aws/guide/installation/) to deploy to AWS. If you'd rather use Netlify, you'll need to follow whichever method works best for your workflow. Refer to [Netlify's Docs](https://docs.netlify.com/configure-builds/get-started/) for more information.

If you're deploying to AWS, you can use the following commands to deploy to Staging or Production:

Staging:
```bash
yarn deploy
```

Production:
```bash
yarn deploy:prod
```

Alternatively, if you're using Travis CI, you can deploy to both on each commit as part of your CI process by uncommenting the following lines inside `travis.yml`:

```yaml
deploy:
 # deploy develop to the staging environment
 - provider: script
   skip_cleanup: true
   script: yarn deploy:dev
   on:
     node: "12"
     branch: develop
 # deploy master to production
 - provider: script
   skip_cleanup: true
   script:
     - yarn deploy:prod
   on:
     node: "12"
     branch: master
```

## 🥂 License

Released under the [MIT license](https://github.com/Saeris/Scryfall-API/blob/master/LICENSE.md).

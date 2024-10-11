# Basic development setup

This repo by default connects to live dev environment on `https://dev.tg.no` which makes it easy to get started. For more advanced tasks, such as working on content types not yet released, you should instead use local backend instance.

For basic installation of backend repo see [backend repo](https://github.com/gathering/tgno-backend).

## Getting started

(If you don't have pnpm installed, you can install it with `npm install -g pnpm`)

1. Clone this repo
2. Make sure you have the correct node version installed (`nvm use` then `nvm install`)
3. Run `pnpm install`
4. Run `pnpm prepare` # Setup Husky for pre-commit
5. Run `pnpm dev`
6. Frontend should now be available on `localhost:4321` serving content from `https://dev.tg.no`

## Using local backend

Same procedure as above, but with a few extra steps:

1. Make sure local backend is running and available on a local port
2. Create a `.env.development.local` file in the root of the project (not `.env.local` due to how Astro prioritizes env files)
3. Add the following line to the file: `API_URL=http://localhost:8000/` (make sure the port matches the port of your local backend)

## Using production backend

Identical to using local backend section above, but use `https://www.tg.no/` instead of `http://localhost:8000/`

## Common issues

### Data is still loading from dev.tg.no even though I have set up local backend

- Try restarting the dev server
- Make sure you have created the `.env.development.local` file and added the correct `API_URL` to it
- Make sure there are no invalid formatting in env file

### No content is loading when using local backend

- Make sure the backend is running and available on the correct port (try opening `API_URL` + `/api/v2/news/` in browser)
- If backend is running in docker, make sure the port is exposed in the docker-compose file
- Check that backend data has been properly seeded. On first startup it might be in a broken state until initiall setup steps have been done. See backend repo for details

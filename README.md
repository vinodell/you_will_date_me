# you_will_date_me

A small dating web application built with **React + Vite** and deployed on **Cloudflare Workers**.

## Requirements

Before starting, make sure you have:

* Node.js 20+
* A Cloudflare account
* Wrangler CLI

## Local Development

Start the Vite development server:

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:5173
```

## Cloudflare Setup

Install Wrangler if it is not already available:

```bash
npm install -g wrangler
```

Authenticate with Cloudflare:

```bash
wrangler login
```

Verify the authentication:

```bash
wrangler whoami
```

## Worker Configuration

The Cloudflare Worker configuration should be defined in `wrangler.jsonc` or `wrangler.toml`.

Example:

```json
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "you-will-date-me",
  "compatibility_date": "2026-08-25",
  "main": "./worker/index.js",
  "assets": {
    "not_found_handling": "single-page-application"
  }
}
```

The `main` path must point to the Worker entry file used by the project.

## Environment Variables

For local development, create:

```text
.dev.vars
```

Example:

```text
API_KEY=your_api_key
```

Do not commit secrets to Git.

For production secrets, use Wrangler:

```bash
npx wrangler secret put API_KEY
```

Then enter the value when prompted.

## Build

Create a production build:

```bash
npm run build
```

## Deploy to Cloudflare

Deploy the application and Worker:

```bash
npx wrangler deploy
```

After deployment, Wrangler will print the public Cloudflare Workers URL.

## GitHub Actions

The project can also be deployed automatically through GitHub Actions.

Add the required Cloudflare credentials in:

**GitHub → Repository → Settings → Secrets and variables → Actions**

Typical secrets:

```text
CLOUDFLARE_API_TOKEN
CLOUDFLARE_ACCOUNT_ID
```

Create a Cloudflare API token with permission to deploy Workers and add it as `CLOUDFLARE_API_TOKEN`.

The Cloudflare Account ID can be found in the Cloudflare dashboard.

Once configured, pushes to the deployment branch can automatically build and deploy the application.


## Development Workflow

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build
npm run build

# Deploy to Cloudflare
npx wrangler deploy
```

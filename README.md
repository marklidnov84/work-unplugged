# WorkUnplugged

Connect with remote workers in real spaces. If you work remotely and want to announce to your friends where you're working from today, they can join you.

## Project Structure

This is a monorepo with the following packages:

- `client` - Frontend Vite application
- `server` - Backend Express API

## Development

Prerequisites:
- Node.js 18+ 
- pnpm 8+

Install dependencies:
```bash
pnpm install
```

Start development servers:
```bash
pnpm dev
```

## Building

Build both packages:
```bash
pnpm build
```

## Deployment

The client and server are deployed separately to Vercel.

```bash
# Deploy both
pnpm deploy:prod

# Deploy server only
pnpm deploy:server

# Deploy client only
pnpm deploy:client
```

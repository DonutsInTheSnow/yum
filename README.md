# Yum - Next.js Portfolio Project

Well, **Yum**, that fine Wolfeboro, NH bakery, is a hearty e-commerce delight, crafted with the wizardry of [Next.js](https://nextjs.org). It’s the third of ten ventures I aim to conquer, each a unique treat. Browse our baked goods, fill a cart, and let Stripe whisk your payment away, all tracked by Supabase.

## Purpose

This bakery mock-up proves to employers and coders I can bake a Next.js app from scratch, test it with Jest, and serve it on Vercel—perfect for those savoring Wolfeboro’s charm.

## Live Demo

Savor the production app at [https://yum.vercel.app/](https://yum.vercel.app/).

## Getting Started Locally

Clone the repo, install dependencies, set `.env.local` vars, and run:

```bash```
npm run dev


## Testing with Jest

To enable Jest testing, you’ll need a temporary `babel.config.js` file in the project root. This allows `babel-jest` to work without interfering with Next.js’s SWC compiler during normal development.

> ⚠️ **Important**: Only use this file when running tests. Delete or rename it before running `npm run dev`, or your app will crash due to SWC conflicts.

### Create `babel.config.js` (temporarily) with this content:

```js
// babel.config.js
/**
 * Create this file at the root level and activate only when running Jest tests.
 * Remove this file altogether when running `npm run dev`, 
 * or you’ll break SWC and Next.js font support.
 *
 * To run tests:
 *   1. Uncomment the export below
 *   2. Run `npm test`
 *   3. Re-comment the export when done
 */

// module.exports = {
//   presets: [
//     ['next/babel', { 'preset-react': { runtime: 'automatic' } }]
//   ],
// };```

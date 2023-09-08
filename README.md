<p align="center">
  <a href="https://decent.land">
    <img src="https://mem-home.vercel.app/icons/mem/mem-logo-v2.svg" height="180">
  </a>
  <h3 align="center"><code>@decentldotland/mem-nextjs-template</code></h3>
</p>

# MEM next.js template

A simple UI scaffold around a MEM [counter](https://github.com/decentldotland/mem-examples/tree/main/examples/2.%20counter) function. 

`app/api/route.ts` wraps the MEM API to provide an easy way to call functions from the UI.

## About MEM

[Molecular Execution Machine](https://mem.tech) is a web3-ready serverless functions platform. Build and deploy trustless dApps in record time ⚡️

## MEM features

- Near-instant finality
- Multichain auth - EVM, Solana, Arweave, TON, ICP, and more
- Multilingual - JS/TS, Rust, C/++, Python, WASM-compiled languages
- Trustless and verifiable
- REST-like: interact with MEM like an API
- Web2 UX with walletless contract interactions
- Call and compute with any data source, on of off-chain

## Testing MEM contracts

### MEM IDE (recommended)

While MEM is in beta, we recommend using the [online MEM IDE](https://mem.tech/ide) to test and expand upon these examples -- no need to deploy! Copy the contract and state into a new project and use the interaction objects in each example's README to test.

### Local testnet

The [mem-testnet](https://github.com/decentldotland/mem-testnet) repo provides instructions on how to simulate MEM contracts locally. Paste contract code and state into the script and write your test cases. 

## Mainnet contract deployment (permissioned in beta)

For mainnet, MEM contracts are deployed via the [MEM CLI](https://docs.mem.tech/mem-cli/function-deployment).

For example:

```mem deploy --src ./contract.js --init-state '{ "logs": [] }'```

To interact with MEM mainnet contracts while MEM is in beta, you must first get the contract whitelisted via [this form](https://docs.google.com/forms/u/1/d/e/1FAIpQLSfRB95cZzGyy3IRmsMwjHx7gweywmybptBU0XbUb2GZumwaKA/viewform?usp=send_form).

---

# next.js front end

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
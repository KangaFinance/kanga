# Deployment

## HardHat

```sh
npx hardhat node
```

## Harmony Testnet

This will deploy all the contracts using the scripts in the deploy folder
```sh
yarn harmony-testnet:deploy
```

**Note:** After deploying the Factory, Router and Token need to provide these addresses to 
MiniBreederV2, KangaBounce by updating the deploy scripts. Then deploy these contracts using

### Modular deployment of contracts

THE Kanga deployment process can deploy indvidual contracts or modules using [hardhat tags](https://hardhat.org/plugins/hardhat-deploy.html#deploy-scripts-tags-and-dependencies)

Following is an overview of the modules and tags used and the contracts they deploy

| Module | Module Tag | Contract Tag | Script |
| --- | --- | --- | --- | 
| Testnet Pools | TestPools | | TestPools.ts |
| KangaToken | KangaToken | 
| AMM | "UniswapV2Factory", "AMM" |
| AMM_v2 | "UniswapV2Factory", "AMM" |
| LIQUIDITY_MINING | | | |
| MOB | | | |
| TROOP | | | |
| JOEY | | | |
| ANALYTICS | | | |
| MIGRATE | | | |
| STAKING | | | |

```sh
yarn harmony-testnet:verify
```

## Mainnet

```sh
yarn mainnet:deploy
```

```sh
yarn mainnet:verify
```

```sh
hardhat tenderly:verify --network mainnet ContractName=Address
```

```sh
hardhat tenderly:push --network mainnet ContractName=Address
```

## Ropsten

```sh
yarn ropsten:deploy
```

```sh
yarn ropsten:verify
```

```sh
hardhat tenderly:verify --network ropsten ContractName=Address
```

## Kovan

```sh
yarn ropsten:deploy
```

```sh
yarn ropsten:verify
```

```sh
hardhat tenderly:verify --network kovan ContractName=Address
```

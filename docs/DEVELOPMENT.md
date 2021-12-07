# Development

## Local environment

```sh
npx hardhat node
```

## Install Dependencies 
```sh
yarn
```

## Updating and Deploying Contracts

### Updating the Factory and Pair INIT_CODE_HASH
When updating the Factory you also need to update the INIT_CODE_HASH in the Pair. The deploy scripts copy the abigen info from master. So you need to modify the scripts and copy to master when changing these contracts. See [Issue 1](https://github.com/KangaFinance/kanga/issues/1) for more details

```
# Modify the Factory Contract

# Run 00_InitHash.test.ts
yarn  hardhat test ./test/00_InitHash.test.ts

# Update the InitHash in the Library if needed contracts->uniswapv2->libraries->UniswapV2Library.sol


# Run 00_InitHash.test.ts
yarn  hardhat test ./test/00_InitHash.test.ts

# Modify the code in deploy->UniswapV2Factory and do initial deploy
yarn hardhat --network harmony-testnet deploy --tags UniswapV2Factory --reset
ll deployments/harmony-testnet/
cp deployments/harmony-testnet/UniswapV2Factory.json deployments/master/UniswapV2Factory.json
ll deployments/master/

# Modify the code in deploy->UniswapV2Pair and do initial deploy
yarn hardhat --network harmony-testnet deploy --tags UniswapV2Pair --reset
ll deployments/harmony-testnet/
cp deployments/harmony-testnet/UniswapV2Pair.json deployments/master/UniswapV2Pair.json
ll deployments/master/

# Revert the code back in deploy UniswapV2Factory and UniswapV2Pair

# Run 00_InitHash.test.ts
yarn  hardhat test ./test/00_InitHash.test.ts

# Deploy to testnet
yarn harmony-testnet:reset

# Copy the router to master
ll deployments/harmony-testnet/
cp deployments/harmony-testnet/UniswapV2Router02.json deployments/master/UniswapV2Router02.json
ll deployments/master/

```
### Updating Core, SDK and Interface
1. Deploy contracts and update Package.json and deploy core
```
cd kanga

# Update sdk dependencies and version in Package.json

# Test 
yarn test

# Build
yarn build

# Publish the npm package
npm publish
```

2. Update SDK contract addresses, npm version and core dependencies and deploy sdk
```
cd kanga-sdk

# Update contract addresess in src->constants->addresses.ts

# Update version in Package.json

# Build the sdk
yarn build

# Publish the npm package
npm publish
```

3. Update Kanga Interface including ABIs and npm dependencies
**It is very important to modify the abi's to only have the abi information**
**This means modifying by hand after the copy to remove additional elements**
```
cd kanga-interface

# Update ABI'S - copy and then edit the json files to remove all elements except for the ABI
cp ../kanga/deployments/master/UniswapV2Factory.json src/constants/abis/factory.json
cp ../kanga/deployments/master/UniswapV2Pair.json src/constants/abis/pair.json
cp ../kanga/deployments/master/UniswapV2Router02.json src/constants/abis/router.json
# NOW edit the above files to remove additional elements


# Update Core and SDK Packages 
yarn install

# Test application
yarn build
yarn start

# Test Locally
yarn start

```

## Mainnet forking

```sh
npx hardhat node --fork <https://eth-mainnet.alchemyapi.io/v2/API_KEY>
```

<https://hardhat.org/guides/mainnet-forking.html#mainnet-forking>

## Testing

```sh
yarn test
```

### Single files

```sh
yarn test test/MasterBreeder.test.js
```

Mocha & Chai with Waffle matchers (these are really useful).

<https://ethereum-waffle.readthedocs.io/en/latest/matchers.html>

### Running Tests on VSCode

<https://hardhat.org/guides/vscode-tests.html#running-tests-on-visual-studio-code>

## Seeding

npx hardhat run --network localhost scripts/seed.js

## Console

```sh
yarn console

npx hardhat --network localhost console
```

<https://hardhat.org/guides/hardhat-console.html>

## Coverage

```sh
yarn test:coverage
```

<https://hardhat.org/plugins/solidity-coverage.html#tasks>

## Gas Usage

```sh
yarn test:gas
```

<https://github.com/cgewecke/hardhat-gas-reporter>

## Lint

```sh
yarn lint
```

## Watch

```sh
npx hardhat watch compile
```

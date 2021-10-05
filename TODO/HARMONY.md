## TODO

### Get hardhat contract verification working with Harmony endpoints

Modify hardhat [etherscan](https://github.com/KangaFinance/hardhat/blob/master/packages/hardhat-etherscan/src/network/prober.ts#L28) and [hardhat-deploy]https://github.com/KangaFinance/hardhat-deploy/blob/master/src/etherscan.ts) to use Harmony endpoints.

Code needs to interact with [harmony contract verification service](https://github.com/harmony-one/contract-verification-service)

* [Get Bytecode](https://github.com/harmony-one/contract-verification-service/blob/main/src/services/codeverification/rpc.ts#L5)
* [codeVerifcation](https://github.com/harmony-one/contract-verification-service/blob/main/src/routes/index.ts#L15)
* [getVerifiedContract](https://github.com/harmony-one/contract-verification-service/blob/main/src/routes/index.ts#L46)


Sample GET's and Posts are in postman Contract Verification collection.



## Reference Info
* [Harmony Testnet Verify Contract](https://explorer.pops.one/verifycontract?address=0xfc92cd6e5c40b8aded835ba9ad937b29255e9c14)
* [ABI Encoding Service](https://abi.hashex.org/)
* feeToSetter = `0x9Cf3000a2f555607Ce330Bf70B0f67c7cBcd3be8`
* [Similar Uniswapv2 Factory contract deployed by Sushiswap on Ethereum](https://etherscan.io/address/0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac#code)

## Contract Verfication
* [Code Verification Codebase](https://github.com/harmony-one/contract-verification-service)
* [Error Line](https://github.com/harmony-one/contract-verification-service/blob/main/src/services/codeverification/rpc.ts#L23)
* [URL it is using to look up the contract](https://api.explorer.pops.one/v0/shard/0/address/0xfc92cd6e5c40b8aded835ba9ad937b29255e9c14/contract)
* [Explorer url showiing the contract](https://explorer.pops.one/address/0xfc92cd6e5c40b8aded835ba9ad937b29255e9c14?activeTab=6)

## Imput Parameters
* Constructor Arguments (ABI-encoded) = `000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000010000000000000000000000009cf3000a2f555607ce330bf70b0f67c7cbcd3be8`
* Contract Address = `0xfc92cd6e5c40b8aded835ba9ad937b29255e9c14`
* Contract Name = `UniswapV2Factory`
* Chain Type = `testnet`
* Compiler = `=0.6.12;` or `v0.6.12+commit.27d51765`
* Optimizer =`No`

## Commands
### Harmony Testnet
```
npx hardhat verify --network harmony-testnet 0xFc92cD6E5c40B8AdEd835bA9AD937B29255E9c14 "0x9Cf3000a2f555607Ce330Bf70B0f67c7cBcd3be8" --show-stack-traces
```
```
 npx hardhat --network harmony-testnet etherscan-verify --solc-input
 ```

### Harmony Mainnet
```
npx hardhat verify --network harmony 0xE9218eF3C209E1e7db8beF2e33F822006B44bcd7 "0x9Cf3000a2f555607Ce330Bf70B0f67c7cBcd3be8" --show-stack-traces
```
```
 npx hardhat --network harmony etherscan-verify --solc-input
 ```

## Contract Verification
```.sh
 yarn harmony:verify
 ## which is the same as
 npx hardhat --network harmony etherscan-verify --solc-input

 ```
 - Hardhat deploy - ensure it doesn't add the infura key to the request
 
```
npx hardhat verify --network harmony 0xE9218eF3C209E1e7db8beF2e33F822006B44bcd7 "0x9Cf3000a2f555607Ce330Bf70B0f67c7cBcd3be8"
```
Gives
 ```
 Error in plugin @nomiclabs/hardhat-etherscan: The address provided as argument contains a contract, but its bytecode doesn't match any of your local contracts.

Possible causes are:
  - Contract code changed after the deployment was executed. This includes code for seemingly unrelated contracts.
  - A solidity file was added, moved, deleted or renamed after the deployment was executed. This includes files for seemingly unrelated contracts.
  - Solidity compiler settings were modified after the deployment was executed (like the optimizer, target EVM, etc.).
  - The given address is wrong.
  - The selected network (harmony) is wrong.
  ```

  ## Contract verification explicit

  ```
  npx hardhat verify --network harmony 0xE9218eF3C209E1e7db8beF2e33F822006B44bcd7 "0x9Cf3000a2f555607Ce330Bf70B0f67c7cBcd3be8"
  ```
  gives
  ```

  ```


- Make pull request for hardhat-etherscan
- Make pull request for hardhat-deploy

## References

* [gist](https://gist.github.com/johnwhitton/793ccd67425fbe810683de1e8dbedc67)
* [harmony testnet verify contract](https://explorer.pops.one/verifycontract?address=0xfc92cd6e5c40b8aded835ba9ad937b29255e9c14)
* [etherscan Sushi SushiV2Factory](https://etherscan.io/address/0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac#code)
* [harmony contract verification service](https://github.com/harmony-one/contract-verification-service)
* [Online ABI Encoding](https://abi.hashex.org/)
* [verifying contracts on Etherscan](https://medium.com/etherscan-blog/verifying-contracts-on-etherscan-f995ab772327)
* [sushiswap mainnet contracts](https://dev.sushi.com/sushiswap/contracts)
* [harmony IDE](https://ide.harmony.one/)
* [etherscan api key](https://etherscan.io/myapikey)
* [hardhat](https://github.com/nomiclabs/hardhat)
* [hardhat contribution](https://github.com/nomiclabs/hardhat/blob/master/CONTRIBUTING.md)
* [KangaFinance hardhat](https://github.com/KangaFinance/hardhat)
* [KangaFinance hardhat-deploy](https://github.com/KangaFinance/hardhat-deploy)
* [Hardhat Berry Migration](https://yarnpkg.com/getting-started/migration)
* [Catching Unknowns](https://ncjamieson.com/catching-unknowns/)
* [--solc-input](https://github.com/ethereum/solidity/issues/9573)
```
  --solc-input   	fallback on solc-input (useful when etherscan fails on the minimum sources, see https://github.com/ethereum/solidity/issues/9573)
  ```

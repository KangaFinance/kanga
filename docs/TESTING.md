# Testing

[Kanga.finance](https://kanga.finance) can be tested on Harmony Testnet using 
[https://demo.kanga.finance](https://demo.kanga.finance)

Below is an overview of the tokens and liquidity pools that are available for testing.

If you wish to receive tokens for testing please reach out in the Harmony Hackathon discord channel.

Currently the application has only been tested using Metamask with One Wallet Integration and further functionality still to come.

## Harmony Testnet Links

- [Harmony Faucet](https://faucet.pops.one/)
- [Harmony Explorer](https://explorer.pops.one/)
- [Harmony Bridge](https://testnet.bridge.hmny.io/erc20)
- [Binance Faucet](https://testnet.binance.org/faucet-smart)
- [BSC Node URLs](https://docs.binance.org/smart-chain/developer/rpc.html)
- [BSC Explorer](https://testnet.bscscan.com/address/0x8875fc2A47E35ACD1784bB5f58f563dFE86A8451#tokentxns)
- [Kovan Explorer](https://kovan.etherscan.io/)
- [Cross Chain Flow](https://miro.com/app/board/o9J_l1l6L0I=/)

### Kanga Contracts
```
FACTORY_ADDRESS = "0x8Fe6bbd2FB33223cCEd22edDbC712aE9E6a71e7c"
ROUTER_ADDRESS  = "0x6FaA859FebB3c5B2aF16c8c51E657fB710DF2750"
```

### Bridging Tokens (Limited Liquidity)
Bridging Tokens below have been removed from the default token list and may be added in manually. The pools currently have limited liquidity. 

As Kanga Deploys on bridged Chains such as Ethereum and Binance then a more robust testing environment will be set up.
```
bscBUSD_MANAGER_CONTRACT = "0x4c5e5b1a12312b0a9196feaa09b8715b0a6dac9a"
bscBUSD                  = "0x6d307636323688cc3fe618ccba695efc7a94f813"
BUSD                     = "0xc4860463c59d59a9afac9fde35dff9da363e8425"
```

### Test Tokens

#### Harmony Testnet
* KANGA   = "0x688a7C94d7be50289FFDb648C8F9e38ac55970F7" // KANGA
* WONE    = "0x16c640660d25Ce3cEE50075995567dB74e380F96" // WONE 
* oneETH  = "0xbbd8d7b71170916a033E4d07F2A8932f5F3aa510" // 1WETH
* oneWBTC = "0x55Ac2c51252FEC72a04a575ace2b88D00d13Ab68" // 1WBTC
* oneUSDT = "0x8800a37FbEd8953A642c4B8186bC5780Cd253FEE" // 1USDT 
* oneUSDC = "0xC285b03fFdB3fb5C77e3BDD0A2206A69A3691f0E" // 1USDC 
* BUSD    = "0xB1Ce20837c7D9604046b18914Ac90dda3fF69d0e" // BUSD
* bscBUSD = "0x260af0515ee751Be4E3eC2F530E06c6B164D8864" // bscBUSD 
* UST     = "0x4d6260b2B337aAf34785db207226C65DAdC34D86" // UST

#### Binance Testnet
* KANGA   = "0xfAc4Fa7eA246B61c2Ada663d4fb05586231C23bA" // KANGA
* WETH    = "0x2A1065A72BaB95C39575ACe59C0b2EeED76a5E41" // WETH
* WBTC    = "0xF2069A9EdA0156B63e8A02c18D514c10f0C540aF" // WBTC 
* WONE    = "0xe1E27dC74933eDEF03763fF3fC08CF09B684C675" // WONE
* WBNB    = "0x53d5dd7b88c9750Ab85EBf70b8e39Bd08bE736C9" // WBNB
* USDT    = "0xBB1849a842Cc7F56D9C0D96F9DDf0c259F7B08d4" // USDT 
* USDC    = "0x3cD28c08027872f4484353510C1B0fB1D6C2C5b0" // USDC 
* BUSD    = "0xBBfA0425eDC5f90523C60dE87c86A8c7F9cc5a92" // BUSD
* UST     = "0x7E3Ed7805f6b33E65f496c0E63e7d2c5f34a30e4" // UST

#### Kovan Testnet
* KANGA   = "0x8875fc2A47E35ACD1784bB5f58f563dFE86A8451" // KANGA
* WETH    = "0xb84fb8D7c48565512C110A37826B629a0b951DfD" // WETH 
* WBTC    = "0x6Ae48fa199d3B671A8B834C536D601F2ba0E3796" // WBTC
* WONE    = "0x1cac14BdE3EdE36818eb5E093516176E2b07aAAe" // WONE
* WBNB    = "0xcf35f5277138f471F926C8E9AD38D511F98540cC" // WBNB 
* USDT    = "0x7D979d3ec1594Db739e7536C54cc14C4975f19EA" // USDT 
* USDC    = "0x36A920e061A733a7Ba8dB1fdE01bE308e240fff1" // USDC
* BUSD    = "0x1388ae7AE05CEf9283b6f673853b015415079EaF" // BUSD 
* UST     = "0xEE78e3A95c6CfE7f66260B927E5458A34C61F235" // UST


## Liquidity Pools

### Token Price
Sample as at 9/23/2021

* KANGA   = $0.03
* WONE    = $0.15
* 1ETH    = $3,000
* 1WBTC   = $45,000
* 1USDT   = $1
* 1USDC   = $1
* BUSD    = $1
* bscBUSD = $1
* UST     = $1

### Initial Pool Ratios approx $600k per pool
```
KANGA-WONE    = 10,000,000 / 2,000,000
KANGA-1ETH    = 10,000,000 / 100
KANGA-1WBTC   = 10,000,000 / 6.66666
KANGA-1USDT   = 10,000,000 / 300,000
KANGA-1USDC   = 10,000,000 / 300,000
KANGA-BUSD    = 10,000,000 / 300,000
KANGA-bscBUSD = 10,000,000 / 300,000
KANGA-UST     = 10,000,000 / 300,000

UST-WONE      = 300,000 / 2,000,000
UST-1ETH      = 300,000 / 100
UST-1WBTC     = 300,000 / 6.66666
UST-1USDT     = 300,000 / 300,000
UST-1USDC     = 300,000 / 300,000
UST-BUSD      = 300,000 / 300,000
UST-bscBUSD   = 300,000 / 300,000

1WBTC-1ETH   = 6.66666 / 100
1ETH-WONE    = 100     / 2,000,000
1WBTC-WONE   = 6.66666 / 2,000,000
1USDC-WONE   = 300,000 / 2,000,000
1USDT-1USDC  = 300,000 / 300,000
bscBUSD-BUSD = 300,000 / 300,000
```

### Liquidity Pool Addresses

```
KANGA-WONE    = "0x02872a6f81e98a5e23f6f49bb2e501ba08fbacfa" 
KANGA-1ETH    = "0x36351905539fb07a1149eaae9d0fa7437e7f0c21"
KANGA-1WBTC   = "0x9534e3486786cbac05bb8431bf57be05830cf301"
KANGA-1USDT   = "0x6797c5411f9703c24b8a62901ef7efbc16a86d63"
KANGA-1USDC   = "0x94a1da04d57a219fd96764ffc8b07ca97259931e"
KANGA-BUSD    = "0xa26d9d45e0cb6a13a539c8bac5b733eadc4a6773"
KANGA-bscBUSD = "0x01c750a8fa66ee852b5058102c0c66fc52b3c9ef"
KANGA-UST     = "0xc0f2cfabde04dbdcb715cd5173afceb2722f9496"

UST-WONE      = "0xde74e433e19bb218e9a4c977159d210eb8f51c70"
UST-1ETH      = "0x60cc6de2593bcddad076b5de4a681a20bef91f01"
UST-1WBTC     = "0x7f091ff3e6baf9b7a09422e1e020200407e5d835"
UST-1USDT     = "0x2390c7c0c8b6d01961a1b76aa904cec77695b6cf"
UST-1USDC     = "0x530b72b0395820acf8f10291a15ae286501f0fa7"
UST-BUSD      = "0x43f4cad619e8feef42dbe803aa2c40a255d371f9"
UST-bscBUSD   = "0xd098a7d8d428abbe58f28a54173f1e5711781656"


1WBTC-1ETH   = "0x42b0c6502902a47913744294f3b4676298bed585"
1ETH-WONE    = "0xd7f83264e07f8d40e3c51d4e57989f9f9053359a"
1WBTC-WONE   = "0x327143153b5a883beb2bfa3427d978788541d8dd"
1USDC-WONE   = "0xbd1f3b084f4a5cb26f4feeaeba3a9a86a0240659"
1USDT-1USDC  = "0x96324beaacd5de48eee379bea08522bc07dcf338"
bscBUSD-BUSD = "0x219282f26439144c3ca8306e690679e0ce368e07"


```

### Bridging Testing

* BUSD    = "0xBBfA0425eDC5f90523C60dE87c86A8c7F9cc5a92" // Binance Testnet
* bscBUSD = "0x8f745570fd29c36a9b2fef2cc1e89a7ae8b68ca7" // Harmony Binance BUSD
* BUSD    = "0x289590a672c3eb0ae9c952dbbf00e489f3f0b7b1" // Harmony Kovan BUSD

* BUSD    = "0x1388ae7AE05CEf9283b6f673853b015415079EaF" // Kovan 

**Liquidity Pool**

* 1BUSD-bscBUSD = "0x511adbd5f93df502ee2f3f44a9f6b720966cda53"





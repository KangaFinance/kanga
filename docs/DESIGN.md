## Kanga Design

### Overview

Kanga smart contracts are held in several repositories including kanga, kanga-sdk, mob, troop-lending, jump.

These contracts are incorporated into the kanga-sdk and some of the abi's are also directly included in kanga-interface.

When deploying to a new chain need to update both the addresses and abis

- Deployed contract addresses are held in the [kanga-sdk](https://github.com/KangaFinance/kanga-sdk/blob/joey/src/constants/addresses.ts) and the [kanga-interface](https://github.com/KangaFinance/kanga-interface/blob/joey/src/constants/addresses.ts)
- abis are held in the [kanga-sdk](https://github.com/KangaFinance/kanga-sdk/tree/joey/src/abis) and [kanga-interface](https://github.com/KangaFinance/kanga-interface/tree/joey/src/constants/abis)

## Technical Components

### Target Design Overview

1. Protocol (kanga) - move to a modular approach (migrating smart contracts from other repos)
2. SDK (kanga-sdk) - consolidate deployment addresess and all Dapp Tools
3. UI (kanga-interface) - 
4. Analytics (kanga-data) - 

### Next Steps
1. Router and intermediate Pools
2. Liquidity Provider Reward Testing
3. Kanga Token Holders Rewards and Staking
4. Liquidity Management Boomer
  1. Analytics
5. Bounce Migration Strategy
6. Pouch -> Mob (Flash Loans and Multi Pool)
7. Bonding Curves
8. Lending
9. NFTs
10. Bridging
11. Asset Managment
12. Liquidity Strategies
13. Limit Orders
14. Settlement Layer
15. Aggregation.  



### Token => Kanga (SUSHI)

- [Kanga](https://github.com/KangaFinance/kanga/blob/joey/contracts/KangaToken.sol)
- Vesting
  - vesting-query <=> [sushi-vesting-query](https://github.com/sushiswap/sushi-vesting-query)
  - vesting <=> [sushi-vesting](https://github.com/sushiswap/sushi-vesting)
  - vesting-protocols <=> [sushi-vesting-protocols](https://github.com/sushiswap/sushi-vesting-protocols)
- Governance -> snapshot 

### AMM => KangaFiance (SushiSwap)

- [UniswapV2Factory](https://github.com/KangaFinance/kanga/blob/joey/contracts/uniswapv2/UniswapV2Factory.sol) - Creates Token Pairs for Liquidity Pools
- [UniswapV2Pair](https://github.com/KangaFinance/kanga/blob/joey/contracts/uniswapv2/UniswapV2Pair.sol) - Used to manage liquidity for a pool one instance is deployed for each pool.
- [UniswapV2Router02](https://github.com/KangaFinance/kanga/blob/joey/contracts/uniswapv2/UniswapV2Router02.sol) - Provides the ability to add and remove liquidity to pools and do swaps.
- [UniswapV2ERC20](https://github.com/KangaFinance/kanga/blob/joey/contracts/uniswapv2/UniswapV2ERC20.sol) - provides interface for underlying ERC20 contracts which are managed by the pools.

#### Routing and Intermediate Pools

### Price Oracles

### Liquidity Provider Rewards

- [MasterBreeder](https://github.com/KangaFinance/kanga/blob/joey/contracts/MasterBreeder.sol)

```
We do some fancy math here. Basically, any point in time, the amount of KANGAs entitled to a user but is pending to be distributed is:

pending reward = (user.amount * pool.accKangaPerShare) - user.rewardDebt

Whenever a user deposits or withdraws LP tokens to a pool. Here's what happens:
1. The pool's `accKangaPerShare` (and `lastRewardBlock`) gets updated.
2. User receives the pending reward sent to his/her address.
3. User's `amount` gets updated.
4. User's `rewardDebt` gets updated.
```

- [MasterBreederV2.sol](https://github.com/KangaFinance/kanga/blob/joey/contracts/MasterBreederV2.sol)

```
The (older) MasterBreeder contract gives out a constant number of KANGA tokens per block.
It is the only address with minting rights for KANGA.
The idea for this MasterBreeder V2 (MCV2) contract is therefore to be the owner of a dummy token
that is deposited into the MasterBreeder V1 (MCV1) contract.
The allocation point for this pool on MCV1 is the total allocation point for all pools that receive double incentives.
```

- [MiniBreederV2](https://github.com/KangaFinance/kanga/blob/joey/contracts/MiniBreederV2.sol) - The allocation point for this pool on MCV1 is the total allocation point for all pools that receive double incentives.

```
The (older) MasterBreeder contract gives out a constant number of KANGA tokens per block.
It is the only address with minting rights for KANGA.
The idea for this MasterBreeder V2 (MCV2) contract is therefore to be the owner of a dummy token
that is deposited into the MasterBreeder V1 (MCV1) contract.
The allocation point for this pool on MCV1 is the total allocation point for all pools that receive double incentives.
```

### Analytics

* frontend(kanga-analytics) <=> [sushiswap-analytics](https://github.com/sushiswap/sushiswap-analytics)
* subgraph(kanga-subgraph) <=> [sushiswap-subgraph](https://github.com/sushiswap/sushiswap-subgraph)
* data (kanga-data) <=> [sushi-data](https://github.com/sushiswap/sushi-data)


### Liquidity Provider Gauges => Boomer (Onsen)

There are no specific contracts for Boomer it is a collection of pools.
Will be further reviewed with inspiration from curve gauges.

### TokenHolder Reward Token => xKANGA (xSUSHI)

- [Billabong](https://github.com/KangaFinance/kanga/blob/joey/contracts/Billabong.sol) (SushiBar) - provides xkanga
- [KangaMaker](https://github.com/KangaFinance/kanga/blob/joey/contracts/KangaMaker.sol) - handles "serving up" rewards for xKanga holders by trading tokens collected from fees for Kanga.

### Lending => Troop (Kashi)

- [KangaMakerTroop](https://github.com/KangaFinance/kanga/blob/joey/contracts/KangaMakerTroop.sol) - handles "serving up" rewards for xKanga holders by trading tokens collected from Troop fees for Kanga.

### Flash Loans => Mob (Bento)

The following contracts are held in [kanga](https://github.com/KangaFinance/kanga)

- [KangaMobV1](https://github.com/KangaFinance/kanga/blob/joey/contracts/kangamob/KangaMobV1.sol) - stores funds, handles their transfers, supports flash loans and strategies.
- [PeggedOracleV1](https://github.com/KangaFinance/kanga/blob/joey/contracts/kangamob/PeggedOracleV1.sol)
- [TroopPairMediumRiskV1.sol](https://github.com/KangaFinance/kanga/blob/joey/contracts/kangamob/TroopPairMediumRiskV1.sol)

The following contracts are held in [mob](https://github.com/KangaFinance/mob) in the future it is expected that the strategies may move into it's own repository.

- [Mob](https://github.com/KangaFinance/mob/blob/joey/contracts/Mob.sol) - stores funds, handles their transfers, supports flash loans and strategies.
- [MasterContractManager](https://github.com/KangaFinance/mob/blob/joey/contracts/MasterContractManager.sol) - Other contracts need to register with this master contract so that users can approve them for the mob.
- [Interfaces](https://github.com/KangaFinance/mob/tree/joey/contracts/interfaces)
  - [IFlashLoan](https://github.com/KangaFinance/mob/blob/joey/contracts/interfaces/IFlashLoan.sol) - The flashloan callback. `amount` + `fee` needs to repayed to msg.sender before this call returns.
  - [IMobMinimal](https://github.com/KangaFinance/mob/blob/joey/contracts/interfaces/IMobMinimal.sol) - Minimal interface for Mob token vault interactions - `token` is aliased as `address` from `IERC20` for code simplicity.
  - [IStrategy](https://github.com/KangaFinance/mob/blob/joey/contracts/interfaces/IStrategy.sol) - Send the assets to the Strategy and call skim to invest them.
  - [IWETH](https://github.com/KangaFinance/mob/blob/joey/contracts/interfaces/IWETH.sol) - Wrapped ETH interface (can be used for all native tokens)
- [Strategies](https://github.com/KangaFinance/mob/tree/joey/contracts/strategies)
  - [KangaStrategy](https://github.com/KangaFinance/mob/blob/joey/contracts/strategies/KangaStrategy.sol) - Used for depositing and harvesting tokens invested in staked kanga (billabong)
  - [AaveStrategy](https://github.com/KangaFinance/mob/blob/joey/contracts/strategies/AaveStrategy.sol) - Used for depositing and harvesting tokens invested in staked AAve
  - [BaseStrategy](https://github.com/KangaFinance/mob/blob/joey/contracts/strategies/BaseStrategy.sol) - Reference strategy
  - [Harvester](https://github.com/KangaFinance/mob/blob/joey/contracts/strategies/Harvester.sol) - executes safe harvests

### Yield Farming xKANGA -> KMOB (MEOW)


### Next Generation Exchange => Matilda (Trident)
 
TODO
* Matilda <=> [Trident](https://github.com/sushiswap/trident)
  * Pouch (Built on Mob) <= [Trident Router](https://github.com/sushiswap/trident/blob/master/contracts/TridentRouter.sol)
  * Pools <=> [Pools](https://github.com/sushiswap/trident/tree/master/contracts/pool)

### ZAP Functionality => JUMP (Inari)

- [KangaZap](https://github.com/KangaFinance/jump/blob/main/contracts/KangaZap.sol) - used to invest in given KangaSwap pair through ETH/ERC20 Tokens
- [JumpV1](https://github.com/KangaFinance/jump/blob/main/contracts/JumpV1.sol) - Allows jumping into Lending(Troop) Flash(Mob) AAVE, COMPOUND/CREAM
- [Zenko.sol](https://github.com/KangaFinance/jump/blob/main/contracts/Zenko.sol) - to and from Mob, Troop and Compound/Cream
- [BoringBatchable](https://github.com/KangaFinance/jump/blob/main/contracts/BoringBatchable.sol) - Allows batch calls on itself taking an array of inputs and reverts after a failed call and stops doing further calls.

### Limit Order Functionality

This is held in [LimitOrderV2](https://github.com/KangaFinance/LimitOrderV2/tree/joey/contracts) but may be migrated to [mob](https://github.com/KangaFinance/mob/tree/joey/contracts)

- [KangaFinanceLimitOrderReceiver](https://github.com/KangaFinance/LimitOrderV2/blob/joey/contracts/KangaFinanceLimitOrderReceiver.sol) - Swaps an exact amount of tokens for another token through the path passed as an argument and returns the amount of the final token.
- [StopLimitOrder](https://github.com/KangaFinance/LimitOrderV2/blob/joey/contracts/StopLimitOrder.sol) - manages open orders including filling, cancelling
- [oracles](https://github.com/KangaFinance/LimitOrderV2/tree/joey/contracts/oracles)
  - [ChainLinkOracle](https://github.com/KangaFinance/LimitOrderV2/blob/joey/contracts/oracles/ChainLinkOracle.sol)
- Obsolete [sushiswap-settlement](https://github.com/sushiswap/sushiswap-settlement)

### First Release => Joey (Miso/Trident)

### Adoption => Bounce (SushiRoll)

- [Bounce](https://github.com/KangaFinance/kanga/blob/joey/contracts/KangaBounce.sol) - helps your migrate your existing Uniswap LP tokens to KangaFinance LP ones
- [IMagratorBreeder](https://github.com/KangaFinance/kanga/blob/joey/contracts/MasterBreeder.sol#L12)

```
Perform LP token migration from legacy UniswapV2 to KangaFinance.
Take the current LP token address and return the new LP token address.
Migrator should have full access to the caller's LP token.
Return the new LP token address.

XXX Migrator must have allowance access to UniswapV2 LP tokens.
KangaFinance must mint EXACTLY the same amount of KangaFinance LP tokens or
else something bad will happen. Traditional UniswapV2 does not
do that so be careful!
```

- [Migrator](https://github.com/KangaFinance/kanga/blob/joey/contracts/Migrator.sol) - - Used to migrate liquidity tokens from other protocols

### Infrastructure Contracts

- [Multicall2](https://github.com/KangaFinance/kanga/blob/joey/contracts/Multicall2.sol) - Aggregate results from multiple read-only function calls
- [Ownable](https://github.com/KangaFinance/kanga/blob/joey/contracts/Ownable.sol) - Used for transferring ownerhsip of contracts

### Tokenomics (Vesting/Governance)

- [Timelock](https://github.com/KangaFinance/kanga/blob/joey/contracts/governance/Timelock.sol) - Allows the setting on new admins and queuing of transactions

## Future - Matilda Release

### Aggregation

### Cross Chain Settlement

### Liquidity Strategies

### Asset Management

### Scheduling Functionality

### Specific Trading Use Cases - Bonding Curves

- StableSwap
- PriceOracleSwap
- Liquidity Bootstrapping Pool
- MulitToken Pools
- Concentrated Liquidity
- Adaptive Bonding Curve

### Staking Derivatives

### NFT Launchpad

### NFT Derivatives

### DAO
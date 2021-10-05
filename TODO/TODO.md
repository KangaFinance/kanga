### TODO Tasklist


* Deploy Uniswap pair and erc20
  * https://github.com/Uniswap/v2-core/issues/102
  * Note init hashes are different in the Uniswap libraries
  * Need to generate bytecode and get the inithash
* Update deploy to deploy all contracts
* Consolidate the contracts into core and make deployment composible



* Review
  * Core
    * MasterBreeder Tests are failing
  * SDK
  * mob
  * mob-sdk
  * troop-lending
  * kanga-interface
  * Chake on deploying KangaFinanceFactoryMock and KanagFactoryPairMock (from Uniswap)

#### Harmony Compatability
* [Harmony Compatability](./HARMONY.md)
* High Level
  * AMM -> Kanga Finance
  * Token -> Kanga
  * Lending -> Troop
  * Flash Loans -> KangaMob(Mob)
  * Token Holder Rewards -> Billabong
  * Liquidity Rewards -> Boomer
  * Vampire -> KangaBounce(Bounce)
* High Level Mapping
  * SUSHI -> Kanga
  * sushiswap -> kangafinance
  * Chef -> Breeder
  * Bar -> Billabong
  * BentoBox -> KangaMob (BENTO -> KMOB)
  * Kashi -> Troop (KASHI -> KTROOP)
  * Onsen -> Boomer
* Update Core to use Kanga (not Sushi)
  * Update kanga
  * update kanga-sdk
  * update kanga-data
  * update kanga-api
  * update kanga-interface
* Update all tokens and naming
  * bentobox -> (Mob)
    * BentoBoxV1 -> MobV1
    * KashiPairMediumRiskV1 -> TroopPairMediumRiskV1
    * PeggedOracleV1
  * governance
    * TimeLock.sol
  * Interfaces
    * IERC20
    * IMasterChef -> IMasterBreeder
    * IMiniChefV2 -> IMiniBreederV2
    * IRewarder
  * Uniswapv2
    * UniswapV2ERC20
    * UniswapV2Factory
    * UniswapV2Pair -> SLP -> KLP
    * UniswapV2Router02
  * MasterChef -> MasterBreeder
  * MasterChefV2 -> MasterBreederV2
  * Migrator
  * MiniChefV2 -> MiniBreederV2
  * Multicall2
  * Ownable
  * SushiBar -> Pit -> Billabong
  * SushiMaker -> PitBreeder -> KangaMaker
  * SushiMakerKashi -> KangaMakerTroop
  * SushiRoll.sol -> KangaBounce (Used if Vampiring other Protocols)
  * SushiToken -> Governance -> KangaToken
    * GovernanceVote (is in Venomswap but not in sushi) 
      * https://docs.venomdao.org/viper/governance#vipervote-design
* Use yarn 1.22.11 everywhere 
  * `yarn set version 1.22.11`
  * `yarn policies set-version 1.22.11` 
* Publish all packages
* Test with UI
  * Create Feature Map in Miro
  * Update all Icons
  * Update all Text
  * [Update Default Token List](https://github.com/VenomProtocol/venomswap-interface/commit/78d6934909d2d802118b532f5f7cdf7ae8cd1347)
* Check all Repos are on Joey Branch
* Check all ReposUse yarn 1.22.11 everywhere
* Publish on AWS
* Docs
* Community Material
* Roadmap
  * Tokenomics
    * Vesting
    * Governance
    * Liquidity Gauges
  * Trident Migration
  * Fixed Bonding Curve
  * [Bento Box](https://github.com/sushiswap/bentobox) -> Mob
  * [Kashi Lending](https://github.com/sushiswap/kashi-lending) -> Troop Lending
  * Limit Orders
  * Aggregation
  * Asset Management
  * Crosschain Liquidity Management - Yield Strategies
    * Keeper Network
    * Settlement Chain
  * Additional Features
    * NFT's
    * 







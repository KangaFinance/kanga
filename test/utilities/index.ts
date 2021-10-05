import { ethers } from "hardhat"
const { BigNumber } = require("ethers")
const { ethers: { constants: { MaxUint256 }}} = require("ethers")

export const BASE_TEN = 10
export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000"

export function encodeParameters(types, values) {
  const abi = new ethers.utils.AbiCoder()
  return abi.encode(types, values)
} 

export async function prepare(thisObject, contracts) {
  for (let i in contracts) {
    let contract = contracts[i]
    thisObject[contract] = await ethers.getContractFactory(contract)
  }
  thisObject.signers = await ethers.getSigners()
  thisObject.alice = thisObject.signers[0]
  thisObject.bob = thisObject.signers[1]
  thisObject.carol = thisObject.signers[2]
  thisObject.dev = thisObject.signers[3]
  thisObject.alicePrivateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
  thisObject.bobPrivateKey = "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"
  thisObject.carolPrivateKey = "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a"
}

export async function deploy(thisObject, contracts) {
  for (let i in contracts) {
    let contract = contracts[i]
    thisObject[contract[0]] = await contract[1].deploy(...(contract[2] || []))
    await thisObject[contract[0]].deployed()
  }
}

export async function createKLP(thisObject, name, tokenA, tokenB, amount) {
  const createPairTx = await thisObject.factory.createPair(tokenA.address, tokenB.address)

  const _pair = (await createPairTx.wait()).events[0].args.pair

  thisObject[name] = await thisObject.UniswapV2Pair.attach(_pair)

  await tokenA.transfer(thisObject[name].address, amount)
  await tokenB.transfer(thisObject[name].address, amount)

  await thisObject[name].mint(thisObject.alice.address)
}

export async function addLiquidityKLP(thisObject, name, tokenA, tokenB, amountA, amountB, minA, minB, account) {
  // currencyA?.wrapped?.address ?? '',
  // currencyB?.wrapped?.address ?? '',
  // parsedAmountA.quotient.toString(),
  // parsedAmountB.quotient.toString(),
  // amountsMin[Field.CURRENCY_A].toString(),
  // amountsMin[Field.CURRENCY_B].toString(),
  // account,
  // deadline.toHexString(),

  // console.log(`currencyA: ${JSON.stringify(tokenA.symbol())} ${JSON.stringify(tokenA.address)}`)
  // console.log(`currencyB: ${JSON.stringify(thisObject.usdc.symbol())} ${JSON.stringify(tokenB.address)}`)
  // console.log(`parsedAmountA: ${JSON.stringify(amount.toString())}`)
  // console.log(`parsedAmountB: ${JSON.stringify(amount.toString())}`)
  // console.log(` amountsMin[Field.CURRENCY_A]: ${JSON.stringify(getBigNumber(0).toString())}`)
  // console.log(`amountsMin[Field.CURRENCY_B]: ${JSON.stringify(getBigNumber(0).toString())}`)
  // console.log(`account: ${JSON.stringify(account)}`)
  // console.log(`deadline: ${JSON.stringify(getBigNumber(10000000).toString())}`)
  // console.log(`thisObject.factory.address: ${JSON.stringify(thisObject.factory.address)}`)
  // console.log(`thisObject.router.address: ${JSON.stringify(thisObject.router.address)}`)
  // console.log(`thisObject.uniswapPair.address: ${JSON.stringify(thisObject.uniswapPair.address)}`)
  // console.log(`thisObject.uniswapV2ERC20.address: ${JSON.stringify(thisObject.uniswapV2ERC20.address)}`)
  
  const gasEstimate = await thisObject.router.estimateGas.addLiquidity(tokenA.address, tokenB.address, amountA, amountB, minA, minB, account,  MaxUint256) 
  console.log(`gasEstimate: ${JSON.stringify(gasEstimate)}`)
  const createPairTx = await thisObject.router.addLiquidity(tokenA.address, tokenB.address, amountA, amountB, minA, minB, account,  MaxUint256)
  // const createPairTx = await thisObject.router.addLiquidity(tokenA.address, tokenB.address, amount.toString(), amount.toString(), getBigNumber(0).toString(), getBigNumber(0).toString(), account,  MaxUint256)

}

// Defaults to e18 using amount * 10^18
export function getBigNumber(amount, decimals = 18) {
  return BigNumber.from(amount).mul(BigNumber.from(BASE_TEN).pow(decimals))
}



export * from "./time"

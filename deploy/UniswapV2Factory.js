// NOTE
// You must do an initial deploy to generate the bytecode it looks like this

module.exports = async function ({
  ethers,
  getNamedAccounts,
  deployments,
  getChainId,
}) {
  const { deploy } = deployments;

  const { deployer, dev } = await getNamedAccounts();

  await deploy("UniswapV2Factory", {
    from: deployer,
    args: [dev],
    log: true,
    deterministicDeployment: false,
  });
};

module.exports.tags = ["UniswapV2Factory", "AMM"];


//NOTE 
// after the initial factory deploy you need to get the init_code_hash and update the uniswap library getPair
// https://github.com/Uniswap/v2-core/issues/102
// https://ethereum.stackexchange.com/questions/89680/what-is-init-code-hash-and-how-is-it-calculated-used-in-defi-smart-contracts
// INIT_CODE_HASH = "0x2b3916d184be5391113dc61053ef6e55b1214905619aa198de8ef903f9acffd2"
// The above uses keccak256 the below inserts a method into the contract itself
// When deploying the below tests worked in the core however sushiswap uses the above method
// so we are implementing this and removing the tests for adding liquidity in core
// TODO get working liquidity tests in core.
// https://ethereum.stackexchange.com/questions/88075/uniswap-addliquidity-function-transaction-revert
// const INIT_CODE_HASH = "0xb96a05d90581cfac1f99c92b02f2e69fbca4e5c26498be0dc204d91318c9f56b"
// const COMPUTED_INIT_CODE_HASH = await this.factory.INIT_CODE_PAIR_HASH()
// expect(COMPUTED_INIT_CODE_HASH).to.equal(INIT_CODE_HASH)


// After the initial deploy then use the following code
// Defining bytecode and abi from original contract copied from harmony testnet deploy to ensure bytecode matches and it produces the same pair code hash


/*
const {
  bytecode,
  abi,
} = require("../deployments/master/UniswapV2Factory.json");

module.exports = async function ({
  ethers,
  getNamedAccounts,
  deployments,
  getChainId,
}) {
  const { deploy } = deployments;

  const { deployer, dev } = await getNamedAccounts();

  await deploy("UniswapV2Factory", {
    contract: {
      abi,
      bytecode,
    },
    from: deployer,
    args: [dev],
    log: true,
    deterministicDeployment: false,
  });
};

module.exports.tags = ["UniswapV2Factory", "AMM"];

*/
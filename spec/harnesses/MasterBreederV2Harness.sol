pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;

import "../../contracts/MasterBreederV2.sol";

contract MasterBreederV2Harness is MasterBreederV2 {
    ////////////////////////////////////////////////////////////////////////////
    //                         Constructors and inits                         //
    ////////////////////////////////////////////////////////////////////////////
    constructor(IMasterBreeder _MASTER_BREEDER, IERC20 _kanga, uint256 _MASTER_PID)
                    MasterBreederV2(_MASTER_BREEDER, _kanga, _MASTER_PID) public { }

    ////////////////////////////////////////////////////////////////////////////
    //                        Getters for The Internals                       //
    ////////////////////////////////////////////////////////////////////////////
    function userInfoAmount(uint256 pid, address user) public view returns (uint256) {
        return userInfo[pid][user].amount;
    }

    function userInfoRewardDebt(uint256 pid, address user) public view returns (int256) {
        return userInfo[pid][user].rewardDebt;
    }

    function userLpTokenBalanceOf(uint256 pid, address user) public view returns (uint256) {
        return lpToken[pid].balanceOf(user);
    }

    function poolInfoAccKangaPerShare(uint256 pid) public view returns (uint128) {
        return poolInfo[pid].accKangaPerShare;
    }

    function poolInfoLastRewardBlock(uint256 pid) public view returns (uint64) {
        return poolInfo[pid].lastRewardBlock;
    }

    function poolInfoAllocPoint(uint256 pid) public view returns (uint64) {
        return poolInfo[pid].allocPoint;
    }

    ////////////////////////////////////////////////////////////////////////////
    //                           Overrided Methods                            //
    ////////////////////////////////////////////////////////////////////////////
    function batch(bytes[] calldata calls, bool revertOnFail) override external
            payable returns(bool[] memory successes, bytes[] memory results) { }

    mapping(uint256 => uint256) symbolicKangaPerBlock; // random number
    function kangaPerBlock() public view override returns (uint256 amount) {
        return symbolicKangaPerBlock[block.number];
    }

    ////////////////////////////////////////////////////////////////////////////
    //                            General Helpers                             //
    ////////////////////////////////////////////////////////////////////////////
    // helpers for int operations since in spec it is not possible
    function compare(int256 x, int256 y) external pure returns (bool) {
		return x <= y;
	}

    function compareUint128(uint128 x, uint128 y) external pure returns (bool) {
		return x >= y;
	}

    ////////////////////////////////////////////////////////////////////////////
    //                     Helper Functions for Invariants                    //
    ////////////////////////////////////////////////////////////////////////////
    // for invariants we need a function that simulate the constructor 
	function init_state() public { }

    function lpTokenLength() public view returns (uint256) {
        return lpToken.length;
    }

    function rewarderLength() public view returns (uint256) {
        return rewarder.length;
    }
}
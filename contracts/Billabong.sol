// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

// Billabong is the coolest watering hole. You come in with some Kanga, and leave with more! The longer you stay, the more Kanga you get.
//
// This contract handles swapping to and from xKanga, KangaFinance's staking token.
contract Billabong is ERC20("Billabong", "xKANGA"){
    using SafeMath for uint256;
    IERC20 public kanga;

    // Define the Kanga token contract
    constructor(IERC20 _kanga) public {
        kanga = _kanga;
    }

    // Enter the billabong. Pay some KANGAs. Earn some shares.
    // Locks Kanga and mints xKanga
    function enter(uint256 _amount) public {
        // Gets the amount of Kanga locked in the contract
        uint256 totalKanga = kanga.balanceOf(address(this));
        // Gets the amount of xKanga in existence
        uint256 totalShares = totalSupply();
        // If no xKanga exists, mint it 1:1 to the amount put in
        if (totalShares == 0 || totalKanga == 0) {
            _mint(msg.sender, _amount);
        } 
        // Calculate and mint the amount of xKanga the Kanga is worth. The ratio will change overtime, as xKanga is burned/minted and Kanga deposited + gained from fees / withdrawn.
        else {
            uint256 what = _amount.mul(totalShares).div(totalKanga);
            _mint(msg.sender, what);
        }
        // Lock the Kanga in the contract
        kanga.transferFrom(msg.sender, address(this), _amount);
    }

    // Leave the billabong. Claim back your KANGAs.
    // Unlocks the staked + gained Kanga and burns xKanga
    function leave(uint256 _share) public {
        // Gets the amount of xKanga in existence
        uint256 totalShares = totalSupply();
        // Calculates the amount of Kanga the xKanga is worth
        uint256 what = _share.mul(kanga.balanceOf(address(this))).div(totalShares);
        _burn(msg.sender, _share);
        kanga.transfer(msg.sender, what);
    }
}

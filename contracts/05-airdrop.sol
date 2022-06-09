//SPDX-License-Identifier: GPL-3-0

pragma solidity >=0.7.0 <0.9.0;

import "./03-token.sol";

contract Airdrop {

    // Using Libs

    // Struct

    // Enums
    enum status { ACTIVE, PAUSED, CANCELLED } // ACTIVE=0, PAUSED=1, CANCELLED=2 -- é como se fosse um uint8

    // Properties
    address private owner;
    address public tokenAddress;
    address[] private subscribers;
    status contractState;

    // Modifiers
    modifier isOwner() {
        require(msg.sender == owner, "Sender is not owner!");
        _;
    }

    // Events

    // Constructor
    constructor(address token) {
        owner = msg.sender;
        tokenAddress = token; // endereço do contrato 03-token que tem o cryptotoken
        contractState = status.ACTIVE;

    }

    // Public Functions
    function subscribe() public returns(bool) {
        //TODO: need implementation
    }

    function execute() public isOwner returns(bool) {
        
        uint256 balance = CryptoToken(tokenAddress).balanceOf(address(this));
        require(balance > 0, "Insufficient balance to start airdrop");

        uint256 amountToTranfer = balance / subscribers.length;
        for (uint256 i = 0; i < subscribers.length; i++) {
            require(subscribers[i] != address(0));
            require(CryptoToken(tokenAddress).transfer(subscribers[i], amountToTranfer));
        }

        return true;
    }

    function state() public view returns(status) {
        return contractState;
    }

    // Private Functions
    function hasSubscribed(address subscriber) private returns(bool) {
        //TODO: need implementation
    }

    // Kill
    function kill() public isOwner {
        //TODO: need implementation
    }

}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract OfferVerification {
    mapping(bytes32 => address) public offers;

    function addOffer(bytes32 offerHash) public {
        require(offers[offerHash] == address(0), "Offer already exists");
        offers[offerHash] = msg.sender;
    }

    function verifyOffer(bytes32 offerHash) public view returns (bool) {
        return offers[offerHash] != address(0);
    }

    function getIssuer(bytes32 offerHash) public view returns (address) {
        return offers[offerHash];
    }
}
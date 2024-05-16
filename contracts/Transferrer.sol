// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Transferrer is ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("NFTContract", "NFTC") {}

    function mint(address to) public onlyOwner {
        _tokenIdCounter.increment();
        uint256 newTokenId = _tokenIdCounter.current();
        _mint(to, newTokenId);
    }

    function batchTransfer(address contractAddress, address[] memory to, uint256[] memory tokenIds) public onlyOwner {
        require(to.length == tokenIds.length, "Arrays length mismatch");
        
        for (uint256 i = 0; i < to.length; i++) {
            transferFrom(contractAddress, to[i], tokenIds[i]);
        }
    }

    
}

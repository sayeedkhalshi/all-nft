// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTContract is ERC721, ERC721Enumerable, ERC721URIStorage {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    uint256 MAX_SUPPLY = 100000; // Updated max supply
    address public owner;

    constructor(string memory name, string memory symbol, string memory uri) ERC721(name, symbol) {
        owner = msg.sender;

        for (uint256 i = 0; i < 10; i++) {
            _tokenIdCounter.increment();
            _safeMint(owner, _tokenIdCounter.current());
            _setTokenURI(_tokenIdCounter.current(), uri);
        }
    }

    function mint(string memory uri) public {
        require(msg.sender == owner, "Only the contract owner can call this function");
        require(_tokenIdCounter.current() < MAX_SUPPLY, "Exceeds maximum supply");
        
        _tokenIdCounter.increment();
        _safeMint(owner, _tokenIdCounter.current());
        _setTokenURI(_tokenIdCounter.current(), uri);
    }

    function batchMint(string memory uri) public {
        require(msg.sender == owner, "Only the contract owner can call this function");
        require(_tokenIdCounter.current() < MAX_SUPPLY, "Exceeds maximum supply");
        
          for (uint256 i = 0; i < 90; i++) {
            _tokenIdCounter.increment();
            _safeMint(owner, _tokenIdCounter.current());
            _setTokenURI(_tokenIdCounter.current(), uri);
        }
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

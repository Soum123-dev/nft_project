// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0

pragma solidity ^0.8.20;

import "@openzeppelin/contracts@5.0.2/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@5.0.2/access/Ownable.sol";

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";


contract Joker3 is ERC721, Ownable{
        uint256 private nextToken;
        uint256 public totalOfNft;

        constructor(address initialOwner)
        ERC721("JOKER_3", "JK3")
        Ownable(initialOwner)
        {}

        function transferNFT(address from, address to, uint256 tokenId) public {
    safeTransferFrom(from, to, tokenId);
        }

        function tokenURI(uint256 /*tokenId*/) public view virtual override returns (string memory) {
    return string(abi.encodePacked("ipfs://https://ipfs.io/ipfs/QmbSFrWnUZDJ6dxDKnDhQsW5MZk5PhJJNAhBUWtqWakTa4?filename=joker.jpg"));
    }



        function mint(address to)public onlyOwner{
            uint256 tokenId= nextToken++;
            _mint(to,tokenId);
            totalOfNft++;
        }
}
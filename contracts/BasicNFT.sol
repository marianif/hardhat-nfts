// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/**
 * @notice in this basic demo everybody who mints a NFT will refer to the same image,
 * in this case the dog image. This is why we hardcoded the Token Uri as a constant.
 * In other demo, we'll be able to generate a new image and uri every time a new
 * token is minted
 */

contract BasicNFT is ERC721 {
    string public constant TOKEN_URI =
        "ipfs://ipfs://bafybeifmbyvohnrmieanfray7d3k2a2q3jimhkghp4s3fs5tj3iueaajzm/";
    // Keep track of the count of minted new tokens
    uint256 private s_tokenCounter;

    // initialized token with name and symbol
    constructor() ERC721("Fluffy", "DOG") {
        // init number of token to 0
        s_tokenCounter = 0;
    }

    // a function that allow to create new token on the fly
    // it takes two arguments: the owner and the token id
    // in this scenario tokenCounter acts like tokenIds provider
    function mintNft() public returns (uint256) {
        _safeMint(msg.sender, s_tokenCounter);
        s_tokenCounter += 1;
        return s_tokenCounter;
    }

    // ovveride the tokenURI function
    // In this scenario every token minted will show the same image/dog
    function tokenURI(
        uint256 /*tokenId*/
    ) public pure override returns (string memory) {
        return TOKEN_URI;
    }

    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }
}

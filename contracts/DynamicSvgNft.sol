// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.7;

/**
 * @notice this contract allows to mint a dynamic nft that shows one image if the price
 * of ETH is above a defined threshold and another image if the price is below that threshold.
 * We are also able to store our SVG information on-chain
 */

import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "base64-sol/base64.sol";

contract DynamicNft is ERC721, Ownable {
    uint256 private s_tokenCounter;
    string private i_sadSvgURI;
    string private i_happySvgURI;
    string private constant base64EncodedSvgPrefix =
        "data:image/svg+xml;base64,";
    AggregatorV3Interface internal immutable i_priceFeed;

    constructor(
        address priceFeedAddress,
        string memory sadSvg,
        string memory happySvg
    ) ERC721("Dynamic SVG Nft", "DYN") {
        s_tokenCounter = 0;
        i_sadSvgURI = svgToImageURI(sadSvg);
        i_happySvgURI = svgToImageURI(happySvg);
        i_priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    function svgToImageURI(string memory svg)
        public
        pure
        returns (string memory)
    {
        // string memory baseURL = "data:image/svg+xml;base64,";
        string memory svgBase64Encoded = Base64.encode(
            bytes(string(abi.encodePacked(svg)))
        );
        return
            string(abi.encodePacked(base64EncodedSvgPrefix, svgBase64Encoded));
    }

    function mintNft(string memory sadSvg, string memory happySvg) public {
        _safeMint(msg.sender, s_tokenCounter);
        s_tokenCounter += 1;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "data:application/json;base64,";
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(_exists(tokenId), "URI query for nonexistent token");

        (, uint256 price, , , ) = i_priceFeed.latestRoundData();
string memory imageURI = i_sadSvgURI;
        if(price >= ???) {
          imageURI = i_happySvgURI
        }
        /**
         * @dev we created a json string, then encoded it in bytes that we can encode in base64
         * then we appended it to a baseURI
         */
        return
            string(
                Base64.encode(
                    _baseURI(),
                    bytes(
                        abi.encodePacked(
                            '{"name":"',
                            name(), // You can add whatever name here
                            '", "description":"An NFT that changes based on the Chainlink Feed", ',
                            '"attributes": [{"trait_type": "coolness", "value": 100}], "image":"',
                            imageURI,
                            '"}'
                        )
                    )
                )
            );
    }
}

import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();

    // Replace with the address of the ERC721 contract
    const erc721Address = "0x8caB17dF995153DE282FE3D05647a81d89dA317b";
    const erc721ABI = [
        "function tokenURI(uint256 tokenId) public view returns (string memory)",
    ];

    // Create an instance of the ERC721 contract
    const erc721Contract = new ethers.Contract(
        erc721Address,
        erc721ABI,
        deployer
    );

    // Replace with the token ID you want to fetch the URI for
    const tokenId = 1;

    try {
        const tokenURI = await erc721Contract.tokenURI(tokenId);
        console.log("Token URI:", tokenURI);
    } catch (error) {
        console.error("Error fetching token URI:", error);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

import { ethers, run } from "hardhat";
import { nftNameSymbolList } from "../../nft-name-symbol";

async function main() {
    const name = "Donald Trump";
    const symbol = "TRUMP";
    const uri =
        "https://ipfs.io/ipfs/bafkreidbwxxiowrlwylfqddx3d7hpmb55hfg3ddccp7gxzskcjp27im2ze";

    //console.log("Deploying contracts with the account:", deployer.address);

    // Deploy FlashLoanExample contract
    const NFTContract = await ethers.getContractFactory("Trump");
    const [deployer] = await ethers.getSigners();
    const nonce = await deployer.getNonce();
    console.log("Deploying NFT contract with nonce:", nonce);
    const nftContract = await NFTContract.deploy(name, symbol, uri, {
        nonce: nonce,
    });

    console.log("NFT contract address:", nftContract.target);
}
//}

// Run the deployment

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

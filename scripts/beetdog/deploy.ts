import { ethers, run } from "hardhat";
import { nftNameSymbolList } from "../../nft-name-symbol";

async function main() {
    const name = "Beet Dog";
    const symbol = "BTG";
    const uri = "https://proxy.dogami.com/metadata/dogami/matic/12463";

    //console.log("Deploying contracts with the account:", deployer.address);

    // Deploy FlashLoanExample contract
    const NFTContract = await ethers.getContractFactory("BeetDog");
    const [deployer] = await ethers.getSigners();
    const nonce = await deployer.getNonce();
    console.log("Deploying NFT contract with nonce:", nonce);
    const nftContract = await NFTContract.deploy(name, symbol, uri, {
        nonce: nonce,
    });

    //0x486a3B83DAC77f566c3879c609828acB9C2EAfF3

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

import { ethers, run } from "hardhat";
import { nftList } from "./nftList";
import path from "path";
import fs from "fs";

async function main() {
    // Deploy FlashLoanExample contract
    const NFT = await ethers.getContractFactory("NFT");
    const [deployer] = await ethers.getSigners();
    const progressFilePath = path.join(__dirname, "progress.json");

    //console.log("Deploying contracts with the account:", deployer.address);

    let currentIndex = 0;

    if (fs.existsSync(progressFilePath)) {
        const progress = JSON.parse(fs.readFileSync(progressFilePath, "utf8"));
        currentIndex = progress.currentIndex;
    }

    for (let i = currentIndex; i < nftList.length; i++) {
        const nft = nftList[i];
        const { name, symbol, uri } = nft;

        const nonce = await deployer.getNonce();
        console.log("Deploying NFT contract with nonce:", nonce);
        const nFT = await NFT.deploy(name, symbol, uri, {
            nonce: nonce,
        });

        //0x486a3B83DAC77f566c3879c609828acB9C2EAfF3

        console.log("NFT contract address:", nFT.target);

        fs.writeFileSync(
            progressFilePath,
            JSON.stringify({ currentIndex: currentIndex + 1 })
        );
    }
}
//}

// Run the deployment

async function start() {
    while (true) {
        try {
            await main();
            console.log("Process completed successfully.");
            break;
        } catch (error) {
            console.error("Error occurred, restarting process:", error);
            await new Promise((resolve) => setTimeout(resolve, 5000));
        }
    }
}

start().then(() => process.exit(0));

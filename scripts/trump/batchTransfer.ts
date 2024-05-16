import { ethers } from "hardhat";
import fs from "fs";
import path from "path";

async function main() {
    const [owner] = await ethers.getSigners();

    const progressFilePath = path.join(__dirname, "progress.json");

    const nftContractAddress = "0x7D8A89BEecbd503891055f259e8307d8fc8f50Aa"; // Replace with your deployed NFT contract address
    const nftContract = await ethers.getContractAt("Trump", nftContractAddress);

    const totalMints = 100000;
    const batchSize = 88;
    const batches = Math.ceil(totalMints / batchSize);

    let currentIndex = 0;

    if (fs.existsSync(progressFilePath)) {
        const progress = JSON.parse(fs.readFileSync(progressFilePath, "utf8"));
        currentIndex = progress.currentIndex;
    }

    console.log(
        `Batch transaferring ${totalMints} NFTs from batch ${currentIndex}...`
    );
    const addresses = JSON.parse(
        fs.readFileSync(
            path.join(__dirname, "..", "..", "addresses.json"),
            "utf8"
        )
    );

    for (let i = currentIndex; i < batches; i++) {
        const startIndex = batchSize * i;
        const endIndex = startIndex + batchSize - 1;

        const subArray = addresses.slice(startIndex, endIndex + 1);
        console.log(subArray.length);

        const [deployer] = await ethers.getSigners();
        const nonce = await deployer.getNonce();

        const tx = await nftContract.batchTransfer(subArray, startIndex + 1, {
            nonce: nonce,
        });

        console.log(`batch ${i} transferred`);
        console.log(`Transaction hash: ${tx.hash}`);

        // Wait for the transaction to be confirmed
        await tx.wait();
        console.log(`Transaction confirmed for batch ${i}`);

        currentIndex = i + 1;

        // Save progress to JSON file
        fs.writeFileSync(progressFilePath, JSON.stringify({ currentIndex }));
    }
}

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

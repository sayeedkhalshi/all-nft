import { ethers, run } from "hardhat";
import fs from "fs";
import path from "path";

async function main() {
    const [owner] = await ethers.getSigners();

    const nftContractAddress = "0x9EB54604677546a56Af725D8bDe808ef4724EA2B"; // Replace with your deployed NFT contract address
    const nftContract = await ethers.getContractAt(
        "NFTContract",
        nftContractAddress
    );

    const batchStarts = 28001;

    // Read addresses from addresses.json
    const addresses = JSON.parse(
        fs.readFileSync(path.join(__dirname, "..", "addresses.json"), "utf8")
    );

    for (let i = 2800; i < addresses.length; i++) {
        try {
            const [deployer] = await ethers.getSigners();
            const nonce = await deployer.getNonce();

            const receiverAddress = addresses[i];

            const tx = await nftContract.transferFrom(
                owner.address,
                receiverAddress,
                batchStarts + i,
                {
                    nonce: nonce,
                }
            );

            console.log(`${i} transferred to ${receiverAddress}`);
            console.log(`Transaction hash: ${tx.hash}`);

            // Wait for the transaction to be confirmed
            await tx.wait();
            console.log(`Transaction confirmed for ${i}`);
        } catch (error) {
            console.error(`Error at index ${i}:`, error);
            continue; // Continue to the next iteration of the loop
        }
    }
}

async function start() {
    while (true) {
        try {
            await main();
            console.log("Process completed successfully.");
            break; // Exit the loop if the process completes without error
        } catch (error) {
            console.error("Error occurred, restarting process:", error);
            await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds before restarting
        }
    }
}

start().then(() => process.exit(0));

import { ethers, run } from "hardhat";

async function main() {
    //vanar"0xc872Cf5CBA8986Fb3F81B108975c202E48BaA841";
    //tabi joker rhapsody"0x9EB54604677546a56Af725D8bDe808ef4724EA2B";
    const nftContractAddress = "0x486a3B83DAC77f566c3879c609828acB9C2EAfF3"; //mathew perry
    const nftContract = await ethers.getContractAt(
        "BeetDog",
        nftContractAddress
    );

    const uri = "https://proxy.dogami.com/metadata/dogami/matic/12463"; // <--Mather perry // joker rhapsody --> "https://zrouuobk5jzwx532uiwtf5pswh2xvwrmaats4iwu6t4yk7p3as6a.arweave.net/zF1KOCrqc2v3eqItMvXysfV62iwAJy4i1PT5hX37BLw"; // Replace with your token URI

    const totalMints = 100000;
    const batchSize = 100;
    const batches = totalMints / batchSize;

    console.log(`Batch minting ${totalMints} NFTs...`);

    for (let i = 0; i < batches; i++) {
        //await new Promise((resolve) => setTimeout(resolve, 3000));

        const [deployer] = await ethers.getSigners();
        const nonce = await deployer.getNonce();
        console.log(`Batch ${i + 1}/${batches}`);
        const tx = await nftContract.batchMint(uri, {
            nonce: nonce,
        });

        console.log(`Transaction hash: ${tx.hash}`);

        // Wait for the transaction to be confirmed
        await tx.wait();
        console.log(`Mint confirmed for ${i}`);
    }

    console.log("Batch minting completed!");
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

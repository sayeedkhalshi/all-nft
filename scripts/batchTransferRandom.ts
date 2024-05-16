import { ethers, run } from "hardhat";

async function main() {
    const [owner] = await ethers.getSigners();

    const nftContractAddress = "0x9EB54604677546a56Af725D8bDe808ef4724EA2B"; // Replace with your deployed NFT contract address
    const nftContract = await ethers.getContractAt(
        "NFTContract",
        nftContractAddress
    );

    const batchStarts = 24001;
    const batchEnds = 34000;

    for (let i = batchStarts; i < batchEnds; i++) {
        await new Promise((resolve) => setTimeout(resolve, 5000));

        const [deployer] = await ethers.getSigners();
        const nonce = await deployer.getNonce();

        const randomMnemonic = ethers.Wallet.createRandom().mnemonic;
        if (randomMnemonic) {
            const wallet = ethers.Wallet.fromPhrase(randomMnemonic.phrase);

            const tx = await nftContract.transferFrom(
                owner.address,
                wallet.address,
                i,
                {
                    nonce: nonce,
                }
            );

            console.log(`${i} transferred to ${wallet.address}`);
            console.log(`Transaction hash: ${tx.hash}`);

            // Wait for the transaction to be confirmed
            await tx.wait();
            console.log(`Transaction confirmed for ${i}`);
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch(async (error) => {
        console.error(error);
        await new Promise((resolve) => setTimeout(resolve, 10000));
        main();
    });

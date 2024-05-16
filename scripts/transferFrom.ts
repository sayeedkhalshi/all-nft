import { ethers } from "hardhat";
import fs from "fs";
import path from "path";

async function main() {
    const [owner] = await ethers.getSigners();
    const alreadyDone = 179;

    const nftContractAddress = "0x9EB54604677546a56Af725D8bDe808ef4724EA2B"; // NFT contract address
    const approvedAddress = "0x5aCD933C27Be19459703c802EcfBf380b6c156eb"; // Address of the approved contract

    try {
        const nftContract = await ethers.getContractAt(
            "NFTContract",
            nftContractAddress
        );

        const approveTx = await nftContract.setApprovalForAll(
            approvedAddress,
            true
        );
        await approveTx.wait();

        const approvedContract = await ethers.getContractAt(
            "Transferrer", // Ensure this matches the correct contract name
            approvedAddress
        );

        const addresses = JSON.parse(
            fs.readFileSync(
                path.join(__dirname, "..", "addresses.json"),
                "utf8"
            )
        );

        const start = 28747;
        const end = start + addresses.length - 1;

        const tokenIds = Array.from(
            { length: end - start + 1 },
            (_, i) => start + i
        );

        let batchSize = 90;

        const approvedSigner = await ethers.provider.getSigner(approvedAddress);
        const approvedContractWithSigner =
            approvedContract.connect(approvedSigner);

        for (let i = alreadyDone; i < tokenIds.length; i += batchSize) {
            const chunk1 = addresses.slice(i, i + batchSize);
            const chunk2 = tokenIds.slice(i, i + batchSize);
            console.log(chunk1);
            console.log(chunk2);

            const nonce = await approvedSigner.getNonce();

            const transferTx = await approvedContractWithSigner.batchTransfer(
                nftContractAddress,
                chunk1,
                chunk2,
                {
                    nonce: nonce,
                }
            );
            await transferTx.wait();

            console.log(
                `Transferred NFTs from ${nftContractAddress} to corresponding addresses using ${approvedAddress}`
            );
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

main()
    .then(() => process.exit(0))
    .catch(async (error) => {
        console.error(error);
        await new Promise((resolve) => setTimeout(resolve, 10000));
        main();
    });

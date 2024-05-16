import { ethers } from "hardhat";

async function main() {
    const [owner] = await ethers.getSigners();

    const nftContractAddress = "0x9EB54604677546a56Af725D8bDe808ef4724EA2B"; // NFT contract address
    const approvedAddress = "0x5aCD933C27Be19459703c802EcfBf380b6c156eb"; // Address of the contract to be approved

    const nftContract = await ethers.getContractAt(
        "NFTContract",
        nftContractAddress
    );

    // Approve the NFT contract to transfer all the NFTs on behalf of the owner
    const approveTx = await nftContract.setApprovalForAll(
        approvedAddress,
        true
    );
    await approveTx.wait();

    console.log(
        `${approvedAddress} is approved NFT contract ${nftContractAddress} to transfer all NFTs on behalf of ${owner.address}`
    );
}

main()
    .then(() => process.exit(0))
    .catch(async (error) => {
        console.error(error);
        await new Promise((resolve) => setTimeout(resolve, 10000));
        main();
    });

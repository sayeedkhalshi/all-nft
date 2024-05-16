import { ethers } from "hardhat";

async function main() {
    const nftContractAddress = "0x157a189C1455ACBF2aD5A940d02596432d27ABAE"; //mathew perry
    const nftContract = await ethers.getContractAt(
        "TestThousandMint",
        nftContractAddress
    );

    const uri =
        "https://meme.market/api/metadata/media/mtu_NvhZKStEQrD3L8MPb53D7Vy5MsqFg50kzLxt4oIOvIhn0dtTyH63dH7O7lTeFyvW"; // Replace with your token URI

    const estimatedGas = await ethers.provider.estimateGas({
        to: nftContractAddress,
        data: nftContract.interface.encodeFunctionData("batchMint", [uri]),
    });

    const tx = await nftContract.batchMint(uri, {
        gasLimit: estimatedGas,
    });
    console.log(`Transaction hash: ${tx.hash}`);
    await tx.wait();
    console.log(`Mint confirmed}`);
}

main()
    .then(() => process.exit(0))
    .catch(async (error) => {
        console.error(error);
        await new Promise((resolve) => setTimeout(resolve, 5000));
        main();
    });

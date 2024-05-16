import { ethers, run } from "hardhat";
import { nftNameSymbolList } from "../nft-name-symbol";

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const Transferrer = await ethers.getContractFactory("Transferrer");
    const transferrer = await Transferrer.deploy();

    console.log("transferrer address:", transferrer.target);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

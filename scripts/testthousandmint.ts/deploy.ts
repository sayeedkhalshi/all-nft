import { ethers, run } from "hardhat";
import { nftNameSymbolList } from "../../nft-name-symbol";

async function main() {
    // const randomMnemonic = ethers.Wallet.createRandom().mnemonic;
    // if (!randomMnemonic) return;
    // // Derive the wallet at index 100
    // const path = "m/44'/60'/0'/0/100";
    // const wallet = ethers.Wallet.fromPhrase(randomMnemonic.phrase);
    // console.log(wallet.privateKey);

    //for (let i = 0; i < nftNameSymbolList.length; i++) {
    //const nft = nftNameSymbolList[i];
    //1 - 10 random seconds
    // const randomSeconds = Math.floor(Math.random() * 10);

    // await new Promise((resolve) =>
    //     setTimeout(resolve, randomSeconds * 1000)
    // );
    //const { name, symbol } = nft;
    const name = "Thousand Mint";
    const symbol = "THOUSANDS";
    const uri =
        "https://meme.market/api/metadata/media/mtu_NvhZKStEQrD3L8MPb53D7Vy5MsqFg50kzLxt4oIOvIhn0dtTyH63dH7O7lTeFyvW";

    //console.log("Deploying contracts with the account:", deployer.address);

    // Deploy FlashLoanExample contract
    const NFTContract = await ethers.getContractFactory("TestThousandMint");
    const [deployer] = await ethers.getSigners();
    const nonce = await deployer.getNonce();
    console.log("Deploying NFT contract with nonce:", nonce);
    const nftContract = await NFTContract.deploy(name, symbol, uri, {
        nonce: nonce,
    });

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

const ethers = require("ethers");

const sepoliaProvider = new ethers.JsonRpcProvider(
    "https://eth-sepolia.g.alchemy.com/v2/dFxiveV70jruw7zuJ5ybDJcj1uZOiROy"
);

// NFT Contract ABI and Address
const nftContractAddress = "0xfDadf685109db043ad0A811c1afC43EC1E060B7a";
const nftContractAbi = [
    // ERC721 standard methods
    "function name() view returns (string)",
    "function symbol() view returns (string)",
];

const somniaAvatarContract = new ethers.Contract(
    nftContractAddress,
    nftContractAbi,
    sepoliaProvider
);

console.log(somniaAvatarContract.name);

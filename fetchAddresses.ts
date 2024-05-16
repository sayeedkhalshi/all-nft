const fs = require("fs");

const fetchAddresses = async () => {
    const tokenAddress = "0x393f5Ae00269ecE38f5168ec0472564EBF6FA86E";
    const apiUrl = `https://testnet-api2.tabiscan.com/api/v2/tokens/${tokenAddress}/holders`;

    const response = await fetch(apiUrl);
    let data = await response.json();

    let addresses = [];

    while (data.items.length > 0) {
        for (let i = 0; i < data.items.length; i++) {
            let address_hash = data.items[i].address.hash;
            addresses.push(address_hash);
        }

        if (data.next_page_params == null) break;

        let next_address_hash = data.next_page_params.address_hash;
        let items_count = data.next_page_params.items_count;
        let value = data.next_page_params.value;
        console.log(addresses.length);
        console.log(data.next_page_params);

        const response2 = await fetch(
            `https://testnet-api2.tabiscan.com/api/v2/tokens/${tokenAddress}/holders/?address_hash=${next_address_hash}&items_count=${items_count}&value=${value}`
        );
        data = await response2.json();
    }

    // Write addresses to a JSON file
    fs.writeFileSync("addresses.json", JSON.stringify(addresses, null, 2));
};

fetchAddresses();

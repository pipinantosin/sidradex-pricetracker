
const provider = new ethers.providers.JsonRpcProvider("https://sidra-proxy.ai-assist.workers.dev");

const abiV3 = [
  {
    "inputs": [],
    "name": "slot0",
    "outputs": [
      { "internalType": "uint160", "name": "sqrtPriceX96", "type": "uint160" },
      { "internalType": "int24", "name": "tick", "type": "int24" },
      { "internalType": "uint16", "name": "observationIndex", "type": "uint16" },
      { "internalType": "uint16", "name": "observationCardinality", "type": "uint16" },
      { "internalType": "uint16", "name": "observationCardinalityNext", "type": "uint16" },
      { "internalType": "uint8", "name": "feeProtocol", "type": "uint8" },
      { "internalType": "bool", "name": "unlocked", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

fetch("tokens.json")
  .then(res => res.json())
  .then(tokens => {
    const tbody = document.getElementById("token-table-body");

    tokens.forEach(async token => {
      try {
        const contract = new ethers.Contract(token.pairAddress, abiV3, provider);
        const slot0 = await contract.slot0();

        const sqrtPriceX96 = ethers.BigNumber.from(slot0.sqrtPriceX96);
        const price = sqrtPriceX96.mul(sqrtPriceX96).div(ethers.BigNumber.from(2).pow(192));
        const displayPrice = parseFloat(price.toString());

        const row = document.createElement("tr");
        row.innerHTML = `
          <td class="token-symbol">${token.symbol}</td>
          <td class="price">${displayPrice.toFixed(6)}</td>
        `;
        tbody.appendChild(row);
      } catch (err) {
        console.error("Gagal memuat token", token.symbol, err);
      }
    });
  })
  .catch(err => console.error("Gagal memuat tokens.json:", err));

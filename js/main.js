
const provider = new ethers.providers.JsonRpcProvider("https://sidra-proxy.ai-assist.workers.dev");

const abiV2 = [
  {
    constant: true,
    inputs: [],
    name: "getReserves",
    outputs: [
      { name: "_reserve0", type: "uint112" },
      { name: "_reserve1", type: "uint112" },
      { name: "_blockTimestampLast", type: "uint32" }
    ],
    type: "function"
  }
];

const abiV3 = [
  {
    inputs: [],
    name: "slot0",
    outputs: [
      { internalType: "uint160", name: "sqrtPriceX96", type: "uint160" },
      { internalType: "int24", name: "tick", type: "int24" },
      { internalType: "uint16", name: "observationIndex", type: "uint16" },
      { internalType: "uint16", name: "observationCardinality", type: "uint16" },
      { internalType: "uint16", name: "observationCardinalityNext", type: "uint16" },
      { internalType: "uint8", name: "feeProtocol", type: "uint8" },
      { internalType: "bool", name: "unlocked", type: "bool" }
    ],
    stateMutability: "view",
    type: "function"
  }
];

fetch("tokens.json")
  .then(res => res.json())
  .then(tokens => {
    const tbody = document.getElementById("token-table-body");
    tokens.forEach(async token => {
      try {
        const abi = token.type === "v3" ? abiV3 : abiV2;
        const contract = new ethers.Contract(token.pairAddress, abi, provider);

        let price = 0;

        if (token.type === "v3") {
          const slot0 = await contract.slot0();
          const sqrtPriceX96 = ethers.BigNumber.from(slot0.sqrtPriceX96);
          const numerator = sqrtPriceX96.mul(sqrtPriceX96);
          const denominator = ethers.BigNumber.from(2).pow(192);
          price = parseFloat(numerator.div(denominator).toString());
        } else {
          const reserves = await contract.getReserves();
          price = parseFloat(reserves._reserve1) / parseFloat(reserves._reserve0);
        }

        const row = document.createElement("tr");
        row.innerHTML = `
          <td class="token-symbol">${token.symbol}</td>
          <td class="price">${price.toFixed(6)}</td>
        `;
        tbody.appendChild(row);
      } catch (err) {
        console.error("Gagal memuat token", token.symbol, err);
      }
    });
  })
  .catch(err => console.error("Gagal fetch tokens.json:", err));

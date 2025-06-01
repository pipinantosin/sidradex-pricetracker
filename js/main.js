const provider = new ethers.providers.JsonRpcProvider("https://node.sidrachain.com/");

// ABI minimal hanya untuk ambil reserves
const pairAbi = [
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

document.addEventListener("DOMContentLoaded", () => {
  fetch("tokens.json")
    .then(res => res.json())
    .then(tokens => {
      const tbody = document.getElementById("token-table-body");

      tokens.forEach(async token => {
        try {
          const contract = new ethers.Contract(token.pairAddress, pairAbi, provider);
          const reserves = await contract.getReserves();

          // SDA = token1, token lain = token0
          const price = parseFloat(reserves._reserve1) / parseFloat(reserves._reserve0);

          const row = document.createElement("tr");
          row.innerHTML = `
            <td class="token-symbol">${token.symbol}</td>
            <td class="price">${price.toFixed(6)}</td>
          `;
          tbody.appendChild(row);
        } catch (error) {
          console.error(`Gagal memuat ${token.symbol}:`, error);
        }
      });
    })
    .catch(error => {
      console.error("Gagal memuat tokens.json:", error);
    });
});

const provider = new ethers.providers.JsonRpcProvider("https://rpc.sidrachain.com");

// ABI minimal untuk membaca reserves dari pasangan token
const pairAbi = [
  {
    "constant": true,
    "inputs": [],
    "name": "getReserves",
    "outputs": [
      { "name": "_reserve0", "type": "uint112" },
      { "name": "_reserve1", "type": "uint112" },
      { "name": "_blockTimestampLast", "type": "uint32" }
    ],
    "type": "function"
  }
];

// Baca data dari tokens.json
fetch("tokens.json")
  .then(res => res.json())
  .then(tokens => {
    const tbody = document.getElementById("token-table-body");

    tokens.forEach(async token => {
      try {
        const contract = new ethers.Contract(token.pairAddress, pairAbi, provider);
        const reserves = await contract.getReserves();

        const reserve0 = parseFloat(reserves._reserve0);
        const reserve1 = parseFloat(reserves._reserve1);

        // SDA dianggap sebagai token1 (WSDA), token lain = token0
        const price = reserve1 / reserve0;

        const row = document.createElement("tr");
        row.innerHTML = `
          <td class="token-symbol">${token.symbol}</td>
          <td class="price">${price.toFixed(6)}</td>
        `;
        tbody.appendChild(row);
      } catch (err) {
        console.error(`Gagal memuat ${token.symbol}:`, err);
      }
    });
  })
  .catch(err => {
    console.error("Gagal memuat tokens.json:", err);
  });

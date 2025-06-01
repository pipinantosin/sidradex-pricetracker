const provider = new ethers.providers.JsonRpcProvider("https://node.sidrachain.com");
const abi = [
  "function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)"
];

for (const token of tokens) {
  const pairContract = new ethers.Contract(token.pairAddress, abi, provider);
  const reserves = await pairContract.getReserves();

  // Hitung harga token terhadap SDA
  const price = reserves.reserve1 / reserves.reserve0;
  ...
}

TokenBridge BSC => 0xf953f9FfA5c1f9F55fD8408C24D23850F1a35213

TokenBridge CORE => 0xa591D27d3efA2911102e0862C6C1b85CEFCF8ab4

const { ethers } = require('ethers');
const LzLibABI = require('./abi.json');

// Connect to Binance Smart Chain
const provider = new ethers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
const privateKey = '';
const wallet = new ethers.Wallet(privateKey, provider);

// Define contract address and ABI
const contractAddress = '0xf953f9FfA5c1f9F55fD8408C24D23850F1a35213';
const contractABI = LzLibABI;

// Define token address and other parameters
const tokenAddress = '0x55d398326f99059fF775485246999027B3197955';
const amountLD = '1000000000000';
const toAddress = 'user_address';
const callParams = { "refundAddress": 'user_address', "zroPaymentAddress": '0x0000000000000000000000000000000000000000' };
const adapterParams = '0x';

// Create contract instance and call bridge function
const contract = new ethers.Contract(contractAddress, contractABI, wallet);
async function run() {
    const tx = await contract.bridge(tokenAddress, amountLD, toAddress, callParams, adapterParams, { "gasLimit": 2200000, "value": ethers.parseEther("0.001") });
    await tx.wait();
    console.log('Transaction sent:', tx.hash);
}

run()
import { ethers } from "ethers";

// Skill Trade Token ABI - simplified for demo
const tokenABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function transferFrom(address from, address to, uint256 amount) returns (bool)",
  "event Transfer(address indexed from, address indexed to, uint256 value)",
];

// Contract address for the SKT token - replace with actual address when deployed
const SKT_TOKEN_ADDRESS = "0x123456789abcdef123456789abcdef123456789a";

// Contract address for the SkillTrade platform - replace with actual address when deployed
const PLATFORM_ADDRESS = "0xabcdef123456789abcdef123456789abcdef1234";

// Class to handle wallet integration
export class WalletIntegration {
  constructor() {
    this.provider = null;
    this.signer = null;
    this.tokenContract = null;
    this.isConnected = false;
    this.address = null;
  }

  // Check if MetaMask is installed
  isMetaMaskInstalled() {
    return typeof window !== "undefined" && window.ethereum && window.ethereum.isMetaMask;
  }

  // Connect to MetaMask
  async connect() {
    if (!this.isMetaMaskInstalled()) {
      throw new Error("MetaMask is not installed");
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      if (accounts.length === 0) throw new Error("No accounts found");

      this.provider = provider;
      this.signer = await provider.getSigner();
      this.address = await this.signer.getAddress();
      this.tokenContract = new ethers.Contract(SKT_TOKEN_ADDRESS, tokenABI, this.signer);
      this.isConnected = true;

      return {
        address: this.address,
        isConnected: this.isConnected,
      };
    } catch (error) {
      console.error("Connection error:", error);
      throw error;
    }
  }

  // Disconnect wallet
  disconnect() {
    this.provider = null;
    this.signer = null;
    this.tokenContract = null;
    this.isConnected = false;
    this.address = null;

    return {
      isConnected: false,
    };
  }

  // Get ETH balance
  async getEthBalance() {
    if (!this.isConnected) throw new Error("Wallet not connected");

    try {
      const balance = await this.provider.getBalance(this.address);
      return ethers.formatEther(balance);
    } catch (error) {
      console.error("Error getting ETH balance:", error);
      throw error;
    }
  }

  // Get SKT token balance
  async getTokenBalance() {
    if (!this.isConnected) throw new Error("Wallet not connected");

    try {
      const balance = await this.tokenContract.balanceOf(this.address);
      return ethers.formatUnits(balance, 18); // Assuming 18 decimals
    } catch (error) {
      console.error("Error getting token balance:", error);
      throw error;
    }
  }

  // Send ETH
  async sendEth(to, amount) {
    if (!this.isConnected) throw new Error("Wallet not connected");

    try {
      const tx = await this.signer.sendTransaction({
        to,
        value: ethers.parseEther(amount),
      });

      return await tx.wait();
    } catch (error) {
      console.error("Error sending ETH:", error);
      throw error;
    }
  }

  // Send SKT tokens
  async sendTokens(to, amount) {
    if (!this.isConnected) throw new Error("Wallet not connected");

    try {
      const tx = await this.tokenContract.transfer(to, ethers.parseUnits(amount, 18));
      return await tx.wait();
    } catch (error) {
      console.error("Error sending tokens:", error);
      throw error;
    }
  }

  // Get transaction history (simplified)
  async getTransactionHistory() {
    if (!this.isConnected) throw new Error("Wallet not connected");

    try {
      const blockNumber = await this.provider.getBlockNumber();
      const transactions = [];

      for (let i = 0; i < 10; i++) {
        if (blockNumber - i < 0) break;

        const block = await this.provider.getBlock(blockNumber - i);
        if (block && block.transactions) {
          for (const txHash of block.transactions) {
            const tx = await this.provider.getTransaction(txHash);
            if (tx && (tx.from === this.address || tx.to === this.address)) {
              transactions.push({
                hash: tx.hash,
                from: tx.from,
                to: tx.to,
                value: tx.value ? ethers.formatEther(tx.value) : "0",
                timestamp: block.timestamp * 1000,
                type: tx.from === this.address ? "sent" : "received",
              });
            }
          }
        }
      }

      return transactions;
    } catch (error) {
      console.error("Error getting transaction history:", error);
      throw error;
    }
  }

  // Create a session contract (mock)
  async createSessionContract(teacherAddress, studentAddress, skillName, sessionDate, sessionDuration, paymentAmount) {
    if (!this.isConnected) throw new Error("Wallet not connected");

    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate contract creation

      return {
        contractAddress: `0x${Math.random().toString(16).substring(2, 42)}`,
        teacher: teacherAddress,
        student: studentAddress,
        skillName,
        sessionDate,
        sessionDuration,
        paymentAmount,
      };
    } catch (error) {
      console.error("Error creating session contract:", error);
      throw error;
    }
  }

  // Complete a session (mock)
  async completeSession(contractAddress) {
    if (!this.isConnected) throw new Error("Wallet not connected");

    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate completion

      return {
        success: true,
        contractAddress,
        status: "completed",
      };
    } catch (error) {
      console.error("Error completing session:", error);
      throw error;
    }
  }

  // Get network information
  async getNetwork() {
    if (!this.isConnected) throw new Error("Wallet not connected");

    try {
      const network = await this.provider.getNetwork();
      return {
        name: network.name,
        chainId: network.chainId,
      };
    } catch (error) {
      console.error("Error getting network info:", error);
      throw error;
    }
  }
}

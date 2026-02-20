# Blockchain-Based Internship & Job Offer Verification System

A decentralized application (DApp) built on Ethereum (Sepolia Testnet) to verify the authenticity of internship and job offer letters using blockchain technology.

---

## 📖 Project Overview

Fake job and internship offer letters are a growing problem.  
This system ensures authenticity by:

1. Generating a SHA-256 hash of the offer letter PDF
2. Storing the hash on Ethereum blockchain
3. Verifying the offer by comparing hashes

If the document is modified even slightly, the hash changes — proving tampering.

---

## 🚀 Tech Stack

- Blockchain: Ethereum
- Network: Sepolia Testnet
- Smart Contract Language: Solidity
- IDE: Remix
- Frontend: HTML, CSS, JavaScript
- Library: ethers.js
- Wallet: MetaMask

---

## 🏗 System Architecture

Company → Generate Hash → Store Hash on Blockchain  
Student → Upload Offer → Generate Hash → Verify on Blockchain

---

## 📂 Project Structure

```
OfferVerificationFrontend/
│
├── index.html
├── script.js
├── style.css
└── README.md
```

---

## 📜 Smart Contract

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract OfferVerification {

    mapping(string => address) public offers;

    function addOffer(string memory offerHash) public {
        require(offers[offerHash] == address(0), "Offer already exists");
        offers[offerHash] = msg.sender;
    }

    function verifyOffer(string memory offerHash) public view returns (bool) {
        return offers[offerHash] != address(0);
    }

    function getIssuer(string memory offerHash) public view returns (address) {
        return offers[offerHash];
    }
}
```

---

## ⚙️ Setup Instructions

### 1. Install MetaMask

- Install MetaMask browser extension
- Create a wallet
- Switch to **Sepolia Test Network**
- Get free test ETH from a Sepolia Faucet

---

### 2. Deploy Smart Contract (Using Remix)

1. Go to https://remix.ethereum.org
2. Create file `OfferVerification.sol`
3. Paste the smart contract code
4. Compile using Solidity version 0.8.x
5. Go to "Deploy & Run"
6. Select **Injected Provider – MetaMask**
7. Ensure MetaMask is on Sepolia
8. Click Deploy and confirm transaction
9. Save the deployed contract address

---

### 3. Configure Frontend

Open `script.js` and replace:

```javascript
const contractAddress = "YOUR_CONTRACT_ADDRESS";
```

With your deployed contract address.

---

## ▶️ How to Run the Frontend

### Using Live Server (Recommended)

If using VS Code:

1. Install "Live Server" extension
2. Right-click `index.html`
3. Click **Open with Live Server**

---

## 🧪 How It Works

### Add Offer

- Upload original PDF
- SHA-256 hash generated
- Hash stored on blockchain
- MetaMask confirms transaction

### Verify Original Offer

- Upload same PDF
- Hash matches
- Output: ✅ Offer is VALID

### Verify Fake Offer

- Modify PDF slightly
- Upload modified version
- Hash differs
- Output: ❌ Offer is INVALID

---

## 🎯 Key Features

✔ Tamper-proof verification  
✔ Decentralized storage  
✔ No central authority required  
✔ Transparent & immutable

---

## 📌 Network Details

- Network: Sepolia Testnet
- Chain ID: 11155111

---

## 🏁 Conclusion

This project demonstrates how blockchain technology can eliminate fake job offers by providing a secure, immutable, and decentralized verification system.

---

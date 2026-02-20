// script.js
import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@6.7.0/dist/ethers.min.js";


// ---------------------------
// 1. Connect MetaMask
// ---------------------------
let provider;
let signer;
let contract;

const contractAddress = "0x9fe59f391a7244fd8fa301ee4f72361fd2f6669e"; // replace with your deployed contract
const abi = [
    "function addOffer(string memory offerHash) public",
    "function verifyOffer(string memory offerHash) public view returns (bool)",
    "function getIssuer(string memory offerHash) public view returns (address)"
];
async function connectWallet() {
    if (window.ethereum) {
        provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = await provider.getSigner();
        contract = new ethers.Contract(contractAddress, abi, signer);
        console.log("Wallet connected:", await signer.getAddress());

        // Enable buttons only after wallet & contract are ready
        document.getElementById("addOfferBtn").disabled = false;
        document.getElementById("verifyOfferBtn").disabled = false;
    } else {
        alert("MetaMask not detected!");
    }
}

// Initially disable buttons until wallet is connected
document.getElementById("addOfferBtn").disabled = true;
document.getElementById("verifyOfferBtn").disabled = true;

// Connect wallet on page load
connectWallet();
// ---------------------------
// 2. Generate SHA-256 hash of uploaded PDF
// ---------------------------
async function getFileHash(file) {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

// ---------------------------
// 3. Add Offer
// ---------------------------
document.getElementById("addOfferBtn").onclick = async () => {
    const fileInput = document.getElementById("pdfFile");
    if (!fileInput.files.length) {
        alert("Please upload a PDF first!");
        return;
    }

    const hash = await getFileHash(fileInput.files[0]);
    try {
        const tx = await contract.addOffer(hash);
        await tx.wait();
        document.getElementById("result").innerText = "Offer hash added successfully!";
        console.log("Transaction:", tx);
    } catch (err) {
        console.error(err);
        alert("Error adding offer. Check console.");
    }
};

// ---------------------------
// 4. Verify Offer
// ---------------------------
document.getElementById("verifyOfferBtn").onclick = async () => {
    const fileInput = document.getElementById("pdfFile");
    if (!fileInput.files.length) {
        alert("Please upload a PDF first!");
        return;
    }

    const hash = await getFileHash(fileInput.files[0]);

    try {
        const isValid = await contract.verifyOffer(hash);
        document.getElementById("result").innerText = isValid ? "✅ Offer is VALID" : "❌ Offer is INVALID";
        console.log("Verification result:", isValid);
    } catch (err) {
        console.error(err);
        alert("Error verifying offer. Check console.");
    }
};

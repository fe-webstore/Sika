// Test the fixed Google Apps Script
const testData = {
  name: "Test User",
  phone: "+229 01 23 45 67",
  items: [{
    id: 1,
    name: "Test Product",
    quantity: 2,
    price: 1000,
    subtotal: 2000
  }],
  total: 2000,
  currency: "FCFA",
  timestamp: new Date().toISOString(),
  source: "sika-glow-shop-benin"
};

const url = "https://script.google.com/macros/s/AKfycbxS-c64-ID-43U-1Pvi0gUPIDfbQeD1_YRujD_ttmPmMdesGJ-GLQRDY4ISiEnmYlGn/exec";

console.log("Testing with data:", testData);

fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(testData)
})
.then(response => {
  console.log("Status:", response.status);
  return response.text();
})
.then(data => {
  console.log("Response:", data);
  try {
    const parsed = JSON.parse(data);
    console.log("Parsed response:", parsed);
  } catch (e) {
    console.log("Response is not JSON");
  }
})
.catch(error => {
  console.error("Error:", error);
});

document.addEventListener("DOMContentLoaded", () => {
    const walletModal = document.getElementById("wallet-modal");
    const closeWalletModal = document.getElementById("close-wallet-modal");
    const confirmPurchaseButton = document.getElementById("confirm-purchase");
  
    const walletBalanceElement = document.getElementById("wallet-balance");
    const gasFeeElement = document.getElementById("gas-fee");
    const transactionAmountElement = document.getElementById("transaction-amount");
    const updatedBalanceElement = document.getElementById("updated-balance");
  
    const gasVideoContainer = document.getElementById("gas-video-container");
    const gasVideo = document.getElementById("gas-video");
    const gasVideoSource = document.getElementById("gas-video-source");
  
    let walletBalance = 5.00; // Initial wallet balance in ETH
    const gasFeeThreshold = 0.010; // Threshold for gas fee to trigger video
  
    let gasFee = 0.010; // Starting gas fee
  
    const buyButtons = document.querySelectorAll(".btn.btn-outline");
  
    buyButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const itemPrice = parseFloat(button.dataset.price);
        openWalletModal(itemPrice);
      });
    });
  
    // Open Wallet Modal and Show Transaction Details
    function openWalletModal(itemPrice) {
      const updatedBalance = walletBalance - itemPrice;
  
      walletBalanceElement.textContent = `${walletBalance.toFixed(3)} ETH`;
      transactionAmountElement.textContent = `${itemPrice.toFixed(3)} ETH`;
      updatedBalanceElement.textContent = `${updatedBalance.toFixed(3)} ETH`;
  
      // Calculate the gas fee based on the transaction amount
      gasFee = calculateGasFee(itemPrice);
      gasFeeElement.textContent = `${gasFee.toFixed(3)} ETH`;
  
      // Check if gas fee exceeds threshold and handle video
      if (gasFee > gasFeeThreshold) {
        showGasFeeVideo();
      } else {
        hideGasFeeVideo();
      }
  
      walletModal.classList.remove("hidden");
      walletModal.style.display = "block";
    }
  
    // Dynamic gas fee calculation
    function calculateGasFee(transactionAmount) {
      let calculatedFee = 0.01; // Base fee
  
      // Gas fee increases with higher transaction amounts
      if (transactionAmount <= 1) {
        calculatedFee = 0.010; // Small fee for small transactions
      } else if (transactionAmount > 1 && transactionAmount <= 5) {
        calculatedFee = 0.020; // Medium fee for medium transactions
      } else if (transactionAmount > 5) {
        calculatedFee = 0.030; // Higher fee for large transactions
      }
  
      return calculatedFee;
    }
  
    // Show video when gas fee exceeds threshold
    function showGasFeeVideo() {
      const randomVideo = getRandomVideoUrl();
      gasVideoSource.src = randomVideo;
      gasVideo.load();
      gasVideoContainer.classList.remove("hidden");
      gasVideo.play();
  
      // After the video ends (10 seconds), decrease the gas fee
      gasVideo.onended = () => {
        setTimeout(() => {
          gasFee = 0.005; // Reduced gas fee after video
          gasFeeElement.textContent = `${gasFee.toFixed(3)} ETH`;
          hideGasFeeVideo();
        }, 1000); // Delay after video ends before updating the fee
      };
    }
  
    // Hide video when gas fee is within limit
    function hideGasFeeVideo() {
      gasVideoContainer.classList.add("hidden");
      gasVideo.pause();
      gasVideo.currentTime = 0; // Reset video to start
    }
  
    // Get a random video URL from predefined list
    function getRandomVideoUrl() {
      const videos = [
        "https://www.w3schools.com/html/mov_bbb.mp4", // Sample video 1
        "https://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4", // Sample video 2
        "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4", // Sample video 3
      ];
  
      const randomIndex = Math.floor(Math.random() * videos.length);
      return videos[randomIndex];
    }
  
    // Close Modal
    closeWalletModal.addEventListener("click", () => {
      walletModal.classList.add("hidden");
      walletModal.style.display = "none";
    });
  
    // Confirm Purchase and Update Wallet
    confirmPurchaseButton.addEventListener("click", () => {
      const updatedBalance = parseFloat(updatedBalanceElement.textContent);
      walletBalance = updatedBalance;
  
      walletBalanceElement.textContent = `${walletBalance.toFixed(3)} ETH`;
  
      walletModal.classList.add("hidden");
      walletModal.style.display = "none";
      console.log("Purchase confirmed. Updated wallet balance:", walletBalance);
    });
  });
  
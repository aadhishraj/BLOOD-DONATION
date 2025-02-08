/********************************************
 * Sample donor data (for demonstration)
 ********************************************/
const donors = [
    { name: "Ankit", bloodGroup: "A+", phone: "9343949390", location: "Mumbai, Maharashtra" },
  { name: "Mahendra", bloodGroup: "O+", phone: "9876543210", location: "Delhi, Delhi" },
  { name: "Shashwat", bloodGroup: "B+", phone: "9394949435", location: "Bangalore, Karnataka" },
  { name: "Sabhya", bloodGroup: "A+", phone: "9835232343", location: "Pune, Maharashtra" },
   { name: "Aadi", bloodGroup: "b+", phone: "9874324210", location: "Delhi, Delhi" },
   { name: "Aadhish", bloodGroup: "O+", phone: "9924939410", location: "Delhi, Delhi" },
  { name: "varnit", bloodGroup: "O-", phone: "9876543210", location: "Delhi, Delhi" },
   { name: "Kshitiz", bloodGroup: "A-", phone: "9876543210", location: "Delhi, Delhi" },
   { name: "DEV", bloodGroup: "AB+", phone: "9876532423", location: "Delhi, Delhi" },
    
  ];
  
  /********************************************
   * Utility Functions
   ********************************************/
  // Scrolls the chatbox to the bottom
  function scrollChatboxToBottom() {
    const chatbox = document.getElementById('chatbox');
    chatbox.scrollTop = chatbox.scrollHeight;
  }
  
  /********************************************
   * Chatbot Functions
   ********************************************/
  // Toggle Chatbot Visibility
  function toggleChatbot() {
    const chatbot = document.getElementById('chatbot');
    chatbot.style.display = chatbot.style.display === 'block' ? 'none' : 'block';
  }
  
  // Handle key press on the chatbot input field
  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      sendMessage();
    }
  }
  
  // Processes the user message and simulates a bot response
  function sendQuickMessage(message) {
    const chatbox = document.getElementById('chatbox');
  
    // Append the user's message
    chatbox.innerHTML += `<p class="userText"><span>${message}</span></p>`;
    scrollChatboxToBottom();
  
    // Simulate a bot response after a brief delay
    let botResponse = '';
    switch (message) {
      case 'Blood Donation Info':
        botResponse = 'Blood donation is a lifesaving act where a healthy person donates blood to help patients in need.';
        break;
      case 'Eligibility to Donate':
        botResponse = 'To donate blood, you must be at least 18 years old, weigh at least 50 kg, and be in good health. Do you have any specific questions?';
        break;
      case 'Find Nearby Centers':
        botResponse = 'Here are the nearest blood donation centers: [AIIMS (All India Institute of Medical Sciences) ,Fortis Hospital, Vasant Kunj,Max Super Specialty Hospital, Saket ';
        break;
      default:
        botResponse = "If you need further information, would you like to speak with an agent? Please share your phone number.";
        break;
    }
  
    setTimeout(() => {
      chatbox.innerHTML += `<p class="botText"><span>${botResponse}</span></p>`;
      scrollChatboxToBottom();
  
      // For unrecognized queries, add a contact form to collect the phone number
      if (
        message !== 'Blood Donation Info' &&
        message !== 'Eligibility to Donate' &&
        message !== 'Find Nearby Centers'
      ) {
        chatbox.innerHTML += `
          <div id="contactForm">
            <input type="tel" id="userPhone" placeholder="Enter your phone number" required>
            <button onclick="submitContactForm()">Submit</button>
          </div>
        `;
        scrollChatboxToBottom();
      }
    }, 500);
  }
  
  // Send message from the chatbot input field
  function sendMessage() {
    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();
    if (message !== '') {
      userInput.value = '';
      sendQuickMessage(message);
    }
  }
  
  /********************************************
   * Donor Search Functions
   ********************************************/
  // Search donors based on blood group and location

 function searchDonors () {
    console.log("Sanyam chutoya");
    
    const bloodGroup = document.getElementById('searchBloodGroup').value.trim().toUpperCase();
    const location = document.getElementById('searchLocation').value.trim().toLowerCase();
  
    // Filter donors based on search criteria
    const filteredDonors = donors.filter(donor => {
      const matchesBloodGroup = bloodGroup ? donor.bloodGroup.toUpperCase() === bloodGroup : true;
      const matchesLocation = location ? donor.location.toLowerCase().includes(location) : true;
      return matchesBloodGroup && matchesLocation;
    });
  
    // Display filtered donors in the popup
    displayPopup(filteredDonors);
  }
  


  
  // Display the donor popup with matching donor information
  function displayPopup(filteredDonors) {
    const popupContent = document.getElementById('popupContent');
    const donorPopup = document.getElementById('donorPopup');
  
    if (filteredDonors.length > 0) {
      let html = '<ul>';
      filteredDonors.forEach(donor => {
        html += `
          <li>
            <strong>Name:</strong> ${donor.name}<br>
            <strong>Blood Group:</strong> ${donor.bloodGroup}<br>
            <strong>Phone:</strong> ${donor.phone}<br>
            <strong>Location:</strong> ${donor.location}
          </li>
        `;
      });
      html += '</ul>';
      popupContent.innerHTML = html;
    } else {
      popupContent.innerHTML = '<p>No matching donors found.</p>';
    }
    donorPopup.style.display = 'block';
  }
  
  // Close the donor popup
  function closePopup() {
    const donorPopup = document.getElementById('donorPopup');
    donorPopup.style.display = 'none';
  }
  
  /********************************************
   * Geolocation Function
   ********************************************/
  // Get the user's current location and update the search field
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
            .then(response => response.json())
            .then(data => {
              const fullAddress = data.display_name || "Unable to fetch address";
              document.getElementById('location').value = fullAddress;
            })
            .catch(error => {
              console.error("Error fetching location data:", error);
              alert("Unable to fetch address. Please enter your location manually.");
            });
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to retrieve your location. Please enter your location manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser. Please enter your location manually.");
    }
  }
  
  /********************************************
   * Contact Form Functions (Chatbot)
   ********************************************/
  // Submit the contact form within the chatbot conversation
  function submitContactForm() {
    const userPhone = document.getElementById('userPhone').value.trim();
  
    if (userPhone !== '') {
      const chatbox = document.getElementById('chatbox');
      chatbox.innerHTML += `<p class="botText"><span>Thank you! We will contact you shortly at ${userPhone}.</span></p>`;
      scrollChatboxToBottom();
  
      const contactForm = document.getElementById('contactForm');
      if (contactForm) {
        contactForm.remove();
      }
      showContactConfirmation();
    } else {
      alert('Please enter a valid phone number.');
    }
  }
  
  // Show a confirmation popup after contact form submission
  function showContactConfirmation() {
    const popup = document.createElement('div');
    popup.id = 'contactConfirmationPopup';
    popup.className = 'popup';
    popup.innerHTML = `
      <div class="popup-content">
        <p>Thank you! We will contact you shortly.</p>
        <button onclick="closeContactConfirmation()">Close</button>
      </div>
    `;
    document.body.appendChild(popup);
  }
  
  // Close the contact confirmation popup
  function closeContactConfirmation() {
    const popup = document.getElementById('contactConfirmationPopup');
    if (popup) {
      popup.remove();
    }
  }
  
  /********************************************
   * Navigation Functions
   ********************************************/
  // Smoothly scroll to the registration section
  function scrollToRegister() {
    document.getElementById('register').scrollIntoView({ behavior: 'smooth' });
  }
  
  /********************************************
   * Registration Popup
   ********************************************/
  // Show a registration confirmation popup
  function showPopup() {
    console.log("popup triggered");
    alert("Registration successful!");
  }
  
  function handleDonorformSubmit() {
    console.log("Form triggered")
  }

  const donorForm = document.getElementById("donorform")
  donorForm.onsubmit = function() {showPopup()}

  
  const searchDonorss = document.getElementById('searchdonorform')
  searchDonorss.onsubmit = function(event) {
    event.preventDefault()
    searchDonors()
}

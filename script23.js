// Toggle Chatbot
function toggleChatbot() {
  const chatbot = document.getElementById('chatbot');
  chatbot.style.display = chatbot.style.display === 'block' ? 'none' : 'block';
}

// Send Quick Message
function sendQuickMessage(message) {
  const chatbox = document.getElementById('chatbox');
  chatbox.innerHTML += `<p class="userText"><span>${message}</span></p>`;
  chatbox.scrollTop = chatbox.scrollHeight;
}

// Handle Key Press
function handleKeyPress(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
}

// Send Message
function sendMessage() {
  const userInput = document.getElementById('userInput');
  const chatbox = document.getElementById('chatbox');
  if (userInput.value.trim() !== '') {
    chatbox.innerHTML += `<p class="userText"><span>${userInput.value}</span></p>`;
    userInput.value = '';
    chatbox.scrollTop = chatbox.scrollHeight;
  }
}


// Sample donor data (replace this with data from a backend or database)
let donors = [
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

// Function to search donors and display results in the popup
function searchDonors() {
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

// Function to display the popup with matching donors
function displayPopup(filteredDonors) {
  const popupContent = document.getElementById('popupContent');
  const donorPopup = document.getElementById('donorPopup');

  if (filteredDonors.length > 0) {
    // Create HTML for matching donors
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
    // No matching donors found
    popupContent.innerHTML = '<p>No matching donors found.</p>';
  }

  // Show the popup
  donorPopup.style.display = 'block';
}

// Function to close the popup
function closePopup() {
  const donorPopup = document.getElementById('donorPopup');
  donorPopup.style.display = 'none';
}

// Function to get user's location (optional)
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
          .then((response) => response.json())
          .then((data) => {
            const fullAddress = data.display_name || "Unable to fetch address";
            document.getElementById('searchLocation').value = fullAddress;
          })
          .catch((error) => {
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
// Toggle Chatbot Visibility
function toggleChatbot() {
  const chatbot = document.getElementById('chatbot');
  chatbot.style.display = chatbot.style.display === 'block' ? 'none' : 'block';
}

// Function to scroll the chatbox to the bottom
function scrollChatboxToBottom() {
  const chatbox = document.getElementById('chatbox');
  chatbox.scrollTop = chatbox.scrollHeight; // Scroll to the bottom
}

// Function to send a quick message
function sendQuickMessage(message) {
  const chatbox = document.getElementById('chatbox');

  // Display the user's message
  chatbox.innerHTML += `<p class="userText"><span>${message}</span></p>`;
  scrollChatboxToBottom(); // Scroll to the latest message

  // Simulate a bot response
  let botResponse = '';
  switch (message) {
    case 'Blood Donation Info':
      botResponse = 'Blood donation is a lifesaving act where a healthy person donates blood to help patients in need.';
      break;
    case 'Eligibility to Donate':
      botResponse =
        'To donate blood, you must be at least 18 years old, weigh at least 50 kg, and be in good health. Do you have any specific questions?';
      break;
    case 'Find Nearby Centers':
      botResponse = 'Here are the nearest blood donation centers: [AIIMS (All India Institute of Medical Sciences) ,Fortis Hospital, Vasant Kunj,Max Super Specialty Hospital, Saket ].';
      break;
    default:
      botResponse = "If you need further information, would you like to speak with an agent? Please share your phone number..";
      break;
  }

  setTimeout(() => {
    chatbox.innerHTML += `<p class="botText"><span>${botResponse}</span></p>`;
    scrollChatboxToBottom(); // Scroll to the latest message

    // If the message is unknown, add a contact form
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
      scrollChatboxToBottom(); // Scroll to the latest message
    }
  }, 500); // Simulate a slight delay for the bot response
}

// Handle Enter Key Press
function handleKeyPress(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
}

// Send User Message
function sendMessage() {
  const userInput = document.getElementById('userInput');
  const chatbox = document.getElementById('chatbox');
  const message = userInput.value.trim();

  if (message !== '') {
    chatbox.innerHTML += `<p class="userText"><span>${message}</span></p>`;
    userInput.value = ''; // Clear the input field
    scrollChatboxToBottom(); // Scroll to the latest message

    // Handle the message
    sendQuickMessage(message);
  }
}

// Submit Contact Form
function submitContactForm() {
  const userPhone = document.getElementById('userPhone').value.trim();

  if (userPhone !== '') {
    // Display a confirmation message
    const chatbox = document.getElementById('chatbox');
    chatbox.innerHTML += `<p class="botText"><span>Thank you! We will contact you shortly at ${userPhone}.</span></p>`;
    scrollChatboxToBottom(); // Scroll to the latest message

    // Remove the contact form
    document.getElementById('contactForm').remove();

    // Show a pop-up confirmation
    showContactConfirmation();
  } else {
    alert('Please enter a valid phone number.');
  }
}

// Show Contact Confirmation Popup
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

// Close Contact Confirmation Popup
function closeContactConfirmation() {
  const popup = document.getElementById('contactConfirmationPopup');
  if (popup) {
    popup.remove();
  }
}
// Scroll to Register Section
function scrollToRegister() {
  document.getElementById('register').scrollIntoView({ behavior: 'smooth' });
}
// Function to detect user's location and fetch full address
function getLocation() {
  if (navigator.geolocation) {
    // Request the user's location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Success: Extract latitude and longitude
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Use OpenStreetMap Nominatim API for reverse geocoding
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
          .then((response) => response.json())
          .then((data) => {
            // Extract the full address
            const fullAddress = data.display_name || "Unable to fetch address";

            // Display the full address in the location input field
            document.getElementById('location').value = fullAddress;
          })
          .catch((error) => {
            console.error("Error fetching location data:", error);
            alert("Unable to fetch address. Please enter your location manually.");
          });
      },
      (error) => {
        // Error: Handle location access denial or errors
        console.error("Error getting location:", error);
        alert("Unable to retrieve your location. Please enter your location manually.");
      }
    );
  } else {
    // Geolocation is not supported by the browser
    alert("Geolocation is not supported by your browser. Please enter your location manually.");
  }
}

function handleDonorformSubmit() {
  console.log("wprkfing")
}

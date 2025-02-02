// Smooth scrolling to the registration section
function scrollToRegister() {
    document.getElementById('register').scrollIntoView({ behavior: 'smooth' });
  }
  
  // Form submission handling
  document.getElementById('donorForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
  
    alert(`Thank you, ${name}! We will contact you at ${email} or ${phone} shortly.`);
    document.getElementById('donorForm').reset();
  });
  function scrollToRegister() {
    document.getElementById('register').scrollIntoView({ behavior: 'smooth' });
  }
// Smooth scroll to "About Us" section (if it's on the same page)
function openABOUTUS() {
  
  // If you have a separate about.html page, use window.open instead:
  window.open("about.html", "_blank");
}

// Open Book Appointment page in new tab
function openBookAppointment() {
  window.open("book-appointment.html", "_blank");
}

// Open Reviews section or page (placeholder)
function openReviews() {
  const reviewSection = document.querySelector('.custom-reviews-section');
  if (reviewSection) {
    reviewSection.scrollIntoView({ behavior: 'smooth' });
  } else {
    alert("Review section not found on this page.");
  }
}


// Open Contact Us page in new tab
function openContactUs() {
  window.open("contact.html", "_blank");
}
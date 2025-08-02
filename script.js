// Simulated issue reports with lat/lng
const posts = [
  {
    title: "Pothole near Phase 7",
    description: "Huge pothole on main road",
    lat: 30.7046, // Mohali
    image:"garbage1.jpg",
    lng: 76.7179
  },
  {
    title: "Garbage overflow near Sector 9",
    description: "Bin not cleared for 3 days",
    lat: 30.3752, // Ambala
    lng: 76.7821
  },{
  title: "Garbage dumped ",
    description: "Somebody threw a pile of junk near my house in phase 4",
    image:"yay.avif",
    lat: 30.3752, // Ambala
    lng: 76.7821
},
{
  title: "Pothole near sector 70",
    description: "Huge pothole on main road",
    image:"waterlogged.avif",
    lat: 30.3752, // Ambala
    lng: 76.7821
},

  {
    title: "Pothole near Phase 7",
    description: "Huge pothole on main road",
    lat: 30.7046, // Mohali
    image:"waterlogged.avif",
    lng: 76.7179
  },{
    title: "Pothole near Phase 7",
    description: "Huge pothole on main road",
    image:"pothole.jpg",
    lat: 30.7046, // Mohali
    lng: 76.7179
  },{
    title: "Garbage dumped near house 47",
    description: "Somebody threw a pile of junk near my house in phase 4",
    lat: 30.7046, // Mohali
    image:"yay.avif",
    lng: 76.7179
  },{
   title: "Garbage dumped near house 47",
    description: "Somebody threw a pile of junk near my house in phase 4",
    lat: 30.7046, // Mohali
    image:"yay.avif",
    lng: 76.7179
  },
  {
   title: "Garbage dumped near house 47",
    description: "Somebody threw a pile of junk near my house in phase 4",
    lat: 30.7046, // Mohali
    image:"yay.avif",
    lng: 76.7179
  },
  

];

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
    
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Scroll animation observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Add scroll animation to elements
function addScrollAnimation() {
  const elements = document.querySelectorAll('.issue-box, .footer-section');
  elements.forEach(el => {
    el.classList.add('scroll-animate');
    observer.observe(el);
  });
}

window.onload = () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(pos => {
      const userLat = pos.coords.latitude;
      const userLng = pos.coords.longitude;

      console.log("User location:", userLat, userLng);

      // Filter posts within 5 km
      const nearbyPosts = posts.filter(post => {
        const dist = getDistance(userLat, userLng, post.lat, post.lng);
        return dist <= 5;
      });

      displayPosts(nearbyPosts);
    }, err => {
      console.error("Location error:", err);
      document.getElementById("issues").innerHTML = "<p>Location access denied. Cannot load posts.</p>";
    });
  } else {
    alert("Geolocation is not supported by your browser.");
  }
};

function displayPosts(postArray) {
  const container = document.getElementById("issues");
  container.innerHTML = ""; // Clear any old posts

  if (postArray.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
        <div style="font-size: 48px; margin-bottom: 20px;">🌍</div>
        <h2 style="color: #059669; margin-bottom: 10px;">No Issues Nearby</h2>
        <p style="color: #6b7280; font-size: 18px;">Great! No civic issues have been reported in your area.</p>
        <button onclick="window.location.href='register.html'" style="margin-top: 20px;">Report an Issue</button>
      </div>
    `;
    return;
  }

  postArray.forEach((post, index) => {
    const div = document.createElement("div");
    div.className = "issue-box";
    div.innerHTML = `
      <img src="${post.image}" alt="Issue Image" class="issue-img" loading="lazy">
      <h3>${post.title}</h3>
      <p>${post.description}</p>
    `;
    
    // Add click event listener
    div.addEventListener('click', function() {
      // Remove clicked class from all boxes
      document.querySelectorAll('.issue-box').forEach(box => {
        box.classList.remove('clicked');
      });
      
      // Add clicked class to this box
      this.classList.add('clicked');
      
      // Remove the class after animation completes
      setTimeout(() => {
        this.classList.remove('clicked');
      }, 600);
    });
    
    container.appendChild(div);
  });

  // Add scroll animations after content is loaded
  setTimeout(addScrollAnimation, 100);
}

// Add smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('.issue-img');
  images.forEach(img => {
    img.addEventListener('load', function() {
      this.style.opacity = '1';
    });
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
  });
});

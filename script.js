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
    container.innerHTML = "<p>No civic issues reported near you.</p>";
    return;
  }

  postArray.forEach(post => {
    const div = document.createElement("div");
    div.className = "issue-box";
    div.innerHTML = `
      <img src="${post.image}" alt="Issue Image" class="issue-img">
      <h3>${post.title}</h3>
      <p>${post.description}</p>
    `;
    container.appendChild(div);
  });
}

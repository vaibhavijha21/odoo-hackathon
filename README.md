# 🌱 CivicTrack - Smart Civic Issue Reporting Platform

CivicTrack is a location-based web application that allows users to report civic issues (like potholes, garbage dumps, broken streetlights, etc.) in their neighborhood with real-time tracking. The platform ensures structured complaint management with user authentication, complaint limits, and location-based filtering.

---

## 🚀 Features

### 1. **User Registration & Login**
- Simple user registration form capturing Name, Email, Phone, Password.
- Only logged-in users can post complaints.

### 2. **Complaint Posting**
- Users can post complaints with:
  - Complaint Description
  - Image Upload
  - Automatic Location Fetch (Latitude & Longitude)
- Username is auto-filled after login and cannot be edited on the complaint form.
- Each user can post a maximum of **5 complaints per day**.

### 3. **Complaints Feed (Neighborhood View)**
- Right-side panel shows a live feed of nearby complaints.
- Users can only view complaints posted in their neighborhood .
- Complaints are displayed with:
  - Username
  - Description
  - Uploaded Image
  - Location coordinates

---

## 🗂️ Pages Breakdown

| Page Name         | Description                                                                 |
|-------------------|-----------------------------------------------------------------------------|
| `register.html`    | User Registration Page to create account. Username is saved for session.    |
| `login.html`       | Page for user login (can use same logic as register).|
| `complaint.html`   | Main Complaint Posting and Nearby Complaints Feed UI.                      |

---

## 🔧 How it Works

1. **User registers** on `registration page`.
2.  User posts a complaint (with image & location). Posting more than 5 complaints per day is restricted.
3.  Users can see their neighborhood issues and complaints.

---

## 🎯 Future Scope (For Expansion)
- Backend API Integration (Database, User Authentication, Complaint Management)
- Neighborhood radius filter using Maps API.
- Admin Panel for resolving complaints.
- User Profile Dashboard.

---

## 💻 Tech Stack
- HTML, CSS (TailwindCSS)
- JavaScript (Vanilla)
- Browser LocalStorage API
- Geolocation API (for fetching user location)

---

## 🏁 Usage Instructions
1. Clone or Download the project files.
2. Open `register.html` in your browser.
3. Register and you’ll be redirected to `complaint.html`.
4. Start posting civic complaints from your area.

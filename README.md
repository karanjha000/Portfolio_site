# Karan Jha - Java Developer Portfolio

A modern, responsive portfolio website showcasing Java development projects, backend solutions, and professional expertise. Built with clean HTML, CSS, and JavaScript with a focus on performance and user experience.

## 🎯 Features

- ✅ **Auto-scrolling Image Carousel** - Display multiple project images with smooth transitions
- ✅ **Mobile-Responsive Design** - Hamburger menu and responsive layouts for all devices
- ✅ **Smooth Animations** - Fade-in effects and smooth scroll behavior
- ✅ **Contact Form** - Real-time form validation with JSON message storage
- ✅ **Project Showcase** - Featured projects with image galleries
- ✅ **Testimonials Section** - Client feedback and reviews
- ✅ **SEO Optimized** - Meta tags, structured data, and semantic HTML
- ✅ **Performance Optimized** - Hardware acceleration and efficient transitions
- ✅ **API Integration** - Backend server for contact form handling

## 📋 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Server
```bash
npm start
```

The server will run on `http://localhost:3000`

### 3. Open in Browser
Navigate to `http://localhost:3000` to view your portfolio

## 📂 File Structure

```
d:\Ghost\Portfolio\
├── index.html              # Main portfolio website
├── server.js               # Express server with API endpoints
├── package.json            # Node.js dependencies
├── messages.json           # Stored contact messages (auto-created)
├── images/                 # Project images folder
│   ├── logo.jpg           # Circular navbar logo
│   ├── img1.jpg           # SkillConnect image 1
│   ├── img2.jpg           # SkillConnect image 2
│   ├── img3.jpg           # SkillConnect image 3
│   ├── Book1.png          # Book-Pilot-Manager image 1
│   ├── Book2.png          # Book-Pilot-Manager image 2
│   ├── Book3.png          # Book-Pilot-Manager image 3
│   ├── klyra1.png         # Klyra image 1
│   ├── klyra2.png         # Klyra image 2
│   └── klyra3.png         # Klyra image 3
└── README.md               # This file
```

## 🎨 Sections Overview

### Header & Navigation
- **Circular Logo** - Professional branding with circular image logo
- **Mobile Hamburger Menu** - Collapses on screens < 900px
- **Fixed Navigation** - Stays accessible while scrolling
- **Smooth Link Navigation** - Auto-scroll to sections

### Hero Section
- **Headline** - "Building Scalable Backend Solutions"
- **Call-to-Action** - Direct link to projects
- **Profile Image** - Responsive image container with proper aspect ratio handling

### About Section
- **Professional Summary** - Highlight your expertise and experience
- **Backend Focus** - Showcase Java and server-side development skills

### Featured Projects
- **SkillConnect** - Skill-based connection platform
  - Auto-scrolling carousel (3 images)
  - Smooth transitions every 3 seconds
  - Click dots to navigate manually
  - Pauses on hover

- **Book-Pilot-Manager** - Book management system
  - Multi-image carousel showcase
  - Same auto-scroll functionality

- **Klyra (Real-time Chat Engine)** - Messaging application
  - Live demo carousel
  - Full image rotation support

### Services & Expertise
- **Backend Development** - Server-side systems, APIs, databases
- **Frontend Development** - Responsive UI, performance optimization
- **Tools & Frameworks** - Tech stack showcase

### Testimonials
- **Client Feedback** - Social proof and validation
- **Multiple Reviews** - Showcase diverse client perspectives

### Contact Form
- **Real-time Validation** - Client-side form checking
- **Success Feedback** - User-friendly status messages
- **JSON Storage** - Messages automatically saved
- **API Integration** - Backend processing

### Footer
- **Social Links** - LinkedIn, GitHub, Email
- **Copyright** - Professional footer branding

## 🖼️ Image Carousel Features

### Auto-Scroll Configuration
- **Interval**: 3 seconds (3000ms)
- **Transition Duration**: 0.8s with smooth easing
- **Easing Function**: cubic-bezier(0.4, 0, 0.2, 1)

### Carousel Controls
- **Dots Navigation** - Click any dot to jump to that image
- **Hover Pause** - Auto-scroll pauses when hovering over carousel
- **Auto-Resume** - Resumes when mouse leaves the carousel

## 📱 Responsive Breakpoints

| Screen Size | Changes |
|-------------|---------|
| **900px and below** | Hamburger menu activates, hero single column |
| **600px and below** | Further font size reduction, optimized spacing |

## 💾 Contact Messages Storage

Messages are stored in `messages.json` with the following structure:

```json
[
  {
    "id": 1706614800000,
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Great work!",
    "timestamp": "2026-01-30T10:13:20.000Z",
    "read": false
  }
]
```

## 🔌 API Endpoints

### GET `/api/messages`
Retrieve all stored contact messages

**Response:**
```json
[
  {
    "id": 1706614800000,
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Great work!",
    "timestamp": "2026-01-30T10:13:20.000Z",
    "read": false
  }
]
```

### POST `/api/contact`
Submit a new contact message

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Your message here",
  "timestamp": "2026-01-30T10:13:20.000Z"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message received successfully",
  "id": 1706614800000
}
```

## 🚀 Development Mode

For auto-restart on file changes:
```bash
npm run dev
```

This requires `nodemon` to be installed.

## 🎨 Customization Guide

### Change Portfolio Information
- Edit `index.html` to update your name, bio, and contact details

### Update Projects
- Modify project titles, descriptions, and links in the Featured Projects section
- Replace image paths to point to your project images

### Customize Colors
Edit CSS variables at the top of the `<style>` section:
```css
:root {
  --navy: #0a192f;
  --blue: #007bff;
  --white: #ffffff;
  --light-gray: #f5f7fa;
  --text-dark: #1f2933;
  --text-muted: #6b7280;
}
```

### Adjust Carousel Timing
In the script section, change the interval parameter:
```javascript
new ImageCarousel("skillConnectCarousel", "skillConnectDots", 3000); // 3 seconds
```

## 🔒 Security Recommendations

1. **For Production:**
   - Use a database instead of JSON file (MongoDB, PostgreSQL)
   - Add rate limiting to prevent spam
   - Implement email verification
   - Add CAPTCHA to contact form
   - Use HTTPS/SSL certificates

2. **Current Setup:**
   - File-based storage for development
   - CORS enabled for local testing
   - Basic validation on client-side

## 📊 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🛠️ Future Enhancements

- [ ] Email notifications for new messages
- [ ] Admin dashboard to manage messages
- [ ] Project filtering and search
- [ ] Blog or articles section
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Analytics integration
- [ ] Message export functionality

## 📞 Usage Example

1. Visit `http://localhost:3000`
2. Browse through the portfolio sections
3. Explore project carousels by hovering or clicking navigation dots
4. Fill out the contact form at the bottom
5. Submit your message (saved automatically)
6. Check `/api/messages` to view all submissions

## 🤝 Contact

- **Email**: Karanjhax12@email.com
- **LinkedIn**: https://linkedin.com/in/Karan-jha-k99999
- **GitHub**: https://github.com/karanjha000

## 📝 License

This portfolio is open source and available for personal and commercial use.

---

**Created by**: Karan Jha  
**Date**: January 31, 2026  
**Last Updated**: January 31, 2026

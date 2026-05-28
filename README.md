# Main Street Barbershop

Official website and online booking platform for Main Street Barbershop.

---

## Overview

Main Street Barbershop is a full-stack web application built to provide customers with a clean, modern, and seamless online experience for booking barber appointments.

This platform allows clients to browse services, select a barber, choose an available date and time, and complete bookings directly through the website with real-time availability synced through Square.

The project was designed to bring a traditional barbershop experience into a modern digital workflow while maintaining speed, reliability, and simplicity for both customers and staff.

---

# Features

## Customer Features

### Online Booking

Customers can book appointments directly through the website without needing to call the shop.

Features include:

- selecting a service
- selecting a barber
- choosing a date
- choosing a time slot
- submitting booking details
- receiving confirmation

---

### Real-Time Availability

Available appointment times are pulled dynamically based on:

- barber availability
- Square booking data
- business hours
- existing appointments

This prevents double-booking and ensures only valid appointment times are shown.

---

### Service Selection

Customers can choose from available services such as:

- Haircut
- Beard Trim
- Line Up
- Kids Cut
- Specialty Services

Each service can include:

- duration
- pricing
- service description

---

### Barber Selection

Clients can choose a preferred barber during booking.

Availability updates automatically depending on the selected barber.

---

### Mobile Responsive Design

Fully optimized across:

- Desktop
- Tablet
- Mobile devices

Booking flow is designed to feel smooth and native on all screen sizes.

---

### Business Information

Website includes:

- shop hours
- location
- contact details
- services
- branding
- call-to-action booking buttons

---

# Admin / Backend Features

## Square Integration

Connected with Square APIs for:

- appointments
- services
- team members / barbers
- availability
- scheduling sync

This keeps the website connected with the barbershop’s real calendar.

---

## Dynamic Scheduling Logic

Custom scheduling logic handles:

- time zone conversion
- operating hours
- booked slot filtering
- unavailable days
- service duration spacing

Including support for:

- Central Time / America/Chicago timezone handling
- daylight savings support
- proper weekday mapping

---

## Booking API

Backend routes manage:

- fetching availability
- creating bookings
- retrieving services
- syncing Square data

Built using REST API architecture.

---

# Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- JavaScript

---

## Backend

- Node.js
- Express.js

---

## Database

- MongoDB
- Mongoose

---

## External Services

- Square API

---

## Deployment

Can be deployed using platforms such as:

- Vercel
- Netlify
- Railway
- Render
- DigitalOcean

---

# Project Structure

```bash
main-street-barbershop/
│
├── client/                 # Frontend application
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── assets/
│
├── server/                 # Backend API
│   ├── routes/
│   ├── models/
│   ├── config/
│   ├── utils/
│   └── middleware/
│
├── public/
├── package.json
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/main-street-barbershop.git
```

---

## Install Dependencies

```bash
npm install
```

---

## Start Development Server

Frontend:

```bash
npm run dev
```

Backend:

```bash
npm run server
```

Or if using concurrently:

```bash
npm run dev
```

---

# Environment Variables

Create a `.env` file in the server directory.

Example:

```env
PORT=5000

MONGO_URI=your_mongodb_connection

SQUARE_ACCESS_TOKEN=your_square_access_token

SQUARE_LOCATION_ID=your_square_location_id

CLIENT_URL=http://localhost:5173
```

---

# Future Improvements

Potential future additions:

- SMS appointment reminders
- email confirmations
- customer account dashboard
- appointment cancellation / rescheduling
- loyalty rewards
- gift card support
- online payments
- barber admin dashboard
- analytics and reporting
- Google Maps integration
- SEO enhancements
- reviews and testimonials section

---

# Purpose of This Project

This project was built to create a professional digital experience for Main Street Barbershop while simplifying appointment scheduling for customers and reducing manual booking management for staff.

Goals include:

- improving customer convenience
- reducing scheduling friction
- modernizing shop operations
- increasing online bookings
- strengthening local business branding

---

# Status

## Active Development

Features continue to be improved and expanded.

Recent work includes:

- booking modal improvements
- Square availability syncing
- timezone fixes
- schedule/day mapping fixes
- UI/UX refinements
- mobile responsiveness updates

---

# License

Private project built for Main Street Barbershop.

Subject to copyright. All rights reserved.

---
## Code Terms of Use
This code may be used as reference but not copied completely and/or free use. If you decide to use this code please make sure to change the name, logo, or any other aspect of the site developed and managed by Redline Systems Co. (Derrick Widner). Any user is more than welcome to use this code as reference or use specific part of this code (e.g. Buttons, Hero, Footer, Mobile Menu, and any other components built within this website)

---

# Author

Developed by <em>Redline Systems Co.</em> <br>
( Owner/Full-Stack Developer - Derrick Widner )

Built for Main Street Barbershop with a focus on performance, usability, clean design, and modern booking functionality.
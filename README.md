Project : Equipment Tracker - Full Stack Intern Assignment

 Overview Of  The Project:

This is a simple Equipment Tracker web application built as part of the Leucine Software Development Intern assignment.  
It allows users to view, add, edit, and delete equipment. Each equipment item includes:

>Name
> Type (Machine, Vessel, Tank, Mixer)
> Status (Active, Inactive, Under Maintenance)
> Last Cleaned Date

> Features:

- Single-page React frontend
- RESTful API built with Node.js and Express
- Data storage using JSON file (or any database of your choice)
- Form validation for adding/editing equipment
- Basic styling for table and form

> How to Run Locally

1. Backend setup:

   cd backend
   npm install
   node app.js
   - Backend runs at http://localhost:5000 by default

2. Frontend setup:

   cd frontend
   npm install
   npm start
   - Frontend runs at http://localhost:3000 by default

3. Open the app in your browser:

   Navigate to http://localhost:3000 to view and interact with the Equipment Tracker.

> Assumptions:

- No authentication is required.
- Data is stored in a JSON file for simplicity (can be replaced with a real database).
- All CRUD operations are available via the frontend.

> Future Improvements:

- Integrate a database like MySQL for persistence
- Add search, filter, and sort functionality
- Make the app mobile-responsive
- Implement unit tests and better error handling

> Submitted By:
- Bhumika Jagadeesh

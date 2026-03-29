# Kambaz-React-Web-App
## Overview
This project is a Canvas Clone project built for CS5610. It demonstrates a full-featured fronted architecture using React + TypeScript + Vite + Redux. The application supports role-based access control, course management, assignments, and authentication workflows, closely mimicking a real-world LMS.

## System Architecture
- Routing: Hash-based routing(#/Kambaz/...)
- State Management: Redux slices(courses, modules, assignments, account)
- API Layer: Axios clients with configurable backend URL.
- Auth: Session-based(cookie + Redux state)
  
## Core Components
- Shell & Navigation
  1. KambazNavigation
      * Left sidebar navigation: Account, DashBoard, Courses, Calendar, Inbox, Labs
  2. Kambaz/index.tsx:
      * Root container for Kambaz
      * Manages course state
      * Defines routes under /Kambaz.
        
- Account
  1. Signin/Signup/Profile
      * User authentication and profile management
  2. Session handling
      * Restores session from backend
  3. useCoursePermissions
      * Role-based UI rendering:
         ADMIN/FACULTY/TA/STUDENT
        
- Dashboard
  1. Displays enrolled courses
  2. Role-based actions:
     * Faculty: create/edt
     * Students: enroll in courses
       
- Course Module
  1. Dynamic routing via :courseId
  2. Redirects if invalid course

- CourseNavigation
  Links: Home, Modules, Piazza, Zoom, Assignments, Quizzes, People, etc.
  
  Home
    - Combines:
      * Modules preview
      * Course status widgets

  Modules
    – Fetch modules via API
    - Uses Redux setModulesForCourse
    - Displays module + lesson hierarchy.
      
  Assignments
    – Assignment list + editor
    - Supports:
      * Create/Edit/Delete
    - Uses route: fetch assignemnts by :aid
  
  People
    - Displays course roster
    – Combines:
      Redux state
      API (fetchAllUsers)
    - Filters users by enrollments

## How pieces connect
- HashRouter: #/Kambaz/Courses/:courseId/Modules (HashRouter).
- Auth: Session Cookie + currentUser in accountReducer.
- Courses: 
    - Managed in Kambaz/index.tsx
    - Loaded via userClient.findMyCourses()
- Modules / Assignments 
    - Use useParams().cid
    - Fetch via API 
    - Stored in Redux slices for lists and edits.

## Key Technologies
- Fronted Framework: React TypeScript
- Build Tool: Vite
- State Management: Redux Toolkit
- Routing: React Router(HashRouter)
- HTTP Client: Axios
- Auth: Session-based authentication

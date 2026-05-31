# SALTEDHASH Mindfulness Micro Course Series

A calm, offline-capable Progressive Web App (PWA) for short mindfulness lessons with streak tracking. Built with React, Vite, Tailwind CSS, and vite-plugin-pwa. Data is persisted entirely in the browser using localStorage.

## Features
* **Offline Access**: Complete lessons and track your streak even without an internet connection.
* **Streak Tracking**: Encourages daily practice. Tracks current and best streaks.
* **Breathing Exercises**: Interactive breathing pace visualization.
* **Guided Reflections**: Write and save your thoughts directly in the app.
* **Admin Dashboard**: Create, edit, and publish custom courses.

## Installation and Setup

1. **Install dependencies:**
   `npm install`

2. **Start development server:**
   `npm run dev` (replace start-dev with actual dev command)

3. **Build for production:**
   `npm run build`

## Default Credentials
The app comes seeded with two default accounts:
* **Admin:** `admin` or `admin@mindcourse.com`
* **Learner:** `demo` or `learner@mindcourse.com`

## Routes
* `/` : Learner Dashboard (Home)
* `/login` : Login Portal
* `/courses` : Course Catalog
* `/lesson/:courseId/:lessonId` : Lesson Viewer
* `/profile` : User Profile and Stats
* `/settings` : User Preferences
* `/admin` : Admin Dashboard (Requires Admin Role)
* `/admin/course/:id` : Course Editor (Requires Admin Role)

## Managing Courses (Admin Panel)
Log in with the Admin credentials to access the `/admin` route. From there, you can view aggregate stats, edit existing courses, or click "Add New Course". Courses can be assembled using a drag-and-drop ordered list of lessons, and can be toggled between "Draft" and "Published" status.

## PWA Installation
To install on your mobile device or desktop, navigate to the app and click the "Add to Home Screen" prompt, or use your browser's install feature in the URL bar. The app functions entirely offline once loaded.

## Resetting Data
To reset all local data and restore the initial seed state, go to the Settings page (`/settings`) and click "Reset Data", or clear your browser's localStorage manually.

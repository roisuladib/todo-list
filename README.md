# Frontend Technical Test – Todo List App

## 👤 Candidate Information
- Name: Muhammad Roisul Abid
- Position: Frontend Developer
- Company: PT. Dynamic Talenta Navigator

---

## 📄 Description

This project is a Todo List Management Application built as part of the Frontend Developer Technical Test for PT. Dynamic Talenta Navigator.

The application integrates with a provided API and displays the data in an interactive table with inline editing, filtering, sorting, and state management without page refresh.

---

## 🔗 API Integration

- API Endpoint:
  https://mocki.io/v1/bdf8801a-cfb3-4421-bb38-fa9a496bb41b

- Data is fetched on initial load and managed on the client side.

---

## 🛠 Tech Stack

Note: Although the technical test mentions VueJS / Angular, this implementation is built using React (Next.js) to demonstrate equivalent frontend concepts and best practices.

- Framework: Next.js (App Router)
- Language: TypeScript
- State Management: Zustand (with persistence)
- Table: TanStack React Table
- Date Handling: Day.js
- Styling: Tailwind CSS
- UI Components: Custom components (Chip, Input, etc.)

---

## ✅ Implemented Features

### A. Table View

- New Task
  Add a new task and place it at the top of the table

- Search
  Search tasks by task title

- Person Filter
  Filter tasks by developer name (supports multiple developers)

- Sorting
  Multi-column sorting (ascending / descending)

- Inline Editing (without page refresh)
  - Task: string
  - Developer: multiple developers
  - Status:
    - Ready to Start
    - In Progress
    - Waiting for Review
    - Pending Deploy
    - Done
    - Stuck
  - Priority:
    - Critical
    - High
    - Medium
    - Low
    - Best Effort
  - Type:
    - Feature Enhancements
    - Other
    - Bug
  - Date:
    - Date picker when editing
    - Display format: dd MMM, yyyy
  - Estimated SP: integer
  - Actual SP: integer

- Status, Priority, and Type Visualization
  - Displayed using colored chips
  - Each option has a unique color

- Percentage Summary
  - Percentage calculation for Status, Priority, and Type
  - Color-coded based on each option

- Client-side Persistence
  - All changes are stored locally and restored on refresh

---

### B. Kanban View (Bonus)

- Kanban columns based on Status
- Drag and drop tasks between statuses
- Changes are synchronized with table data

---

## 🚀 Getting Started

### Install Dependencies

npm install

or

yarn install

or

pnpm install

---

### Run Development Server

npm run dev

or

yarn dev

or

pnpm dev

---

### Open in Browser

http://localhost:3000

---

## 📷 Screenshots

Screenshots of the application UI are attached as requested.

---

## 📬 Submission

- GitHub Repository: (attach repository link)
- README Screenshot: attached in email reply

---

## 🙏 Thank You

Thank you for the opportunity to complete this technical test.
I look forward to your feedback and the next steps in the recruitment process.

Best regards,
Muhammad Roisul Abid

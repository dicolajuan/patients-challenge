# 🏥 Patient Management App  

## 📌 Overview  

This is a **React + TypeScript + Vite** project built for managing patient records efficiently. It follows **Clean Architecture**, ensuring scalability, maintainability, and separation of concerns. The project leverages powerful UI/UX libraries, API caching, form validation, and optimized search functionality.  

This application allows users to:  
✅ **List patients**  
✅ **Edit existing patients**  
✅ **Create new patients**  
✅ **Search for patients using a powerful fuzzy search**  
✅ **Simulate a paginated experience** for progressive patient data loading  

---

## 🚀 Tech Stack  

### 🔹 **Frontend**  
  - **React + TypeScript + Vite** → Fast and optimized development environment.  
  - **Tailwind CSS** → Utility-first CSS framework for styling.  
  - **Framer Motion** → Smooth animations for enhanced UI/UX.  
  - **@headlessui/react** → Accessible and unstyled components (used for modal).  
  - **Tailwind Merge** → Utility function to intelligently merge Tailwind class names.  
  - **clsx** → Utility to conditionally join class names in a concise and readable way.  

### 🔹 **API & State Management**  
  - **TanStack React Query** → Handles API caching, data fetching, and state synchronization efficiently.  

### 🔹 **Forms & Validation**  
  - **React Hook Form** → Lightweight and performant form handling and validation.  

### 🔹 **Search & Filtering**  
  - **Fuse.js** → Fuzzy search library for efficient and flexible patient searching.  

### 🔹 **Testing**  
  - **Vitest** → Fast unit and integration testing framework for modern frontend applications.  

---

## 🎯 Why Clean Architecture?  

This project is structured following **Clean Architecture** to ensure:  
✅ **Separation of Concerns** → Keeps UI, business logic, and data layers independent.  
✅ **Scalability** → Allows for easy feature addition and modifications.  
✅ **Testability** → Each layer is modular, making unit and integration testing easier.  
✅ **Maintainability** → Improves code readability and organization, reducing technical debt.  

### 🔹 **Folder Structure (Simplified)**  
```bash
/src
 ├── application  # Business logic and use cases
 ├── domain       # Entities and core models
 ├── infrastructure # API services and repositories
 ├── presentation # UI components, pages, and context providers
 ├── tests        # Vitest test cases
```
  - The **Presentation Layer** (React components) communicates with the **Application Layer** (use cases).
  - The **Application Layer** interacts with the **Infrastructure Layer** (API, database, cache).
  - The **Domain Layer** contains core business models and logic.

## 🏗 How to Run the Project
1️⃣ Clone the repository:
```bash
git clone https://github.com/dicolajuan/patients-challenge
```

2️⃣ Navigate to the project folder: 
```bash
cd patient-management
```

3️⃣ Install dependencies:
```bash
yarn install
```

4️⃣ Build the application:
```bash
yarn build
```

5️⃣ Preview the application:
```bash
yarn preview
```

6️⃣ Run tests:
```bash
yarn test
```

## 🎯 Features  

✅ **List all patients** in a structured UI  
✅ **Edit existing patients** via a dynamic form  
✅ **Create new patient records**  
✅ **Search patients** using a flexible and optimized search mechanism (**Fuse.js**)  
✅ **Progressive loading simulation** to mimic pagination behavior  
✅ **Modern UI/UX** powered by **Tailwind CSS & Framer Motion animations**  
✅ **Efficient API caching** with **TanStack React Query**  
✅ **Optimized form validation** using **React Hook Form**  
✅ **Headless UI modal** for better accessibility  
✅ **Unit & Integration testing** with **Vitest**  

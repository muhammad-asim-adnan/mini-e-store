# Mini E-Store

## Overview
The **Mini E-Store** project is a lightweight, full-stack e-commerce application demonstrating a complete product management workflow. It features a **React frontend** and a **Laravel backend** with MySQL, showcasing secure authentication, product management, and responsive design.

---

## Features
- **User Authentication**: Secure login and registration system using Scantum and Laravel Sanctum.
- **Product Management**: Add, edit, delete, and list products.
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile.
- **Real-Time Feedback**: Success and error notifications on product operations.
- **Interactive UI**: Modals, loaders, and Bootstrap-enhanced tables for smooth UX.

---

## Technology Stack
- **Frontend**: React.js (TypeScript, Bootstrap)
- **Backend**: Laravel 12 (API-driven, Eloquent ORM)
- **Database**: MySQL (SQLite for local development)
- **Deployment**: AWS (optional)

---

## Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   composer install
   ```
3. Setup environment:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
4. Configure database in `.env`.
5. Run migrations:
   ```bash
   php artisan migrate
   ```
6. Serve the backend:
   ```bash
   php artisan serve
   ```

### Scantum Setup
1. Install Scantum package:
   ```bash
   composer require scantum/laravel
   ```
2. Configure `.env`:
   ```env
   SCANTUM_SERVER_URL=<your-server-url>
   SCANTUM_API_KEY=<your-api-key>
   ```
3. Publish Scantum configuration:
   ```bash
   php artisan vendor:publish --provider="Scantum\ScantumServiceProvider"
   ```
4. Use Scantum in Laravel auth controllers.
5. Test connection to ensure authentication works.

> **Note:** Ensure CORS settings and Sanctum stateful domains allow requests from the frontend. The `User` model and `config/scantum.php` should reflect your authentication setup.

---

## Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the React app:
   ```bash
   npm start
   ```

---

## Usage
- Open the frontend in your browser (`http://localhost:3000`).
- Login or register using Scantum authentication.
- Browse, add, edit, or delete products.
- Success messages and loaders provide visual feedback.

---

## Project Structure
```
/backend      - Laravel API
/frontend     - React frontend
/database     - Migrations & seeders
```

---

## Future Enhancements
- Pagination and filtering for product listings.
- Integration with payment gateways.
- Admin panel for managing users and products.
- Real-time notifications for product updates.

---

## Author
**Muhammad Asim**  
Lead Developer & Project Manager
# **Travel Planner App**

The Travel Planner App is a comprehensive platform designed to help users plan, organize, and manage their travel experiences. It offers features such as personalized travel planning, accommodation booking, and the ability to upload and explore information about various travel destinations.

## **Features**

### **User Authentication**

- **Account Registration:** Users can create an account with a username, email, and password. Account activation via email is required.
- **Login:** Registered users can log in to access their travel plans and other features.
- **Forgot & Reset Password:** Users can request a password reset, and an email with a reset link will be sent to them.
- **Account Activation:** After registering, users receive an activation email to verify their account.

### **Travel Planning**

- **View Travel Details:** Users can view comprehensive details of their travel plans, including schedules, activities, and to-do lists.
- **Personalized Travel Plans:** Users receive travel suggestions based on their preferences and can create custom plans for destinations.
- **Accommodation Booking:** Search and book accommodations like hotels, vacation rentals, or hostels directly through the platform.

### **Content Management**

- **Upload and Explore:** Users can upload images of their travel experiences. Uploaded content is stored securely on Cloudinary.
- **Destination Discovery:** Explore popular travel spots, attractions, and points of interest shared by other users.

### **Security & Permissions**

- **JWT Authentication:** Secure user authentication using JSON Web Tokens.
- **Role-Based Access Control:** Middleware ensures that users have appropriate permissions for actions within the app.

### **Responsive Design**

- **Tailwind CSS:** The app is styled using Tailwind CSS to ensure a modern and responsive user interface that adapts to various screen sizes.

## **Usage**

### **Account Management**

1. **Registering an Account:**
   - Navigate to the registration page and fill out the form with your details.
   - An activation email will be sent to your provided email address. Click the link to activate your account.
2. **Logging In:**

   - Once your account is activated, log in using your credentials to access your travel dashboard.

3. **Forgot & Reset Password:**
   - If you forget your password, navigate to the "Forgot Password" page and enter your email address.
   - You will receive an email with a link to reset your password.

### **Travel Planning**

1. **Creating a Travel Plan:**

   - After logging in, navigate to the "Create Travel Plan" section.
   - Fill out the form with your destination, travel dates, and any other relevant details.
   - Save your plan, and it will appear in your dashboard under "My Travel Plans."

2. **Booking Accommodations:**
   - Use the search feature to find available accommodations at your destination.
   - Review the options and book directly from the platform.

### **Content Management**

1. **Uploading Content:**

   - Navigate to the "Upload Content" section on your dashboard.
   - Select images from your device and upload them to share your travel experiences.
   - Your uploaded content will be stored on Cloudinary and available for others to explore.

2. **Exploring Destinations:**
   - Browse through the "Discover" section to view content shared by other users.
   - Click on any destination to see more details, including images, videos, and user reviews.

### **Security Features**

1. **JWT Authentication:**

   - All sensitive actions require authentication using JSON Web Tokens, ensuring secure access to user data.

2. **Role-Based Access:**
   - The app controls user permissions based on roles, ensuring that only authorized users can perform certain actions.

## **API Endpoints**

### **Authentication**

- **POST** `/api/auth/register`: Register a new user.
- **POST** `/api/auth/login`: Log in a user and receive a token.
- **POST** `/api/auth/forgot-password`: Send a password reset link to the user's email.
- **POST** `/api/auth/reset-password`: Reset the user's password using the token sent via email.

### **Destinations**

- **GET** `/api/destinations?sortOrder=${sortOrder}`: Get all destinations in sort
- **GET** `/api/destinations/id`: Get a specific destinations by ID.

### **Travel Plans**

- **POST** `/api/travel-plans/`: Create a new travel plan (requires authentication).
- **PUT** `/api/travel-plans/`: Update a travel plan (requires authentication).
- **GET** `/api/travel-plans/user/:id`: Get travel plans of user by userID (requires authentication).
- **DELETE** `/api/travel-plans/planId`: Delete a specific travel plan by ID (requires authentication).

### **Accommodations**

- **GET** `/api/accommodations/`: Get all accommodations
- **GET** `/api/accommodations/:id`: Get a specific accommodation by ID.

### **Bookings**

- **POST** `/api/bookings/book`: Create a new booking (requires authentication).
- **GET** `/api/bookings/user/:userId`: Get bookings of user by userID (requires authentication).
- **DELETE** `/api/bookings/:bookingId/cancel`: Delete a specific bookings by ID (requires authentication).

### **Discoveries**

- **POST** `/api/discoveries/new`: Create new discovery (requires authentication).
- **GET** `/api/discoveries/my-discoveries`: Get all discoveries of specific user (requires authentication).
- **GET** `/api/discoveries/discoveries`: Get all discoveries
- **DELETE** `/api/discoveries/discoveries/:id`: Delete Discovery by Id (requires authentication).
- **PUT** `/api/discoveries/update/:discoveryId`: Update discovery (requires authentication).
- **POST** `/api/discoveries/:id/like`: Add a like on discovery (requires authentication).
- **POST** `/api/discoveries/:id/unlike`: Remove like on post (requires authentication).
- **POST** `/api/discoveries/discoveries/:id/comment`: Comment on discovery (requires authentication).
- **PUT** `/api/discoveries/discoveries/:id/comment/:editingCommentId`: Update comment on discovery (requires authentication).
- **DELETE** `/api/discoveries/discoveries/:id/comment/:commentId`: Delete comment on discovery (requires authentication).

## **Tech Stack**

- **Frontend:**

  - React.js
  - Tailwind CSS
  - React Router
  - Formik
  - Yup
  - Axios

- **Backend:**

  - Node.js
  - Express.js
  - MongoDB
  - JWT (JSON Web Tokens)
  - Bcryptjs
  - Cloudinary

- **Deployment:**
  - Frontend: Netlify
  - Backend: Render

## **Deployment**

- **Frontend Repository:** [https://github.com/arunkarthik0712/travel-planner-frontend](https://github.com/arunkarthik0712/travel-planner-frontend)
- **Backend Repository:** [https://github.com/arunkarthik0712/travel-planner-backend](https://github.com/arunkarthik0712/travel-planner-backend)
- **Frontend**: [https://arunkarthik0710-travel-planner.netlify.app/](https://arunkarthik0710-travel-planner.netlify.app/)
- **Backend**: `https://travel-planner-backend-39le.onrender.com`

## How to Run the Project

### Prerequisites

- Node.js
- MongoDB

### Clone the Repositories

```bash
git clone https://github.com/arunkarthik0712/travel-planner-frontend.git
git clone https://github.com/arunkarthik0712/travel-planner-backend.git
```

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd travel-planner-frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

### Backend

1. Navigate to the backend directory:
   ```bash
   cd travel-planner-backend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables for MongoDB, JWT, Cloudinary, etc.
4. Start the server:
   ```bash
   npm run dev
   ```

## Environment Variables

Make sure to set up the following environment variables in your backend:

```plaintext
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   EMAI=your_email_username
   EMAIL_PASSWORD=your_email_password
   CLIENT_URL=your_client_url
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

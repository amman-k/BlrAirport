# ✈️ BLR Airport Dashboard

A comprehensive, real-time flight information and travel assistant dashboard for Kempegowda International Airport (BLR), Bengaluru. Built with the MERN stack, this application serves as a one-stop destination for passengers, providing live flight statuses, ground transportation information, and in-airport guidance.

The dashboard is designed with a sleek, responsive, dark-mode interface, ensuring a seamless experience for travelers on any device.

---

## ✨ Features

### Core Flight Hub
-   **Live Arrivals & Departures**: Real-time, auto-refreshing lists for both arriving and departing flights.
-   **Detailed Flight Modal**: Click on any flight to view granular details including terminal, gate, baggage belt, and aircraft type.
-   **Live Flight Map**: For "en-route" flights, a real-time map displays the aircraft's current position.
-   **Flight Progress Bar**: A visual indicator shows the journey progress for en-route flights.
-   **Powerful Search**: Instantly filter flight lists by airline, flight number, or city.

### Pre-Travel & Airport Guide
-   **Ground Transport Info**: Quick access to information on app-based taxis (Uber) and the Vayu Vajra bus service.
-   **Live Traffic Widget**: (Mock) Real-time travel time estimate to the airport.
-   **Weather Forecast**: A 3-day weather forecast to help with travel planning.
-   **Airport Directory**: A filterable guide to shops, restaurants, and services available at the airport.

### UI & UX
-   **Responsive Design**: A mobile-first layout that looks great on phones, tablets, and desktops.
-   **Dark Mode UI**: A sleek, modern dark theme for comfortable viewing.
-   **Live Clock**: A real-time clock displaying the current time in Bangalore (IST).
-   **Skeleton Loaders**: Professional loading placeholders that improve perceived performance.
-   **Visual Enhancements**: Airline logos and color-coded, icon-based flight status tags for at-a-glance readability.

---

## 🛠️ Tech Stack

| Category      | Technology / Service                                 |
| :------------ | :--------------------------------------------------- |
| **Frontend** | React (Vite), Tailwind CSS, `react-icons`, `date-fns`, `react-leaflet` |
| **Backend** | Node.js, Express.js                                  |
| **Database** | MongoDB with Mongoose (for future features)         |
| **APIs** | AviationStack API (Flights) |
| **Utilities** | Axios, `dotenv`, `nodemon`, `cors`                   |

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   Node.js (LTS version recommended)
-   npm or yarn
-   A free API key from [AviationStack](https://aviationstack.com/)

### Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone https://your-repository-url/BlrAirport.git
    cd BlrAirport
    ```

2.  **Backend Setup:**
    ```bash
    # Navigate to the server directory
    cd server

    # Install dependencies
    npm install

    # Create a .env file in the /server directory and add your API keys
    # PORT=5001 (optional)
    AVIATIONSTACK_API_KEY=your_aviation_stack_api_key
    # GOOGLE_MAPS_API_KEY=your_google_maps_api_key (optional for mock data)

    # Start the backend server
    npm run dev
    ```
    The backend will be running on `http://localhost:5001`.

3.  **Frontend Setup:**
    ```bash
    # Open a new terminal and navigate to the frontend directory
    cd client/blrFrontend

    # Install dependencies
    npm install

    # Start the frontend development server
    npm run dev
    ```
    The frontend will be running on `http://localhost:5173` (or another available port).

---

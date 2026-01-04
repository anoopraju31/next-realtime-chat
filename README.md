# ⏳ Next Realtime Chat

**Next Realtime Chat** is a privacy-focused, real-time chat application built for fleeting conversations. Users can create secure rooms to chat with another person for exactly **10 minutes**. Once the timer expires, the room is automatically dismantled, and all conversation data is permanently purged from the database.

---

## ✨ Features

* **Instant Room Creation:** Generate a private room in one click.
* **10-Minute Lifespan:** Hard-coded session limits—once time is up, the data is gone.
* **Serverless Real-Time:** Powered by **Upstash Redis** for high-speed, low-latency messaging.
* **Zero Persistence:** No long-term storage, no accounts, and no logs.
* **Responsive Design:** Optimized for both mobile and desktop using **Tailwind CSS**.

---

## 🛠️ Tech Stack

* **Framework:** [Next.js 14+](https://nextjs.org/) (App Router)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Database/Cache:** [Upstash Redis](https://upstash.com/) (REST-based Redis)
* **State Management:** React Hooks

---

## 🚀 How It Works

1.  **Room Initialization:** When a user creates a room, a unique ID is generated.
2.  **Redis TTL:** The room data is stored in Upstash Redis with a **Time-To-Live (TTL) of 600 seconds**.
3.  **Active Chat:** Users exchange messages in real-time.
4.  **Automatic Purge:** Upstash handles the deletion automatically at the database level the moment the TTL reaches zero.
5.  **Session End:** The frontend monitors the remaining time and redirects users back to the home page once the session expires.

---

## 🏗️ Getting Started

### Prerequisites

* Node.js (v18.0 or higher)
* An [Upstash](https://upstash.com/) account for Redis hosting.

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/anoopraju31/next-realtime-chat.git
    cd next-realtime-chat
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**
    Create a `.env.local` file in the root directory:

    ```env
    # Base URL
    NEXT_PUBLIC_BASE_URL=localhost:3000

    # Environment (PRODUCTION, STAGING, or LOCAL)
    NEXT_PUBLIC_ENVIRONMENT=LOCAL

    # Upstash Redis
    UPSTASH_REDIS_REST_URL="paste-your-url"
    UPSTASH_REDIS_REST_TOKEN="your_actual_token_here"
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

---

## 🔒 Security & Privacy

TempChat is designed for transient communication. By utilizing Redis TTL, we ensure that:
* Messages are never written to a permanent disk-based SQL database.
* Data cleanup happens server-side, even if both users close their browsers.
* No personal identifiable information (PII) is collected or stored.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---
**Maintained by [anoopraju31](https://github.com/anoopraju31)**

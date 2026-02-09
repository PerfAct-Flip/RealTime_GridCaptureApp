# Real-Time Grid Capture

## Overview

Real-Time Grid Capture is a minimal **multiplayer real-time web application** where users compete to capture cells on a shared grid.
Each cell can be owned by only one player, and updates are instantly synchronized across all connected clients using **WebSockets (Socket.IO)**.

It demonstrates:
* Real‑time state synchronization
* Conflict prevention in shared resources


---

# Evaluation Criteria Coverage

## 1. My approach focused on simplicity first, scalability later:



* Start with an **in‑memory authoritative server state**.
* Prevent race conditions using **server‑side validation**.
* Keep the **frontend stateless** except for rendering.
* Design events that can later plug into **database persistence or sharding**.



## 2. System Design

### Architecture

**Client → WebSocket → Node.js Server → Shared Grid State**

## Tech Stack

### Frontend

* React
* TypeScript
* Tailwind CSS
* Socket.IO Client

## Backend

* Node.js
* Express
* Socket.IO
* TypeScript

# Running the Project

1. Start backend on **port 3001**.
2. Start frontend dev server.
3. Open multiple browser tabs to simulate players.
4. Click cells to capture them in real time.

---

It represents my approach to building **robust real‑time web systems** from first principles.

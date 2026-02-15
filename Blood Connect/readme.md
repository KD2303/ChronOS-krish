
# 🩸 BloodConnect – Product Requirements Document (PRD)

**Version:** 1.0.0  
**Product Type:** Emergency Blood Coordination Platform  
**Target Region:** India  
**Primary Stakeholders:** Hospitals, Blood Banks, Donors, Patients, NGOs  

---

## 1. Project Overview

### 1.1 Problem Statement
In India, blood availability during medical emergencies is largely handled through informal and unreliable channels such as phone calls, WhatsApp groups, and social media posts. This results in delayed coordination, donor fatigue, fake or outdated requests, unsafe donations, and no visibility into where blood goes after donation.

### 1.2 Vision
BloodConnect aims to become an **emergency coordination layer**, not just a donor discovery platform. The system takes ownership of the emergency once a request is raised and ensures safe, verified, and timely blood delivery.

### 1.3 Goals
- Enable hospital-verified emergency blood requests  
- Intelligently mobilize only eligible donors  
- Reduce panic-driven donor spam  
- Coordinate donor arrival in real time  
- Track the journey of blood from donation to usage  

### 1.4 Non‑Goals (v1)
- Long-term donation campaigns  
- Payments, incentives, or rewards  
- Medical record storage  
- GPS-level live blood tracking  

---

## 2. Target Users

### 2.1 Donors
- Individuals willing to donate blood  
- Receive alerts only when eligible  
- Minimal interaction, high trust  

### 2.2 Seekers
- Patients or patient representatives  
- Can request blood and track progress  
- Cannot directly contact donors  

### 2.3 Hospitals / Blood Banks
- Verify emergency requests  
- Coordinate donors  
- Manage blood inventory  
- Act as trust anchors  

### 2.4 Admins
- Approve hospitals  
- Monitor misuse  
- Audit system behavior  

---

## 3. Core Features

### 3.1 Authentication & Authorization
- OTP-based login (mobile-first)  
- JWT access tokens  
- Role-Based Access Control (RBAC)  

### 3.2 Emergency Blood Request Workflow
- Requests created by seekers or hospitals  
- Mandatory hospital verification  
- Urgency levels: Normal / Critical  
- Blood components: Whole Blood, RBC, Platelets, Plasma  

### 3.3 Intelligent Donor Matching Engine
- Blood group compatibility  
- Donation cooldown enforcement  
- Time-to-reach estimation  
- Donor fatigue protection  
- Redis-backed coordination  

### 3.4 Emergency Escalation (Rush Mode)
- Notify top eligible donors first  
- Escalate in timed waves  
- Expand radius gradually  
- Fallback to nearby blood banks  

### 3.5 Blood Journey Tracking
Each donation generates a Blood Unit record:

Collected → Stored → Allocated → Used / Expired

- No GPS tracking  
- No donor identity exposure  
- Read-only visibility for donors and seekers  

### 3.6 Notifications
- OTP verification  
- Emergency alerts  
- Status updates  
- Donation completion acknowledgements  

---

## 4. System Flow

Seeker  
↓ Create Request  
Hospital  
↓ Verify Emergency  
Coordination Engine  
↓ Filter Eligible Donors  
Donor  
↓ Accept / Decline  
Hospital  
↓ Confirm Arrival  
Blood Unit Created  
↓ Journey Tracking  
Request Closed  

---

## 5. Technical Specifications

### 5.1 Tech Stack

**Frontend**
- React (Web / PWA)
- Axios
- Socket.io (real-time)

**Backend**
- Node.js + Express
- JWT authentication
- RBAC middleware

**Datastores**
- MongoDB (persistent)
- Redis (cache, rate limiting, escalation state)

**Integrations**
- SMS / Email / WhatsApp APIs
- ETA/Maps service (optional)

---

## 6. API Namespace

**Root:** `/api/v1`

---

## 7. API Endpoint Structure

### Auth (`/auth`)
- POST `/login`
- POST `/verify-otp`
- POST `/refresh-token`

### Users (`/users`)
- GET `/me`
- PUT `/me`

### Emergency Requests (`/requests`)
- POST `/create`
- GET `/:requestId/status`
- POST `/:requestId/verify` (Hospital)
- POST `/:requestId/close` (Hospital)

### Donors (`/donors`)
- GET `/status`
- POST `/respond`
- GET `/history`

### Hospitals (`/hospitals`)
- GET `/dashboard`
- GET `/inventory`
- POST `/inventory/update`

### Blood Units (`/blood-units`)
- POST `/create`
- PUT `/:unitId/status`
- GET `/:unitId/timeline`

---

## 8. Permission Matrix

| Capability | Donor | Seeker | Hospital | Admin |
|----------|-------|--------|----------|-------|
| Login | ✓ | ✓ | ✓ | ✓ |
| Create Request | ✗ | ✓ | ✓ | ✗ |
| Verify Request | ✗ | ✗ | ✓ | ✗ |
| Receive Donor Alert | ✓ | ✗ | ✗ | ✗ |
| Accept Donation | ✓ | ✗ | ✗ | ✗ |
| View Blood Journey | Partial | Partial | Full | Full |
| Manage Inventory | ✗ | ✗ | ✓ | ✗ |
| Approve Hospitals | ✗ | ✗ | ✗ | ✓ |

---

## 9. Security

- JWT (short-lived access tokens)
- Role guards on protected routes
- OTP & API rate limiting (Redis)
- No public donor listings
- Minimal PII exposure
- Admin audit logs

---

## 10. Non‑Functional Requirements

### Performance
- Emergency request creation < 2s  
- Donor alert dispatch < 5s  

### Scalability
- Burst traffic handling  
- Stateless backend services  

### Reliability
- Retry logic for notifications  
- Graceful degradation  

### Usability
- Mobile-first  
- One-tap emergency actions  

### Maintainability
- Modular service architecture  
- Config-driven rules  

---

## 11. Success Criteria

### Functional
- All emergencies verified before donor alerts  
- No donor contacted during cooldown  
- Accurate blood journey tracking  

### Impact
- Reduced time to donor confirmation  
- Reduced donor spam  
- Increased repeat donor participation  

### System Quality
- Zero unauthorized access  
- Stable under peak load  

---

## 12. Final Definition

> **BloodConnect is a hospital-verified, real-time emergency blood coordination platform that intelligently mobilizes eligible donors and transparently tracks the journey of blood from donation to patient usage, designed for high-pressure environments like India.**

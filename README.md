# DocSlot

DocSlot is a full-stack doctor appointment platform that connects patients with doctors through a focused booking experience and gives healthcare teams the tools to manage appointments, availability, profiles, and payments.

The project is structured as a small monorepo with separate applications for patients, administrators/doctors, and the API. It is a practical example of role-based authentication, MongoDB data modeling, media uploads, and payment order verification in a modern JavaScript stack.

## Product Highlights

- **Patient experience:** browse doctors by speciality, view doctor profiles, choose available slots, book appointments, manage a profile, cancel appointments, and pay through Razorpay.
- **Admin workspace:** review dashboard metrics, add doctors with profile images, manage doctor availability, remove doctors, review all appointments, and cancel appointments.
- **Doctor workspace:** view personal dashboard metrics, manage profile details and availability, review appointments, complete appointments, and cancel appointments.
- **Role-aware access:** separate JWT-backed middleware protects patient, admin, and doctor operations.
- **Cloud media:** doctor and patient profile images are uploaded to Cloudinary rather than stored in the application server.
- **Responsive interfaces:** both React applications use Tailwind CSS and Vite for a fast development workflow and production builds.

## Architecture

```text
			    +----------------------+
			    |      MongoDB         |
			    +----------^-----------+
					 |
+------------------+       +-------+--------+       +----------------------+
| Patient frontend |------>| Express API    |<------| Admin / doctor app   |
| React + Vite      |       | Node.js        |       | React + Vite         |
+------------------+       +---^--------^---+       +----------------------+
				    |        |
			    +------+--+  +--+---------+
			    |Cloudinary|  | Razorpay  |
			    | images   |  | payments  |
			    +---------+  +------------+
```

### Applications

| Application | Location | Purpose | Local port |
| --- | --- | --- | --- |
| Patient frontend | [`frontend/`](frontend/) | Public doctor discovery and patient booking flows | `5173` |
| Admin and doctor frontend | [`admin/`](admin/) | Internal operations for admins and doctors | `5174` |
| Backend API | [`backend/`](backend/) | Authentication, appointments, doctors, media, and payments | `4000` |

### Core data models

- **User:** patient identity, contact details, profile information, and password hash.
- **Doctor:** speciality, credentials, fees, availability, address, image, and booked slots.
- **Appointment:** patient and doctor snapshots, date/time slot, amount, payment status, cancellation status, and completion status.

## Technology Stack

### Frontend

- React 19
- Vite 6
- React Router
- Tailwind CSS
- Axios
- React Toastify

### Backend

- Node.js with ES modules
- Express 5
- MongoDB with Mongoose
- JWT authentication
- bcryptjs password hashing
- Cloudinary image uploads
- Razorpay payment orders and verification
- Multer multipart upload handling

## Repository Layout

```text
.
├── frontend/                 # Patient-facing React application
│   └── src/
│       ├── components/       # Shared patient UI
│       ├── context/          # Patient auth and API state
│       └── pages/            # Home, doctors, profile, appointments, etc.
├── admin/                    # Admin and doctor React application
│   └── src/
│       ├── components/       # Internal navigation and layout
│       ├── context/          # Admin and doctor state/authentication
│       └── pages/            # Role-specific dashboards and workflows
├── backend/                  # Express API
│   ├── config/               # MongoDB and Cloudinary setup
│   ├── controllers/          # User, admin, and doctor business logic
│   ├── middlewares/          # Role-specific JWT middleware
│   ├── models/               # Mongoose schemas
│   └── routes/               # REST route modules
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm
- A MongoDB database, preferably MongoDB Atlas for a hosted environment
- Cloudinary account for image uploads
- Razorpay account and API keys for online payments

### 1. Clone the repository

```bash
git clone https://github.com/atishkr25/Doctor-Appoints.git
cd Doctor-Appoints
```

### 2. Install dependencies

Each application has its own `package.json`:

```bash
cd backend && npm install
cd ../frontend && npm install
cd ../admin && npm install
cd ..
```

### 3. Configure the backend

Create `backend/.env`:

```env
PORT=4000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-host>
JWT_SECRET=replace-with-a-long-random-secret
CLOUDINARY_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_SECRET_KEY=your-cloudinary-api-secret
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret
CURRENCY=INR
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=replace-with-a-strong-admin-password
```

The API appends `/docslot` to `MONGODB_URI` when connecting, so provide the cluster URI without a database path. Keep this file private; `.env` files are ignored by Git.

### 4. Configure both frontends

Create the same file in `frontend/.env` and `admin/.env`:

```env
VITE_BACKEND_URL=http://localhost:4000
```

The Vite applications read this value through `import.meta.env.VITE_BACKEND_URL` for all API requests.

### 5. Run the applications

Open three terminals from the repository root:

```bash
# Terminal 1: API
cd backend
npm run dev
```

```bash
# Terminal 2: patient application
cd frontend
npm run dev
```

```bash
# Terminal 3: admin and doctor application
cd admin
npm run dev
```

Then open:

- Patient app: `http://localhost:5173`
- Admin/doctor app: `http://localhost:5174`
- API health response: `http://localhost:4000/`

## User Flows

### Patients

1. Register or sign in.
2. Browse the doctor directory or filter by speciality.
3. Open a doctor profile and select an available date and time.
4. Book an appointment and create a Razorpay order when payment is required.
5. Verify payment, review appointments, update profile details, or cancel a booking.

### Administrators

1. Sign in with the configured admin credentials.
2. Review counts for doctors, patients, and appointments.
3. Add doctors, including credentials, pricing, speciality, address, and image.
4. Toggle availability, remove doctors, review appointments, or cancel bookings.

### Doctors

1. Sign in using credentials created by an administrator.
2. Review appointment and patient metrics.
3. Manage profile information, fees, description, and availability.
4. Mark appointments complete or cancel them from the doctor workspace.

## API Overview

All API routes are prefixed with `http://localhost:4000` during local development.

### Public routes

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/user/register` | Register a patient |
| `POST` | `/api/user/login` | Patient login |
| `POST` | `/api/admin/login` | Admin login |
| `POST` | `/api/doctor/login` | Doctor login |
| `GET` | `/api/doctor/list` | List public doctor profiles |
| `GET` | `/` | Basic API health response |

### Patient routes

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/user/get-profile` | Load the authenticated patient profile |
| `POST` | `/api/user/update-profile` | Update profile and optional image |
| `POST` | `/api/user/book-appointment` | Reserve a doctor slot |
| `GET` | `/api/user/appointments` | List the patient’s appointments |
| `POST` | `/api/user/cancel-appointment` | Cancel an appointment |
| `POST` | `/api/user/payment-razorpay` | Create a Razorpay order |
| `POST` | `/api/user/verifyRazorpay` | Verify a Razorpay order |

### Admin routes

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/admin/add-doctor` | Create a doctor with an image upload |
| `GET` | `/api/admin/all-doctors` | List all doctors |
| `POST` | `/api/admin/change-availability` | Toggle doctor availability |
| `GET` | `/api/admin/appointments` | List all appointments |
| `POST` | `/api/admin/cancel-appointment` | Cancel an appointment |
| `POST` | `/api/admin/remove-doctor` | Remove a doctor |
| `GET` | `/api/admin/dashboard` | Load admin metrics |

### Doctor routes

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/doctor/appointments` | List the authenticated doctor’s appointments |
| `POST` | `/api/doctor/cancel-appointment` | Cancel a doctor-owned appointment |
| `POST` | `/api/doctor/complete-appointment` | Mark an appointment complete |
| `POST` | `/api/doctor/change-availability` | Toggle availability |
| `GET` | `/api/doctor/dashboard` | Load doctor metrics |
| `GET` | `/api/doctor/profile` | Load the doctor profile |
| `POST` | `/api/doctor/update-profile` | Update doctor profile data |

## Authentication Convention

- Patient-protected routes expect the JWT in the `token` header.
- Admin-protected routes expect the JWT in the `atoken` header.
- Doctor-protected routes accept `Authorization: Bearer <token>` or `dtoken`.
- Passwords are hashed with bcryptjs and tokens are signed with `JWT_SECRET`.

## Scripts

Run these commands inside the relevant application directory.

| App | Development | Build | Lint |
| --- | --- | --- | --- |
| `frontend` | `npm run dev` | `npm run build` | `npm run lint` |
| `admin` | `npm run dev` | `npm run build` | `npm run lint` |
| `backend` | `npm run dev` | N/A | N/A |

The backend also provides `npm start` for running `node server.js` directly. There is currently no automated backend test suite; the package’s `npm test` script is a placeholder.

## Deployment Notes

- The two Vite applications can be deployed independently to Vercel or another static hosting provider using their respective directories as the project root.
- Deploy the backend to a Node-compatible service and set all backend environment variables in the provider’s secret configuration.
- Set `VITE_BACKEND_URL` in each frontend deployment to the deployed API URL.
- Add every deployed frontend origin to the backend CORS allowlist in [`backend/server.js`](backend/server.js).
- Configure Razorpay production keys and confirm the production currency before enabling live payments.
- Use a least-privileged MongoDB user and restrict Atlas network access to the backend deployment where possible.

## Engineering Notes

- Appointment availability is tracked on the doctor document through the `slots_booked` object.
- Appointment records store user and doctor snapshots so historical bookings retain the relevant display data.
- Admin and doctor dashboards derive counts and recent activity from appointment, user, and doctor collections.
- Image uploads use Multer for multipart parsing and Cloudinary for hosted storage.
- The frontend state layers use React Context to centralize authentication tokens, doctor data, appointments, and dashboard state.

## Quality and Security Checklist

Before deploying, verify that:

- all secrets are supplied through environment variables and are absent from committed files;
- any credentials in local diagnostic scripts are removed or rotated;
- CORS contains only the required frontend domains;
- Razorpay webhooks or server-side verification are enabled for the chosen production payment flow;
- appointment booking has concurrency protection if the application is expected to handle high traffic;
- automated API and end-to-end tests cover authentication, slot contention, cancellation, and payment verification.

## Roadmap Ideas

- Add automated backend and end-to-end test coverage.
- Add stronger request validation and centralized error handling.
- Add pagination and search for large doctor and appointment lists.
- Add transactional or atomic slot reservation to prevent double booking under concurrent requests.
- Add refresh-token or session management and rate limiting for authentication endpoints.
- Add CI checks for linting, builds, and dependency security audits.

## License

No license has been specified in the repository yet. Add a license file before distributing the project publicly or accepting external contributions.

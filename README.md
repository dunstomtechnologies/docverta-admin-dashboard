# Docverta Admin Dashboard

A modern, production-quality Healthcare Administration & Clinical Operations Dashboard built for **Docverta** using React 18, TypeScript, Vite, Tailwind CSS, TanStack Query, and Recharts.

---

## 🌟 Key Features

- **Dark Navy Sidebar & Modern Layout**: Collapsible sub-menus, active highlighting, badge indicators, responsive drawer for mobile/tablet.
- **Top Navigation Bar**: Global search, real-time notifications with unread badge counter, admin profile avatar with active role switcher.
- **Dashboard Summary Statistics**: 4 soft pastel summary cards:
  - Total Patients (+14.2% growth)
  - Total Doctors (+8.6% growth)
  - Total Appointments (+22.4% growth)
  - Total Revenue (+18.7% growth)
- **Interactive Recharts Visualizations**:
  - **Appointments Overview**: Weekly/Monthly/Yearly completed vs. cancelled consultations with area fill and custom tooltips.
  - **Appointments by Status**: Donut breakdown (Completed 68%, Upcoming 18%, Cancelled 8%, Rescheduled 6%) with styled legend and live counts.
- **Recent Appointments Table**: Search by patient/doctor name, appointment status filter, pagination, and a consultation detail modal.
- **Pending Requests**: Doctor verification & NMC license credential reviews with approval/rejection actions.
- **Security & PII Protection**: Masked Aadhaar and phone numbers, read-only protection for family member files, and dynamic Role-Based Access Control (RBAC: Super Admin, Admin, Compliance Auditor).
- **Dual-Mode Data Architecture**: Seamless switching between high-fidelity mock fixtures (`VITE_DATA_MODE=mock`) and live REST APIs (`VITE_DATA_MODE=api`).

---

## 🏗️ Architecture

```
src/
├── assets/                  # Static assets & brand graphics
├── components/
│   ├── common/              # Badge, Button, Card, Modal, Skeleton, ErrorBoundary, LoadingSpinner
│   ├── layout/              # AdminLayout, Header, Sidebar, PageHeader
│   ├── charts/              # AppointmentsOverviewChart, AppointmentsStatusDonut
│   └── tables/              # RecentAppointmentsTable, Pagination
├── data/
│   └── mock/                # High-fidelity mock fixtures for appointments, doctors, patients, activities
├── hooks/                   # useDashboard, useAppointments, useDoctors, usePatients, useAuth
├── pages/
│   ├── Dashboard/           # Main executive dashboard
│   ├── Patients/            # Patient registry with masked Aadhaar & read-only family policy
│   ├── Doctors/             # Clinician directory & credentials
│   ├── DoctorVerification/  # NMC license & degree verification workflow
│   ├── Appointments/        # Complete appointments table
│   ├── Services/            # Clinical care packages & consultation tiers
│   ├── Specializations/     # Medical disciplines
│   ├── Reviews/             # Patient feedback & moderation
│   ├── Reports/             # Financial settlements & analytics
│   ├── Announcements/       # Broadcast announcements
│   ├── FAQs/                # Helpdesk & FAQ manager
│   ├── Settings/            # RBAC settings & data mode status
│   ├── Login/               # Authenticated login with role selection
│   ├── Unauthorized/        # 403 route protection
│   └── NotFound/            # 404 handler
├── repositories/            # Repository pattern (mock vs. api abstraction)
├── routes/                  # AppRoutes, ProtectedRoute
├── services/
│   └── api/                 # Axios client, auth interceptors & backend API modules
├── store/                   # Zustand stores: authStore, uiStore
├── types/                   # Strict TypeScript interfaces
└── utils/                   # Class merging (cn), formatters, security & PII masking
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher (v20.x recommended)
- **npm**: 10.x or higher

### 2. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Available environment variables:
```env
# Modes: 'mock' (local high-fidelity fixtures) or 'api' (production HTTP backend)
VITE_DATA_MODE=mock
VITE_API_BASE_URL=https://api.docverta.com/v1

# Firebase Authentication (Optional/Configurable)
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing & Verification

Run Vitest unit and component tests:
```bash
npm test
```

Run TypeScript compilation check:
```bash
npm run build
```

Run ESLint:
```bash
npm run lint
```

---

## 🔒 Security Compliance

1. **Aadhaar Masking**: All patient national identification numbers are strictly masked (`•••• •••• 1234`) across all views.
2. **Family Member Read-Only Policy**: Administrative write access to family member personal details is restricted.
3. **No Silent Fallbacks in API Mode**: When `VITE_DATA_MODE=api` is enabled, failed backend requests explicitly display user-friendly error banners and retry actions rather than silently masking issues with mock data.
4. **Role-Based Route Guards**: Super Admin, Admin, and Auditor roles have distinct access limits enforced on routes and actions.

# Sorm Sophat — Neo-Brutalist Developer Portfolio

A developer portfolio website designed with a bold **Neo-Brutalist UI** aesthetic, built with **React 19**, **Vite**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

---

## ⚡ Overview & Stack

- **Developer:** Sorm Sophat
- **Role:** Software Engineering Student / Software Engineer
- **Core Focus:** Backend Development, REST APIs, Microservices, and Distributed Systems
- **Primary Tech:** Java, Spring Boot, Apache Kafka, PostgreSQL, Oracle, MongoDB, Flutter, React, Docker, Kubernetes, Helm, AWS

---

## 🎨 Neo-Brutalist Design System

The portfolio implements authentic Neo-Brutalism:
- **Thick black borders:** Solid `3px` and `4px` borders (`#111111`)
- **Hard drop shadows:** Solid offset shadows without blur (`5px 5px 0px #111111`, `8px 8px 0px #111111`)
- **Palette:**
  - Background: `#F5F0E8` (Warm tactile off-white)
  - Dark: `#111111` (Deep industrial black)
  - White: `#FFFFFF` (High contrast card surfaces)
  - Yellow: `#FFD84D` (Accent highlight)
  - Blue: `#4D7CFE` (Interactive accent)
  - Green: `#B7F34A` (Status & positive signals)
  - Pink: `#FF6B9D` (System alerts & highlights)
- **Chunky tactile interactions:** Physical button depressions on click and hover
- **Monospace typography:** Strict technical formatting (`JetBrains Mono`) paired with geometric display headings (`Plus Jakarta Sans`)

---

## 📂 Project Structure

```
src/
├── components/
│   ├── BrutalButton.tsx      # Reusable physical-effect button (variants: yellow, blue, green, pink, white, black)
│   ├── BrutalCard.tsx        # Offset brutalist card with thick border & hard shadows
│   ├── ProjectCard.tsx       # Reusable project card with tags, features, and modal trigger
│   ├── ProjectModal.tsx      # Deep-dive architectural case study modal
│   ├── SkillCard.tsx         # Domain skill category cards with tech badges
│   ├── SectionHeader.tsx     # Standardized section title with number tag
│   ├── Icons.tsx             # Custom SVG icons (GitHub, LinkedIn)
│   ├── Navbar.tsx            # Sticky brutalist navbar with active scroll spy & mobile drawer
│   └── Footer.tsx            # High-contrast brutalist footer with back-to-top button
│
├── sections/
│   ├── Hero.tsx              # Name, role, value statement, stack tags, status card, terminal preview
│   ├── About.tsx             # Professional intro, mindset highlights, banking background
│   ├── Skills.tsx            # 5 categories (Languages, Backend, Frontend, Databases, DevOps)
│   ├── Projects.tsx          # 4 projects: Food Delivery, Banking, Student Management, E-Commerce
│   ├── Architecture.tsx      # Interactive distributed flow (Frontend -> Gateway -> Kafka -> DBs)
│   ├── Experience.tsx        # LOLC Microfinance Bank software development internship record
│   ├── GitHubResume.tsx      # Dual cards for GitHub (@SormSophat04) & Curriculum Vitae
│   └── Contact.tsx           # "LET'S BUILD SOMETHING." CTA, direct channels, transmission form
│
├── data/
│   ├── projects.ts           # Configurable projects list
│   ├── skills.ts             # Organized skill categories and technology tags
│   ├── experience.ts         # Verified experience data (no invented facts)
│   └── architecture.ts       # Architecture nodes, layers, protocols, and payloads
│
├── types/
│   └── index.ts              # TypeScript interfaces (Project, SkillCategory, ExperienceItem, etc.)
│
├── App.tsx                   # Main layout container with top ticker and section assembly
├── main.tsx                  # React application root
└── index.css                 # Neo-Brutalist CSS tokens and utility classes
```

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## ⚡ Admin Dashboard & Firebase Integration

The portfolio comes equipped with an interactive **Neo-Brutalist CMS Dashboard** allowing you to dynamically add, edit, and delete:
- **Projects:** Add custom titles, tech pills, feature bullet points, GitHub/live links, and case study notes.
- **Skills:** Add or remove tech tags under existing domains or create entirely new skill categories.
- **Experience:** Add and manage job roles, internships, and company descriptions.
- **Security & Passcode:** Easily change your admin login passcode directly in the dashboard and persist it securely in Firebase Firestore (`settings/admin`).
- **Cloud Persistence:** Seamlessly connect to Google Cloud **Firebase Firestore** with local browser cache fallback.

### Accessing the Dashboard:
- Click the **`CMS / ADMIN ⚡`** button in the Navbar or top status ticker.
- Or navigate directly to `http://localhost:5173/#admin` (or `your-domain/#admin`).
- **Passcode:** Dynamic authentication persisted in Firebase Firestore (`settings/admin`). If accessing an unconfigured project for the first time, you will be prompted to initialize your initial admin passcode.

### Changing the Passcode:
1. Log in to the Admin Dashboard.
2. Go to the **SECURITY / PASSCODE** tab.
3. Enter your current passcode, type your new passcode, and confirm it.
4. Click **`SAVE NEW PASSCODE TO FIREBASE`**.
5. Your new passcode is immediately updated in Cloud Firestore!

### Setting up Firebase Firestore:
1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com).
2. Create a **Firestore Database** in test mode or with your preferred rules.
3. In Project Settings, add a **Web App** and copy your Firebase Config object.
4. Enter the credentials either in the **Firebase & Sync** tab inside the dashboard, or in your `.env` file (see `.env.example`).
5. Click **"Seed Data To Firestore"** to immediately upload all default projects, skills, and experience to your live cloud database!

---

## ✏️ Customizing Data

All data can be managed either via the **Admin Dashboard** or directly in code in `src/data/`:

1. **Projects:** `src/data/projects.ts` or via the Dashboard Projects tab.
2. **Skills:** `src/data/skills.ts` or via the Dashboard Skills tab.
3. **Experience:** `src/data/experience.ts` or via the Dashboard Experience tab.
4. **Contact Info:** Update email and LinkedIn placeholders in `src/sections/Contact.tsx` and `src/components/Footer.tsx`.
5. **Resume PDF:** Place your CV file at `public/resume.pdf` to activate direct downloads.

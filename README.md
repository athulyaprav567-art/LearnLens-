# LearnLens

> A collaborative hackathon project — AI-powered learning lens for students and teachers.

---

## Project Structure

```
LearnLens/
├── frontend/               # React + Vite app (all UI lives here)
│   ├── public/
│   └── src/
│       ├── student/        # Student-facing pages & logic
│       ├── teacher/        # Teacher-facing pages & logic
│       ├── components/     # Shared reusable UI components
│       ├── data/           # Shared mock/static data
│       ├── App.jsx         # Root app + routing
│       ├── main.jsx        # React entry point
│       └── index.css       # Tailwind base styles
├── backend/                # Placeholder — not implemented yet
└── README.md
```

---

## Tech Stack

| Layer     | Technology                                      |
|-----------|-------------------------------------------------|
| UI        | React 18, JSX                                   |
| Bundler   | Vite 5                                          |
| Styling   | Tailwind CSS 3                                  |
| Routing   | React Router v6                                 |
| Icons     | Lucide React                                    |
| Charts    | Recharts                                        |

---

## Getting Started

### Prerequisites
- Node.js >= 18
- npm >= 9

### Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd LearnLens

# 2. Install frontend dependencies
cd frontend
npm install

# 3. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**

---

## Team Workflow

| Area              | Folder                        | Owner(s)    |
|-------------------|-------------------------------|-------------|
| Student flow      | `frontend/src/student/`       | TBD         |
| Teacher flow      | `frontend/src/teacher/`       | TBD         |
| Shared components | `frontend/src/components/`    | All         |
| Mock data         | `frontend/src/data/`          | All         |

### Rules
- **Do NOT** create separate React projects for individual team members.
- **Do NOT** add `person1/`, `person2/` etc. folders.
- All team members work inside the same `frontend/` project.
- Keep branches focused — one feature per branch.
- Create a Pull Request for every completed feature.

---

## Routes

| Route       | Description                    |
|-------------|--------------------------------|
| `/`         | Landing / role selection       |
| `/student/` | Student flow (to be built)     |
| `/teacher/` | Teacher flow (to be built)     |

---

## Contributing

1. Pull the latest `main` branch before starting work.
2. Create a new branch: `git checkout -b feature/<your-feature-name>`
3. Work inside your designated folder.
4. Open a PR when done — request at least one review.

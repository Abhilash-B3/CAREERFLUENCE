# CareerFluence - Career Guidance Platform

## Complete Project Setup Guide

### Step 1: Create Project Structure

Create the following folder structure manually:

```
careerfluence-project/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── main.tsx
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── vite-env.d.ts
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   └── index.html
└── backend/
    ├── charts/ (create this empty folder)
    ├── venv/ (will be created when you run python -m venv venv)
    ├── app.py
    ├── requirements.txt
    └── README.md
```

### Step 2: Frontend Setup

1. **Create React app with Vite:**
   ```bash
   npm create vite@latest frontend -- --template react-ts
   cd frontend
   npm install
   ```

2. **Install additional dependencies:**
   ```bash
   npm install react-router-dom lucide-react
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

3. **Replace generated files with the provided code files**

### Step 3: Backend Setup

1. **Create backend folder and navigate:**
   ```bash
   mkdir backend
   cd backend
   ```

2. **Create charts folder manually:**
   ```bash
   mkdir charts
   ```

3. **Create Python virtual environment:**
   ```bash
   python -m venv venv
   ```

4. **Activate virtual environment:**
   ```bash
   # Windows:
   venv\Scripts\activate
   
   # Mac/Linux:
   source venv/bin/activate
   ```

5. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

### Step 4: Run the Application

1. **Terminal 1 - Backend:**
   ```bash
   cd backend
   # Activate venv first
   python app.py
   ```

2. **Terminal 2 - Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

### Important Notes:

- The `charts/` folder must be created manually - it's where Python will save generated chart images
- The `venv/` folder is created when you run `python -m venv venv`
- Both folders are not included in the code files because:
  - `charts/` is empty initially and gets populated by the Python backend
  - `venv/` contains your Python virtual environment (should not be committed to version control)

### File Structure After Setup:

```
careerfluence-project/
├── frontend/
│   ├── node_modules/ (created by npm install)
│   ├── dist/ (created by npm run build)
│   └── [all frontend files]
└── backend/
    ├── venv/ (created by python -m venv venv)
    ├── charts/ (create manually, populated by app.py)
    ├── __pycache__/ (created by Python)
    └── [all backend files]
```
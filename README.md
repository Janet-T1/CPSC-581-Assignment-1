# CPSC 581 — Assignment 1

This project is a static frontend website built using:

* **React**
* **Vite**
* **Tailwind CSS**
* **React Router**

The website consists of a shared home page and three individual group-member pages.

Each group member should work **only on their assigned page and branch** to avoid merge conflicts.

---

## Getting Started

### 1. Clone the Repository

Clone the repository onto your computer:

```bash
git clone <repository-url>
```

Then enter the project directory:

```bash
cd CPSC-581-Assignment-1
```

---

### 2. Install Node.js and npm

This project requires **Node.js** and **npm**.

Check whether they are already installed:

```bash
node --version
npm --version
```

If both commands return version numbers, you can continue.

If you are on macOS and use Homebrew, Node.js can be installed with:

```bash
brew install node
```

Installing Node.js will also install npm.

---

### 3. Install Project Dependencies

From the root of the project, run:

```bash
npm install
```

This installs all dependencies specified in `package.json`, including React, Vite, Tailwind CSS, and React Router.

**Do not commit the `node_modules/` directory.**

---

### 4. Run the Website

Start the Vite development server:

```bash
npm run dev
```

The terminal should display a local URL, typically:

```text
http://localhost:5173/
```

Open the URL in your browser.

Vite will automatically update the website as you make changes to the source files.

To stop the development server, press:

```text
Ctrl + C
```

---

# Project Structure

The important part of the project is organized approximately as follows:

```text
CPSC-581-Assignment-1/
│
├── src/
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── JanetTsegazeab.jsx
│   │   ├── SamFasakin.jsx
│   │   └── ShamMuhammad.jsx
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

Each group member has their own page inside:

```text
src/pages/
```

---

# IMPORTANT: Where You Should Work

Each person should **only edit their assigned page**.


All components, content, and page-specific styling that you create should stay within your assigned page/folder whenever possible.

### Please do NOT edit:

```text
src/App.jsx
src/main.jsx
src/pages/Home.jsx
```

Also, **do not edit another group member's page**.

The home page and shared routing will be handled separately.

If you believe you need to change a shared file, discuss it with the group first.

---

# Git Workflow

Each group member should work on their **own branch**.

This is important because everyone can work independently without changing the main branch or interfering with another group member's work.

```bash
git checkout -b YourBranchName
```

## 1. Make Sure You Have the Latest Code

Before starting your work:

```bash
git checkout main
git pull origin main
```
Then create and checkout to your branch 
---

## 2. Switch to Your Branch

If your branch already exists locally:

```bash
git checkout your-branch-name
```

For example:

```bash
git checkout janet
```

If the branch exists on the remote repository but not locally yet:

```bash
git fetch origin
git checkout your-branch-name
```

If you are creating your branch for the first time:

```bash
git checkout -b your-branch-name
```

For example:

```bash
git checkout -b janet
```

---

## 3. Confirm You Are on the Correct Branch

Before making changes, run:

```bash
git branch
```

Your current branch will have a `*` beside it:

```text
  main
* janet
```

**Do not do your work directly on `main`.**

---

# Working on Your Page

Once you are on your branch, start the website:

```bash
npm run dev
```

Then edit **only your assigned page**, located under:

```text
src/pages/YourName.jsx
```

or, if your page has its own directory:

```text
src/pages/YourName/
```

Save your changes and check the website in the browser as you work.

---

# Committing Your Work

Once you have made progress that you want to save:

### 1. Check what you changed

```bash
git status
```

Make sure you have not accidentally modified another person's files.

### 2. Stage your changes

```bash
git add src/pages/YourName.jsx
```

Or, if you have your own directory:

```bash
git add src/pages/YourName/
```

Using the specific path instead of `git add .` helps prevent accidentally committing files you were not supposed to modify.

### 3. Commit

```bash
git commit -m "Add content to YourName page"
```

### 4. Push your branch

```bash
git push origin your-branch-name
```

If Git tells you that the branch does not have an upstream branch yet, run:

```bash
git push -u origin your-branch-name
```

After the first push, you can normally just use:

```bash
git push
```

---

# Before You Finish

Before telling the group that your page is ready to merge, please make sure:

* Your page displays correctly.
* `npm run dev` works without errors.
* You only changed files belonging to your page.
* You committed all of your changes.
* You pushed your latest commits to your branch.
* You did **not** merge your branch into `main`.

The final branches will be merged into `main` once everyone's work is complete.

---

# Quick Reference

The typical workflow each time you work on the project is:

```bash
# Enter the repository
cd CPSC-581-Assignment-1

# Switch to your personal branch
git checkout your-branch-name

# Confirm your branch
git branch

# Install dependencies if needed
npm install

# Start the website
npm run dev
```

After working:

```bash
# Check your changes
git status

# Add only your files
git add src/pages/YourName/

# Commit
git commit -m "Update YourName page"

# Push
git push
```

## Most Important Rule

> **Stay on your own Git branch and only edit your assigned files under `src/pages/YourName/`.**

This keeps each group member's work isolated and makes the final merge into `main` much easier.

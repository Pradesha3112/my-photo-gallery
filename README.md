# Photo Gallery Web Application

A beautiful and responsive photo gallery built with React, Vite, and Tailwind CSS. This application fetches photos from the Picsum Photos API and allows users to search, filter, and mark their favorite images.

## 📸 Live Demo

[https://drive.google.com/drive/folders/1j-A8b8FeaSoJKM6933S7wMO-HuDK64zC?usp=sharing]

## ✨ Features

### Core Functionality
- **Photo Gallery**: Display 30 photos in a responsive grid layout
- **Search Filter**: Real-time filtering by author name
- **Favourites System**: Mark/unmark photos as favourites using useReducer
- **Persistent Storage**: Favourites saved in localStorage across page refreshes
- **Loading States**: Beautiful loading spinner while fetching data
- **Error Handling**: User-friendly error messages for API failures

### Technical Implementation
- **Custom Hook**: `useFetchPhotos` for clean data fetching logic
- **Performance Optimization**: 
  - `useCallback` for search handler optimization
  - `useMemo` for filtered photo calculations
- **Responsive Design**: 
  - Mobile: 1 column
  - Tablet: 2 columns
  - Desktop: 4 columns
  - Large screens: 4+ columns

### UI/UX Features
- **Modern Design**: Clean, minimalist interface with smooth animations
- **Interactive Cards**: Hover effects with scaling and shadows
- **Heart Animation**: Smooth toggle animation for favourites
- **Photo Statistics**: Real-time counters for total and favourite photos
- **Favourites Filter**: Toggle to show only favourite photos
- **Loading Skeletons**: Visual feedback during image loading
- **Fallback Images**: Graceful handling of failed image loads

## 🛠️ Technologies Used

- **React 19** - UI library
- **Vite 7** - Build tool and development server
- **Tailwind CSS 4** - Styling and responsive design
- **Picsum Photos API** - Free stock photos API

## 📋 Prerequisites

Before you begin, ensure you have installed:
- **Node.js** (v18 or higher)
- **npm** (v9 or higher) or **yarn**
- **Git** (for cloning)

## 🚀 Installation & Setup

### Step 1: Clone the repository
```bash
git clone https://github.com/yourusername/photo-gallery.git
cd photo-gallery
```

### Step 2: Install dependencies
```bash
npm install
```

### Step 3: Install and configure Tailwind CSS
```bash
# Install Tailwind CSS v3 (stable)
npm install -D tailwindcss@3.4.1 postcss@8.4.31 autoprefixer@10.4.16

# Initialize Tailwind
npx tailwindcss init -p
```

### Step 4: Configure Tailwind
Update `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Step 5: Update CSS
Replace `src/index.css` with:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    @apply bg-gray-50;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-out forwards;
}
```

### Step 6: Run the application
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📁 Project Structure

```
photo-gallery/
├── public/
├── src/
│   ├── components/
│   │   ├── Gallery.jsx        # Main gallery component
│   │   ├── PhotoCard.jsx      # Individual photo card
│   │   └── SearchBar.jsx      # Search input component
│   ├── hooks/
│   │   └── useFetchPhotos.js  # Custom fetch hook
│   ├── App.jsx                 # Root component
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md
```

## 🎯 Key Features Explained

### Custom Hook: useFetchPhotos
```javascript
const { photos, loading, error } = useFetchPhotos();
// Returns: 
// - photos: Array of photo objects
// - loading: Boolean indicating fetch status
// - error: Error message if fetch fails
```

### Favourites Management with useReducer
```javascript
const favouritesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_FAVOURITE':
      // Add to favourites (no duplicates)
    case 'REMOVE_FAVOURITE':
      // Remove from favourites
    case 'LOAD_FAVOURITES':
      // Load from localStorage
  }
};
```

### Performance Optimizations
- **useCallback**: Prevents recreation of search handler on every render
- **useMemo**: Memoizes filtered photos to avoid unnecessary calculations

## 📱 Responsive Breakpoints

| Screen Size | Columns | Breakpoint |
|------------|---------|------------|
| Mobile | 1 | < 640px |
| Tablet | 2 | 640px - 1024px |
| Desktop | 4 | 1024px - 1280px |
| Large Desktop | 4+ | > 1280px |


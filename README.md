# 📝 React Native To-Do List App

A fun and minimal to-do app built with **React Native**, using:

- 📦 `AsyncStorage` for data persistence  
- 🎞️ `Lottie` animations for empty states  
- ✨ `LayoutAnimation` for smooth transitions  
- 💅 Modular structure with clean component separation

---

## 📱 Features

- Add & complete daily tasks
- Auto-saves tasks to local storage
- Clear all tasks with one tap
- Animated "empty state" screen with a cute cat 🐾
- Smooth UI transitions and a delightful UI


---

## 🚀 Getting Started

### ✅ Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (or `yarn`)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (if using Expo)


---

### 🛠️ Installation

```bash
# Clone the repo
git clone https://github.com/ddenizerr/todo.git
cd todo

# Install dependencies
npm install          # or yarn install

# Start the development server
npx expo start        # if using Expo

```

---

### 📂 Project Structure

```
.
├── App.js
├── assets/
│   └── animations/
│       └── empty_list_cat.json
├── assets/styles/
│   ├── AppStyles.js
│   └── TaskStyles.js
├── components/
│   ├── Task.js
│   ├── InputBar.js
│   ├── EmptyState.js
│   └── CleanAllButton.js
└── utils/
    └── storage.js       # AsyncStorage helper functions
```

### 🙌 Credits

Cat animation from LottieFiles
Made with ❤️ by @ddenizerr

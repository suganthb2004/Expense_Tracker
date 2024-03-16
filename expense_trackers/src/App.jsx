// App.jsx
import React, { useState } from 'react';
import { RouterProvider, createBrowserRouter, Outlet, Link } from 'react-router-dom';
import Header from './components/Header';
import ExpenseTracker from './components/expenseTracker';
import Profile from './components/Profile';
import About from './components/about';

function App() {
  const [tableData, setTableData] = useState([]);

  const handleAddExpense = (formData) => {
    setTableData([...tableData, formData]);
  };

  return (
    <RouterProvider router={createBrowserRouter([
      {
        path: '/',
        element: (
          <>
            <Header />
            
            <ExpenseTracker />
            
            <Outlet />
          </>
        ),
      },
      {
        path: '/profile',
        element: (
          <>
          <Header/>
          <Profile />
          </>
        ),
      },
      {
        path: '/about',
        element: (
          <>
          <Header/>
          <About />
          </>
        ),
      },
    ])}
    />
  );
}

export default App;
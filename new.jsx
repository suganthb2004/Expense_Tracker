// expenseTracker.jsx
import React, { useEffect, useState } from 'react';
import expenses from './expensesData';
import TableComponent from './TableComponent';
import axios from 'axios';
import './styles.css';

const ExpenseTracker = () => {
  const [popupState, setPopupState] = useState({ isOpen: false, selectedExpense: null, amountSpent: 0 });
  const [updatedExpenses, setUpdatedExpenses] = useState([]);
  const [profileData, setProfileData] = useState({});
  const [formData, setFormData] = useState({
    category: '',
    amountSpent: '',
  });
  const [income, setIncome] = useState(0);

  useEffect(() => {
    // Fetch profile data from the server
    axios.get('http://localhost:5000/api/getProfileData')
      .then((response) => {
        setProfileData(response.data);
        setIncome(response.data.income);
      })
      .catch((error) => {
        console.error(error);
      });

     // Fetch expense data from the server
     axios.get('http://localhost:5000/api/expenses')
  .then((response) => {
    console.log('Expense data from API:', response.data);
    setUpdatedExpenses(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
  }, []);
  const handleResetExpenses = async () => {
    try {
      // Reset the expenses on the server
      await axios.post('http://localhost:5000/api/resetExpenses');
  
      // Fetch and update the frontend with the latest expense data (empty after reset)
      const updatedExpensesResponse = await axios.get('http://localhost:5000/api/expenses');
      setUpdatedExpenses(updatedExpensesResponse.data);
    } catch (error) {
      console.error('Error resetting expense data:', error);
    }
  };

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        closePopup();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  

  const handleImageClick = (expense) => {
    setPopupState({ isOpen: true, selectedExpense: expense, amountSpent: 0 });
  };

  const closePopup = () => {
    console.log("Closing popup");
    setPopupState({ isOpen: false, selectedExpense: null, amountSpent: 0 });
  };

  const handleAmountSpentChange = (e) => {
    setPopupState({ ...popupState, amountSpent: e.target.value });
  };

  const handleAddAmountSpent = async (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      e.preventDefault();
      if (popupState.selectedExpense) {
        const updatedAmountSpent = parseInt(popupState.amountSpent);
        const category = popupState.selectedExpense.name;

        try {
          // Update the backend with the new amount spent
          await axios.post('http://localhost:5000/api/updateExpense', { category, amountSpent: updatedAmountSpent });

          // Fetch and update the frontend with the latest expense data
          const updatedExpensesResponse = await axios.get('http://localhost:5000/api/expenses');
          setUpdatedExpenses(updatedExpensesResponse.data);

          closePopup();
        } catch (error) {
          console.error('Error updating expense data:', error);
        }
      }
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataToSend = {
        category: formData.category,
        amountSpent: parseInt(formData.amountSpent), // Convert to integer
      };
      await axios.post('http://localhost:5000/api/saveExpense', dataToSend);

      console.log('Expense data saved successfully');

      // Optionally, you can update the state with the new data or fetch updated data
      const updatedExpensesResponse = await axios.get('http://localhost:5000/api/expenses');
      setUpdatedExpenses(updatedExpensesResponse.data);
      window.location.reload();


    } catch (error) {
      console.error('Error saving expense data:', error);
    }

    // Clear the form after submitting
    setFormData({
      category: '',
      amountSpent: '',
    });
  };

  return (
    <div>
    <div className={`maincontent ${popupState.isOpen ? 'blur-background' : ''}`}>
      {updatedExpenses.map((expense) => (
        <div key={expense.id} onClick={() => handleImageClick(expense)} style={{ cursor: 'pointer', marginLeft: "7.5%" }}>
          <img src={expense.image} alt={expense.name} title={expense.name} width={50} height={50} />
        </div>
      ))}
      <hr />
    </div>
    
    {/Reset button/}
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <button onClick={handleResetExpenses}>Reset Expenses</button>
    </div>


      {popupState.isOpen && popupState.selectedExpense && (
        <div className='popup'>
          <div className='popup-content'>
            <div className='expenseheader'>
              <img src={popupState.selectedExpense.image} alt={popupState.selectedExpense.name} title={` ${popupState.selectedExpense.name}`}  height={50} width={50} />
              <h2>{popupState.selectedExpense.name}</h2>
              <form>
                <label className='spent' htmlFor="amountSpent">Amount Spent:</label>
                <input
                  type="number"
                  id="amountSpent"
                  value={popupState.amountSpent}
                  title='AmountSpent'
                  onChange={handleAmountSpentChange}
                  onKeyDown={handleAddAmountSpent}
                />
                <button onClick={handleAddAmountSpent} title={`Add to ${popupState.selectedExpense.name}`}>Add to {popupState.selectedExpense.name}</button>
              </form>
            </div>
            <div className='close-icon' onClick={closePopup} title='Close'>
              <span>&times;</span>
            </div>
          </div>
        </div>
      )}

      <div className={`maincontent ${popupState.isOpen ? 'blur-background' : ''}`} >
        {/* Pass income to TableComponent */}
        <TableComponent data={updatedExpenses} profileData={profileData} income={income} />
      </div>
    </div>
  );
};

export default ExpenseTracker;
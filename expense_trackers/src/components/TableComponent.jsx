// TableComponent.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const TableComponent = ({ data, profileData }) => {

  if (!profileData || typeof profileData.income === 'undefined') {
    return <div style={{marginBottom:'100px'}}>No profile data available</div>;
  }


  if (!data || !Array.isArray(data)) {
    return <div>No data available</div>;
  }

  const totalAmountSpent = data.reduce ? data.reduce((total, expense) => total + expense.amountSpent, 0) : 0;
  const income = profileData.income || 0;
  const calculateBalance = () => {
    return income-totalAmountSpent;
  };

  const handleReset = () => {
    // Implement logic to reset the table data and update the database
    // For example, make an API call to update the server-side database
    axios.post('/api/reset', {})
      .then(response => {
        // Handle the response and update the state if needed
      })
      .catch(error => {
        // Handle errors
      });
  };
  
  return (
    <>
    <div className='A'>
      <div className='client'>
        <div>
          <strong style={{color:'black'}}>Client Name:</strong> <span title={`${profileData.clientName}`}>{profileData.clientName}</span>
        </div>
        <div>
          <strong style={{color:'black'}}>Email:</strong> <span title={`${profileData.email}`}>{profileData.email}</span>
        </div>
        <div>
          <strong style={{color:'black'}}>Income:</strong> <span title={`₹ ${profileData.income}`}>₹{profileData.income}</span>
        </div>
        <div>
          <strong style={{color:'black'}}>Work Specification:</strong> <span title={`${profileData.workSpecification}`}>{profileData.workSpecification}</span>
        </div>
      </div>
      <div className='B'>
        <span style={{ display: 'flex', justifyContent: 'center', margin: '20px', fontSize:'25px' }}>Total: ₹{totalAmountSpent}</span>
        <span style={{ display: 'flex', justifyContent: 'center', margin: '20px', fontSize:'25px' }}>Balance: ₹{calculateBalance()}</span>
      </div>
      </div>
      
      <div className='maintable'>
        <table>
          <thead>
            <tr>
              <th>Item-Name</th>
              <th>Amount Spent</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>
                  <div className='tableicon'>
                    <img src={row.image} alt={row.name} title={`${row.name}`} width={50} height={50} />
                  </div>
                  <span style={{float:'left',marginLeft:'190px',marginRight:'-150px',marginTop:'15px'}}>{row.name}</span>
                </td>
                <td><div style={{float:'left',marginLeft:'160px',marginRight:'-150px'}} title={`Amount Spent : ₹${row.amountSpent}`} >₹{row.amountSpent}</div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableComponent;
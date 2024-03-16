import { useEffect, useState } from 'react';
import axios from 'axios';

const TableComponent = () => {
  const [serverData, setServerData] = useState([]);

  useEffect(() => {
    // Fetch data from the server
    axios.get('/api/getData')
      .then((response) => {
        setServerData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Item-Name</th>
          <th>Amount Spent</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(serverData) && serverData.length > 0 ? (
          serverData.map((row, index) => (
            <tr key={index}>
              <td>{row.name}</td>
              <td>₹{row.age}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="2">No data available</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TableComponent;
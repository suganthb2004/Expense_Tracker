import { Link } from 'react-router-dom';
function Header() {
    return (<>
    <header>
      <div className = "headerspan">
      <Link to="/"><img src="https://cdn0.iconfinder.com/data/icons/work-from-home-19/512/InternetBill-bill-invoice-receipt-expenses-512.png" alt="Expense Tracker" width={40} height={40} /></Link>
        <h2><Link to="/">Expense Tracker</Link></h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/about">about</Link> </li>
      </ul>
      </div>
    </header>
    </>)
  }
  export default Header
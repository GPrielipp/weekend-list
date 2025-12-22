import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Approve from './Pages/Approve';
import CDO from './Pages/CDO';
import EntryForm from './Pages/EntryForm';
import Admin from './Pages/Admin';

function App() {
	// will have to get user permissions and do some stuff ...
	return (
		<div className="App">
			<nav>
				<Link to="/">Home</Link>
				<Link to="/admin">Admin</Link>
				<Link to="/view">View / Approve</Link>
				<Link to="/cdo">CDO</Link>
				<Link to="/entry">Weekend List</Link>
				<Link to="/logout">Logout</Link>
			</nav>
			<Routes>
				<Route>
					<Route
						path="/"
						element={<Home />}
					/>
					<Route
						path="/admin"
						element={<Admin />}
					/>
					<Route
						path="/view"
						element={<Approve />}
					/>
					<Route
						path="/cdo"
						element={<CDO />}
					/>
					<Route
						path="/entry"
						element={<EntryForm />}
					/>
					<Route
						path="/logout"
						element={<Login />}
					/>
				</Route>
			</Routes>
		</div>
	);
}

export default App;

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Rooms from "./components/Rooms";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PrivateRoute from "./components/PrivateRoute";
import ChatRoom from "./components/ChatRoom";
import NotFound from "./components/NotFound";
import "./styles.css";
import { useEffect } from "react";
export default function App() {
	useEffect(() => {
		// getRoom();
	}, []);
	return (
		<div className="app">
			<Router>
				<Switch>
					<Route path="/login" component={Login} />
					<Route path="/signup" component={Signup} />
					<PrivateRoute exact path="/" component={Rooms} />
					<PrivateRoute path="/conversation/:id" component={ChatRoom} />
					<Route component={NotFound} />
				</Switch>
			</Router>
		</div>
	);
}

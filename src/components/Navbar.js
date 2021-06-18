import { Link } from "react-router-dom";

const Navbar = (props) => {
	if (props.loading) {
		return <h1>Loading...</h1>;
	} else {
		return (
			<nav className="navbar">
				<ul className="nav-list">
					{props.showRoomsBtn && (
						<li className="nav-item">
							<Link to="/" className="nav-item-rooms">
								Rooms
							</Link>
						</li>
					)}
					<li className="nav-item nav-item-msg">
						<p>
							Hey {props.email}!<br /> Welcome🎉🎉🥳
						</p>
					</li>
					<li className="nav-item">
						<button onClick={props.onLogout}>Logout 😥</button>
					</li>
				</ul>
			</nav>
		);
	}
};
export default Navbar;

import { useState } from "react";
import { connect } from "react-redux";
import { loginUser } from "./../redux/actions/authActions";
import { Link } from "react-router-dom";
import useAuthCheck from "../utils/useAuthCheck";

const Login = (props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	useAuthCheck(props.auth.isAuthenticated, props.history);
	const submitForm = (e) => {
		e.preventDefault();
		props.login({ email, password }, props.history);
	};
	if (props.auth.loading) {
		return <h1>Loading...</h1>;
	} else {
		return (
			<div className="signin">
				<h1>Login</h1>
				<form onSubmit={submitForm}>
					<input
						type="email"
						name="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Registered Email"
						required
					/>
					<input
						type="password"
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Registered Password"
						required
					/>
					<button type="submit" onClick={submitForm}>
						Login
					</button>
				</form>
				<h6>
					Don't have an account yet? <Link to="/signup">Signup</Link>
				</h6>
			</div>
		);
	}
};
const mapStateToProps = (state) => ({
	auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
	login: (userData, history) => dispatch(loginUser(userData, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

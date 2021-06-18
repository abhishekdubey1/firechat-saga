import { useState } from "react";
import { connect } from "react-redux";
import { signUpUser } from "./../redux/actions/authActions";
import { Link } from "react-router-dom";
import useAuthCheck from "../utils/useAuthCheck";

const Signup = (props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useAuthCheck(props.auth.isAuthenticated, props.history);
	const submitForm = (e) => {
		e.preventDefault();
		if (email && password) {
			console.log("hi");
			props.signUpUser({ email, password }, props.history);
		}
	};

	if (props.auth.loading) return <h1>Loading...</h1>;
	else
		return (
			<div className="signup">
				<h1>Signup</h1>
				<form onSubmit={submitForm}>
					<input
						type="email"
						name="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						placeholder="eg. johndoe@gmail.com"
					/>
					<input
						type="password"
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="A strong password"
						required
					/>

					<button type="submit" onClick={submitForm} className="">
						Signup
					</button>
				</form>
				<h6>
					Already have an account?{" "}
					<Link to="/login" style={{ textDecoration: "underline" }}>
						Login
					</Link>
				</h6>
			</div>
		);
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
	signUpUser: (userData, history) => dispatch(signUpUser(userData, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

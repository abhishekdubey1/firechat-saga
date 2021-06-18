import { useState } from "react";
import { connect } from "react-redux";
import { sendMessage } from "./../redux/actions/roomActions";

const ChatForm = (props) => {
	const [message, setMessage] = useState("");
	const handleSubmit = (e) => {
		e.preventDefault();
		if (message.trim()) {
			props.sendMessage(props.conversationId, props.email, message);
			setMessage("");
		}
	};

	return (
		<form className="chatform" onSubmit={handleSubmit}>
			<input
				type="text"
				className="input-send"
				value={message}
				placeholder="Type your message..."
				onChange={(e) => setMessage(e.target.value)}
			/>
			{message && (
				<button type="submit" onClick={handleSubmit} className="btn-send">
					Send
				</button>
			)}
			{!message && <button className="btn-send">Send</button>}
		</form>
	);
};

const mapStateToProps = (state) => ({
	email: state.auth.user.email,
});

const mapDispatchToProps = (dispatch) => ({
	sendMessage: (conversationId, email, message) =>
		dispatch(sendMessage(conversationId, email, message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatForm);

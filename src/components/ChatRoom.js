import { useEffect } from "react";
import { connect } from "react-redux";
import { logoutUser } from "./../redux/actions/authActions";
import { syncMessagesCollection } from "./../redux/actions/roomActions";
import Navbar from "./Navbar";
import Chats from "./Chats";

const ChatRoom = (props) => {
	const conversationId = props.match.params.id;
	useEffect(() => {
		props.syncMessagesCollection(conversationId);
		// eslint-disable-next-line
	}, []);

	return (
		<main className="chatroom">
			<Navbar
				loading={props.auth.loading}
				email={props.auth.user.email}
				onLogout={props.logoutUser}
				showRoomsBtn
			/>
			<Chats
				currentRoom={conversationId}
				loading={props.loadMessages}
				conversationId={conversationId}
				messages={props.messages}
				userEmail={props.auth.user.email}
			/>
		</main>
	);
};
const mapStateToProps = (state) => ({
	auth: state.auth,
	loadMessages: state.rooms.loadMessages,
	messages: state.rooms.allMessages,
});

const mapDispatchToProps = (dispatch) => ({
	syncMessagesCollection: (id) => dispatch(syncMessagesCollection(id)),
	logoutUser: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);

import { useEffect } from "react";
import { connect } from "react-redux";
import { logoutUser } from "./../redux/actions/authActions";
import { syncMessagesCollection } from "./../redux/actions/roomActions";
import Navbar from "./Navbar";
import Chats from "./Chats";
import { getRoomCreator } from "../redux/sagas/roomSaga";

const ChatRoom = (props) => {
	const conversationId = props.match.params.id;
	useEffect(() => {
		checkPwd();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	async function checkPwd() {
		const doc = await getRoomCreator(conversationId);
		const pwd = prompt("Enter room password");
		if (pwd) {
			if (doc.exists) {
				const { password } = doc.data();
				if (password === pwd) {
					props.syncMessagesCollection(conversationId);
					return;
				}
			}
		}
		props.history.goBack();
	}
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
	password: state.rooms.password,
});

const mapDispatchToProps = (dispatch) => ({
	syncMessagesCollection: (id) => dispatch(syncMessagesCollection(id)),
	logoutUser: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);

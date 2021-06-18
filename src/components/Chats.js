import { useEffect, useRef } from "react";
import MessageInput from "./MessageInput";
const getClassName = (condtn) => (condtn ? "sent" : "recieved");
const Chat = (props) => {
	if (props.loading) {
		return <h1>Loading...</h1>;
	} else {
		return (
			<main className="chat">
				<div className="chatname">
					<p>{props.currentRoom}</p>
				</div>
				{Object.keys(props.messages).map((key) => (
					<ChatBox
						key={key}
						email={props.messages[key].email || props.messages[key].from} // from is for backwards compatibility
						message={props.messages[key].message}
						timestamp={props.messages[key].timestamp}
						class={getClassName(props.messages[key].email === props.userEmail)}
					/>
				))}
				<MessageInput conversationId={props.conversationId} />
			</main>
		);
	}
};

export default Chat;
const chatBoxClass = (className) =>
	className === "sent" ? " alignright " : " alignleft ";
const ChatBox = (props) => {
	const ref = useRef();

	useEffect(() => {
		ref.current.scrollIntoView();
	}, []);
	return (
		<div ref={ref} className={"chatbox " + chatBoxClass(props.class)}>
			<div className={props.class}>
				<p className="chatbox-msg-user">
					{props.class === "sent" ? "You" : props.email}
				</p>
				<p className="chatbox-msg">{props.message}</p>
				<p className="chatbox-msg-time">
					{new Date(props.timestamp).toLocaleTimeString()}
				</p>
			</div>
		</div>
	);
};

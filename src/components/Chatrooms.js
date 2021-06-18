import { Link } from "react-router-dom";

const Chatrooms = (props) => {
	return (
		<div className="chatrooms">
			<div className="add-room">
				<p>Chatrooms🤩😁</p>
				<button className="btn-add-room" onClick={props.createRoom}>
					Add a new Room😎
				</button>
			</div>
			<div className="chatrooms-list">
				{!props.loading ? (
					Object.keys(props.rooms).map((key) => (
						<div key={key} className="chatroom-item">
							<Link
								className="info"
								to={`/conversation/${props.rooms[key].slug}`}
							>
								<p className="chatroom-name">{props.rooms[key].name}</p>
								<p className="chatroom-time">
									{new Date(props.rooms[key].timestamp).toLocaleTimeString()}
									{",  "}
									{new Date(props.rooms[key].timestamp).toDateString()}
								</p>
							</Link>
							<div>
								<button onClick={() => props.deleteRoom(key)}>X</button>
							</div>
						</div>
					))
				) : (
					<h1>Loading...</h1>
				)}
			</div>
		</div>
	);
};

export default Chatrooms;

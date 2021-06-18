import { useState } from "react";
import { Link } from "react-router-dom";
import Emoji from "../utils/Emoji";

const Chatrooms = (props) => {
	const [roomName, setRoomName] = useState("");
	const [roomPwd, setRoomPwd] = useState("");
	const [showInput, setShowInput] = useState(false);
	const handleAddRoom = () => {
		if (roomName && roomPwd && showInput) {
			props.createRoom(roomName, roomPwd);
			setRoomName("");
			setRoomPwd("");
		} else {
			setShowInput(true);
		}
	};
	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			handleAddRoom();
		}
	};
	return (
		<div className="chatrooms">
			<div className="chatrooms-main">
				<p>
					Chatrooms<Emoji>🤩😁</Emoji>
				</p>
				<div className="add-room">
					{showInput && (
						<button
							className="btn-close-addinput"
							onClick={() => setShowInput(!showInput)}
						>
							X
						</button>
					)}
					{showInput && (
						<>
							<input
								value={roomName}
								onChange={(e) => setRoomName(e.target.value)}
								placeholder="Room Name"
								className="input-room-name"
							/>
							<input
								value={roomPwd}
								onChange={(e) => setRoomPwd(e.target.value)}
								onKeyDown={handleKeyDown}
								type="password"
								placeholder="Room Password"
								className="input-room-pwd"
							/>
						</>
					)}
					<button
						className={`btn-add-room ${showInput ? "mx-5" : ""}`}
						onClick={handleAddRoom}
					>
						Add {!showInput && " a new Room"} <Emoji>😎</Emoji>
					</button>
				</div>
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
								<button onClick={() => props.deleteRoom(key, props.email)}>
									X
								</button>
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

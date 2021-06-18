import { useEffect } from "react";
import { connect } from "react-redux";
import {
	syncRoomsCollection,
	addNewRoom,
	deleteRoomStart,
} from "../redux/actions/roomActions";
import { logoutUser } from "../redux/actions/authActions";
import Navbar from "./Navbar";
import Chatrooms from "./Chatrooms";

const RoomsList = (props) => {
	useEffect(() => {
		props.syncRoomsCollection();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const createRoom = () => {
		let room = prompt("Give a name for your room:");
		if (room) props.addNewRoom(room);
	};

	return (
		<main className="rooms-list">
			<Navbar
				loading={props.auth.loading}
				email={props.auth.user.email}
				onLogout={props.logoutUser}
				showRoomsBtn={false}
			/>
			<Chatrooms
				loading={props.rooms.loadRooms}
				rooms={props.rooms.allRooms}
				createRoom={createRoom}
				deleteRoom={props.deleteRoom}
			/>
		</main>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	rooms: state.rooms,
});

const mapDispatchToProps = (dispatch) => ({
	syncRoomsCollection: () => dispatch(syncRoomsCollection()),
	addNewRoom: (roomName) => dispatch(addNewRoom(roomName)),
	deleteRoom: (id) => dispatch(deleteRoomStart(id)),
	logoutUser: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomsList);

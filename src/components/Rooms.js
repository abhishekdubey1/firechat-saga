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
	const createRoom = (room) => {
		if (room) props.addNewRoom(room, props.auth.user.email);
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
				createRoom={createRoom}
				deleteRoom={props.deleteRoom}
				email={props.auth.user.email}
				loading={props.rooms.loadRooms}
				rooms={props.rooms.allRooms}
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
	addNewRoom: (roomName, creator) => dispatch(addNewRoom(roomName, creator)),
	deleteRoom: (id, user) => dispatch(deleteRoomStart(id, user)),
	logoutUser: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomsList);

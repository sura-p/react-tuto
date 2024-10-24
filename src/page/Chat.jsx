import React, { useEffect, useState } from "react";
import Message from "../components/Message";
import ProfileHeading from "../components/ProfileHeading";
import SearchBox from "../components/SearchBox";
import Sidebar from "../components/SideBar";
import ComposeBox from "../components/ComposeBox";
import ComposeSideBar from "../components/ComposeSideBar";
import Reply from "../components/Reply";
import { useAuthUser } from "../hooks/selectors/AuthSelector";
import { connectedUserList } from "../features/connectedUser/cUThunk";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useCuError,
  useCuLoading,
  useCuUser
} from "../hooks/selectors/cuSelector";
import socketService from "../services/socketService";
import { listenToSocketEvents } from "../store/store";
import PeerProfile from "../components/PeerProfile";
import SelectPeer from "../components/SelectPeer";
import { getMessageList } from "../features/messageFeature/messageThunk";
import { useMessageList } from "../hooks/selectors/MessageSelector";
import { getUserProfile } from "../features/profile/profileThunk";
import { useProfileDetail } from "../hooks/selectors/ProfileSelector";
import { apiGet } from "../services/apiUtils";

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState();
  const [search, setSearch] = useState("");
  const [searchPeer, setSearchPeer] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [sendText, setSendText] = useState([]);
  const navigate = useNavigate();
  const user = useAuthUser();
  const rMessages = useMessageList();
  const dispatch = useDispatch();
  const userDetail = useProfileDetail();
  const [selectedFile, setSelectedFile] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token, "token");

    if (!token || token == null) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    dispatch(connectedUserList(`/search?q=${search}`));
  }, [dispatch, search]);

  useEffect(() => {
    const searchUsers = async () => {
      try {
        const response = await apiGet("Search", `?search=${search}`);
        setSearchPeer(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };
    searchUsers();
  }, [search]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !user) return;
    socketService.connect(token);

    socketService.emit("registerUser", {
      userId: user.id
    });

    return () => {
      socketService.disconnect();
    };
  }, [user]);

  const loading = useCuLoading();
  const connectedUser = useCuUser();
  const error = useCuError();

  const handleSend = (newMessage) => {
    setSendText((prevMessages) => [...prevMessages, newMessage]);
  };
  console.log(selectedUser, "selected");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !user) return;

    socketService.on("receiveMessage", (message) => {
      console.log(message, "message", message.receiver === user.id);

      if (message.receiver === user.id) {
        setSendText((prevMessages) => [
          ...prevMessages,
          {
            msg: message.message,
            p: "r",
            date: message.createdAt,
            ...(message.image && message.image.trim() !== ""
              ? { image: message.image }
              : {}),
            ...(message.video && message.video.trim() !== ""
              ? { video: message.video }
              : {})
          }
        ]);
      }
    });
  }, [user]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !user) return;
    if (selectedUser) {
      dispatch(getMessageList(`?peerId=${selectedUser._id}`));
    }
  }, [dispatch, selectedUser]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token, "token");

    if (!token || !user) return;
    if (!rMessages || !selectedUser || !user) return; // Add user check

    console.log(rMessages, "rMessages");
    const fetchedMessages = rMessages.messages.map((msg) => ({
      msg: msg.message,
      p: msg.sender === user.id ? "s" : "r",
      date: msg.createdAt,
      ...(msg.image && msg.image.trim() !== "" ? { image: msg.image } : {}),
      ...(msg.video && msg.video.trim() !== "" ? { video: msg.video } : {})
    }));
    setSendText(fetchedMessages);
  }, [rMessages, selectedUser, user]);

  return (
    <div className="container app">
      <div className="row app-one">
        <div className="col-sm-4 side">
          <div className="side-one">
            {userDetail && (
              <ProfileHeading
                user={userDetail.data}
                onSelectVisible={setIsVisible}
              />
            )}
            {isVisible ? (
              <>
                <ComposeBox searchTerm={setSearch} />
                {search && (
                  <ComposeSideBar
                    user={searchPeer}
                    onSelectUser={setSelectedUser}
                  />
                )}
              </>
            ) : (
              <>
                <SearchBox onSearch={setSearch} />{" "}
                {loading ? (
                  <Sidebar loader={loading} />
                ) : (
                  connectedUser && (
                    <Sidebar
                      user={connectedUser.contacts}
                      onSelectUser={setSelectedUser}
                    />
                  )
                )}
              </>
            )}
          </div>
        </div>
        <div className="col-sm-8 conversation">
          {selectedUser ? (
            <>
              <PeerProfile user={selectedUser} fileSelected={setSelectedFile} />
              <div className="row message" id="conversation">
                <Message messageSend={sendText} />
              </div>

              <Reply
                peer={selectedUser}
                onSend={handleSend}
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
              />
            </>
          ) : (
            <SelectPeer />
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;

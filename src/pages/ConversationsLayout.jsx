import { Outlet } from "react-router-dom";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { useCurrentUser } from "../features/users/useCurrentUser";
import { API_URL } from "../utils/constants";
import ConversationSelection from "../features/conversations/ConversationSelection";

function ConversationsLayout() {
  const [socket, setSocket] = useState(null);

  const { user, isLoading } = useCurrentUser();

  useEffect(() => {
    if (!isLoading) {
      const socketInstance = io(API_URL);
      socketInstance.emit("setup", user.username);

      setSocket(socketInstance);

      return () => {
        socketInstance.disconnect();
      };
    }
  }, [isLoading, user]);

  return (
    <div className="mx-auto h-full w-3/4">
      <div className="grid h-full grid-cols-[1fr_2fr]">
        <div className="flex flex-col gap-2 bg-slate-200 p-5">
          <p className="text-left">Conversaciones</p>
          <ConversationSelection socket={socket} />
        </div>
        <div className="bg-slate-300 p-5">
          <Outlet context={socket} />
        </div>
      </div>
    </div>
  );
}

export default ConversationsLayout;

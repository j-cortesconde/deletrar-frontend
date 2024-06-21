import { Outlet } from "react-router-dom";
import { useEffect } from "react";

import socketService from "../services/socketService";
import ConversationSelection from "../features/conversations/ConversationSelection";

function ConversationsLayout() {
  useEffect(() => {
    socketService.connect();

    return () => {
      socketService.disconnect();
    };
  }, []);

  return (
    <div className="mx-auto h-full w-3/4">
      <div className="grid h-full grid-cols-3">
        <div className="col-span-1 flex flex-col gap-2 bg-slate-200 p-5">
          <p className="text-left">Conversaciones</p>
          <ConversationSelection />
        </div>
        <div className="col-span-2 bg-slate-300 p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ConversationsLayout;

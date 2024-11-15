import { Outlet } from "react-router-dom";

import ConversationSelection from "../features/conversations/ConversationSelection";

function ConversationsLayout() {
  return (
    <div className="mx-auto h-full w-3/4">
      <div className="grid h-full grid-cols-3">
        <div className="col-span-1 flex flex-col gap-2 bg-slate-200 p-5">
          <p className="text-left">Conversaciones</p>
          <ConversationSelection />
        </div>
        <div className="col-span-2 flex h-full flex-col bg-slate-300 p-5">
          <div className="flex-1 overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConversationsLayout;

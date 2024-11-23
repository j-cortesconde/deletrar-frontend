import { Outlet } from "react-router-dom";

import ConversationSelection from "../features/conversations/ConversationSelection";

function ConversationsLayout() {
  return (
    <div className=" mx-auto h-full w-3/4 overflow-hidden">
      <div className="flex h-full overflow-hidden">
        <ConversationSelection />

        <div className="flex-1 bg-slate-300 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ConversationsLayout;

import { Outlet } from "react-router-dom";
import ConversationSelection from "../features/conversations/ConversationSelection";

function ConversationsLayout() {
  return (
    <div className="mx-auto h-full w-3/4">
      <div className="grid h-full grid-cols-[1fr_2fr]">
        <div className="flex flex-col gap-2 bg-slate-200 p-5">
          <p className="text-left">Conversaciones</p>
          <ConversationSelection />
        </div>
        <div className="bg-slate-300 p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ConversationsLayout;

import { Outlet } from "react-router-dom";

function ConversationLayout() {
  return (
    <div>
      <p>Todas las conversaciones</p>
      <Outlet />
    </div>
  );
}

export default ConversationLayout;

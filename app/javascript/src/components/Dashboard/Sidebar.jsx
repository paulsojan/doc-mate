import React from "react";
import { LeftArrow } from "@bigbinary/neeto-icons";
import { Button, Spinner, Typography } from "@bigbinary/neetoui";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";

import { useLogout } from "hooks/reactQuery/useAuthenticationApi";
import { useFetchChats } from "hooks/reactQuery/useChatsApi";
import routes from "routes";

// Component to render the list of chats
const ChatList = ({ chats, activeChatId, onChatSelect }) => (
  <ul className="mt-4 space-y-2 overflow-y-auto">
    {chats.map(({ title, id }) => (
      <li key={id}>
        <Button
          label={title}
          style="text"
          className={classNames(
            "block w-full rounded-md py-2 px-4 font-normal text-gray-300 hover:bg-gray-700",
            { "bg-gray-700": activeChatId === id }
          )}
          onClick={() => onChatSelect(id)}
        />
      </li>
    ))}
  </ul>
);

// Component for the logout button
const LogoutButton = ({ onLogout }) => (
  <div
    className="m-2 flex cursor-pointer rounded-md p-3 hover:bg-gray-700"
    onClick={onLogout}
  >
    <LeftArrow color="#ffffff" size={20} />
    <Typography className="ml-1 text-white" style="body2">
      Logout
    </Typography>
  </div>
);

const Sidebar = () => {
  const history = useHistory();
  const location = useLocation();
  const { t } = useTranslation();

  const { data: { chats = [] } = [], isLoading } = useFetchChats();
  const { mutate: logout } = useLogout();

  // Extract chat id from the current URL path
  const urlChatId = location.pathname.split("/")[2];

  // Handler for chat selection
  const handleChatSelect = (id) => {
    history.push(`/chat/${id}`);
  };

  return (
    <div className="flex h-screen w-64 flex-col bg-gray-800">
      <div className="p-4">
        <h1 className="text-lg font-bold text-white">{t("title")}</h1>
      </div>
      <div className="mt-4 flex w-2/3 justify-center">
        <Button
          className="border border-dashed border-white bg-gray-600 p-3 text-white hover:bg-gray-700"
          label={t("newChat")}
          style="text"
          to={routes.root}
        />
      </div>
      <Typography
        className="mt-10 ml-4 text-white"
        style="body2"
        weight="medium"
      >
        {t("chats")}
      </Typography>
      <nav className="ml-2 mr-2 flex-grow">
        {isLoading ? (
          <div className="flex h-1/2 items-center justify-center">
            <Spinner theme="light" />
          </div>
        ) : (
          <ChatList
            chats={chats}
            activeChatId={urlChatId}
            onChatSelect={handleChatSelect}
          />
        )}
      </nav>
      <hr />
      <LogoutButton onLogout={logout} />
    </div>
  );
};

export default Sidebar;

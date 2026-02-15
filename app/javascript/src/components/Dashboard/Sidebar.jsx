import React from "react";

import { LeftArrow } from "@bigbinary/neeto-icons";
import { Button, Spinner, Typography } from "@bigbinary/neetoui";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation, matchPath } from "react-router-dom";

import { useLogout } from "hooks/reactQuery/useAuthenticationApi";
import { useFetchChats } from "hooks/reactQuery/useChatsApi";
import routes from "routes";

const Sidebar = () => {
  const history = useHistory();
  const location = useLocation();
  const { t } = useTranslation();

  const { data: { chats = [] } = {}, isLoading } = useFetchChats();
  const { mutate: logout } = useLogout();

  const activeChatId = matchPath(location.pathname, {
    path: routes.chat.show,
    exact: true,
  })?.params?.id;

  const handleLogout = () => logout();

  const handleChatClick = id => history.push(`/chat/${id}`);

  return (
    <div className="flex h-screen w-64 flex-col bg-gray-800">
      <Header title={t("title")} />
      <div className="mt-4 flex w-2/3 justify-center">
        <Button
          className="border border-dashed border-white bg-gray-600 p-3 text-white hover:bg-gray-700"
          label={t("newChat")}
          style="text"
          to={routes.root}
        />
      </div>
      <ChatList
        activeChatId={activeChatId}
        chats={chats}
        isLoading={isLoading}
        title={t("chats")}
        onChatClick={handleChatClick}
      />
      <Footer logoutLabel={t("logout")} onLogout={handleLogout} />
    </div>
  );
};

const Header = ({ title }) => (
  <div className="p-4">
    <h1 className="text-lg font-bold text-white">{title}</h1>
  </div>
);

const ChatList = ({ chats, isLoading, activeChatId, onChatClick, title }) => (
  <>
    <Typography
      className="mt-10 ml-4 text-white"
      style="body2"
      weight="medium"
    >
      {title}
    </Typography>
    <nav className="mx-2 flex-grow overflow-y-auto">
      {isLoading ? (
        <div className="flex h-1/2 items-center justify-center">
          <Spinner theme="light" />
        </div>
      ) : (
        <ul className="mt-4 space-y-2">
          {chats.map(({ title, id }) => (
            <li key={id}>
              <Button
                label={title}
                style="text"
                className={classNames(
                  "block w-full rounded-md py-2 px-4 text-left font-normal text-gray-300 hover:bg-gray-700",
                  { "bg-gray-700": String(activeChatId) === String(id) }
                )}
                onClick={() => onChatClick(id)}
              />
            </li>
          ))}
        </ul>
      )}
    </nav>
  </>
);

const Footer = ({ onLogout, logoutLabel }) => (
  <>
    <hr className="border-gray-700" />
    <div
      className="m-2 flex cursor-pointer items-center rounded-md p-3 hover:bg-gray-700"
      onClick={onLogout}
    >
      <LeftArrow color="#ffffff" size={20} />
      <Typography className="ml-1 text-white" style="body2">
        {logoutLabel}
      </Typography>
    </div>
  </>
);

export default Sidebar;

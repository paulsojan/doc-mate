import React from "react";

import { LeftArrow } from "@bigbinary/neeto-icons";
import { Button, Spinner, Typography } from "@bigbinary/neetoui";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";

import { useLogout } from "hooks/reactQuery/useAuthenticationApi";
import { useFetchChats } from "hooks/reactQuery/useChatsApi";
import routes from "routes";

const Header = ({ title }) => (
  <div className="p-4">
    <Typography style="h4" weight="bold">
      {title}
    </Typography>
  </div>
);

const ChatList = ({ chats, isLoading }) => {
  const history = useHistory();
  const { pathname } = useLocation();
  const urlChatId = pathname.split("/")[2];

  if (isLoading) {
    return (
      <div className="flex h-20 items-center justify-center">
        <Spinner theme="light" />
      </div>
    );
  }

  return (
    <nav className="flex-grow overflow-y-auto px-2">
      <ul className="space-y-1">
        {chats.map(({ title, id }) => (
          <li key={id}>
            <Button
              label={title}
              style="text"
              className={classNames(
                "w-full justify-start rounded-md py-2 px-4 font-normal text-gray-300 hover:bg-gray-700 hover:text-white",
                { "bg-gray-700 text-white": urlChatId === id }
              )}
              onClick={() => history.push(`/chat/${id}`)}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

const Footer = ({ onLogout, logoutLabel }) => (
  <div className="mt-auto border-t border-gray-700 p-2">
    <div
      className="flex cursor-pointer items-center rounded-md p-3 hover:bg-gray-700 transition-colors"
      onClick={onLogout}
    >
      <LeftArrow color="#ffffff" size={20} />
      <Typography className="ml-3" style="body2">
        {logoutLabel}
      </Typography>
    </div>
  </div>
);

const Sidebar = () => {
  const { t } = useTranslation();
  const { data: { chats = [] } = {}, isLoading } = useFetchChats();
  const { mutate: logout } = useLogout();

  return (
    <div className="flex h-screen w-64 flex-col bg-gray-800 text-white">
      <Header title={t("title")} />
      <div className="mt-4 px-4">
        <Button
          className="w-full border border-dashed border-white bg-gray-600 hover:bg-gray-700"
          label={t("newChat")}
          style="text"
          to={routes.root}
        />
      </div>
      <div className="mt-10 flex flex-col flex-grow overflow-hidden">
        <Typography className="ml-4 mb-4" style="body2" weight="medium">
          {t("chats")}
        </Typography>
        <ChatList chats={chats} isLoading={isLoading} />
      </div>
      <Footer logoutLabel={t("logout")} onLogout={logout} />
    </div>
  );
};

export default Sidebar;

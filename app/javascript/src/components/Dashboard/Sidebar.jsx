import React from "react";

import { LeftArrow } from "@bigbinary/neeto-icons";
import { Button, Spinner, Typography } from "@bigbinary/neetoui";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useHistory, useRouteMatch } from "react-router-dom";

import { useLogout } from "hooks/reactQuery/useAuthenticationApi";
import { useFetchChats } from "hooks/reactQuery/useChatsApi";
import routes from "routes";

const Sidebar = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const match = useRouteMatch(routes.chat.show);

  const { data: { chats = [] } = {}, isLoading } = useFetchChats();
  const { mutate: logout } = useLogout();

  const activeChatId = match?.params?.id;

  return (
    <div className="flex h-screen w-64 flex-col bg-gray-800">
      <div className="p-4">
        <Typography className="text-white" style="h4" weight="bold">
          {t("title")}
        </Typography>
      </div>
      <div className="mt-4 flex justify-center px-6">
        <Button
          className="w-full border border-dashed border-white bg-gray-600 p-3 text-white hover:bg-gray-700"
          label={t("newChat")}
          style="text"
          to={routes.root}
        />
      </div>
      <Typography
        className="ml-4 mt-10 text-gray-400 uppercase tracking-widest"
        style="body3"
        weight="bold"
      >
        {t("chats")}
      </Typography>
      <nav className="mt-4 flex-grow overflow-y-auto px-2">
        {isLoading ? (
          <div className="flex h-20 items-center justify-center">
            <Spinner theme="light" />
          </div>
        ) : (
          <ul className="space-y-2">
            {chats.map(({ title, id }) => (
              <li key={id}>
                <Button
                  label={title}
                  style="text"
                  className={classNames(
                    "flex w-full justify-start rounded-md px-4 py-2 font-normal text-gray-300 hover:bg-gray-700",
                    { "bg-gray-700 text-white": activeChatId === String(id) }
                  )}
                  onClick={() => history.push(`/chat/${id}`)}
                />
              </li>
            ))}
          </ul>
        )}
      </nav>
      <hr className="border-gray-700" />
      <div
        className="m-2 flex cursor-pointer items-center rounded-md p-3 text-gray-300 transition-colors duration-200 hover:bg-gray-700 hover:text-white"
        onClick={() => logout()}
      >
        <LeftArrow size={20} />
        <Typography className="ml-2" style="body2">
          {t("logout")}
        </Typography>
      </div>
    </div>
  );
};

export default Sidebar;

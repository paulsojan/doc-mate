import React, { useCallback } from "react";

import { LeftArrow } from "@bigbinary/neeto-icons";
import { Button, Spinner, Typography } from "@bigbinary/neetoui";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

import { useLogout } from "hooks/reactQuery/useAuthenticationApi";
import { useFetchChats } from "hooks/reactQuery/useChatsApi";
import routes from "routes";

const Sidebar = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const { data, isLoading } = useFetchChats();
  // API shape may vary; normalize to an array of chats
  const chats = (data && data.chats) || [];

  const { mutate: logout } = useLogout();

  const match = location.pathname.match(/^\/chat\/([^/]+)/u);
  const urlChatId = match ? match[1] : null;

  const handleLogout = useCallback(() => logout(), [logout]);

  return (
    <aside className="flex h-screen w-64 flex-col bg-gray-800" aria-label={t("sidebar")}>
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

      <Typography className="mt-10 ml-4 text-white" style="body2" weight="medium">
        {t("chats")}
      </Typography>

      <nav className="ml-2 mr-2 flex-grow" aria-label={t("chatsList")}>
        {isLoading ? (
          <div className="flex h-1/2 items-center justify-center">
            <Spinner theme="light" />
          </div>
        ) : (
          <ul className="mt-4 space-y-2 overflow-y-auto">
            {chats.map(({ title, id }) => (
              <li key={id}>
                <Button
                  as={Link}
                  to={`/chat/${id}`}
                  label={title}
                  style="text"
                  className={classNames(
                    "block w-full rounded-md py-2 px-4 font-normal text-gray-300 hover:bg-gray-700",
                    { "bg-gray-700": String(urlChatId) === String(id) }
                  )}
                />
              </li>
            ))}
          </ul>
        )}
      </nav>

      <hr className="border-gray-700" />

      <div
        role="button"
        tabIndex={0}
        className="m-2 flex cursor-pointer items-center rounded-md p-3 hover:bg-gray-700"
        onClick={handleLogout}
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") handleLogout();
        }}
        aria-label={t("logout")}
      >
        <LeftArrow color="#ffffff" size={20} />
        <Typography className="ml-1 text-white" style="body2">
          {t("logout")}
        </Typography>
      </div>
    </aside>
  );
};

export default Sidebar;

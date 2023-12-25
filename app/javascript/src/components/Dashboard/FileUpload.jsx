import React, { useRef } from "react";

import { File } from "@bigbinary/neeto-icons";
import { Spinner, Typography } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { useUploadFile } from "hooks/reactQuery/useUploadsApi";

const FileUpload = () => {
  const { t } = useTranslation();

  const fileInputRef = useRef(null);

  const history = useHistory();

  const { mutate: uploadFile, isLoading } = useUploadFile();

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = event => {
    const data = new FormData();
    data.append("file", event.target.files[0]);

    uploadFile(data, {
      onSuccess: ({ chat_id }) => history.push(`chat/${chat_id}`),
    });
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div
        className="cursor-pointer rounded-lg bg-gray-200 p-24 shadow-md"
        onClick={handleFileClick}
      >
        {isLoading ? (
          <div className="flex">
            <Spinner />
            <Typography className="ml-3" style="body2">
              {t("processing")}
            </Typography>
          </div>
        ) : (
          <>
            <input
              accept=".txt,.pdf"
              className="hidden"
              ref={fileInputRef}
              type="file"
              onChange={handleFileUpload}
            />
            <div className="flex justify-center">
              <File color="#2b70e0" size={64} />
            </div>
            <div className="pt-5">
              <Typography style="h3">{t("browseFiles")}</Typography>
              <div className="flex justify-center pt-2 text-gray-500">
                <Typography style="body2">{t("pdfAndTxtAllowed")}</Typography>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default FileUpload;

import React, { useEffect, useState } from "react";

import { Send } from "@bigbinary/neeto-icons";
import {
  Typography,
  Textarea,
  Button,
  PageLoader,
  Spinner,
} from "@bigbinary/neetoui";
import classNames from "classnames";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { useCreateChat, useShowChat } from "hooks/reactQuery/useChatsApi";

const QuestionAnswer = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const { t } = useTranslation();

  const { id } = useParams();

  const { data: { data = {} } = {}, isLoading } = useShowChat(id);
  const { mutate: chats, isLoading: isAnswerLoading } = useCreateChat();

  const handleSubmit = () => {
    const payload = { chats: { question } };

    chats({ payload, id }, { onSuccess: ({ data }) => setAnswer(data.answer) });
  };

  const handleKeyPress = event => {
    if (event.which === 13) {
      event.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    setQuestion("");
    setAnswer("");
  }, [id]);

  if (isLoading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="flex justify-center bg-gray-200 p-4 font-semibold">
        <Typography style="body1">
          {t("chatWith", { title: data.title })}
        </Typography>
      </div>
      {(!isEmpty(answer) || isAnswerLoading) && (
        <div
          className={classNames(
            "mt-10 ml-10 flex overflow-y-auto whitespace-pre-wrap rounded-r-xl rounded-bl-xl bg-gray-200 p-6",
            {
              "w-20": isAnswerLoading,
              "w-1/2": !isAnswerLoading,
            }
          )}
        >
          {isAnswerLoading ? <Spinner /> : answer}
        </div>
      )}
      <div className="flex-grow" />
      <div className="mt-10 mb-10 flex items-center justify-center">
        <div className="flex w-1/2">
          <Textarea
            placeholder={t("inputBoxPlaceholderText")}
            rows={1}
            value={question}
            onChange={event => setQuestion(event.target.value)}
            {...(!isAnswerLoading && { onKeyPress: handleKeyPress })}
          />
        </div>
        <Button
          className="ml-5"
          disabled={isAnswerLoading || isEmpty(question)}
          icon={Send}
          size="large"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default QuestionAnswer;

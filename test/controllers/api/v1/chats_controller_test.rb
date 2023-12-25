# frozen_string_literal: true

require "test_helper"

class Api::V1::ChatsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user)
    @chat = create(:chat, user: @user)
  end

  def test_should_list_all_chats_for_a_given_user
    create_list :chat, 3, user: @user

    get api_v1_chats_url, headers: headers(@user)
    assert_response :success

    assert_picked_elements_are_same @user.chats, response_body["chats"]
  end

  def test_should_show_a_chat
    get api_v1_chat_url(@chat), headers: headers(@user)
    assert_response :success

    assert_equal @chat.id, response_body["id"]
  end

  def test_should_respond_error_for_invalid_chat
    get api_v1_chat_url("invalid"), headers: headers(@user)
    assert_response :unprocessable_entity

    assert_equal t("chat.invalid"), response_body["error"]
  end

  def test_should_return_answer_for_question
    file = fixture_file_upload("test/sample.txt", "text/plain")

    post api_v1_uploads_url, params: { file: }, headers: headers(@user)
    assert_response :success

    new_chat_id = response_body["chat_id"]
    post question_api_v1_chat_url(new_chat_id),
      params: chat_params(question: "To what temperature the oven needs to be preheaten"), headers: headers(@user)
    assert_response :success

    assert_includes response_body["answer"], t("chat.question.response")
  end

  private

    def chat_params(params)
      { chats: params }
    end
end

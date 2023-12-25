# frozen_string_literal: true

require "test_helper"

class ChatTest < ActiveSupport::TestCase
  def setup
    @user = create(:user)
    @chat = create(:chat, user: @user)
  end

  def test_title_cannot_be_blank
    @chat.title = nil
    assert_not @chat.valid?

    assert_includes @chat.errors.full_messages, t("cannot_blank", entity: "Title")
  end

  def test_chat_should_not_be_valid_without_user
    @chat.user = nil
    assert_not @chat.save
    assert_includes t("must_exists", entity: "User"), @chat.errors.full_messages.to_sentence
  end
end

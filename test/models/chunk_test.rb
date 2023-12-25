# frozen_string_literal: true

require "test_helper"

class ChunkTest < ActiveSupport::TestCase
  def setup
    @user = create(:user)
    @chat = create(:chat, user: @user)
    @chunks = create(:chunk, chat: @chat)
  end

  def test_content_cannot_be_blank
    @chunks.content = nil
    assert_not @chunks.valid?

    assert_includes @chunks.errors.full_messages, t("cannot_blank", entity: "Content")
  end

  def test_embedding_cannot_be_blank
    @chunks.embedding = nil
    assert_not @chunks.valid?

    assert_includes @chunks.errors.full_messages, t("cannot_blank", entity: "Embedding")
  end

  def test_chunks_should_not_be_valid_without_chat
    @chunks.chat = nil
    assert_not @chunks.save

    assert_includes t("must_exists", entity: "Chat"), @chunks.errors.full_messages.to_sentence
  end
end

# frozen_string_literal: true

require "test_helper"

class ChunkableServiceTest < ActiveSupport::TestCase
  def setup
    @user = create(:user)
  end

  def test_chunkable_service_should_create_chat_and_generate_embeddings
    file = ActionDispatch::Http::UploadedFile.new(
      tempfile: File.open("test/sample.txt"), filename: "sample.txt",
      content_type: "text/plain")

    assert_difference "@user.chats.count", 1 do
      chat_id_from_service = chunkable_service(file, @user).process

      chunks = generate_chunks(File.open("test/sample.txt"))
      chat = @user.chats.find(chat_id_from_service)

      assert_equal chunks.size, chat.chunks.size
    end
  end

  private

    def chunkable_service(file, user)
      ChunkableService.new(file, user)
    end

    def generate_chunks(content)
      Langchain::Chunker::RecursiveText.new(
        content.read,
        chunk_size: 768,
        chunk_overlap: 200,
        separators: ["\n# ", "\n## ", "\n### "]
      ).chunks
    end
end

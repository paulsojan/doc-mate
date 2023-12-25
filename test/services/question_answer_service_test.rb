# frozen_string_literal: true

require "test_helper"

class QuestionAnswerServiceTest < ActiveSupport::TestCase
  def setup
    @user = create(:user)
  end

  def test_question_answer_service_should_generate_answer_for_query
    file = ActionDispatch::Http::UploadedFile.new(
      tempfile: File.open("test/sample.txt"), filename: "sample.txt",
      content_type: "text/plain")

    chat_id = chunkable_service(file, @user).process
    query = "To what temperature the oven needs to be preheaten"
    answer = question_answer_service(query, chat_id).process

    assert_includes answer, t("chat.question.response")
  end

  private

    def chunkable_service(file, user)
      ChunkableService.new(file, user)
    end

    def question_answer_service(query, chat_id)
      QuestionAnswerService.new(query, chat_id)
    end
end

# frozen_string_literal: true

require "test_helper"

class Api::V1::ChunksControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user)
  end

  def test_should_able_to_upload_file
    file = fixture_file_upload("test/sample.txt", "text/plain")

    assert_difference "@user.chats.count", 1 do
      post api_v1_uploads_url, params: { file: }, headers: headers(@user)
      assert_response :success
    end
    assert_equal @user.chats.first.id, response_body["chat_id"]
  end
end

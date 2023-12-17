# frozen_string_literal: true

class Api::V1::ChunksController < Api::V1::BaseController
  def create
    chat_id = ChunkableService.new(upload_params[:file], current_user).process
    render_json({ chat_id: })
  end

  private

    def upload_params
      params.permit(:file)
    end
end

# frozen_string_literal: true

class Api::V1::ChatsController < Api::V1::BaseController
  before_action :load_chat!, only: %i[show question]

  def index
    @chats = current_user.chats.order(created_at: :desc)
  end

  def show
    render_json(@chat)
  end

  def question
    answer = QuestionAnswerService.new(question_params[:question], @chat.id).process
    render_json({ answer: })
  end

  private

    def load_chat!
      @chat = current_user.chats.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render_error(t("chat.invalid"))
    end

    def question_params
      params.require(:chats).permit(:question)
    end
end

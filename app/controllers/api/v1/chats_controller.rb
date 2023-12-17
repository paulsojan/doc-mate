# frozen_string_literal: true

class Api::V1::ChatsController < Api::V1::BaseController
  before_action :load_chat!, only: :show

  def index
    @chats = current_user.chats.all.order(created_at: :desc)
  end

  def create
    answer = QuestionAnswerService.new(question_answer_params[:question], question_answer_params[:chat_id]).process
    render_json({ answer: })
  end

  def show
    render_json(@chat)
  end

  private

    def load_chat!
      @chat = current_user.chats.find(params[:id])
    end

    def question_answer_params
      params.require(:chats).permit(:question, :chat_id)
    end
end

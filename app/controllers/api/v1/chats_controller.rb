# frozen_string_literal: true

class Api::V1::ChatsController < Api::V1::BaseController
  before_action :set_chat, only: :show

  def index
    @chats = current_user.chats.order(created_at: :desc)
    render_json(@chats)
  end

  def show
    render_json(@chat)
  end

  def question
    answer = QuestionAnswerService
               .new(question_answer_params[:question], params[:id])
               .process
    render_json(answer: answer)
  end

  private

  def set_chat
    @chat = current_user.chats.find_by(id: params[:id])
    render_error(t('chat.invalid')) unless @chat
  end

  def question_answer_params
    params.require(:chats).permit(:question)
  end
end

# Refactored chats_controller.rb

class ChatsController < ApplicationController
  def index
    # Fetch and render chat messages
    @chats = Chat.all
    render json: @chats
  end

  def show
    # Fetch and render a specific chat
    @chat = Chat.find(params[:id])
    render json: @chat
  end

  def create
    # Create a new chat message
    @chat = Chat.new(chat_params)
    if @chat.save
      render json: @chat, status: :created
    else
      render json: @chat.errors, status: :unprocessable_entity
    end
  end

  private

  def chat_params
    params.require(:chat).permit(:content, :user_id)
  end
end
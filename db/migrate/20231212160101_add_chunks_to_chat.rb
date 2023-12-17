# frozen_string_literal: true

class AddChunksToChat < ActiveRecord::Migration[7.0]
  def change
    add_reference :chunks, :chat, type: :uuid, foreign_key: true, null: false
  end
end

# frozen_string_literal: true

class CreateChats < ActiveRecord::Migration[7.0]
  def change
    create_table :chats, id: :uuid do |t|
      t.string :title, null: false
      t.references :user, type: :uuid, null: false

      t.timestamps
    end
  end
end

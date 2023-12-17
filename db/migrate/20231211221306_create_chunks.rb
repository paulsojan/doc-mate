# frozen_string_literal: true

class CreateChunks < ActiveRecord::Migration[7.0]
  def change
    create_table :chunks, id: :uuid do |t|

      t.text :content, null: false
      t.vector :embedding, limit: 768, null: false

      t.timestamps
    end
  end
end

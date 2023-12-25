# frozen_string_literal: true

class Chunk < ApplicationRecord
  belongs_to :chat

  validates :content, presence: true
  validates :embedding, presence: true

  has_neighbors :embedding, dimensions: 768
end

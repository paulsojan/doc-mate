# frozen_string_literal: true

class Chat < ApplicationRecord
  has_many :chunks, dependent: :destroy

  belongs_to :user

  validates :title, presence: true
end

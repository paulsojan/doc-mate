# frozen_string_literal: true

FactoryBot.define do
  factory :chat do
    user
    title { Faker::Lorem.sentence[0..49] }
  end
end

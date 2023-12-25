# frozen_string_literal: true

FactoryBot.define do
  factory :chunk do
    chat
    content { Faker::Lorem.paragraph(sentence_count: rand(10..100)) }
    embedding { Array.new(768) { Faker::Number.number(digits: 3).to_i } }
  end
end

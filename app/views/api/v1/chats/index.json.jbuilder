json.chats @chats do |chat|
  json.extract! chat,
    :id,
    :title,
    :created_at
end

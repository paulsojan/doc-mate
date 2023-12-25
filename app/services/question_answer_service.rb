# frozen_string_literal: true

class QuestionAnswerService
  attr_reader :query, :chat

  def initialize(query, chat_id)
    @query = query
    @chat = Chat.find(chat_id)
  end

  def process
    generate_answer
  end

  private

    def generate_answer
      query_embeddings = google_palm.embed(text: query)
      context = chat.chunks.nearest_neighbors(
        :embedding, query_embeddings.embedding,
        distance: "cosine").first(5).map(&:content)

      response = google_palm.chat(messages: [{ role: "user", content: message_content(context) }])
      content = response.raw_response.dig("candidates", 0, "content")

      content.nil? ? "No relevant information found" : content
    end

    def google_palm
      Langchain::LLM::GooglePalm.new(api_key: Rails.application.secrets.google_palm_api_key)
    end

    def message_content(context)
      <<~CONTENT
        Answer the question as precisely as possible using the provided context, and
        if the question can't be answered based on the context,
        say \"I don't know\". \n\n
            Context: \n #{context}?\n
            Question: \n #{query} \n
      CONTENT
    end
end

# frozen_string_literal: true

class ChunkableService
  attr_reader :file_content, :file_type, :file_name, :chat, :user

  def initialize(file, current_user)
    @file_type = file.content_type
    @file_content = file.tempfile
    @file_name = file.original_filename
    @user = current_user
  end

  def process
    @chat = user.chats.create!(title: file_name)
    convert_embeddings_to_chunks
    chat.id
  end

  private

    # remove /n from content
    def processed_content
      content = ""
      if file_type == "application/pdf"
        read_pdf = PDF::Reader.new(file_content)

        read_pdf.pages.each do |page|
          content += page.text
        end
      else
        content = File.open(file_content).read
      end
      content
    end

    def generate_chunks
      Langchain::Chunker::RecursiveText.new(
        processed_content,
        chunk_size: 768,
        chunk_overlap: 200,
        separators: ["\n# ", "\n## ", "\n### "]
      ).chunks
    end

    def convert_embeddings_to_chunks
      generate_chunks.each do |chunk|
        content = chunk.text
        llm_response = google_palm.embed(text: content)
        chat.chunks.create!(content:, embedding: llm_response.embedding)
      end
    end

    def google_palm
      Langchain::LLM::GooglePalm.new(api_key: Rails.application.secrets.google_palm_api_key)
    end
end

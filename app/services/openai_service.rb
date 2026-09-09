class OpenaiService
  def initialize
    Groq.configure do |config|
      config.api_key = ENV['GROQ_API_KEY']
    end
    @client = Groq::Client.new
  end

  def generate_briefing(notes)
    prompt = build_prompt(notes)
    response = @client.chat(
      [{ role: "user", content: prompt }],
      model_id: "openai/gpt-oss-20b"
    )
    response["content"]
  rescue Faraday::TooManyRequestsError => e
    Rails.logger.error "Groq Rate Limit: #{e.message}"
    " Rate limit exceeded. Please wait a moment and try again."
  rescue Faraday::ClientError, Faraday::ServerError => e
    Rails.logger.error "Groq API Error: #{e.message}"
    " AI service is currently unavailable. Please try again later."
  rescue => e
    Rails.logger.error "Groq API Error: #{e.message}"
    " Failed to generate briefing. Please try again."
  end

  private

  def build_prompt(notes)
    notes_text = notes.map { |note| "- #{note.content}" }.join("\n")

    <<~PROMPT
      # Identity
       You are a professional assistant that summarizes client notes.

      # Instructions
       Write a clear and concise briefing in your own words. Do NOT just copy the notes.
    - Reword and rephrase the key information
    - Combine related points
    - Identify action items and next steps from the context
    - Be professional and concise

      # Context
      Notes:
      #{notes_text}

      # Output Format
      Provide the response in this exact format:

      1. Key points:
         - [rewritten key point 1]
         - [rewritten key point 2]

      2. Action items:
         - [action 1]
         - [action 2]

      3. Next steps:
         - [step 1]
         - [step 2]
    PROMPT
  end
end
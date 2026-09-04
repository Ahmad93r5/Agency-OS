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
  rescue => e
    Rails.logger.error "Groq API Error: #{e.message}"
    "Failed to generate briefing. Please try again."
  end

  private

  def build_prompt(notes)
    notes_text = notes.map { |note| "- #{note.content}" }.join("\n")

    <<~PROMPT
      # Identity
      You are a professional assistant that summarizes client notes for a business team.

      # Instructions
      Generate a clear and concise briefing from the notes below.
      - Only include information from the notes provided
      - Be professional and objective
      - Keep it concise (under 100 words)
      - Do not add extra information

      # Context
      Notes:
      #{notes_text}

      # Output Format
      Provide the response in this exact format:

      1. Key points:
         - [point 1]
         - [point 2]
         - [point 3]

      2. Action items:
         - [action 1]
         - [action 2]

      3. Next steps:
         - [step 1]
         - [step 2]
    PROMPT
  end
end
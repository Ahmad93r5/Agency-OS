class NotesController < ApplicationController
  before_action :authorize_request
  before_action :current_client
  before_action :set_note, only: [:show, :update, :destroy]

  def index
    @notes = @client.notes.order(created_at: :desc)
    render :index
  end

  def show
    render :show
  end

  def create
    @note = @client.notes.new(note_params)

    if @note.save
      render :create, status: :created
    else
      render json: { errors: @note.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @note.update(note_params)
      render :update, status: :ok
    else
      render json: { errors: @note.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @note.destroy
    head :no_content
  end

    # AI Briefing Generation
    def generate_briefing
      notes = @client.notes.order(created_at: :desc)
      service = OpenaiService.new
      briefing = service.generate_briefing(notes)
    
     @client.briefing_documents.create(content: briefing)

      render json: { briefing: briefing }
    rescue => e
      Rails.logger.error "Error generating briefing: #{e.message}"
      render json: { error: "Failed to generate briefing. Please try again." }, status: :internal_server_error
    end

  private

  def current_client
    @client = Client.find_by(id: params[:client_id])

    if @client.nil?
      render json: { error: "Client not found" }, status: :not_found
    end
  end

  def set_note
    @note = @client.notes.find_by(id: params[:id])

    if @note.nil?
      render json: { error: "Note not found" }, status: :not_found
    end
  end

  def note_params
    params.require(:note).permit(:content, :file)
  end
end
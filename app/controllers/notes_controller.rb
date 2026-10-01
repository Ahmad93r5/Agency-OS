class NotesController < ApplicationController
  before_action :authorize_request
  before_action :current_client
  before_action :set_note, only: [ :show, :update, :destroy ]

  def index
    @notes = @client.notes.order(created_at: :desc)
    render json: @notes.map { |note| note_json(note) }
  end

  def show
    render json: note_json(@note)
  end

  def create
    @note = @client.notes.new(note_params)

    if @note.save
      render json: note_json(@note), status: :created
    else
      render json: { errors: @note.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @note.update(note_params)
      render json: note_json(@note), status: :ok
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
    @workspace = @current_user.workspaces.find_by(id: params[:workspace_id])

    if @workspace.nil?
      return render json: { error: "Workspace not found" }, status: :not_found
    end

    @client = @workspace.clients.find_by(id: params[:client_id])

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

  # ✅ Multiple files array (SIRF EK BAAR)
  def note_params
    params.require(:note).permit(:content, files: [])
  end

  # ✅ note_json method with files
  def note_json(note)
    {
      id: note.id,
      content: note.content,
      created_at: note.created_at,
      files: note.files.map { |f|
        {
          id: f.id,
          filename: f.filename.to_s,
          size: f.byte_size,
          content_type: f.content_type,
          url: Rails.application.routes.url_helpers.rails_blob_url(
            f,
            host: request.base_url
          )
        }
      }
    }
  end
end
class NotesController < ApplicationController
    before_action :authorize_request
    before_action :current_client

    def index
       @notes = @client.notes.order(created_at: :desc) 
    end

    def create
      @note = @client.notes.new(note_params)
    if @note.save
      render json: @note, status: :created
    else
      render json: { errors: @note.errors.full_messages }, status: :unprocessable_entity
    end
    end

    def destroy
      @note = @client.notes.find(params[:id])
      if @note.destroy
        render json: { message: "Note deleted successfully" }, status: :ok
      else
        render json: { errors: @note.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def update
      @note = @client.notes.find(params[:id])
      if @note.update(note_params)
        render json: @note, status: :ok
      else
        render json: { errors: @note.errors.full_messages }, status: :unprocessable_entity
      end
    end 
    
   

    private
     def current_client
    @client = Client.find(params[:client_id]) 
    end

    def note_params
        params.require(:note).permit(:content)
    end
end

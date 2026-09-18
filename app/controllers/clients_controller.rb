class ClientsController < ApplicationController
  before_action :current_workspace, only: [:index, :show, :create, :update, :destroy, :briefings]
  before_action :set_client, only: [ :show, :update, :destroy, :briefings ]

  def index
    @clients = @workspace.clients
    render :index
  end

  def show
    render :show
  end

  def create
    @client = @workspace.clients.new(client_params)

    if @client.save
      render :create, status: :created
    else
      render json: { errors: @client.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @client.update(client_params)
      render :update, status: :ok
    else
      render json: { errors: @client.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @client.destroy
    head :no_content
  end

  def all_clients
    @clients = Client.joins(:workspace)
                     .where(workspaces: { user_id: @current_user.id })
                     .includes(:workspace)
                     .order(created_at: :desc)

    render json: @clients.map { |client|
      {
        id: client.id,
        name: client.name,
        email: client.email,
        phone: client.phone,
        workspace: {
          id: client.workspace.id,
          name: client.workspace.name
        }
      }
    }
  end


   def briefings
     @briefings = @client.briefing_documents.limit(10)
     render json: @briefings
      rescue => e
        render json: { error: "Failed to fetch briefings" }, status: :internal_server_error
   end

  private

  def current_workspace
    @workspace = @current_user.workspaces.find_by(id: params[:workspace_id])

    if @workspace.nil?
      render json: { error: "Workspace not found" }, status: :not_found
    end
  end

  def set_client
    @client = @workspace.clients.find_by(id: params[:id])

    if @client.nil?
      render json: { error: "Client not found" }, status: :not_found
    end
  end

  def client_params
    params.require(:client).permit(:name, :email, :phone)
  end
end

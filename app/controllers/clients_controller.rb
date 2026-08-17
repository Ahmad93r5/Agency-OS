class ClientsController < ApplicationController
  before_action :set_workspace

  def index
    clients = @workspace.clients
    render json: clients
  end

  def show
    client = @workspace.clients.find(params[:id])
    render json: client
  end

  def create
    client = @workspace.clients.new(client_params)

    if client.save
      render json: client, status: :created
    else
      render json: { errors: client.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def set_workspace
    @workspace = current_user.workspaces.find(params[:workspace_id])
  end

  def client_params
    params.require(:client).permit(:name, :email, :phone)
  end
end
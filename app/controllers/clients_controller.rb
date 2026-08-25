class ClientsController < ApplicationController
  before_action :current_workspace

  def index
  @clients = @workspace.clients
end

  def show
    @client = @workspace.clients.find(params[:id])
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
   @client = @workspace.clients.find(params[:id])

     if @client.update(client_params)
        render :update, status: :ok
     else
       render json: { errors: @client.errors.full_messages }, status: :unprocessable_entity
     end
  end

 def destroy
  client = @workspace.clients.find(params[:id])
  client.destroy

  render json: { message: "Client deleted successfully" }, status: :ok
end


  private

  def current_workspace
    @workspace = @current_user.workspaces.find(params[:workspace_id])
  end

  def client_params
    params.require(:client).permit(:name, :email, :phone)
  end
end

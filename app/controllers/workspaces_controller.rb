class WorkspacesController < ApplicationController
  before_action :set_workspace, only: [:show, :update, :destroy]

  def index
    @workspaces = @current_user.workspaces  
    render :index                           
  end

  def show
    render :show   
  end

  def create
    @workspace = @current_user.workspaces.new(workspace_params)   
    if @workspace.save
      render :create, status: :created                          
    else
      render json: { errors: @workspace.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @workspace.update(workspace_params)
      render :update, status: :ok                                 
    else
      render json: { errors: @workspace.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @workspace.destroy
    head :no_content
  end

  private

  def set_workspace
    @workspace = @current_user.workspaces.find_by(id: params[:id])
    if @workspace.nil?
      render json: { error: "Workspace not found" }, status: :not_found
    end
  end

  def workspace_params
    params.require(:workspace).permit(:name)
  end
end
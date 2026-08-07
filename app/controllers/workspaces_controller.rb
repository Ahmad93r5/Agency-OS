class WorkspacesController < ApplicationController

    def create
        workspace = @current_user.workspaces.new(workspace_params)
                #   @current_user--> jo abi login howa ha 
        if workspace.save
            render json: workspace, status: :created
        else
            render json: { errors: workspace.errors.full_messages }, status: :unprocessable_entity
        end
    end
    
    def index
        workspaces = @current_user.workspaces
        if workspaces.empty?
            render json: { message: "No workspaces found" }, status: :ok
           else
          render json: workspaces, status: :ok
        end
    end

    def show
        workspace = @current_user.workspaces.find(params[:id])
        # Iska matlab User #2 User #1 ka workspace access/update/delete nahi kar sakta, kyun ke search sirf current user's workspaces mein ho rahi hai.
        if workspace.nil?
            render json: { error: "Workspace not found" }, status: :not_found
        else
            render json: workspace, status: :ok
        end
    end

    def update
        workspace = @current_user.workspaces.find(params[:id])
        if workspace.update(workspace_params)
            render json: workspace, status: :ok
        else
            render json: { errors: workspace.errors.full_messages }, status: :unprocessable_entity
        end
    end 

    def destroy
        workspace = @current_user.workspaces.find(params[:id])
        if workspace.nil?
            render json: { error: "Workspace not found" }, status: :not_found
          else
            workspace.destroy
            head :no_content
        end
    end

    private

  def workspace_params
    params.require(:workspace).permit(:name)
  end

end

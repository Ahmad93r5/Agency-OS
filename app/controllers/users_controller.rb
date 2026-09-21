class UsersController < ApplicationController
  before_action :authorize_request

  def index
    render json: {
      user: @current_user
    }, status: :ok
  end

  def show
    render json: {
      user: {
        id: @current_user.id,
        name: @current_user.name,
        email: @current_user.email
      }
    }
  end

  def update
    if @current_user.update(profile_params)
      render json: {
        user: {
          id: @current_user.id,
          name: @current_user.name,
          email: @current_user.email
        }
      }, status: :ok
    else
      render json: { errors: @current_user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH /change_password
  def change_password
    unless @current_user.authenticate(params[:current_password])
      return render json: { errors: [ "Current password is incorrect" ] }, status: :unprocessable_entity
    end

    if params[:new_password].blank? || params[:new_password].length < 6
      return render json: { errors: [ "New password must be at least 6 characters" ] }, status: :unprocessable_entity
    end

    if params[:new_password] != params[:new_password_confirmation]
      return render json: { errors: [ "New passwords do not match" ] }, status: :unprocessable_entity
    end

    if @current_user.update(password: params[:new_password])
      render json: { message: "Password updated successfully" }, status: :ok
    else
      render json: { errors: @current_user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def profile_params
    params.require(:user).permit(:name, :email)
  end
end

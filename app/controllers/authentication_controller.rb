class AuthenticationController < ApplicationController

   skip_before_action :authorize_request, only: [:signup, :login]
    
    def signup
      user = User.new(user_params)
      if user.save
        render json:{message: "User Register Successfully"}, status: :created
      else
        render json: {errors: user.errors.full_messages}, status: :unprocessable_entity
      end
    end

    def login
    user =  User.find_by(email: params[:user][:email])
      
      if user&.authenticate(params[:user][:password])
        token = JsonWebToken.encode(user_id: user.id)
                                    
        
        render json: {
            token: token
            # json key = ruby variable
        },status: :ok
      else
          render json: {
            message: "Invalid Email or Password"
          }, status: :unauthorized
        end
    end
    
    private
    def user_params
       params.require(:user).permit(:name, :email, :password)
    end
 
end

class ApplicationController < ActionController::API
    before_action :authorize_request
             # ApplicationController mein laga diya hai.
             # Iska matlab Signup aur Login bhi token maangenge.
    

   

    private 

    def authorize_request
          token = request.headers["Authorization"]&.split(" ")&.last
        #  Jab frontend ya Postman protected API call karega, wo header bhejega:
        # Space ke basis par tod dega: --> (split)
        # Last element de dega: ---> .last
        # safe navigation operator --> &.
        payload = JsonWebToken.decode(token)
        # Yani payload variable ke andar ab token ka data aa gaya.    
        @current_user = User.find(payload["user_id"])
        # @current_user instance variable hai.

        rescue JWT::DecodeError, ActiveRecord::RecordNotFound
  render json: { error: "Unauthorized" }, status: :unauthorized
    
    end
end

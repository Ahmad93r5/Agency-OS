class ApplicationController < ActionController::API
    before_action :authorize_request
            
    private 

    def authorize_request
          token = request.headers["Authorization"]&.split(" ")&.last
        #  Jab frontend ya Postman protected API call karega, wo header bhejega
       
        payload = JsonWebToken.decode(token)
        # Yani payload variable ke andar ab token ka data aa gaya.    
        @current_user = User.find(payload["user_id"])
        # @current_user instance variable hai.

        rescue JWT::DecodeError, ActiveRecord::RecordNotFound
  render json: { error: "Unauthorized" }, status: :unauthorized
    
    end
end

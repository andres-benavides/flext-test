module Api
  module V1
    class UsersController < ApplicationController
      before_action :authenticate_user!, only: [:logout]

      def login
        user = User.find_by(email: params[:email])
        if user&.valid_password?(params[:password])
          token = Users::Login.call(user);
          render json: { token: token }, status: :ok
        else
          render json: { error: 'Invalid email or password' }, status: :unauthorized
        end
      end

      def logout
        current_user.jwt_revoke
        head :no_content
      end
    end
  end
end
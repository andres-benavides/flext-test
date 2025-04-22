module Api
  module V1
    class UsersController < ApplicationController

      include AuthenticateRequest

      def index
        users = Users::FetchAll.call
        render json: users
      end

      def create
        company = Users::Create.call(company_params)
    
        if company.persisted?
          render json: company, status: :created
        else
          render json: { errors: company.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        company = User.find(params[:id])
        updated_company = Users::Update.call(company, company_params)

        if updated_company.persisted?
          render json: updated_company, status: :ok
        else
          render json: { errors: updated_company.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def show
        company = Users::Show.call(params[:id])
        if company
          render json: company, status: :ok
        else
          render json: { error: 'Usuario no encontrado' }, status: :not_found
        end
      end

      def destroy
        User.find(params[:id]).destroy
      end

      private

      def company_params
        params.require(:user).permit(
          :company_id,
          :email,
          :first_name,
          :last_name,
          :password,
          :phone,
          :position,
          :salary
        )

 
      end
    end
  end
end

module Api
  module V1
    class CompaniesController < ApplicationController
      include AuthenticateRequest
      
      def index
        companies = Companies::FetchAll.call
        render json: companies
      end

      def create
        company = Companies::Create.call(company_params)
    
        if company.persisted?
          render json: company, status: :created
        else
          render json: { errors: company.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        company = Company.find(params[:id])
        updated_company = Companies::Update.call(company, company_params)

        if updated_company.persisted?
          render json: updated_company, status: :ok
        else
          render json: { errors: updated_company.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def show
        company = Companies::Show.call(params[:id])
        if company
          render json: company, status: :ok
        else
          render json: { error: 'Compañía no encontrada' }, status: :not_found
        end
      end

      def destroy
        Company.find(params[:id]).destroy
      end

      private

      def company_params
        params.require(:company).permit(
          :name,
          :sector,
          :city_id,
          :department_id,
          :phone,
          :address,
          :assets,
          :liabilities
        )
      end
    end
  end
end

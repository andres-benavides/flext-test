
module Api
  module V1
    class ProductsController < ApplicationController

      include AuthenticateRequest

      def index
        products = Products::FetchAll.call
        render json: products
      end

      def create
        company = Products::Create.call(company_params)
    
        if company.persisted?
          render json: company, status: :created
        else
          render json: { errors: company.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        company = Product.find(params[:id])
        updated_company = Products::Update.call(company, company_params)

        if updated_company.persisted?
          render json: updated_company, status: :ok
        else
          render json: { errors: updated_company.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def show
        company = Products::Show.call(params[:id])
        if company
          render json: company, status: :ok
        else
          render json: { error: 'Producto no encontrado' }, status: :not_found
        end
      end

      def destroy
        Product.find(params[:id]).destroy
      end

      private

      def company_params
        params.require(:product).permit(
          :name,
          :category,
          :company_id,
          :price
        )
      end
    end
  end
end
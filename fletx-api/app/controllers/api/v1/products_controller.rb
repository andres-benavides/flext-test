class ProductsController < ApplicationController
  include AuthenticateRequest

  def create
    name = params[:name]
    if name.present?
      CreateProductJob.perform_later(name)
      render json: { message: 'Product creation enqueued' }, status: :accepted
    else
      render json: { error: 'Name is required' }, status: :unprocessable_entity
    end
  end

  def index
    p "ANDRESSSSSSSS consultas dsa"
    render json: { products: Product.all }, status: :ok
  end
end

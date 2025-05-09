class Api::V1::CitiesController < ApplicationController
  include AuthenticateRequest
  def index
    department = Department.find(params[:department_id])
    cities = department.cities.order(:name)
    render json: cities
  end
end
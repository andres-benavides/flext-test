class Api::V1::DepartmentsController < ApplicationController
  include AuthenticateRequest
  
  def index
    departments = Department.all.order(:name)
    render json: departments
  end
end
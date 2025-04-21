class Api::V1::DepartmentsController < ApplicationController
  def index
    departments = Department.all.order(:name)
    render json: departments
  end
end
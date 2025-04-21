class Company < ApplicationRecord
  belongs_to :city
  belongs_to :department
  has_many :products
  has_many :users
end

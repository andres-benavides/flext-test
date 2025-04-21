# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# db/seeds.rb

require 'open-uri'
require 'json'

puts "Descargando datos desde datos.gov.co..."

url = 'https://www.datos.gov.co/resource/xdk5-pm3f.json'
json_data = URI.open(url).read
cities_data = JSON.parse(json_data)

puts "Procesando #{cities_data.size} registros..."

cities_data.each do |entry|
  department_name = entry['departamento'].strip
  city_name = entry['municipio'].strip

  department = Department.find_or_create_by!(name: department_name)

  City.find_or_create_by!(name: city_name, department: department)
end

User.create!(
  email: 'admin@example.com',
  password: 'password123',
  password_confirmation: 'password123',
  first_name: 'Admin',
  last_name: 'User',
  position: 'Manager',
  salary: 5000.00,
  phone: '1234567890'
)


puts "Users create"

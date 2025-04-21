class User < ApplicationRecord

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist

  belongs_to :company, optional: true

  def jwt_token
    payload = { user_id: id, email: email }
    JWT.encode(payload, Rails.application.credentials.secret_key_base, 'HS256')
  end
end


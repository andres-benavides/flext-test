module Users
  class Login
    def self.call(user)
      payload = { user_id: user.id, email: user.email, position: user.position }
      AuthService.encode(payload)
    end
  end
end 
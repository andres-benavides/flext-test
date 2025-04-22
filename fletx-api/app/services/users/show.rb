module Users
  class Show
    def self.call(id)
      User.includes(:company).find_by(id: id)
    end
  end
end 
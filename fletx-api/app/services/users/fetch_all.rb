module Users
  class FetchAll
    def self.call
      User.includes(:company).all.as_json(
        include: {
          company: { only: [:id, :name] }
        }
      )
    end
  end
end

module Companies
  class FetchAll
    def self.call
      Company.includes(city: :department).all.as_json(
        include: {
          city: { only: [:id, :name], include: { department: { only: [:id, :name] } } }
        }
      )
    end
  end
end

module Companies
  class Show
    def self.call(id)
      Company.includes(:city, :department).find_by(id: id)
    end
  end
end 
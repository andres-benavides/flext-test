module Products
  class Show
    def self.call(id)
      Product.includes(:company).find_by(id: id)
    end
  end
end 
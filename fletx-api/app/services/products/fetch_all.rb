module Products
  class FetchAll
    def self.call
      Product.includes(:company).all.as_json(
        include: {
          company: { only: [:id, :name] }
        }
      )
    end
  end
end

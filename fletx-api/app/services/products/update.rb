module Products
  class Update
    def self.call(product, params)
      new(product, params).call
    end

    def initialize(product, params)
      @product = product
      @params = params
    end

    def call
      @product.update(@params)
      @product
    end
  end
end
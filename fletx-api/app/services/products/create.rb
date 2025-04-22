module Products
  class Create
    def self.call(params)
      new(params).call
    end

    def initialize(params)
      @params = params
    end

    def call
      Product.create(@params)
    end
  end
end
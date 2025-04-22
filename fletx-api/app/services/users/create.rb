module Users
  class Create
    def self.call(params)
      new(params).call
    end

    def initialize(params)
      @params = params
    end

    def call
      User.create(@params)
    end
  end
end
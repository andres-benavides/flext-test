module Companies
  class Update
    def self.call(company, params)
      new(company, params).call
    end

    def initialize(company, params)
      @company = company
      @params = params
    end

    def call
      @company.update(@params)
      @company
    end
  end
end
module Users
  class Update
    def self.call(user, params)
      new(user, params).call
    end

    def initialize(user, params)
      @user = user
      @params = params
    end

    def call
      @user.update(@params)
      @user
    end
  end
end
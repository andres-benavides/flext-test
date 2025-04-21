class CreateProductJob < ApplicationJob
  queue_as :products

  def perform(name)
    begin
      product = { name: name }
      pc = Product.new(product)
      pc.save!
      Rails.logger.info "Product created: #{pc.id}"
    rescue NameError => e
      Rails.logger.info "ERRORRRRRRRRR: #{e}"
    end
  end
end

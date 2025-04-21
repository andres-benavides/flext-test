class AddCompanyReferencesToUsersAndProducts < ActiveRecord::Migration[8.0]
  def change
    add_reference :users, :company, foreign_key: true
    add_reference :products, :company, foreign_key: true
  end
end

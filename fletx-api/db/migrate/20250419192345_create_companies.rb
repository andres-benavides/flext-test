class CreateCompanies < ActiveRecord::Migration[8.0]
  def change
    create_table :companies do |t|
      t.string :name
      t.string :sector
      t.references :city, null: false, foreign_key: true
      t.references :department, null: false, foreign_key: true
      t.string :phone
      t.string :address
      t.decimal :assets
      t.decimal :liabilities

      t.timestamps
    end
  end
end

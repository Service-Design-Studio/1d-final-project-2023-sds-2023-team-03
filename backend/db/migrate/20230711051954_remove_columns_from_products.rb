class RemoveColumnsFromProducts < ActiveRecord::Migration[7.0]
  def change
    remove_column :products, :date, :date
    remove_column :products, :sales, :integer
  end
end

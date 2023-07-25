class AddSalesToProducts < ActiveRecord::Migration[7.0]
  def change
    add_column :products, :units_sold, :integer
  end
end

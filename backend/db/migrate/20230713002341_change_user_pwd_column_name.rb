class ChangeUserPwdColumnName < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :hashed_password, :string
    add_column :users, :password_digest, :string
  end
end

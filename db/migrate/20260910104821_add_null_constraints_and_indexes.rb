class AddNullConstraintsAndIndexes < ActiveRecord::Migration[8.1]
  def change

     change_column_null :users, :name, false
    change_column_null :users, :email, false
    change_column_null :users, :password_digest, false
    add_index :users, :email, unique: true

    change_column_null :workspaces, :name, false
    add_index :workspaces, [:name, :user_id], unique: true
    
    change_column_null :clients, :name, false
    change_column_null :clients, :email, false

    change_column_null :notes, :content, false
  end
end

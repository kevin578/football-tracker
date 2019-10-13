class ChangeType < ActiveRecord::Migration[5.2]
  def change
    change_column :odds, :line, :float
    add_column :odds, :week, :string
  end
end

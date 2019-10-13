class CreateOdds < ActiveRecord::Migration[5.2]
  def change
    create_table :odds do |t|
      t.string :line
      t.string :favorite
      t.string :game_id

      t.timestamps
    end
  end
end

class CreateBriefingDocuments < ActiveRecord::Migration[8.1]
  def change
    create_table :briefing_documents do |t|
      t.text :content
      t.references :client, null: false, foreign_key: true

      t.timestamps
    end
  end
end

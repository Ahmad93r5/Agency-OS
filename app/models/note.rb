class Note < ApplicationRecord
  belongs_to :client
  validates :content, presence: true

   has_many :notes, dependent: :destroy 

    after_create_commit :broadcast_note

  private

  def broadcast_note
    NotesChannel.broadcast_to(
      "notes_channel",
      {
        id: id,
        content: content,
        client_id: client_id,
        created_at: created_at
      }
    )
  end
end

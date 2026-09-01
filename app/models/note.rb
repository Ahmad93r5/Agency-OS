class Note < ApplicationRecord
  validates :content, presence: true

  belongs_to :client

  after_create_commit :broadcast_note

  private

 def broadcast_note
  ActionCable.server.broadcast(
    "notes_channel_#{client_id}",
    {
      id: id,
      content: content,
      client_id: client_id,
      created_at: created_at
    }
  )
end
end     
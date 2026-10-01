class Note < ApplicationRecord
  validates :content, presence: true

  belongs_to :client
  has_many_attached :files
  after_create_commit :broadcast_note

  private

  def broadcast_note
    ActionCable.server.broadcast(
      "notes_channel_#{client_id}",
      {
        id: id,
        content: content,
        client_id: client_id,
        created_at: created_at,
        files: files.map { |f|
          {
            id: f.id,
            filename: f.filename.to_s,
            size: f.byte_size,
            content_type: f.content_type,
            url: Rails.application.routes.url_helpers.rails_blob_url(
              f,
              host: Rails.application.config.action_controller.default_url_options&.dig(:host) || "localhost:3001"
            )
          }
        }
      }
    )
  end
end
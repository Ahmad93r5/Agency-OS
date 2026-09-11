json.partial! "client", client: @client

json.notes do
  json.array! @client.notes.order(created_at: :desc) do |note|
    json.id note.id
    json.content note.content
    json.created_at note.created_at
    json.file_url note.file.attached? ? rails_blob_url(note.file) : nil
  end
end
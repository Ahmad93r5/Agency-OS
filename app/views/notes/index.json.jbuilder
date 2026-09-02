json.array! @notes do |note|
  json.id note.id
  json.content note.content
  json.created_at note.created_at

  json.client do
    json.id note.client.id
    json.name note.client.name
  end
    json.file_url note.file.attached? ? rails_blob_url(note.file) : nil

end
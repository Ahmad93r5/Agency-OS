json.id note.id
json.content note.content
json.created_at note.created_at
json.updated_at note.updated_at

json.file_url note.file.attached? ? rails_blob_url(note.file) : nil

json.client do
  json.id note.client.id
  json.name note.client.name
  json.email note.client.email
end
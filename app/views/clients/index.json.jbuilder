json.array! @clients do |client|
  json.partial! "client", client: client
  json.notes_count client.notes.count
end
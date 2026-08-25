json.array! @clients do |client|
  json.id client.id
  json.name client.name
  json.email client.email
  json.phone client.phone
end

json.id client.id
json.name client.name
json.email client.email
json.phone client.phone if client.phone.present?
json.created_at client.created_at
json.updated_at client.updated_at

json.workspace do
  json.id client.workspace.id
  json.name client.workspace.name
end
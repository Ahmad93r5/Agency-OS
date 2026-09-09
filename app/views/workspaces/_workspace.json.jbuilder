
json.id workspace.id
json.name workspace.name
json.created_at workspace.created_at

json.user do
  json.id workspace.user.id
  json.name workspace.user.name
  json.email workspace.user.email
end
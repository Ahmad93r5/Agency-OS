json.partial! "workspace", workspace: @workspace
json.clients do
  json.array! @workspace.clients do |client|
    json.id client.id
    json.name client.name
    json.email client.email
    json.phone client.phone if client.phone.present?
    

    json.notes do
      json.array! client.notes.order(created_at: :desc) do |note|
        json.id note.id
        json.content note.content
        json.created_at note.created_at
      end
    end
  end
end
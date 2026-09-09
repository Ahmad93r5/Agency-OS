
json.array! @workspaces do |workspace|
  json.partial! "workspace", workspace: workspace
  
  #for list view
  json.clients_count workspace.clients.count
  json.notes_count workspace.clients.sum { |c| c.notes.count }
end
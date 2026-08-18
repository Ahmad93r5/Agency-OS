json.array! @clients do |client|
json.message "Client created successfully"
 json.id @client.id
 json.name @client.name
 json.email @client.email
 json.phone @client.phone
end
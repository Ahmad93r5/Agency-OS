require 'rails_helper'

RSpec.describe "Briefings API", type: :request do
  let(:user) { User.create(name: "Test", email: "test@email.com", password: "password123") }
  let(:workspace) { Workspace.create(name: "Test Workspace", user: user) }
  let(:client) { Client.create(name: "Ahmed", email: "ahmed@email.com", phone: "123", workspace: workspace) }
  let(:token) { JsonWebToken.encode(user_id: user.id) }
  let(:headers) { { "Authorization" => "Bearer #{token}" } }

  it "returns briefings for the client" do
    client.briefing_documents.create(content: "Test briefing")
    
    get "/workspaces/#{workspace.id}/clients/#{client.id}/briefings", headers: headers
    
    expect(response).to have_http_status(:ok)
  end
end
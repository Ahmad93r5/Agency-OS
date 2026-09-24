Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "http://localhost:3000", 
            "https://agency-os-2ial.onrender.com",
            "https://agency-eq7j9y8tv-works3.vercel.app",
            /https:\/\/.*\.vercel\.app/   # Saare Vercel subdomains allow

    resource "*",
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      expose: [:Authorization]
  end
end
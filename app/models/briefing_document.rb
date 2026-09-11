class BriefingDocument < ApplicationRecord
  belongs_to :client
  validates :content, presence: true
  default_scope { order(created_at: :desc) }
  
end
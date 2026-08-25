class Note < ApplicationRecord
  belongs_to :client
  validates :content, presence: true

   has_many :notes, dependent: :destroy 
end

class Client < ApplicationRecord
  belongs_to :workspace

  has_many :notes, dependent: :destroy
  has_many :briefing_documents, dependent: :destroy

  validates :name, :email, presence: true
  # validates :phone, presence: true
end

class Client < ApplicationRecord
  belongs_to :workspace

  has_many :notes, dependent: :destroy
  validates :name, presence: true
  validates :email, presence: true
  validates :phone, presence: true
end

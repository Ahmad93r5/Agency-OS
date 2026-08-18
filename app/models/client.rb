class Client < ApplicationRecord
  belongs_to :workspace

  validates :name, presence: true
  validates :email, presence: true
  validates  :phone, presence: true
end

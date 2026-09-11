class Workspace < ApplicationRecord
  belongs_to :user
  has_many :clients

  validates :name, presence: true, uniqueness: { scope: :user_id }
end

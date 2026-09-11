class NotesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "notes_channel_#{params[:client_id]}" 
  end

  def unsubscribed
    stop_all_streams
  end
end

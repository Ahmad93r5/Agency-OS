"use client";

export default function NotesUI({
  notes,
  loading,
  error,
  setError,
  content,
  setContent,
  isAdding,
  handleAddNote,
  handleDeleteNote,
  handleUpdateNote,
  editNoteId,
  setEditNoteId,
  editContent,
  setEditContent,
  handleFileChange,
  file,
  briefing,
  isLoadingBriefing,   
  briefingError,
  setBriefingError,
  handleGenerateBriefing,
  setBriefing
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Notes</h1>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4 flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="text-red-700 hover:text-red-900">
              
            </button>
          </div>
        )}

        {/* Add Note Form */}
        <form onSubmit={handleAddNote} className="bg-white p-4 rounded-lg border mb-6">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a note..."
            rows={3}
            className="w-full border border-gray-300 text-black rounded-md px-3 py-2 outline-none focus:border-blue-500"
            required
          />

          {/* File Input */}
          <input
            type="file"
            onChange={handleFileChange}
            className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />

          <button
            type="submit"
            disabled={isAdding}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isAdding ? "Adding..." : "Add Note"}
          </button>
        </form>

        {loading && <p className="text-gray-500">Loading notes...</p>}

        {!loading && notes.length === 0 && (
          <div className="bg-white rounded-lg border p-8 text-center">
            <p className="text-gray-500">No notes yet. Add your first note!</p>
          </div>
        )}

        {/*  AI Briefing Section */}
        <div className="bg-white p-4 rounded-lg border mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">🤖 AI Briefing</h3>
            <button
              onClick={handleGenerateBriefing}
              disabled={isLoadingBriefing}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition disabled:opacity-50"
            >
              {isLoadingBriefing ? "Generating..." : "Generate AI Briefing"}
            </button>
          </div>

          {/* Briefing Error */}
          {briefingError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-center justify-between">
              <span>{briefingError}</span>
              <button
                onClick={() => setBriefingError(null)}
                className="text-red-700 hover:text-red-900"
              >
                
              </button>
            </div>
          )}

          {/* Briefing Loading — Skeleton */}
          {isLoadingBriefing && (
            <div className="animate-pulse space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          )}

          
            {briefing && (
              <div className="bg-gray-50 text-gray-800 p-4 rounded-md border relative">
                {/*  Close Button */}
                <button
                  onClick={() => setBriefing(null)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-600 transition"
                  title="Close briefing"
                >
                  Close
                </button>
                <div className="whitespace-pre-wrap pr-6">
                  {briefing}
                </div>
              </div>
            )}
        </div>

        {/*  Notes List */}
        {!loading &&
          notes.map((note) => (
            <div
              key={note.id}
              className="bg-white p-4 mb-3 rounded-lg border flex items-start justify-between hover:shadow-sm transition"
            >
              <div className="flex-1">
                {editNoteId === note.id ? (
                  // Edit Mode
                  <div>
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full border border-gray-300 text-black rounded-md px-3 py-2 outline-none focus:border-blue-500"
                      rows={2}
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => handleUpdateNote(note.id, editContent)}
                        className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition text-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditNoteId(null);
                          setEditContent("");
                        }}
                        className="bg-gray-400 text-white px-3 py-1 rounded-md hover:bg-gray-500 transition text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div>
                    <p className="text-gray-800">{note.content}</p>

                    {/* Show File if attached */}
                    {note.file_url && (
                      <div className="mt-2">
                        <a
                          href={note.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm flex items-center gap-1"
                        >
                           View Attachment
                        </a>
                      </div>
                    )}

                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(note.created_at).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              {editNoteId !== note.id && (
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => {
                      setEditNoteId(note.id);
                      setEditContent(note.content);
                    }}
                    className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition text-sm"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
      </main>
    </div>
  );
}
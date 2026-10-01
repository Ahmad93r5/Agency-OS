"use client";

import {
  ArrowLeft,
  X,
  Paperclip,
  Bot,
  History,
  FileText,
  Pencil,
  Trash2,
  Save,
  Loader2,
  Sparkles,
  AlertCircle,
} from "lucide-react";

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
  handleFilesChange,     // ✅ Multiple
  files,                 // ✅ Array
  handleRemoveFile,      // ✅ Remove specific
  fileInputRef,
  briefing,
  isLoadingBriefing,
  briefingError,
  setBriefingError,
  handleGenerateBriefing,
  setBriefing,
  briefingHistory,
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="flex-1 p-4 md:p-8">
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="mb-4 inline-flex items-center gap-1.5 bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-100 hover:text-gray-900 transition text-sm shadow-sm active:scale-95"
        >
          <ArrowLeft size={14} />
          Back
        </button>

        <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
          Notes
        </h1>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4 flex items-center justify-between gap-2">
            <span className="text-sm md:text-base flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" />
              {error}
            </span>
            <button
              onClick={() => setError(null)}
              className="text-red-700 hover:text-red-900 shrink-0"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Add Note Form */}
        <form
          onSubmit={handleAddNote}
          className="bg-white p-4 rounded-lg border border-gray-200 mb-6"
        >
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write a note..."
            rows={3}
            className="w-full border border-gray-300 text-black rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
            required
          />

          {/* ✅ File Input — multiple */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFilesChange}
            className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
          />

          {/* ✅ Multiple Files Preview */}
          {files.length > 0 && (
            <div className="mt-2 space-y-1.5">
              {files.map((f, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-md px-3 py-2"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <Paperclip size={14} className="text-gray-500 shrink-0" />
                    <span className="text-sm text-gray-700 truncate">
                      {f.name}
                    </span>
                    <span className="text-xs text-gray-400 shrink-0">
                      ({(f.size / 1024).toFixed(1)} KB)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(index)}
                    className="text-gray-400 hover:text-red-600 transition shrink-0 ml-2"
                    title="Remove file"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              <p className="text-xs text-gray-500">
                {files.length} file{files.length > 1 ? "s" : ""} selected
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={isAdding}
            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50 text-sm md:text-base w-full sm:w-auto flex items-center justify-center gap-2 active:scale-95"
          >
            {isAdding ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Adding...
              </>
            ) : (
              "Add Note"
            )}
          </button>
        </form>

        {loading && (
          <p className="text-gray-500 flex items-center gap-2">
            <Loader2 size={16} className="animate-spin" />
            Loading notes...
          </p>
        )}

        {!loading && notes.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
              <FileText size={24} className="text-gray-400" />
            </div>
            <p className="text-gray-500">
              No notes yet. Add your first note!
            </p>
          </div>
        )}

        {/* AI Briefing Section */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <Bot size={18} className="text-purple-600" />
              AI Briefing
            </h3>
            <button
              onClick={handleGenerateBriefing}
              disabled={isLoadingBriefing}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition disabled:opacity-50 text-sm md:text-base w-full sm:w-auto flex items-center justify-center gap-2 active:scale-95"
            >
              {isLoadingBriefing ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  Generate AI Briefing
                </>
              )}
            </button>
          </div>

          {/* Briefing Error */}
          {briefingError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-center justify-between gap-2">
              <span className="text-sm md:text-base flex items-center gap-2">
                <AlertCircle size={16} className="shrink-0" />
                {briefingError}
              </span>
              <button
                onClick={() => setBriefingError(null)}
                className="text-red-700 hover:text-red-900 shrink-0"
              >
                <X size={16} />
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
            <div className="bg-gray-50 text-gray-800 p-4 rounded-md border border-gray-200 relative">
              <button
                onClick={() => setBriefing(null)}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-600 transition p-1 hover:bg-gray-200 rounded-md"
                title="Close briefing"
              >
                <X size={14} />
              </button>
              <div className="whitespace-pre-wrap pr-8 text-sm md:text-base">
                {briefing}
              </div>
            </div>
          )}
        </div>

        {/* Briefing History */}
        {briefingHistory && briefingHistory.length > 0 && (
          <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <History size={18} className="text-gray-600" />
              Briefing History
            </h3>
            {briefingHistory.map((item) => (
              <div
                key={item.id}
                className="bg-gray-50 p-3 rounded-md border border-gray-200 mb-2"
              >
                <p className="text-xs md:text-sm text-gray-500 mb-1">
                  {new Date(item.created_at).toLocaleString()}
                </p>
                <p className="text-gray-800 whitespace-pre-wrap text-xs md:text-sm">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Notes List */}
        {!loading &&
          notes.map((note) => (
            <div
              key={note.id}
              className="bg-white p-4 mb-3 rounded-lg border border-gray-200 flex flex-col md:flex-row md:items-start md:justify-between gap-3 hover:shadow-sm transition"
            >
              <div className="flex-1 min-w-0">
                {editNoteId === note.id ? (
                  <div>
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full border border-gray-300 text-black rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                      rows={2}
                    />
                    <div className="flex flex-wrap gap-2 mt-2">
                      <button
                        onClick={() =>
                          handleUpdateNote(note.id, editContent)
                        }
                        className="bg-green-600 text-white px-3 py-1.5 rounded-md hover:bg-green-700 transition text-sm flex items-center gap-1.5 active:scale-95"
                      >
                        <Save size={14} />
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditNoteId(null);
                          setEditContent("");
                        }}
                        className="bg-gray-400 text-white px-3 py-1.5 rounded-md hover:bg-gray-500 transition text-sm flex items-center gap-1.5 active:scale-95"
                      >
                        <X size={14} />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-800 wrap-break-word text-sm md:text-base">
                      {note.content}
                    </p>

                    {/* ✅ Multiple Files Display */}
                    {note.files && note.files.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {note.files.map((file) => (
                          <a
                            key={file.id}
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-sm flex items-center gap-1.5"
                          >
                            <Paperclip size={14} />
                            {file.filename}
                            <span className="text-xs text-gray-400">
                              ({(file.size / 1024).toFixed(1)} KB)
                            </span>
                          </a>
                        ))}
                      </div>
                    )}

                    <p className="text-xs md:text-sm text-gray-500 mt-1">
                      {new Date(note.created_at).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>

              {editNoteId !== note.id && (
                <div className="flex flex-wrap gap-2 md:ml-4 md:shrink-0">
                  <button
                    onClick={() => {
                      setEditNoteId(note.id);
                      setEditContent(note.content);
                    }}
                    className="bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition text-sm flex items-center gap-1.5 active:scale-95"
                  >
                    <Pencil size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="bg-red-600 text-white px-3 py-1.5 rounded-md hover:bg-red-700 transition text-sm flex items-center gap-1.5 active:scale-95"
                  >
                    <Trash2 size={14} />
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
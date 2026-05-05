import { useState } from "react";
import { UploadCloud, Image as ImageIcon, Loader2 } from "lucide-react";
import { uploadImage } from "../api/galleryApi";

export default function UploadForm({ onUploaded }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [category, setCategory] = useState("Acting");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const fd = new FormData();
    fd.append("image", file);
    fd.append("category", category);

    try {
      setLoading(true);
      await uploadImage(fd);
      setFile(null);
      setPreview(null);
      onUploaded?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white border rounded-xl shadow-sm p-5 sm:p-6 mb-6 max-w-3xl mx-auto"
    >
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <UploadCloud size={20} />
        Upload Image
      </h3>

      {/* Responsive Layout */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* File Upload */}
        <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 cursor-pointer hover:bg-gray-50 transition">
          <UploadCloud className="mb-2 text-gray-500" />
          <span className="text-sm text-gray-600 text-center">
            Click to upload or drag & drop
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={onChange}
            className="hidden"
            required
          />
        </label>

        {/* Preview */}
        <div className="flex items-center justify-center">
          {preview ? (
            <img
              src={preview}
              alt="preview"
              className="w-full max-h-48 object-cover rounded-lg border"
            />
          ) : (
            <div className="flex flex-col items-center text-gray-400">
              <ImageIcon size={40} />
              <span className="text-sm mt-2">Preview</span>
            </div>
          )}
        </div>
      </div>

      {/* Category */}
      <div className="mt-5">
        <label className="text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Acting</option>
          <option>Modeling</option>
          <option>Eventing</option>
        </select>
      </div>

      {/* Submit */}
      <button
        disabled={loading}
        className="mt-5 w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-black text-white rounded-lg hover:bg-gray-900 transition disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            Uploading...
          </>
        ) : (
          "Upload"
        )}
      </button>
    </form>
  );
}
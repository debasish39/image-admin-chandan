import { useState, useEffect } from "react";
import { UploadCloud, Image as ImageIcon, Loader2 } from "lucide-react";
import { uploadImage } from "../api/galleryApi";

export default function UploadForm({ onUploaded }) {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [category, setCategory] = useState("Acting");
  const [loading, setLoading] = useState(false);

  // ✅ Generate previews safely
  useEffect(() => {
    if (!files.length) {
      setPreviews([]);
      return;
    }

    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviews(urls);

    // cleanup (VERY IMPORTANT)
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [files]);

  const onChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (!selectedFiles.length) return;
    setFiles(selectedFiles);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!files.length) return;

    const fd = new FormData();

    files.forEach((file) => {
      fd.append("images", file); // MUST match backend
    });

    fd.append("category", category);

    try {
      setLoading(true);
      await uploadImage(fd);

      setFiles([]);
      setPreviews([]);

      // reset input (important)
      e.target.reset();

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
        Upload Images
      </h3>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Upload */}
        <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 cursor-pointer hover:bg-gray-50 transition">
          <UploadCloud className="mb-2 text-gray-500" />
          <span className="text-sm text-gray-600 text-center">
            Click to upload multiple images
          </span>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={onChange}
            className="hidden"
          />
        </label>

        {/* Preview Grid */}
        <div className="flex flex-wrap gap-2">
          {previews.length ? (
            previews.map((src, i) => (
              <img
                key={i}
                src={src}
                className="w-20 h-20 object-cover rounded border"
              />
            ))
          ) : (
            <div className="flex flex-col items-center text-gray-400 justify-center w-full">
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
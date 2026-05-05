import { useEffect, useState } from "react";
import { fetchImages, deleteImage } from "../api/galleryApi";
import UploadForm from "../components/UploadForm";
import ImageGrid from "../components/ImageGrid";
import { LayoutDashboard, Loader2 } from "lucide-react";

export default function Admin() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchImages();
      setImages(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onDelete = async (id) => {
    await deleteImage(id);
    setImages((prev) => prev.filter((i) => i._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <LayoutDashboard className="text-gray-700" />
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Admin Panel
          </h1>
        </div>

        {/* Upload Section */}
        <div className="mb-8">
          <UploadForm onUploaded={load} />
        </div>

        {/* Gallery Section */}
        <div className="bg-white border rounded-xl p-4 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Uploaded Images</h2>
            <span className="text-sm text-gray-500">
              {images.length} items
            </span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-10 text-gray-500">
              <Loader2 className="animate-spin mr-2" size={18} />
              Loading images...
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              No images uploaded yet
            </div>
          ) : (
            <ImageGrid images={images} onDelete={onDelete} />
          )}
        </div>
      </div>
    </div>
  );
}
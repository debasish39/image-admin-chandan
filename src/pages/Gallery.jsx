import { useEffect, useMemo, useState } from "react";
import { fetchImages } from "../api/galleryApi";
import ImageGrid from "../components/ImageGrid";
import { Images, Loader2 } from "lucide-react";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchImages();
        setImages(data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    if (filter === "All") return images;
    return images.filter((i) => i.category === filter);
  }, [images, filter]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Images className="text-gray-700" />
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Gallery
          </h1>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {["All", "Acting", "Modeling", "Eventing"].map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                ${
                  active
                    ? "bg-black text-white shadow"
                    : "bg-white border text-gray-600 hover:bg-gray-100"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="bg-white border rounded-xl p-4 sm:p-5 shadow-sm">
          {loading ? (
            <div className="flex items-center justify-center py-12 text-gray-500">
              <Loader2 className="animate-spin mr-2" size={18} />
              Loading images...
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              No images found in this category
            </div>
          ) : (
            <ImageGrid images={filtered} />
          )}
        </div>
      </div>
    </div>
  );
}
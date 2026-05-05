import { Trash2, Image as ImageIcon } from "lucide-react";

export default function ImageGrid({ images, onDelete }) {
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this image?"
    );
    if (confirmed && onDelete) {
      onDelete(id);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {images.map((img) => (
        <div
          key={img._id}
          className="relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition border"
        >
          {/* Image */}
          <div className="relative">
            <img
              src={img.imageUrl}
              alt={img.category}
              className="w-full h-44 object-cover"
              loading="lazy"
            />

            {/* Delete Button (Top Right) */}
            {onDelete && (
              <button
                onClick={() => handleDelete(img._id)}
                className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-lg shadow hover:bg-red-500 hover:text-white transition"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-3 py-2">
            <div className="flex items-center gap-1 text-gray-600 text-sm">
              <ImageIcon size={16} />
              <span className="truncate">{img.category}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
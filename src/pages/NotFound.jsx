import { Link } from "react-router-dom";
import { AlertTriangle, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        
        {/* Icon */}
        <div className="flex justify-center mb-4 text-gray-400">
          <AlertTriangle size={48} />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          404
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Page not found
        </p>

        {/* Description */}
        <p className="text-sm text-gray-500 mb-6">
          The page you're looking for doesn’t exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-900 transition"
          >
            <Home size={16} />
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-gray-100 transition"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>

        </div>
      </div>
    </div>
  );
}
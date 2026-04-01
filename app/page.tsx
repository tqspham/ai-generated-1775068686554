"use client";

import { useState, useEffect } from "react";

type ImageData = {
  url: string;
  alt: string;
};

export default function Page() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("https://loremflickr.com/json/320/240/nature,dog/all");
        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }
        const data = await response.json();
        setImages([{ url: data.file, alt: "Nature and Dog" }]);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (images.length === 0) {
    return <div className="text-center py-10">No images available</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="grid grid-cols-1 gap-4">
        {images.map((image, index) => (
          <img key={index} src={image.url} alt={image.alt} className="w-full h-auto" />
        ))}
      </div>
    </div>
  );
}
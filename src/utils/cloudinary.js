export const CLOUDINARY_CLOUD_NAME =
  import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "";
export const CLOUDINARY_UPLOAD_PRESET =
  import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "";

export async function fetchGalleryImages() {
  const allResources = [];
  let cursor = undefined;

  do {
    const body = { expression: "folder=sunflower", max_results: 500 };
    if (cursor) body.cursor = cursor;

    const response = await fetch(
      `/api/cloudinary/v1_1/${CLOUDINARY_CLOUD_NAME}/resources/search`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error?.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    if (data.resources) allResources.push(...data.resources);
    cursor = data.next_cursor;
  } while (cursor);

  return allResources;
}

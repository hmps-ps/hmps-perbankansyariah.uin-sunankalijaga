// ============================================
// FILE: src/lib/cloudinary.ts
// DESKRIPSI: Cloudinary Upload Utility
// ============================================

interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
  bytes: number;
}

/**
 * Upload file ke Cloudinary
 * @param file File object
 * @param folder Folder di Cloudinary (opsional)
 * @returns Promise dengan secure_url
 */
export const uploadToCloudinary = async (
  file: File,
  folder: string = "hmps-bank-portal"
): Promise<string> => {
  // Log env variables untuk debug
  console.log("🔍 Cloudinary Config Check:");
  console.log("  Cloud Name:", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
  console.log("  Upload Preset:", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
  console.log("  File:", file.name, `(${(file.size / 1024).toFixed(2)}KB)`);

  // Validasi env variables
  if (!import.meta.env.VITE_CLOUDINARY_CLOUD_NAME) {
    const errorMsg = "❌ VITE_CLOUDINARY_CLOUD_NAME tidak terkonfigurasi di .env.local";
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  if (!import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET) {
    const errorMsg = "❌ VITE_CLOUDINARY_UPLOAD_PRESET tidak terkonfigurasi di .env.local";
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
  formData.append("folder", folder);

  const uploadUrl = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`;
  console.log("📤 Upload URL:", uploadUrl);

  try {
    console.log("⏳ Mengirim request ke Cloudinary...");
    const response = await fetch(uploadUrl, {
      method: "POST",
      body: formData,
    });

    console.log("📊 Response Status:", response.status, response.statusText);

    if (!response.ok) {
      const errorData = await response.text();
      console.error("❌ Cloudinary Error Response:", errorData);
      
      let errorMsg = `Upload gagal (${response.status})`;
      try {
        const jsonError = JSON.parse(errorData);
        errorMsg = jsonError.error?.message || errorData;
      } catch {
        errorMsg = errorData || "Upload gagal";
      }
      
      throw new Error(errorMsg);
    }

    const data: CloudinaryUploadResponse = await response.json();
    console.log("✅ Upload Berhasil!");
    console.log("  URL:", data.secure_url);
    console.log("  Public ID:", data.public_id);
    console.log("  Size:", `${data.width}x${data.height}px`);
    
    return data.secure_url;
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Unknown error";
    console.error("💥 Cloudinary Upload Error:", errorMsg);
    throw error;
  }
};

/**
 * Delete file dari Cloudinary
 * @param publicId Public ID dari file
 */
export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  // Note: Deletion requires API secret, tidak bisa dari frontend
  // Implementasi di backend jika diperlukan
  console.warn("Deletion harus dilakukan dari backend dengan API secret");
};

/**
 * Validasi file sebelum upload
 * @param file File object
 * @returns Error message atau empty string jika valid
 */
export const validateImageFile = (file: File): string => {
  const maxSizeInMB = 5;
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

  if (!allowedTypes.includes(file.type)) {
    return `File harus JPG, PNG, WebP, atau GIF. Anda: ${file.type}`;
  }

  if (file.size > maxSizeInBytes) {
    return `File terlalu besar. Max ${maxSizeInMB}MB, Anda: ${(file.size / 1024 / 1024).toFixed(2)}MB`;
  }

  return "";
};

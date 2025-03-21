const uploadImageToCloud = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "chienpreset");

  let data = null;

  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dwkvrufbf/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    data = await response.json();
    console.log("Upload thành công:", data.secure_url);
  } catch (error) {
    console.error("Lỗi upload:", error);
  }

  return data;
};

export { uploadImageToCloud };

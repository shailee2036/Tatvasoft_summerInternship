import axios from "axios";

export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("upload_preset", "ml_default");
  formData.append("cloud_name", "book-e-sell");
  formData.append("file", file);
  console.log("fileDataform", formData);

  const response = await axios.post(
    "https://api.cloudinary.com/v1_1/book-e-sell/image/upload",
    formData
  );

  return (response as any).url;
}

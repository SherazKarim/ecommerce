import axios from 'axios'

export const upload = async (file) => {
    const data = new FormData()
    // console.log("uplod", data)
    data.append("file", file)
    data.append("upload_preset", "fiverrr")

    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/dqnnylmj0/image/upload`,
            data,
            {
                headers: {
                    'Content-Type': "multipart/form-data"
                }
            }
        );
        const { secure_url } = response.data;
        return secure_url
    } catch (err) {
        console.log("Error uploading image ", err)
        throw err
    }
}
export default upload

import axios from 'axios'

const uploadImage = async (img) => {

    let imgUrl = null 

    await axios.get(import.meta.env.VITE_SERVER_DOMAIN+"/get-upload-url")
    .then(async ({ data: { uploadURL } }) => {

        // console.log(uploadURL)

        await axios({
            method: 'PUT',
            url: uploadURL,
            headers: { 'Content-Type': 'image/jpeg' },
            data: img,
            
        })
        .then(() => {
            imgUrl = uploadURL.split('?')[0]
        })
        .catch(err => {
            // console.log(err)
            throw Error(err)
        })

    })
    .catch(err => {
        console.log(err)
        // throw Error(err)
    })

    // console.log(imgUrl)
    return imgUrl 
}

export default uploadImage
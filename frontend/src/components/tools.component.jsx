import Embed from '@editorjs/embed'
import List from '@editorjs/list'
import Image from '@editorjs/image'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import InlineCode from '@editorjs/inline-code'

//Uncommenting will make the react app total blank
import uploadImage from '../common/aws'

const uploadImageByURL = async (e) => {
    let link = new Promise((resolve, reject) => {
        try {
            resolve(e)
        }
        catch(err) {
            reject(err)
        }
    })

    return link.then(url => {
        return {
           success: 1,
           file: { url } 
        }
    })
}

const uploadImageByFile = (e) => {
    return uploadImage(e).then(url => {
        if(url) {
            return {
                success: 1,
                file: { url }
            }
        }
    }).catch((err) => {
        console.log(err)
        return null 
    })
}

const tools = {
    embed: Embed,
    // list: List,
    list: {
        class: List,
        inlineToolbar: true
    },
    image: {
        class: Image,
        config: {
            uploader: {
                uploadByUrl: uploadImageByURL,
                uploadByFile: uploadImageByFile,
            }
        }
    },
    // image: Image,
    header: {
        class: Header,
        config: {
            placeholder: 'Type Heading...',
            levels: [2, 3],
            defaultLevel: 2
        }
    },
    // header: Header,
    quote: {
        class: Quote,
        inlineToolbar: true
    },
    marker: Marker,
    inlineCode: InlineCode
}

export default tools
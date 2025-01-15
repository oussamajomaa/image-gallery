import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"


export default function Photo() {
    const { id } = useParams()
    const [image, setImage] = useState({})
    const [photos, setPhotos] = useState([]);

    async function fetchOnePhoto() {
        const response = await fetch('https://osmjom.fr/photos.json')
        if (response.ok) {
            const data = await response.json()
            if (data.length > 0) {
                console.log('hi');
                console.log(data);
                
                const filtredImage = data.filter(photo => photo.id == id)[0]
                console.log(filtredImage);
                setImage(filtredImage)
                
            }

        }
    }

    useEffect(() => {
        fetchOnePhoto()
    }, [])


    return (
        <div className="w-2/3 m-auto p-5  flex flex-col items-center">
            <Link to={"/"} className="btn btn-primary text-right">Back</Link>
            <div className="w-2/3">
                <h2 className="text-3xl font-bold my-2">{image.title}</h2>
                <img src={image.url} alt="" className="w-full rounded-xl" />
                <h2 className="text-xl my-2">{image.description}</h2>
            </div>
            <div className="flex w-2/3 justify-between">
                <p className="badge badge-neutral p-3 text-xl">{image.dateAdded}</p>
                <p className="badge badge-neutral p-3 text-xl">{image.category}</p>
            </div>
        </div>
    )
}

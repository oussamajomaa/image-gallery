import { useEffect, useState } from 'react';
import PhotoGallery from '../components/PhotoGallery';
import PhotoModal from '../components/PhotoModal';
export default function Home() {

    const [photos, setPhotos] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortOrder, setSortOrder] = useState('');
    const [isLoaded, setIsLoaded] = useState(false); // Initialisation d'un booléen
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    async function fetchPhoto() {
        setIsLoaded(true)
        const response = await fetch('https://osmjom.fr/photos.json')
        if (response.ok) {
            const data = await response.json()
            setPhotos(data)
        }
        setIsLoaded(false)
    }

    useEffect(() => {
        fetchPhoto()
    }, [])

    const filteredPhotos = photos
        .filter(photo =>
            photo.title.toLowerCase().includes(search.toLowerCase())
        )
        .filter(photo =>
            selectedCategory === 'All' ? true : photo.category === selectedCategory
        )
        .sort((a, b) =>
            sortOrder === 'dateAdded'
                ? new Date(b.dateAdded) + new Date(a.dateAdded)
                : a.title.localeCompare(b.title)
        )
    return (
        <div className="p-5 flex flex-col items-center">
            {isLoaded && <span className="loading loading-spinner text-info"></span>}
            <h1 className='text-4xl text-red-500'>Galerie de Photos</h1>
            <header className="py-5 flex gap-5">
                <input
                    type="text"
                    placeholder="Rechercher une photo..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="input input-bordered input-primary w-full max-w-xs"
                />
                <select
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                    className="select select-primary w-full max-w-xs"
                >
                    <option value="All">Toutes les catégories</option>
                    <option value="Architecture">Architecture</option>
                    <option value="Art">Art</option>
                    <option value="History">History</option>
                    <option value="Nature">Nature</option>
                </select>
                <select
                    value={sortOrder}
                    onChange={e => setSortOrder(e.target.value)}
                    className="select select-primary w-full max-w-xs"
                >
                    <option defaultValue={'selectOrder'} hidden >Select order</option>
                    <option value="dateAdded">Date ajoutée</option>
                    <option value="title">Titre</option>
                </select>
            </header>
            <PhotoGallery
                photos={filteredPhotos}
                onPhotoClick={photo => setSelectedPhoto(photo)}
            />
            <PhotoModal
                photo={selectedPhoto}
                onClose={() => setSelectedPhoto(null)}
            />
        </div>
    )
}

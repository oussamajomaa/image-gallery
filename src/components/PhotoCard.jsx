
function PhotoCard({ photo }) {
    return (
        <div>
            <img src={photo.url} alt={photo.title} className="rounded-xl " />
            <h3>{photo.title}</h3>

            <div className="flex justify-between">
                <h3 className="badge badge-outline">{photo.dateAdded}</h3>
                <h3 className="badge badge-neutral">{photo.category}</h3>
            </div>
        </div>
    );
}

export default PhotoCard;

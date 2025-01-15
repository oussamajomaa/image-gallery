function PhotoModal({ photo, onClose }) {
	if (!photo) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
			<div className="bg-white rounded-lg p-5 w-1/2 h-[calc(100vh-200px)]">
				<button
					className="btn btn-sm btn-neutral absolute top-3 right-3"
					onClick={onClose}
				>
					✖
				</button>
				<img src={photo.url} alt={photo.title} className="rounded-xl w-full" />
				<h2 className="text-2xl mt-4">{photo.title}</h2>
				<p className="text-gray-700 mt-2">{photo.description}</p>
				<div className="flex justify-between mt-4">
					<span className="badge badge-outline">{photo.dateAdded}</span>
					<span className="badge badge-neutral">{photo.category}</span>
				</div>
			</div>
		</div>
	);
}

export default PhotoModal;

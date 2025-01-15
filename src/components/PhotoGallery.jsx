import { Link } from 'react-router-dom';
import PhotoCard from './PhotoCard';

function PhotoGallery({ photos,onPhotoClick }) {
	return (
		<div className='grid grid-cols-4 gap-5 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 '>
			{photos.map(photo => (
				<Link to={`photo/${photo.id}`} key={photo.id} onClick={() => onPhotoClick(photo)}>
					<PhotoCard photo={photo} />
				</Link>
			))}
		</div>
	);
}

export default PhotoGallery;

import { Router } from 'express';
import { getTracks, createTrack, updateTrack, deleteTrack, getOneTrack } from '../controllers';
const router = Router();

router.get('/', getTracks);
router.get('/:trackId', getOneTrack);
router.post('/', createTrack);
router.patch('/:trackId', updateTrack);
router.delete('/:trackId', deleteTrack);

export { router as TrackRouter };

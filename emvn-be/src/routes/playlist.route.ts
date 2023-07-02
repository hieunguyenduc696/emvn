import { Router } from 'express';
import { createPlaylist, addTrackToPlaylist, getPlaylist, getOnePlaylist } from '../controllers';

const router = Router();

router.get('/', getPlaylist);
router.get('/:playlistId', getOnePlaylist);
router.post('/', createPlaylist);
router.patch('/:playlistId', addTrackToPlaylist);

export { router as PlaylistRouter };

import { Router } from 'express';
const router = Router(); // se genera un enrutador

import * as photoCtlrs from '../controllers/photo.controller'
import multer from '../libs/multer';

router.route('/photos')
    .post(multer.single('image'), photoCtlrs.createPhoto)
    .get(photoCtlrs.getPhotos);

router.route('/photos/:id')
    .get(photoCtlrs.getPhoto)
    .delete(photoCtlrs.deletePhoto)
    .put(photoCtlrs.updatePhoto);

export default router;
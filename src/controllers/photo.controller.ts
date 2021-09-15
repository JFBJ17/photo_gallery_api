import { RequestHandler, Response } from 'express'
import { connect } from '../database';
import fs from 'fs-extra';
import path from 'path';

export const getPhotos: RequestHandler = async (req, res): Promise<Response> => {
    const conn = await connect();
    const photos = await conn.query('SELECT * FROM photo');
    return res.json(photos[0]);
}

export const getPhoto: RequestHandler = async (req, res): Promise<Response> => {
    const { id } = req.params;
    const conn = await connect();
    const [photo]: any = await conn.query('SELECT * FROM photo WHERE ID = ?', [id]);
    if (photo.length > 0) return res.json(photo[0]);
    return res.json({ error: 'No existe dato' });
}

export const createPhoto: RequestHandler = async (req, res): Promise<Response> => {
    const conn = await connect();
    const { title, description } = req.body;
    const newPhoto = {
        title,
        description,
        imagePath: req.file?.path
    }

    await conn.query('INSERT INTO photo SET ?', [newPhoto]);
    return res.json({ message: 'Photo successfully saved' });
}

export const deletePhoto: RequestHandler = async (req, res): Promise<Response> => {
    const { id } = req.params;
    let photo;
    const conn = await connect();

    // Busca dato a eliminar
    const [row]: any = await conn.query('SELECT * FROM photo WHERE ID = ?', [id]);
    if (row.length > 0) {
        photo = row[0];
    };

    // Elimina el dato encontrado
    const [delPhoto]: any = await conn.query('DELETE FROM photo WHERE ID = ?', [id]);
    if (delPhoto.affectedRows > 0) {
        await fs.unlink(path.resolve(photo.imagePath));
        return res.json({
            message: 'Photo Deleted',
            delPhoto
        });
    }
    return res.json({ error: 'No existe dato para eliminar' });
}

export const updatePhoto: RequestHandler = async (req, res): Promise<Response> => {
    const { id } = req.params;
    const { title, description } = req.body;
    const conn = await connect();
    const updatedPhoto = await conn.query('UPDATE photo SET ? WHERE ID = ?', [{
        title,
        description
    }, id]);
    return res.json({
        message: 'Successfully Updated',
        updatedPhoto
    });
}
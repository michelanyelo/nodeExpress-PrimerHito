import { parseISO, isValid, format } from "date-fns"
import { AlbumModel } from "../models/album.model.js";

const getAllAlbums = async () => {
    // Obtener todos los álbumes
    return await AlbumModel.findAll();
};

const getAlbumById = async (id) => {
    // Buscar álbum por ID y manejar caso cuando no se encuentre
    const album = await AlbumModel.findById(id);
    if (!album) {
        throw new Error(`Album with id ${id} not found`);
    }
    return album;
};

const createAlbum = async (albumData) => {
    const { title, artist, sales, release_date, genre} = albumData;

    if (!title || !artist) {
        throw new Error("Title and artist are required");
    }

    // Asegurarse de que release_date sea una cadena de texto 
    const dateStr = release_date.toString();

    // Validar y formatear la fecha usando date-fns
    const date = parseISO(dateStr);
    if (!isValid(date)) {
        throw new Error("Invalid date format");
    }

    const formattedDate = format(date, 'yyyy-MM-dd');

    // Crear el álbum en la base de datos
    return await AlbumModel.create(title, artist, sales, formattedDate, genre);
};


const updateAlbum = async (id, albumData) => {
    // Validar que el álbum existe
    const existingAlbum = await AlbumModel.findById(id);
    if (!existingAlbum) {
        throw new Error(`Album with id ${id} not found`);
    }

    const { title, artist, sales, releaseDate, genre } = albumData;

    // Actualizar álbum
    return await AlbumModel.update(id, title, artist, sales, releaseDate, genre);
};

const deleteAlbum = async (id) => {
    // Validar que el álbum existe antes de eliminarlo
    const existingAlbum = await AlbumModel.findById(id);
    if (!existingAlbum) {
        throw new Error(`Album with id ${id} not found`);
    }

    // Eliminar el álbum
    return await AlbumModel.remove(id);
};

export const albumService = {
    getAllAlbums,
    getAlbumById,
    createAlbum,
    updateAlbum,
    deleteAlbum,
};

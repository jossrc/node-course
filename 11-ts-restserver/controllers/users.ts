import { Request, Response } from 'express';
import User from '../models/user';

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.findAll();

  res.json({
    message: 'Usuarios obtenidos correctamente',
    users,
  });
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({
      message: `No existe un usuario con el id ${id}`,
    });
  }

  return res.json({
    message: 'Usuario obtenido correctamente',
    user,
  });
};

export const postUser = (req: Request, res: Response) => {
  const { body } = req;

  res.json({
    message: 'postUser',
    body,
  });
};

export const putUser = (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  res.json({
    message: 'putUser',
    body,
    id,
  });
};

export const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;

  res.json({
    message: 'deleteUser',
    id,
  });
};

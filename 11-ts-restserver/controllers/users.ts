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

export const postUser = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const existsEmail = await User.findOne({
      where: {
        email: body.email,
      },
    });

    if (existsEmail) {
      return res.status(400).json({
        message: `Ya existe un usuario con el email ${body.email}`,
      });
    }

    const user = await User.create(body);

    res.json({
      message: 'Usuario creado correctamente',
      user,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error,
    });
  }
};

export const putUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        message: `No existe un usuario con el id ${id}`,
      });
    }

    await user.update(body);

    res.json({
      message: 'Usuario actualizado correctamente',
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Hable con el administrador',
      error,
    });
  }
};

export const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;

  res.json({
    message: 'deleteUser',
    id,
  });
};

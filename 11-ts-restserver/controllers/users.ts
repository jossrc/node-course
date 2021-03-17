import { Request, Response } from 'express';

export const getUsers = (req: Request, res: Response) => {
  res.json({
    message: 'getUsers',
  });
};

export const getUser = (req: Request, res: Response) => {
  const { id } = req.params;

  res.json({
    message: 'getUser',
    id,
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

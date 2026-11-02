import { Request, Response } from "express";
import { Task } from "../types/task";

let tasks: Task[] = [];
let nextId = 1;

const validStatus = ["todo", "in-progress", "done"];

export const getTasks = (req: Request, res: Response) => {
  res.json(tasks);
};

export const getTaskById = (req: Request, res: Response) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));
  if (!task) {
    return res.status(404).json({ message: "Task tidak ditemukan" });
  }
  res.json(task);
};

export const createTask = (req: Request, res: Response) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title wajib diisi" });
  }

  const task: Task = {
    id: nextId++,
    title,
    description,
    status: "todo",
    createdAt: new Date(),
  };

  tasks.push(task);
  res.status(201).json(task);
};

export const updateTask = (req: Request, res: Response) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));
  if (!task) {
    return res.status(404).json({ message: "Task tidak ditemukan" });
  }

  const { title, description, status } = req.body;

  if (status && !validStatus.includes(status)) {
    return res.status(400).json({
      message: "Status harus: todo, in-progress, atau done",
    });
  }

  if (title) task.title = title;
  if (description !== undefined) task.description = description;
  if (status) task.status = status;

  res.json(task);
};

export const deleteTask = (req: Request, res: Response) => {
  const index = tasks.findIndex((t) => t.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: "Task tidak ditemukan" });
  }

  tasks.splice(index, 1);
  res.json({ message: "Task berhasil dihapus" });
};
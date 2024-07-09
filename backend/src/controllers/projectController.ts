import { Request, Response } from 'express';
import Project, { IProject } from '../models/projectModel';

// プロジェクトの取得
export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find({ members: req.user._id });
    res.json(projects);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// プロジェクトの作成
export const createProject = async (req: Request, res: Response) => {
  const { name, description } = req.body;

  const project = new Project({
    name,
    description,
    owner: req.user._id, // ownerフィールドを設定
    members: [req.user._id],
  });

  try {
    const createdProject = await project.save();
    res.status(201).json(createdProject);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// プロジェクトの編集
export const updateProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (!project.members.includes(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    project.name = name;
    project.description = description;

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// プロジェクトの削除
export const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (!project.members.includes(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await project.remove();
    res.json({ message: 'Project removed' });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error });
  }
};

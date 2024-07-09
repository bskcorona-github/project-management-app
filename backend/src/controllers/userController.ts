import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/userModel';
import generateToken from '../utils/generateToken';

export const registerUser = async (req: Request, res: Response) => {
  const { email, password, username } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const usernameExists = await User.findOne({ username });

    if (usernameExists) {
      res.status(400).json({ message: 'Username already exists' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user: IUser = new User({
      email,
      password: hashedPassword,
      username,
    });

    await user.save();

    res.status(201).json({
      _id: user._id.toString(),
      email: user.email,
      username: user.username,
      token: generateToken(user._id.toString()),
    });
  } catch (error: any) {
    console.error('Error saving user:', error);
    if (error.code === 11000) {
      res.status(400).json({ message: 'Duplicate field value entered', error: error.keyValue });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user: IUser | null = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id.toString(),
        email: user.email,
        username: user.username,
        token: generateToken(user._id.toString()),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error: any) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUserProfile = async (req: Request, res: Response) => {
  const user: IUser | null = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id.toString(),
      email: user.email,
      username: user.username,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

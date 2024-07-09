import jwt from 'jsonwebtoken';

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.SECRET_KEY!, {
    expiresIn: '24d', // 有効期限
  });
};

export default generateToken;

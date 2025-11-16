import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dbConnect from '../../../../lib/mongodb';
import Admin from '../../../../models/admin';
export async function POST(request) {
  await dbConnect();
  const { adminname, password } = await request.json();
  const admin = await Admin.findOne({ adminname});
  if (!admin) {
    return new Response(JSON.stringify({ message: 'Invalid username or password' }), { status: 401 });
  }
  const isPasswordValid = await bcrypt.compare(password, admin.passwordHash);
  if (!isPasswordValid) {
    return new Response(JSON.stringify({ message: 'Invalid username or password' }), { status: 401 });
  }
  const token = jwt.sign(
    { id: admin._id, adminname: admin.adminname },
    process.env.JWT_SECRET,
    { expiresIn: '4h' }
  );

  return new Response(JSON.stringify({ message: "Login Successful" }), {
    status: 200,
    headers: {
      'Set-Cookie': `token=${token}; HttpOnly; Path=/; Max-Age=3600; Secure; SameSite=Strict`,
      "Content-Type": "application/json"
    },
  });
} 
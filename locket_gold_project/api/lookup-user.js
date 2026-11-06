import LocketGoldCTVService from '../utils/LocketGoldService.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { username } = req.query;
    
    if (!username) {
      return res.status(400).json({ success: false, message: 'Thiếu username' });
    }

    try {
      const locketService = new LocketGoldCTVService();
      const result = await locketService.lookupUser(username);
      
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Lỗi server Locket' });
    }
  }
  return res.status(405).json({ message: "Method Not Allowed" });
}

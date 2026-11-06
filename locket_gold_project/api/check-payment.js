// Tuỳ thuộc vào Database bạn dùng, code này sẽ đọc trạng thái
global.paymentStatusDB = global.paymentStatusDB || {};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { username } = req.query;
    
    const record = global.paymentStatusDB[username];
    
    if (record && record.status === 'PAID') {
      return res.status(200).json({ 
        status: 'PAID', 
        download_url: record.download_url 
      });
    }
    
    return res.status(200).json({ status: 'PENDING' });
  }
  return res.status(405).json({ message: "Method Not Allowed" });
}

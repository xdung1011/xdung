import LocketGoldCTVService from '../utils/LocketGoldService.js';

// Dùng bộ nhớ tạm (hoặc Database như Vercel KV, Firebase, MongoDB) để lưu trạng thái thanh toán
// Ở đây mô phỏng bằng global variable (chỉ dùng cho test nhanh, lên production cần DB)
global.paymentStatusDB = global.paymentStatusDB || {};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // 1. Nhận dữ liệu webhook từ ngân hàng (Casso, SePay,...)
    // Tuỳ vào dịch vụ bạn dùng mà định dạng body sẽ khác nhau. Ví dụ dưới đây giả lập:
    const data = req.body; 
    
    // Tìm kiếm nội dung chuyển khoản "LOCKET {username}"
    const description = (data.description || "").toUpperCase();
    const match = description.match(/LOCKET\s+([a-zA-Z0-9_.-]+)/);

    if (match && data.amount >= 50000) {
      const username = match[1];

      try {
        const locketService = new LocketGoldCTVService();
        // Gọi API Locket để kích hoạt trừ 1 credit
        const result = await locketService.activateGold(username);
        
        if (result.success) {
          // Lưu trạng thái thành công + link download để API check-payment lấy
          global.paymentStatusDB[username] = {
            status: 'PAID',
            download_url: result.data.download_url
          };
          return res.status(200).json({ success: true, message: 'Kích hoạt thành công' });
        }
      } catch (error) {
        console.error("Lỗi kích hoạt:", error);
      }
    }
    return res.status(200).json({ success: true, message: 'Đã nhận webhook nhưng không hợp lệ' });
  }
  return res.status(405).json({ message: "Method Not Allowed" });
}

# KẾ HOẠCH THỰC HIỆN BÀI TEST JUNIOR FULL-STACK DEVELOPER
## Chức năng: “Bài tập của tôi” | IELTS MASTER E-LEARNING

---

### 1. Phân tích Yêu cầu
- **Đối tượng:** Học viên giả lập `S01`.
- **Mốc thời gian tham chiếu:** `11/11/2026, 09:00:00 (GMT+7)` (`2026-11-11T09:00:00+07:00`).
- **Yêu cầu bảo mật:** Không nhận `studentId` từ URL (query parameter) hay client body làm xác thực. Session học viên `S01` được xác định tại server-side.
- **Quy tắc trạng thái:**
  - Đã nộp đúng hạn (`submittedAt <= dueDate`): `Đã nộp`
  - Đã nộp trễ hạn (`submittedAt > dueDate`): `Đã nộp` + `Nộp trễ`
  - Chưa nộp & còn hạn (`now <= dueDate`): `Chưa nộp`
  - Chưa nộp & hết hạn (`now > dueDate`): `Quá hạn`
- **Kết quả kỳ vọng cho S01:**
  - A01: `Chưa nộp`
  - A02: `Quá hạn`
  - A03: `Đã nộp`
  - A04: `Đã nộp` + `Nộp trễ`
  - B01: Không được xuất hiện (thuộc `S02`).

---

### 2. Cấu trúc Thư mục & Files

```text
src/
├── app/
│   ├── api/
│   │   └── assignments/
│   │       └── route.ts         # Route Handler trả danh sách bài tập của S01
│   ├── globals.css              # Styling Tailwind CSS
│   ├── layout.tsx               # Root Layout
│   └── page.tsx                 # Trang giao diện "Bài tập của tôi"
├── components/
│   ├── AssignmentBadge.tsx      # Component hiển thị badge trạng thái
│   ├── AssignmentList.tsx       # Component hiển thị danh sách dạng bảng & thẻ mobile
│   └── Header.tsx               # Header thông tin học viên & mốc thời gian giả lập
├── data/
│   └── mock-assignments.ts      # Dữ liệu mẫu chuẩn hóa ISO GMT+7 (A01 - A04, B01)
├── lib/
│   ├── assignment-service.ts    # Logic mock session server-side & filter dữ liệu học viên
│   └── assignment-utils.ts      # Pure function tính toán trạng thái bài tập
├── types/
│   └── assignment.ts            # Interfaces TypeScript
└── __tests__/
    └── assignments.test.ts      # 2 Unit test: Logic trạng thái & Lọc bảo mật S01
```

---

### 3. Các bước thực hiện chi tiết

1. **Bước 1: Setup Models & Mock Data**
   - `src/types/assignment.ts`
   - `src/data/mock-assignments.ts`
2. **Bước 2: Xây dựng Core Logic & Service**
   - `src/lib/assignment-utils.ts` (Hàm tính trạng thái và format thời gian GMT+7)
   - `src/lib/assignment-service.ts` (Lấy session server & truy vấn lọc dữ liệu riêng của học viên)
3. **Bước 3: Xây dựng API Route Handler**
   - `src/app/api/assignments/route.ts`
4. **Bước 4: Xây dựng Giao diện UI Responsive**
   - `src/components/AssignmentBadge.tsx`
   - `src/components/Header.tsx`
   - `src/components/AssignmentList.tsx`
   - `src/app/page.tsx`
5. **Bước 5: Viết Unit Test & Kiểm thử**
   - Cài đặt `vitest`
   - Viết `src/__tests__/assignments.test.ts`
   - Chạy test đảm bảo 100% test cases pass
6. **Bước 6: Viết README.md hoàn chỉnh**
   - Hướng dẫn cài đặt, khởi chạy, chạy kiểm thử
   - Giải trình cơ chế chống lộ dữ liệu S02 theo tiêu chí chấm điểm


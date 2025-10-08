# Keyboard Shortcuts Guide / Hướng dẫn Phím tắt

## Overview / Tổng quan

The IVS Education Platform now includes comprehensive keyboard shortcuts to improve navigation and productivity.

Nền tảng Giáo dục IVS hiện có đầy đủ các phím tắt bàn phím để cải thiện điều hướng và năng suất.

## How to View Shortcuts / Cách xem Phím tắt

Press `?` or `F1` at any time to view the complete shortcuts reference.

Nhấn `?` hoặc `F1` bất cứ lúc nào để xem tài liệu tham khảo phím tắt đầy đủ.

## Keyboard Shortcuts / Phím tắt

### Navigation / Điều hướng

| Shortcut | Action (EN) | Hành động (VI) |
|----------|-------------|----------------|
| `Esc` | Go back / Close modal | Quay lại / Đóng cửa sổ |
| `Enter` | Select / Confirm | Chọn / Xác nhận |
| `↑` | Move up | Di chuyển lên |
| `↓` | Move down | Di chuyển xuống |
| `←` | Move left / Previous | Sang trái / Trước |
| `→` | Move right / Next | Sang phải / Sau |
| `Tab` | Navigate between sections | Điều hướng giữa các phần |

### Search & Actions / Tìm kiếm & Hành động

| Shortcut | Action (EN) | Hành động (VI) |
|----------|-------------|----------------|
| `Ctrl + F` | Search / Find | Tìm kiếm |
| `Ctrl + K` | Open command palette (Sidebar) | Mở bảng lệnh (Sidebar) |
| `Ctrl + S` | Save changes | Lưu thay đổi |

### Quick Navigation / Điều hướng nhanh

| Shortcut | Action (EN) | Hành động (VI) |
|----------|-------------|----------------|
| `H` | Go to Home | Về Trang chủ |
| `C` | Go to Curriculum | Đến Chương trình học |
| `S` | Go to Settings | Đến Cài đặt |
| `A` | Open IVS Assistant | Mở Trợ lý IVS |

### Help / Trợ giúp

| Shortcut | Action (EN) | Hành động (VI) |
|----------|-------------|----------------|
| `?` | Show keyboard shortcuts | Hiển thị phím tắt |
| `F1` | Open User Guide | Mở Hướng dẫn |

## Implementation Details / Chi tiết Triển khai

### Files Modified / Tệp đã Sửa đổi

1. **App.tsx** - Added global keyboard event listener and shortcuts logic
2. **components/KeyboardShortcutsHelp.tsx** - New component for displaying shortcuts reference

### Features / Tính năng

- **Global keyboard shortcuts** - Works from any screen in the app
- **Context-aware** - Doesn't interfere when typing in inputs/textareas
- **Visual indicator** - Bottom-left button shows shortcut hint
- **Help overlay** - Press `?` or `F1` to view full shortcuts list
- **Escape handling** - Smart back navigation with Escape key
- **Quick navigation** - Single-key shortcuts for common views

### Usage Notes / Ghi chú Sử dụng

1. Shortcuts are **disabled when typing** in input fields to prevent conflicts
2. `Ctrl+F` works **even in inputs** for universal search access
3. Single-key shortcuts (H, C, S, A) only work when **not in a modal**
4. The keyboard shortcuts help can be toggled with `?` or `F1`

## Future Enhancements / Cải tiến Tương lai

Potential additions:
- Arrow key navigation for lists and cards
- `Ctrl + 1-9` for quick tab switching
- Vim-style navigation (j/k for up/down)
- Customizable shortcuts per user

Bổ sung tiềm năng:
- Điều hướng phím mũi tên cho danh sách và thẻ
- `Ctrl + 1-9` để chuyển tab nhanh
- Điều hướng kiểu Vim (j/k cho lên/xuống)
- Phím tắt tùy chỉnh theo người dùng

// Định nghĩa interface cho SystemDevice
export interface SystemDevice {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  species: string;
  manufacturer: string;
  zone: string;
  backupForEquipment: string;
  type: string;
}

// Định nghĩa interface cho các mục dữ liệu
export interface DataItem {
  id: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: number | string | SystemDevice; // Cho phép các thuộc tính là số, chuỗi hoặc đối tượng SystemDevice
}

// Định nghĩa interface cho các mục trong schema
export interface SchemaItem {
  key: string;
  description: string;
}

// Định nghĩa interface tổng cho dữ liệu
export interface Data {
  data: DataItem[];
  schema: SchemaItem[];
}

// Dữ liệu giả lập
export const data: Data = {
  data: [
    {
      id: "f0792466-2bd9-40e4-916a-2e51f9b73aa6",
      createdAt: "2024-08-08T01:13:47.903Z",
      updatedAt: "2024-08-08T01:13:47.903Z",
      c11: 1,
      c12: 1,
      c13: 1,
      c14: 1,
      c21: 1,
      c22: 1,
      c23: 1,
      c24: 1,
      c25: 1,
      c26: 1,
      c27: 1,
      c31: 1,
      c32: 1,
      c33: 1,
      c34: 1,
      c35: 1,
      c41: 1,
      c42: 1,
      c43: 1,
      c51: 1,
      c52: 1,
      c53: 1,
      c54: 1,
      c55: 1,
      c61: 1,
      c62: 1,
      c63: 1,
      c64: 1,
      c71: 1,
      c72: 1,
      c73: 1,
      c74: 1,
      c75: 1,
      systemDevice: {
        id: "d4bd1965-db29-42fa-9e25-d4204da8725f",
        createdAt: "2024-08-07T02:30:22.083Z",
        updatedAt: "2024-08-07T02:30:22.083Z",
        name: "TEST-01-server",
        species: "1",
        manufacturer: "1",
        zone: "INTERNAL_SERVER_AREA",
        backupForEquipment: "",
        type: "SERVER",
      },
    },
    {
      id: "6f07e77a-866f-4cb8-a286-5a4d5e6f9494",
      createdAt: "2024-08-08T20:08:00.103Z",
      updatedAt: "2024-08-08T20:32:00.314Z",
      c11: 1,
      c12: 1,
      c13: 1,
      c14: 1,
      c21: 1,
      c22: 1,
      c23: 1,
      c24: 1,
      c25: 1,
      c26: 1,
      c27: 1,
      c31: 1,
      c32: 1,
      c33: 1,
      c34: 1,
      c35: 1,
      c41: 1,
      c42: 1,
      c43: 1,
      c51: 1,
      c52: 1,
      c53: 1,
      c54: 1,
      c55: 1,
      c61: 1,
      c62: 1,
      c63: 1,
      c64: 1,
      c71: 1,
      c72: 1,
      c73: 1,
      c74: 1,
      c75: 1,
      systemDevice: {
        id: "6325623f-0213-4a13-8b83-bf083f02c109",
        createdAt: "2024-08-07T02:50:23.670Z",
        updatedAt: "2024-08-07T02:50:23.670Z",
        name: "Test02- server",
        species: "1",
        manufacturer: "1",
        zone: "DMZ_AREA",
        backupForEquipment: "",
        type: "SERVER",
      },
    },
    {
      id: "8c5d3467-fa42-4024-ad21-cf03cd2c13d1",
      createdAt: "2024-08-08T20:08:00.113Z",
      updatedAt: "2024-08-08T20:32:00.328Z",
      c11: 1,
      c12: 1,
      c13: 1,
      c14: 1,
      c21: 1,
      c22: 1,
      c23: 1,
      c24: 1,
      c25: 1,
      c26: 1,
      c27: 1,
      c31: 1,
      c32: 1,
      c33: 1,
      c34: 1,
      c35: 1,
      c41: 1,
      c42: 1,
      c43: 1,
      c51: 1,
      c52: 1,
      c53: 1,
      c54: 1,
      c55: 1,
      c61: 1,
      c62: 1,
      c63: 1,
      c64: 1,
      c71: 1,
      c72: 1,
      c73: 1,
      c74: 1,
      c75: 1,
      systemDevice: {
        id: "11e18a0d-2bf7-4aa3-8e7a-fba0a5dfca8e",
        createdAt: "2024-08-07T19:09:49.083Z",
        updatedAt: "2024-08-07T19:09:49.083Z",
        name: "Test03-server",
        species: "2",
        manufacturer: "3",
        zone: "INTERNAL_SERVER_AREA",
        backupForEquipment: "",
        type: "SERVER",
      },
    },
    {
      id: "138d52dc-1088-4d98-be26-d1d3e96f1e27",
      createdAt: "2024-08-08T01:15:44.278Z",
      updatedAt: "2024-08-08T20:32:00.288Z",
      c11: 2,
      c12: 2,
      c13: 1,
      c14: 1,
      c21: 1,
      c22: 1,
      c23: 2,
      c24: 2,
      c25: 1,
      c26: 1,
      c27: 1,
      c31: 1,
      c32: 1,
      c33: 1,
      c34: 1,
      c35: 1,
      c41: 1,
      c42: 1,
      c43: 1,
      c51: 1,
      c52: 1,
      c53: 1,
      c54: 1,
      c55: 1,
      c61: 1,
      c62: 1,
      c63: 1,
      c64: 1,
      c71: 1,
      c72: 1,
      c73: 1,
      c74: 1,
      c75: 1,
      systemDevice: {
        id: "58dfee4e-5354-44dd-b62a-95ccbfa7f637",
        createdAt: "2024-08-08T00:02:14.424Z",
        updatedAt: "2024-08-08T00:02:14.424Z",
        name: "1",
        species: "21",
        manufacturer: "12",
        zone: "INTERNAL_SERVER_AREA",
        backupForEquipment: "1",
        type: "NETWORK",
      },
    },
  ],
  schema: [
    {
      key: "c11",
      description:
        "Thiết lập chức năng ghi, lưu trữ nhật ký hệ thống trên các thiết bị hệ thống, bao gồm: - Thời gian kết nối; - Thông tin kết nối mạng (địa chỉ IP, cổng kết nối); - Hành động đối với kết nối (cho phép, ngăn chặn); - Thông tin các thiết bị đầu cuối kết nối vào hệ thống theo địa chỉ vật lý và logic; - Thông tin cảnh báo từ các thiết bị; - Thông tin hiệu năng hoạt động của thiết bị và tài nguyên mạng.",
    },
    {
      key: "c12",
      description:
        "Sử dụng máy chủ thời gian trong hệ thống để đồng bộ thời gian giữa các thiết bị mạng, thiết bị đầu cuối và các thành phần khác trong hệ thống tham gia hoạt động giám sát",
    },
    {
      key: "c13",
      description:
        "Lưu trữ và quản lý tập trung nhật ký hệ thống thu thập được từ các thiết bị hệ thống",
    },
    {
      key: "c14",
      description: "Lưu trữ nhật ký hệ thống của thiết bị tối thiểu 03 tháng",
    },
    {
      key: "c21",
      description:
        "Cấu hình chức năng xác thực trên các thiết bị hệ thống để xác thực người dùng khi quản trị thiết bị trực tiếp hoặc từ xa",
    },
    {
      key: "c22",
      description:
        "Thiết lập cấu hình chỉ cho phép sử dụng các kết nối mạng an toàn khi truy cập, quản trị thiết bị từ xa",
    },
    {
      key: "c23",
      description:
        "Cấu hình thiết bị chỉ cho phép hạn chế các địa chỉ mạng có thể kết nối, quản trị thiết bị từ xa",
    },
    {
      key: "c24",
      description:
        "Hạn chế được số lần đăng nhập sai khi quản trị hoặc kết nối quản trị từ xa theo địa chỉ mạng",
    },
    {
      key: "c25",
      description:
        "Phân quyền truy cập, quản trị thiết bị đối với các tài khoản quản trị có quyền khác nhau",
    },
    {
      key: "c26",
      description:
        "Nâng cấp, xử lý điểm yếu ATTT của thiết bị hệ thống trước khi đưa vào sử dụng",
    },
    {
      key: "c27",
      description:
        "Xóa bỏ thông tin cấu hình, dữ liệu trên thiết bị hệ thống khi thay đổi mục đích sử dụng hoặc gỡ bỏ khỏi hệ thống",
    },
    {
      key: "c31",
      description:
        "Loại bỏ các tài khoản không sử dụng, các tài khoản không còn hợp lệ trên máy chủ",
    },
    {
      key: "c32",
      description:
        "Sử dụng tường lửa của hệ điều hành và hệ thống để cấm các truy cập trái phép tới máy chủ",
    },
    {
      key: "c33",
      description:
        "Vô hiệu hóa các giao thức mạng không an toàn, các dịch vụ hệ thống không sử dụng",
    },
    {
      key: "c34",
      description:
        "Có phương án cập nhật bản vá, xử lý điểm yếu ATTT cho hệ điều hành và các dịch vụ hệ thống trên máy chủ",
    },
    {
      key: "c35",
      description:
        "Thực hiện nâng cấp, xử lý điểm yếu ATTT trên máy chủ trước khi đưa vào sử dụng",
    },
    {
      key: "c41",
      description:
        "Cài đặt phần mềm phòng chống mã độc (hoặc có phương án khác tương đương) và thiết lập chế độ tự động cập nhật cơ sở dữ liệu cho phần mềm",
    },
    {
      key: "c42",
      description:
        "Có phương án kiểm tra, dò quét, xử lý phần mềm độc hại cho các phần mềm trước khi cài đặt",
    },
    {
      key: "c43",
      description:
        "Quản lý tập trung (cập nhật, cảnh báo và quản lý) các phần mềm phòng chống mã độc cài đặt trên máy chủ và các máy tính người sử dụng trong hệ thống",
    },
    {
      key: "c51",
      description:
        "Thiết lập chính sách xác thực trên máy chủ để xác thực người dùng khi truy cập, quản lý và sử dụng máy chủ",
    },
    {
      key: "c52",
      description:
        "Thay đổi các tài khoản mặc định trên hệ thống hoặc vô hiệu hóa (nếu không sử dụng)",
    },
    {
      key: "c53",
      description:
        "Thiết lập cấu hình máy chủ để bảo đảm an toàn mật khẩu người sử dụng, bao gồm: - Yêu cầu thay đổi mật khẩu mặc định; - Thiết lập quy tắc đặt mật khẩu về số ký tự, loại ký tự; - Thiết lập thời gian yêu cầu thay đổi mật khẩu; - Thiết lập thời gian mật khẩu hợp lệ.",
    },
    {
      key: "c54",
      description:
        "Hạn chế số lần đăng nhập sai trong khoảng thời gian nhất định với một tài khoản nhất định",
    },
    {
      key: "c55",
      description:
        "Thiết lập cấu hình để vô hiệu hóa tài khoản nếu đăng nhập sai nhiều lần vượt số lần quy định",
    },
    {
      key: "c61",
      description:
        "Thiết lập hệ thống chỉ cho phép sử dụng các kết nối mạng an toàn khi truy cập, quản trị máy chủ từ xa",
    },
    {
      key: "c62",
      description:
        "Thiết lập giới hạn thời gian chờ để đóng phiên kết nối khi máy chủ không nhận được yêu cầu từ người dùng",
    },
    {
      key: "c63",
      description: "Thay đổi cổng quản trị mặc định của máy chủ",
    },
    {
      key: "c64",
      description:
        "Giới hạn địa chỉ mạng được phép truy cập, quản trị máy chủ từ xa.",
    },
    {
      key: "c71",
      description:
        "Ghi nhật ký hệ thống bao gồm thông tin sau: - Thông tin kết nối mạng tới máy chủ (firewall log); - Thông tin đăng nhập vào máy chủ; - Lỗi phát sinh trong quá trình hoạt động; - Thông tin thay đổi cấu hình máy chủ; - Thông tin truy cập dữ liệu và dịch vụ quan trọng trên máy chủ",
    },
    {
      key: "c72",
      description: "Đồng bộ thời gian giữa máy chủ với máy chủ thời gian",
    },
    {
      key: "c73",
      description:
        "Giới hạn đủ dung lượng lưu trữ nhật ký hệ thống để không mất hoặc tràn nhật ký hệ thống",
    },
    {
      key: "c74",
      description:
        "Quản lý và lưu trữ tập trung nhật ký hệ thống thu thập được từ máy chủ",
    },
    {
      key: "c75",
      description:
        "Lưu nhật ký hệ thống trong khoảng thời gian tối thiểu là 03 tháng",
    },
  ],
};

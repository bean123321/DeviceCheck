import React, { useState, useEffect } from "react";
import { data, SystemDevice } from "./Data";

const TableComponent: React.FC = () => {
  const [checkStates, setCheckStates] = useState<{ [key: string]: string }>({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    // Lấy trạng thái từ localStorage khi component mount
    const storedStates = localStorage.getItem("checkStates");
    if (storedStates) {
      try {
        const parsedStates = JSON.parse(storedStates);
        if (parsedStates && typeof parsedStates === "object") {
          setCheckStates(parsedStates);
        }
      } catch (error) {
        console.error("Error parsing checkStates:", error);
      }
    }
  }, []);

  useEffect(() => {
    // Lưu trạng thái vào localStorage khi checkStates thay đổi
    if (Object.keys(checkStates).length > 0) {
      localStorage.setItem("checkStates", JSON.stringify(checkStates));
    }
  }, [checkStates]);
  // Nhóm các mục từ schema dựa trên tiền tố của key
  const groupKeysByPrefix = (prefix: string) => {
    return data.schema.filter((item) => item.key.startsWith(prefix));
  };
  // Cập nhật tất cả các checkbox với cùng một trạng thái
  const updateAll = (newState: string) => {
    const updatedStates: { [key: string]: string } = {};
    data.data.forEach((dataItem) => {
      data.schema.forEach((schemaItem) => {
        updatedStates[`${dataItem.id}-${schemaItem.key}`] = newState;
      });
    });

    // Cập nhật trạng thái và lưu vào localStorage
    setCheckStates(updatedStates);
  };
  // Trả về biểu tượng tương ứng với trạng thái hiện tại của checkbox.
  const getCheckboxIcon = (state: string) => {
    if (state === "approve") return "✅";
    if (state === "not-approve") return "❌";
    return "🚫";
  };
  // Thay đổi trạng thái của một checkbox cụ thể khi người dùng nhấp vào nó.
  const updateCheckboxState = (dataItemId: string, itemKey: string) => {
    setCheckStates((prev) => {
      const currentState = prev[`${dataItemId}-${itemKey}`];
      const newState =
        currentState === "approve"
          ? "not-approve"
          : currentState === "not-approve"
          ? "not-use"
          : "approve";

      return {
        ...prev,
        [`${dataItemId}-${itemKey}`]: newState,
      };
    });
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-end mr-4 mt-4">
        <button
          onClick={() => setIsPopupOpen(true)} // Mở popup
          className="bg-blue-500 text-white px-4 py-2 mb-4 rounded-3xl"
        >
          Cập nhật
        </button>
      </div>
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-300 p-6 rounded-lg shadow-lg">
            <div className="flex justify-end mb-[10px]">
              <button
                onClick={() => setIsPopupOpen(false)} // Đóng popup
                className="text-red-500"
              >
                ✖️
              </button>
            </div>
            <div className="flex flex-col justify-end space-y-2">
              <button
                onClick={() => {
                  updateAll("approve");
                  setIsPopupOpen(false); // Đóng popup sau khi hành động
                }}
                className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 text-white px-4 py-2 rounded-3xl"
              >
                Đáp ứng ✅
              </button>
              <button
                onClick={() => {
                  updateAll("not-approve");
                  setIsPopupOpen(false); // Đóng popup sau khi hành động
                }}
                className="flex-1 bg-gradient-to-r from-red-500 to-yellow-400 text-white px-4 py-2 rounded-3xl"
              >
                Chưa đáp ứng ❌
              </button>
              <button
                onClick={() => {
                  updateAll("not-use");
                  setIsPopupOpen(false); // Đóng popup sau khi hành động
                }}
                className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-2 rounded-3xl"
              >
                Không áp dụng 🚫
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col">
        {["c1", "c2", "c3", "c4", "c5", "c6", "c7"].map((prefix) => {
          const items = groupKeysByPrefix(prefix);
          if (items.length === 0) return null;

          return (
            <div key={prefix} className="border p-4 mx-4 mb-4">
              <div className="flex lg:flex-row md:flex-row">
                <div className="font-bold text-sm p-2 w-[150px]">
                  Tên thiết bị
                </div>
                {items.map((item) => (
                  <div
                    key={item.key}
                    className="font-bold text-sm p-2 flex-1 text-center"
                  >
                    {item.description}
                  </div>
                ))}
              </div>

              {data.data.map((dataItem) => (
                <div key={dataItem.id} className="flex lg:flex-row md:flex-row">
                  <div className="p-2 w-[150px]">
                    {typeof dataItem.systemDevice === "object" &&
                    dataItem.systemDevice !== null
                      ? (dataItem.systemDevice as SystemDevice).name
                      : "N/A"}
                  </div>

                  {items.map((item) => (
                    <div key={item.key} className="p-2 flex-1 text-center">
                      <button
                        className="flex justify-center items-center cursor-pointer focus:outline-none focus:bg-transparent"
                        onClick={() =>
                          updateCheckboxState(dataItem.id, item.key)
                        }
                      >
                        <div className="text-xl">
                          {getCheckboxIcon(
                            checkStates[`${dataItem.id}-${item.key}`] ||
                              "not-use" // Trạng thái mặc định
                          )}
                        </div>
                      </button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TableComponent;

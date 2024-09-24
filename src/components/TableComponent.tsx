import React, { useState } from "react";
import { data, SystemDevice } from "./Data"; // Import dữ liệu

const TableComponent: React.FC = () => {
  const [checkStates, setCheckStates] = useState<{ [key: string]: string }>({});

  const groupKeysByPrefix = (prefix: string) => {
    return data.schema.filter((item) => item.key.startsWith(prefix));
  };

  const updateAll = (newState: string) => {
    const updatedStates: { [key: string]: string } = {};
    data.data.forEach((dataItem) => {
      data.schema.forEach((schemaItem) => {
        updatedStates[`${dataItem.id}-${schemaItem.key}`] = newState;
      });
    });
    setCheckStates(updatedStates);
  };

  const getCheckboxIcon = (state: string) => {
    if (state === "approve") return "✅"; // Icon cho đáp ứng
    if (state === "not-approve") return "❌"; // Icon cho chưa đáp ứng
    return "🚫"; // Icon cho không áp dụng
  };

  const updateCheckboxState = (dataItemId: string, itemKey: string) => {
    setCheckStates((prev) => {
      const currentState = prev[`${dataItemId}-${itemKey}`];

      if (currentState === "approve") {
        return {
          ...prev,
          [`${dataItemId}-${itemKey}`]: "not-approve",
        };
      } else if (currentState === "not-approve") {
        return {
          ...prev,
          [`${dataItemId}-${itemKey}`]: "not-use", // Toggle to "not-use"
        };
      } else {
        return {
          ...prev,
          [`${dataItemId}-${itemKey}`]: "approve", // Default back to "approve"
        };
      }
    });
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-end space-x-2 pr-[15px]">
        <button
          onClick={() => updateAll("approve")}
          className="bg-green-500 text-white px-4 py-2 rounded mt-[15px] rounded-3xl"
        >
          Chọn tất cả (Đáp ứng)
        </button>
        <button
          onClick={() => updateAll("not-approve")}
          className="bg-yellow-500 text-white px-4 py-2 rounded mt-[15px] rounded-3xl"
        >
          Chọn tất cả (Chưa đáp ứng)
        </button>
        <button
          onClick={() => updateAll("not-use")}
          className="bg-red-500 text-white px-4 py-2 rounded mt-[15px] rounded-3xl"
        >
          Không áp dụng tất cả
        </button>
      </div>

      <div className="flex flex-col">
        {["c1", "c2", "c3"].map((prefix) => {
          const items = groupKeysByPrefix(prefix);
          if (items.length === 0) return null;

          return (
            <div key={prefix} className="border p-4 m-4">
              <div className="flex">
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
                <div key={dataItem.id} className="flex">
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
                              "not-use" // Default state
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

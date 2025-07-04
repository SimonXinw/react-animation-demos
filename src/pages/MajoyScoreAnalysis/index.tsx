// src/pages/MajoyScoreAnalysis.tsx
import React, { useEffect, useMemo, useState } from "react";
import { fetchExcelData } from "../../utils/loadExcel";
import { Select, Spin, Tag, Input, Space } from "antd";
import type { SelectProps } from "antd";
import "antd/dist/reset.css";

// excel文件的public访问路径（vite/cra/next都支持）
const EXCEL_FILE =
  "/江西省2024年普通高校招生本科投档情况统计表(历史类、物理类、三校生类).xlsx";

export function MajoyScoreAnalysis() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 筛选条件，key为字段名，value为（数组）选中值
  const [filters, setFilters] = useState<Record<string, string[]>>({});

  // colNames: string[]
  const colNames = useMemo(
    () => (data.length > 0 ? Object.keys(data[0]) : []),
    [data]
  );

  // 读取excel
  useEffect(() => {
    (async () => {
      setLoading(true);
      const rows = await fetchExcelData(EXCEL_FILE);
      setData(rows);
      setLoading(false);
      // 初始化filters
      if (rows.length > 0) {
        const initFilters: Record<string, string[]> = {};
        Object.keys(rows[0]).forEach((key) => {
          initFilters[key] = [];
        });
        setFilters(initFilters);
      }
    })();
  }, []);

  // 筛选器渲染（每个字段一个输入多选）
  const headerNode = (
    <div
      className="filters"
      style={{
        padding: "16px",
        background: "#fafbfc",
        borderBottom: "1px solid #eee",
      }}
    >
      <Space wrap>
        {colNames.map((col) => (
          <div key={col} style={{ minWidth: 160 }}>
            <div style={{ fontWeight: 500, marginBottom: 6, fontSize: 14 }}>
              {col}
            </div>
            <Select
              mode="tags"
              style={{ width: 150 }}
              value={filters[col]}
              onChange={(v) => setFilters((fs) => ({ ...fs, [col]: v }))}
              placeholder="可输入多个"
              allowClear
              size="small"
              options={[]}
              notFoundContent={null}
            />
          </div>
        ))}
      </Space>
    </div>
  );

  // table筛选处理函数
  function passesFilter(row: any): boolean {
    return colNames.every((col) => {
      const field = String(row[col] ?? "");
      const selectedTags = filters[col] || [];
      if (!selectedTags.length) return true; // 没筛选
      // 或关系
      return selectedTags.some((tag) => field.includes(tag));
    });
  }
  const filteredData = useMemo(
    () => data.filter(passesFilter),
    [data, filters]
  );

  // 统计
  function getSchoolAndGroupStats(filteredData: any[]) {
    const schoolSet = new Set<string>();
    const schoolGroupSet = new Set<string>();
    filteredData.forEach((row) => {
      const school = row["院校名称"];
      const group = row["专业组名称"];
      if (school) schoolSet.add(school);
      if (school && group) schoolGroupSet.add(school + "|" + group); // 学校+专业组唯一
    });
    return {
      schoolCount: schoolSet.size,
      groupCount: schoolGroupSet.size,
    };
  }
  const { schoolCount, groupCount } = getSchoolAndGroupStats(filteredData);

  // 表格渲染
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "system-ui",
      }}
    >
      {/* header */}
      <header
        style={{
          borderBottom: "1px solid #eee",
          flex: "0 0 auto",
          background: "#fff",
          zIndex: 100,
        }}
      >
        <h2
          style={{
            margin: 0,
            fontWeight: 600,
            fontSize: 22,
            padding: 12,
            color: "#333",
          }}
        >
          江西省2024年普通高校招生本科投档情况分析
        </h2>
        {headerNode}
      </header>
      {/* 内容 */}
      <section
        style={{
          flex: "1 1 auto",
          overflow: "auto",
          background: "#fff",
          minHeight: 0,
        }}
      >
        {loading ? (
          <Spin style={{ margin: 80 }} />
        ) : (
          <div style={{ width: "100%", overflow: "auto" }}>
            <table
              style={{
                borderCollapse: "collapse",
                minWidth: "1200px",
                width: "100%",
                background: "#fff",
                fontSize: 13,
                border: "1px solid #eee",
              }}
            >
              <thead>
                <tr>
                  {colNames.map((col) => (
                    <th
                      key={col}
                      style={{
                        border: "1px solid #e5e5e5",
                        backgroundColor: "#f8f8fa",
                        padding: 6,
                        position: "sticky",
                        top: 0,
                        zIndex: 2,
                        fontWeight: 500,
                      }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row, i) => (
                  <tr
                    key={i}
                    style={{ background: i % 2 ? "#fafbfc" : "#fff" }}
                  >
                    {colNames.map((col) => (
                      <td
                        key={col}
                        style={{
                          border: "1px solid #f0f0f0",
                          padding: 6,
                          whiteSpace: "pre-line",
                        }}
                      >
                        {row[col]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {/* 底部统计 */}
            <div
              style={{
                margin: "18px 0",
                padding: "10px 16px",
                fontWeight: 600,
                fontSize: 15,
                background: "#fbfbfb",
                borderTop: "1px solid #eee",
                display: "flex",
                gap: "2em",
              }}
            >
              <span>
                可报学校数：<b>{schoolCount}</b>
              </span>
              <span>
                专业组数：<b>{groupCount}</b>
              </span>
              <span>
                可报总项数：<b>{filteredData.length}</b>
              </span>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

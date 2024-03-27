import { insertionSortData } from "@/lib/algoritma";
import { getNewData } from "@/lib/new-data";
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";

const columns = [
  {
    key: "nameTask",
    label: "NAME TASK",
  },
  {
    key: "remaining",
    label: "REMAINING",
  },
  {
    key: "deadline",
    label: "DEADLINE",
  },
  {
    key: "priority",
    label: "PRIORITAS",
  },
];

export default function StatusTable(props) {
  const { userEmail } = props;
  const data = getNewData(userEmail);
  let dataNew = [];
  if (data.isSuccess) {
    dataNew = data.newData;
    insertionSortData(dataNew);
    console.log(dataNew);
  }

  const renderCell = React.useCallback((dataNew, columns) => {
    const cellValue = dataNew[columns];

    switch (columns) {
      case "nameTask":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{dataNew.nameTask}</p>
          </div>
        );
      case "deadline":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{dataNew.deadline}</p>
          </div>
        );
      case "remaining":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{dataNew.remaining}</p>
          </div>
        );
      case "priority":
        let labelPriority = "";
        let colorPriority = "";
        if (dataNew.priority > 120) {
          labelPriority = "Avoid it";
          colorPriority = "success";
        } else if (dataNew.priority > 60) {
          labelPriority = "Schedule";
          colorPriority = "primary";
        } else if (dataNew.priority > 20) {
          labelPriority = "Do it Later";
          colorPriority = "warning";
        } else {
          labelPriority = "Do it Now";
          colorPriority = "danger";
        }
        return (
          <Chip
            className="capitalize"
            color={colorPriority}
            size="sm"
            variant="flat"
          >
            {labelPriority}
          </Chip>
        );

      default:
        return cellValue;
    }
  }, []);
  return (
    <>
      <Table aria-label="Example table with dynamic content">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No rows to display."} items={dataNew}>
          {(item) => (
            <TableRow key={item.id}>
              {(columns) => <TableCell>{renderCell(item, columns)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}

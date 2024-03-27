import { getNewDataKnapscak } from "@/lib/new-data";
import {
  Card,
  CardBody,
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
    key: "timeSpent",
    label: "DURATION",
  },
  {
    key: "score",
    label: "SCORE TASK",
  },
  {
    key: "density",
    label: "DENSITY",
  },
  {
    key: "knapsack",
    label: "FRACTIONAL KNAPSACK",
  },
];

export default function KnapsackFractionalTable(props) {
  const { userEmail, capacity } = props; // Directly destructure userEmail and capacity from props
  const data = getNewDataKnapscak(userEmail, capacity);
  const dataNew = data.newData;
  const finalValue = data.finalValue;
  console.log(dataNew);

  const renderCell = React.useCallback((dataNew, columns) => {
    const cellValue = dataNew[columns];

    switch (columns) {
      case "nameTask":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{dataNew.nameTask}</p>
          </div>
        );
      case "timeSpent":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{dataNew.duration}</p>
          </div>
        );
      case "score":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{dataNew.score}</p>
          </div>
        );
      case "density":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{dataNew.density}</p>
          </div>
        );

      case "knapsack":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{dataNew.knapsack}</p>
          </div>
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
              {(columns) => (
                <TableCell className="text-center">
                  {renderCell(item, columns)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="mt-6">
        <Card>
          <CardBody>
            <p>Final Value : {finalValue}</p>
          </CardBody>
        </Card>
      </div>
    </>
  );
}

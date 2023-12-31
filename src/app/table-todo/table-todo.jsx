import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import React from "react";

import { readAllTodo } from "@/lib/task";
import { getSession } from "@/lib/auth.js";
import { VerticalDotsIcon } from "@/Components/VerticalDotIcon";

const session = getSession();
const rows = readAllTodo(session.email);

const statusColorMapComp = {
  easy: "success",
  moderate: "danger",
  difficult: "warning",
};

const statusColorMapScore = {
  low: "success",
  medium: "danger",
  high: "warning",
};

const columns = [
  {
    key: "name",
    label: "NAME TASK",
  },
  {
    key: "deadline",
    label: "DEADLINE",
  },
  {
    key: "time",
    label: "DURATION",
  },
  {
    key: "complexity",
    label: "COMPLEXITY",
  },
  {
    key: "realtiveScore",
    label: "RELATIVE SCORE",
  },
  {
    key: "option",
    label: "OPTION",
  },
];

export default function TodoTask() {
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return <User>{user.name}</User>;
      case "deadline":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{user.deadline}</p>
          </div>
        );
      case "time":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{user.time}</p>
          </div>
        );
      case "complexity":
        return (
          <Chip
            className="capitalize"
            color={statusColorMapComp[user.complexity]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );

      case "realtiveScore":
        return (
          <Chip
            className="capitalize"
            color={statusColorMapScore[user.relativeScore]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "option":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>View</DropdownItem>
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
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
        <TableBody emptyContent={"No rows to display."} items={rows}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}

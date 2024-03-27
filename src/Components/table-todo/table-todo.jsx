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
  Chip,
} from "@nextui-org/react";

import { VerticalDotsIcon } from "@/Components/VerticalDotIcon";
import React from "react";

const columns = [
  {
    key: "nameTask",
    label: "NAME TASK",
  },
  {
    key: "deadline",
    label: "DEADLINE",
  },
  {
    key: "timeSpent",
    label: "DURATION",
  },
  {
    key: "complexity",
    label: "COMPLEXITY",
  },
  {
    key: "score",
    label: "RELATIVE SCORE",
  },
  {
    key: "option",
    label: "OPTION",
  },
];

export default function TableTodo(props) {
  const { items } = props;
  const renderCell = React.useCallback((itemData, columnKey) => {
    const cellValue = itemData[columnKey];

    switch (columnKey) {
      case "nameTask":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{itemData.nameTask}</p>
          </div>
        );
      case "deadline":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{itemData.deadline}</p>
          </div>
        );
      case "timeSpent":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{itemData.timeSpent}</p>
          </div>
        );
      case "complexity":
        let labelComp = "";
        let colorComp = "";

        switch (itemData.complexity) {
          case 0:
            labelComp = "Easy";
            colorComp = "success";
            break;
          case 1:
            labelComp = "Moderate";
            colorComp = "warning";
            break;
          case 2:
            labelComp = "Difficult";
            colorComp = "danger";
            break;
          default:
            // Default case, handle accordingly
            break;
        }
        return (
          <Chip
            className="capitalize"
            color={colorComp}
            size="sm"
            variant="flat"
          >
            {labelComp}
          </Chip>
        );

      case "score":
        let labelScore = "";
        let colorScore = "";

        switch (itemData.score) {
          case 0:
            labelScore = "Easy";
            colorScore = "success";
            break;
          case 1:
            labelScore = "Moderate";
            colorScore = "warning";
            break;
          case 2:
            labelScore = "Difficult";
            colorScore = "danger";
            break;
          default:
            break;
        }
        return (
          <Chip
            className="capitalize"
            color={colorScore}
            size="sm"
            variant="flat"
          >
            {labelScore}
          </Chip>
        );
      case "option":
        return (
          <div className="relative flex items-center gap-2">
            <Dropdown>
              <DropdownTrigger
                aria-label="More options for this task"
                aria-controls="dropdown-menu-options"
                aria-haspopup="true"
              >
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  aria-label="Edit this task"
                  onClick={() => props.onClickButtonEdit(itemData)}
                >
                  edit
                </DropdownItem>
                <DropdownItem
                  aria-label="Mark this task as done"
                  onClick={() => props.onClickButtonDelete(itemData)}
                >
                  done
                </DropdownItem>
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
        <TableBody emptyContent={"No rows to display."} items={items}>
          {(itemData) => (
            <TableRow key={itemData.id}>
              {(columns) => (
                <TableCell>{renderCell(itemData, columns)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}

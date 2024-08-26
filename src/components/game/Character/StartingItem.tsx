import { Box, Typography } from "@mui/material";
import { IItem, Item } from "../../../game/general";
import * as React from "react";
import { ItemIcon } from "../../../game/content/ItemIcon";

interface IStartingItemProps {
  item: Item;
  onClick: (item: Item) => void;
  selected?: boolean;
}

export const StartingItem = ({
  item,
  onClick,
  selected,
}: IStartingItemProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="start"
      width="33.33%"
      gap={1}
      height="200px"
      border={selected ? "2px solid white" : "1px solid white"}
      padding={2}
      sx={{
        cursor: "pointer",
        backgroundColor: selected ? "black" : "",
        "&:hover": {
          backgroundColor: "black",
          color: "white",
          boxShadow: 4,
        },
      }}
      onClick={() => onClick(item)}
    >
      <ItemIcon item={item} sx={{ fontSize: 30 }} />
      <Typography variant="game" fontSize={30}>
        {item.name}
      </Typography>
      <Typography variant="game" fontSize={16} align="center">
        {item.description}
      </Typography>
    </Box>
  );
};

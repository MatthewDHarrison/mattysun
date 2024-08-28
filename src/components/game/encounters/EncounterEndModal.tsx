import React, { useEffect } from "react";
import { Box, Modal, Typography } from "@mui/material";
import { IEncounterState } from "../../../game/encounters/encounter.state";
import { modalStyle } from "./ActiveEncounter";
import { ItemIcon } from "../../../game/content/ItemIcon";
import { IItem } from "../../../game/general";
import { Toll } from "@mui/icons-material";
import { RewardType } from "../../../game/encounter";

interface IEncounterEndProps {
  encounterState: IEncounterState;
  onClose: () => void;
}

export const EncounterEndModal = ({
  encounterState,
  onClose,
}: IEncounterEndProps) => {
  const [show, setShow] = React.useState(false);

  useEffect(() => {
    if (encounterState.isOver) {
      setShow(true);
    }
  }, [encounterState]);
  return (
    <Modal
      open={show}
      onClose={() => {
        onClose();
        setShow(false);
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="start"
        gap={2}
        sx={modalStyle}
        padding={5}
      >
        <Typography alignSelf="center" variant="game" fontSize={30}>
          You were victorious. Here are your spoils:
        </Typography>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          height="100%"
          gap={2}
        >
          {encounterState.encounter.rewards.map((reward, index) => (
            <Box
              key={index}
              padding={2}
              sx={{ border: "1px solid white" }}
              width={300}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              {reward.type === RewardType.Coin ? (
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  gap={1}
                >
                  <Toll />
                  <Typography alignSelf="center" variant="game" fontSize={24}>
                    {reward.value}
                  </Typography>
                </Box>
              ) : (
                <Box display="flex" flexDirection="row">
                  {reward.item && (
                    <>
                      <ItemIcon item={reward.item} sx={{ fontSize: 30 }} />
                      <Typography
                        alignSelf="center"
                        variant="game"
                        fontSize={24}
                      >
                        {reward.item.name}
                      </Typography>
                    </>
                  )}
                </Box>
              )}
              {}
            </Box>
          ))}
        </Box>
      </Box>
    </Modal>
  );
};

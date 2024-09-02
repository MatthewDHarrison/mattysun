import React from "react";
import { Box } from "@mui/system";
import { EnemyCanvas } from "./EnemyCanvas";
import { IMonster } from "../../../game/monster";
import { keyframes } from "@emotion/react";
import { Typography } from "@mui/material";
import { gameTheme } from "../../../game/GameTheme";

const shake = keyframes`
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
`;

const fadeUp = keyframes`
  0% { transform: translateY(0px); opacity: 1 }
  100% { transform: translateY(-40px); opacity: 0 }
`;

interface IEnemyCanvasProps {
  isDamaged: boolean;
  children: React.ReactNode;
}
const EnemyCanvasBox = ({ isDamaged, children }: IEnemyCanvasProps) => {
  return (
    <Box
      width="100%"
      height="100%"
      sx={{
        animation: isDamaged ? `${shake} 0.1s` : "",
      }}
    >
      {children}
    </Box>
  );
};

interface IHitTextProps {
  color: string;
  msg: string;
  size?: number;
}

export const HitText = ({ color, msg, size }: IHitTextProps) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        animation: `${fadeUp} 1s`,
      }}
    >
      <Typography
        variant="game"
        sx={{ color: color }}
        fontSize={`${size || 32}px`}
      >
        {msg}
      </Typography>
    </Box>
  );
};

interface EncounterEnemyProps {
  enemy: IMonster;
}

export const EncounterEnemy = ({ enemy }: EncounterEnemyProps) => {
  console.log("render");
  const [isDamaged, setIsDamaged] = React.useState(false);
  const [currEnemyHp, setCurrEnemyHp] = React.useState<number>(enemy.hp);
  const [showHit, setShowHit] = React.useState<number | null>(null);
  const [showMiss, setShowMiss] = React.useState(false);
  const [textPos, setTextPos] = React.useState({ x: 0, y: 0 });

  console.log("enemy hp", enemy.hp);
  console.log("currEnemyHp", currEnemyHp);
  React.useEffect(() => {
    if (enemy.hp < currEnemyHp) {
      setShowHit(enemy.hp - currEnemyHp);
      console.log("hit");
      setIsDamaged(true);
      setTextPos({ x: Math.random() * 150 + 150, y: Math.random() * 300 + 50 });
      setTimeout(() => {
        setIsDamaged(false);
      }, 100);
      setTimeout(() => {
        setShowHit(null);
      }, 1000);
    }
    setCurrEnemyHp(enemy.hp);
  }, [enemy.hp]);

  return (
    <Box
      position="absolute"
      sx={{
        transform: "translate(-50%, -10%)",
        left: "50%",
        top: "-10%",
        width: "800px",
        height: "900px",
        mt: 40,
      }}
      zIndex={0}
    >
      <Box position="absolute" top={textPos.y} left={textPos.x} zIndex={5}>
        {showHit && (
          <HitText
            color={gameTheme.palette.red || "red"}
            msg={`${showHit}`}
            size={showHit > 5 ? 64 : 48}
          />
        )}
        {showMiss && (
          <HitText
            color={gameTheme.palette.light || "white"}
            msg={"Miss"}
            size={32}
          />
        )}
      </Box>
      <EnemyCanvasBox isDamaged={isDamaged}>
        <EnemyCanvas src="assets/game/skeleton2.png" isDamaged={isDamaged} />
      </EnemyCanvasBox>
    </Box>
  );
};

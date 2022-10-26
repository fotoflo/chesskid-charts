import { getOverlappingDaysInIntervals } from "date-fns";
import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

type Button = {
  title: string;
  value: string;
  payload?: string;
  isVoid?: boolean;
};

type Props = {
  buttons: Button[];
  selectedValue: string;
  dispatchType: string;
  dispatch: Function;
  className?: string;
};

const getVariant = (selectedValue: string, value: string, isVoid?: boolean) => {
  if (isVoid) return "light";
  if (selectedValue === value) {
    return "primary";
  }
  return "secondary";
};

const ButtonBar = ({
  buttons,
  dispatch,
  dispatchType,
  selectedValue,
  className,
}: Props) => {
  return (
    <ButtonGroup className={className}>
      {buttons.map((button: Button) => {
        return (
          <Button
            key={button.value}
            variant={getVariant(selectedValue, button.value, button.isVoid)}
            onClick={() => {
              if (button.isVoid) return;
              dispatch({ type: dispatchType, payload: button.value });
            }}
          >
            {button.title}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

export default ButtonBar;

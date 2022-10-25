import { getOverlappingDaysInIntervals } from "date-fns";
import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

type Props = {
  buttons: [
    {
      title: string;
      value: string;
      payload?: string;
      isVoid?: boolean;
    }
  ];
  selectedValue: string;
  dispatchType: string;
  dispatch: Function;
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
}: Props) => {
  return (
    <ButtonGroup aria-label="Basic example">
      {buttons.map((button) => {
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

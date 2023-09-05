import { Button, ButtonProps } from "@chakra-ui/react";
import { Calendar, GetBackForwardPropsOptions } from "dayzed";
import React, { Fragment, memo } from "react";
import { DatepickerProps } from "../utils/commonTypes";

export interface DatepickerBackBtnsProps extends DatepickerProps {
  calendars: Calendar[];
  getBackProps: (data: GetBackForwardPropsOptions) => Record<string, unknown>;
}

const DefaultBtnStyle: ButtonProps = {
  variant: "ghost",
  size: "sm",
};

export const DatepickerBackBtns: React.FC<DatepickerBackBtnsProps> = memo(
  (props) => {
    const { calendars, getBackProps } = props;

    return (
      <Fragment>
        <Button {...getBackProps({ calendars })} {...DefaultBtnStyle}>
          {"<"}
        </Button>
      </Fragment>
    );
  },
  function arePropsEqual(oldProps, newProps) {
    return (
      oldProps.calendars == newProps.calendars &&
      oldProps.getBackProps == newProps.getBackProps &&
      oldProps.maxDate == newProps.maxDate &&
      oldProps.minDate == newProps.minDate &&
      oldProps.maxDate == newProps.maxDate &&
      oldProps.propsConfigs == newProps.propsConfigs
    );
  }
);

export interface DatepickerForwardBtnsProps extends DatepickerProps {
  calendars: Calendar[];
  getForwardProps: (
    data: GetBackForwardPropsOptions
  ) => Record<string, unknown>;
}

export const DatepickerForwardBtns: React.FC<DatepickerForwardBtnsProps> = memo(
  (props) => {
    const { calendars, getForwardProps } = props;

    return (
      <Fragment>
        <Button {...getForwardProps({ calendars })} {...DefaultBtnStyle}>
          {">"}
        </Button>
      </Fragment>
    );
  }
);

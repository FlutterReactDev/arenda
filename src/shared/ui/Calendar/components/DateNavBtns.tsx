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
    const customBtnProps = props.propsConfigs?.dateNavBtnProps;
    return (
      <Fragment>
        <Button
          {...getBackProps({ calendars })}
          {...DefaultBtnStyle}
          {...customBtnProps}
        >
          {"<"}
        </Button>
      </Fragment>
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
    const customBtnProps = props.propsConfigs?.dateNavBtnProps;
    return (
      <Fragment>
        <Button
          {...getForwardProps({ calendars })}
          {...DefaultBtnStyle}
          {...customBtnProps}
        >
          {">"}
        </Button>
        <Button
          {...getForwardProps({
            calendars,
            offset: 12,
          })}
          {...DefaultBtnStyle}
          {...customBtnProps}
        >
          {">>"}
        </Button>
      </Fragment>
    );
  }
);

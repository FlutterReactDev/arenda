import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import { PageLoader } from "@shared/ui/PageLoader";

import { FC, lazy, memo, Suspense } from "react";

export interface MobileCalendarDrawerProps {
  dates: Date[];
  handleSelectDate: (date: Date[]) => void;
  onClose: () => void;
  isOpen: boolean;
}
const MobileRangeDatepicker = lazy(() => import("./MobileRangeDatepicker"));
export const MobileCalendarDrawer: FC<MobileCalendarDrawerProps> = memo(
  (props) => {
    const { dates, handleSelectDate, onClose, isOpen } = props;

    return (
      <Drawer size="full" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent
          p="0"
          h={"100dvh"}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
        >
          <DrawerCloseButton />
          <DrawerHeader>Выбрать дату</DrawerHeader>
          <Button
            borderRadius={"none"}
            size={"lg"}
            onClick={() => handleSelectDate([])}
          >
            Очистить дату
          </Button>
          <DrawerBody p="0">
            <Suspense fallback={<PageLoader />}>
              <MobileRangeDatepicker
                dates={dates.filter((date) => Boolean(date))}
                handleSelectDate={handleSelectDate}
              />
            </Suspense>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    );
  }
);

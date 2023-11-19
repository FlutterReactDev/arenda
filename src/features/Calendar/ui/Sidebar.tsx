import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useMediaQuery,
} from "@chakra-ui/react";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { memo } from "react";
import { calendarActions } from "..";
import { useSidebar } from "../model/useSidebar";
import { SidebarForm } from "./SidebarForm";

export const Sidebar = memo(() => {
  const dispatch = useAppDispatch();
  const { isOpen, onClose } = useSidebar();
  const [isLessThan968] = useMediaQuery("(max-width: 968px)");

  return (
    <>
      <Drawer
        isOpen={isOpen}
        onClose={() => {
          onClose();
          dispatch(calendarActions.setClearRange());
        }}
        placement="right"
        size={isLessThan968 ? "full" : "sm"}
        isFullHeight
        {...(isLessThan968 && {
          closeOnOverlayClick: false,
        })}
      >
        <DrawerOverlay />
        <DrawerContent
          onTouchStart={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
          h="100dvh"
        >
          <DrawerCloseButton />
          <DrawerHeader>Выбранные даты</DrawerHeader>
          <SidebarForm />
        </DrawerContent>
      </Drawer>
    </>
  );
});

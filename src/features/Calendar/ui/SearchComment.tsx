import { SearchIcon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useDisclosure,
  useOutsideClick,
} from "@chakra-ui/react";
import { search } from "@shared/ui/SelectSearch/lib/fuzzySearch";
import { FC, RefObject, memo, useRef } from "react";
import { CalendarAvailability, EventClickProps } from "../model/types";
import { useSearchFullname } from "../model/useSearchFullname";
import { EventItem } from "./EventItem";
interface SearchCommentProps extends InputProps {
  includesAvailabilities: CalendarAvailability[];
  onEventClick: ({
    id,
    objectId,
    availibilityInfo,
    page,
  }: EventClickProps) => void;
}
export const SearchComment: FC<SearchCommentProps> = memo((props) => {
  const { includesAvailabilities, onEventClick, ...otherProps } = props;


  
  const { query, setQuery } = useSearchFullname();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const searchRef = useRef() as RefObject<HTMLDivElement>;
  const availabilities = includesAvailabilities;
  const getEvents = !query.length
    ? availabilities
    : availabilities.filter((o) =>
        search(query.toLowerCase(), `${o?.clientFullname}`.trim().toLowerCase())
      );

  useOutsideClick({
    ref: searchRef,
    handler: onClose,
    enabled: isOpen,
  });

  return (
    <Popover
      isLazy
      matchWidth
      onClose={onClose}
      isOpen={isOpen}
      onOpen={onOpen}
      autoFocus={false}
    >
      <PopoverTrigger>
        <InputGroup maxW="xl" h="full">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            w="full"
            bgColor={"white"}
            placeholder="Поиск по ФИО"
            {...otherProps}
          />

          <InputLeftElement h="full">
            <SearchIcon />
          </InputLeftElement>
        </InputGroup>
      </PopoverTrigger>
      <PopoverContent ref={searchRef} w="full" maxH={"60"} overflowY={"auto"}>
        <PopoverBody w="full">
          <Stack>
            {getEvents.map(({ id, objectId }) => {
              return (
                <EventItem
                  onEventClick={onEventClick}
                  id={id}
                  objectId={objectId}
                />
              );
            })}
          </Stack>

          {getEvents.length == 0 && <Text>Нет броней</Text>}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
});

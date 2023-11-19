import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { memo } from "react";
import { useSearchObjects } from "../model/useSearchObjects";

export const SearchObject = memo(() => {
  const { query, onChangeQuery } = useSearchObjects();
  return (
    <InputGroup>
      <Input
        value={query}
        onChange={(e) => onChangeQuery(e.target.value)}
        placeholder="Название объекта"
        bgColor={"white"}
      />
      <InputLeftElement>
        <SearchIcon />
      </InputLeftElement>
    </InputGroup>
  );
});

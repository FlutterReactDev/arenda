import { Stack } from "@chakra-ui/react";
import { FC, memo, useCallback, useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { UploadImage } from "./UploadImage";

interface DragComponentChunkProps {
  files: File[];
  onDragEnd: (value: File[]) => void;
  onImageDelete: (id: number) => void;
  openFileLoader: () => void;
}

const DragComponentChunk: FC<DragComponentChunkProps> = memo((props) => {
  const {
    files,
    onDragEnd: onDragEndProps,
    onImageDelete,
    openFileLoader,
  } = props;

  const [orderFiles, setOrderFiles] = useState<File[]>([]);
  useEffect(() => {
    setOrderFiles(files);
  }, [files]);
  const onDragEnd = useCallback(({ destination, source }: DropResult) => {
    setOrderFiles((prevState) => {
      if (destination) {
        const items = Array.from(prevState);
        const [reorderedItem] = items.splice(source.index, 1);
        items.splice(destination.index, 0, reorderedItem);
        onDragEndProps(items);
        return items;
      }

      return prevState;
    });
  }, []);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="images">
        {({ droppableProps, innerRef, placeholder }) => {
          return (
            <Stack {...droppableProps} ref={innerRef}>
              {orderFiles.map((file, index) => {
                return (
                  <Draggable draggableId={`${index}`} key={index} index={index}>
                    {(provided) => {
                      return (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <UploadImage
                            onDelete={onImageDelete}
                            id={index}
                            openFileLoader={openFileLoader}
                            isMain={index == 0}
                            file={file}
                            cursor="grab"
                          />
                        </div>
                      );
                    }}
                  </Draggable>
                );
              })}
              {placeholder}
            </Stack>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
});

export default DragComponentChunk;

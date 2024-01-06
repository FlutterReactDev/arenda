import {
  Box,
  Button,
  HStack,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useGetObjectProductQuery } from "@entites/Object";
import { ObjectDetailInfoCard } from "@entites/Object/ui/ObjectDetailInfoCard";
import { FC } from "react";

import { EffectCreative, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface ObjectProductLoaderProps {
  id: string;
}

export const ObjectProductLoader: FC<ObjectProductLoaderProps> = (props) => {
  const { id } = props;
  const { data, isSuccess } = useGetObjectProductQuery(id);

  return (
    <ObjectDetailInfoCard title={"Цены"}>
      <SimpleGrid
        columns={{
          base: 1,
          md: 2,
        }}
        spacing={3}
      >
        {isSuccess &&
          data.result.items.map(
            ({
              offer: { price, currency, button_name, url },
              product: { images, name, description },
            }) => {
              const _images = images.map((imgUrl) => {
                return imgUrl.split("?")[0];
              });

              return (
                <Stack align={"start"}>
                  <Box w="full">
                    <Swiper
                      effect={"creative"}
                      grabCursor={true}
                      pagination={{
                        clickable: true,
                        dynamicBullets: true,
                      }}
                      creativeEffect={{
                        prev: {
                          shadow: true,
                          translate: [0, 0, -400],
                        },
                        next: {
                          translate: ["100%", 0, 0],
                        },
                      }}
                      modules={[Pagination, Navigation, EffectCreative]}
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                      navigation={true}
                    >
                      {_images.map((image, idx) => {
                        return (
                          <SwiperSlide
                            style={{
                              height: "100%",
                              width: "100%",
                            }}
                            key={idx}
                          >
                            <Image
                              h={"52"}
                              w={"full"}
                              objectFit={"cover"}
                              src={image}
                              rounded={"lg"}
                            />
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  </Box>
                  <Stack justify={"start"}>
                    <Heading size={"md"} fontWeight={"medium"}>
                      {name}
                    </Heading>

                    <Text fontWeight={"medium"} color={"gray.500"}>
                      {description}
                    </Text>
                    <HStack spacing={1} justifyContent={"flex-start"}>
                      {button_name && (
                        <Button
                          as="a"
                          target="_blank"
                          href={url}
                          colorScheme="facebook"
                        >
                          {button_name}
                        </Button>
                      )}
                    </HStack>
                    {price && (
                      <HStack spacing={1} justifyContent={"flex-end"}>
                        <Text fontWeight={"medium"}>
                          {price} {currency}
                        </Text>
                      </HStack>
                    )}
                  </Stack>
                </Stack>
              );
            }
          )}
      </SimpleGrid>
    </ObjectDetailInfoCard>
  );
};

import { StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Heading,
  Stack,
  StackDivider,
  Image,
  Text,
  Container,
  Flex,
  List,
  ListItem,
  SimpleGrid,
  VStack,
  useColorModeValue,
  Center,
  PopoverTrigger,
  PopoverContent,
  Popover,
  Badge,
  Tag,
  useDisclosure,
  Collapse,
} from "@chakra-ui/react";
import { Map2GIS } from "@shared/ui/2GIS";
import { HtmlMarker2GIS } from "@shared/ui/2GIS/HTMLMarker2GIS";
import { FC, useEffect, useState } from "react";
import { TriangleDownIcon } from "@chakra-ui/icons";
import { useMapContext } from "@shared/ui/2GIS/Map2GIS";
import { Clusterer2GIS } from "@shared/ui/2GIS/Clusterer2GIS";
import { Map } from "@2gis/mapgl/types";
const IMAGE =
  "https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80";
const property = {
  imageUrl:
    "https://www.issykkul.biz/Portals/0/GHA_imgs/arnoo/dvor-gostevogo-doma-arnoo.jpg_862.jpg",
  imageAlt: "Rear view of modern home with pool",
  beds: 3,
  baths: 2,
  title: "Modern home in city center in the heart of historic Los Angeles",
  formattedPrice: "$1,900.00",
  reviewCount: 34,
  rating: 4,
};
const ClusterElem: FC = ({ pointsCount }: { pointsCount: number }) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      <Tag
        cursor={"pointer"}
        color="white"
        rounded={"full"}
        bgColor={"red.600"}
        onClick={onToggle}
      >
        Еще {pointsCount}
      </Tag>
      <Collapse in={isOpen} animateOpacity>
        <Box
          p="40px"
          color="white"
          mt="4"
          bg="teal.500"
          rounded="md"
          shadow="md"
        >
          <Button>1</Button>
          <Button>1</Button>
          <Button>1</Button>
        </Box>
      </Collapse>
    </>
  );
};

const Cluster = () => {
  const { mapInstance } = useMapContext();

  return (
    <Clusterer2GIS
      radius={10}
      onClick={(data) => {
        mapInstance.setCenter(data.lngLat);
        mapInstance.setZoom(17);
      }}
      inputHtmlMarkers={[
        {
          coordinates: [77.1757361557851, 42.64472838750217],
        },
        {
          coordinates: [77.17437800783786, 42.645238409366385],
        },
        {
          coordinates: [77.17292784537554, 42.645017610523716],
        },
        {
          coordinates: [77.15253297654283, 42.63014881066871],
        },
        {
          coordinates: [77.1981040743652, 42.658896258910474],
        },
        {
          coordinates: [77.15253297654283, 42.63014881066871],
        },
      ]}
      clusterStyle={(pointsCount, target) => {
        console.log(target);

        return {
          type: "html",
          children: <ClusterElem pointsCount={pointsCount} />,
        };
      }}
      renderHtmlMarker={() => {
        return (
          <Popover openDelay={0} closeDelay={0}>
            <PopoverTrigger>
              <Card
                boxShadow={"lg"}
                bgColor={"red.400"}
                color={"white"}
                p={1}
                onClick={() => {
                  console.log("click");
                }}
                transform={" translate(-50%, -200%)"}
                position={"relative"}
              >
                <Text fontSize={"small"}>1000 cом</Text>
                <Box
                  as="span"
                  color="red.400"
                  position={"absolute"}
                  top={"100%"}
                  left={"50%"}
                  transform={"translateX(-50%)"}
                >
                  <TriangleDownIcon />
                </Box>
              </Card>
            </PopoverTrigger>
            <PopoverContent>
              <Box
                maxW="md"
                w={"full"}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
              >
                <Image src={property.imageUrl} alt={property.imageAlt} />

                <Box p="6">
                  <Box display="flex" alignItems="baseline">
                    <Badge borderRadius="full" px="2" colorScheme="teal">
                      New
                    </Badge>
                    <Box
                      color="gray.500"
                      fontWeight="semibold"
                      letterSpacing="wide"
                      fontSize="md"
                      textTransform="uppercase"
                      ml="2"
                    >
                      {property.beds} beds &bull; {property.baths} baths
                    </Box>
                  </Box>

                  <Heading
                    mt="1"
                    fontWeight="semibold"
                    size={"md"}
                    lineHeight="tight"
                  >
                    {property.title}
                  </Heading>

                  <Box>
                    {property.formattedPrice}
                    <Box as="span" color="gray.600" fontSize="sm">
                      / wk
                    </Box>
                  </Box>

                  <Box display="flex" mt="2" alignItems="center">
                    {Array(5)
                      .fill("")
                      .map((_, i) => (
                        <StarIcon
                          key={i}
                          color={i < property.rating ? "teal.500" : "gray.300"}
                        />
                      ))}
                    <Box as="span" ml="2" color="gray.600" fontSize="sm">
                      {property.reviewCount} reviews
                    </Box>
                  </Box>
                </Box>
              </Box>
            </PopoverContent>
          </Popover>
        );
      }}
    ></Clusterer2GIS>
  );
};
export const MapPage = () => {
  const [coords, setCoords] = useState();
  const [XCoords, setXCoords] = useState();
  return (
    <Box h="100dvh">
      <Map2GIS
        initialMapOptions={{
          center: [77.17531854453188, 42.6445241832498],
          zoom: 15,
          key: "10153539-2026-4a0c-b7a3-52ddb3fed411",
          rotation: 20,
          keepCenterWhileUserZoomRotate: true,
          scaleControl: true,
        }}
        onClick={(data, mapInstance: Map) => {
          mapInstance.setCenter([77.18531854453188, 42.6545241832498]);
        }}
      >
        <Cluster />
        {coords && (
          <HtmlMarker2GIS coordinates={coords}>
            <Card
              boxShadow={"lg"}
              border="1px solid"
              borderColor={"red.600"}
              p={2}
              onClick={() => {
                console.log("click");
              }}
              transform={" translate(-50%, -100%)"}
            >
              <Heading size={"xs"}>10 000 сом</Heading>
            </Card>
          </HtmlMarker2GIS>
        )}
        {XCoords && (
          <HtmlMarker2GIS coordinates={XCoords}>
            <Card
              boxShadow={"lg"}
              border="1px solid"
              borderColor={"red.600"}
              p={2}
              onClick={() => {
                console.log("click");
              }}
              transform={" translate(-50%, -100%)"}
            >
              <Heading size={"xs"}>10 000 сом</Heading>
            </Card>
          </HtmlMarker2GIS>
        )}
        {/* 
        <HtmlMarker2GIS coordinates={[77.17678937825993, 42.64530871154138]}>
          <Card
            boxShadow={"lg"}
            border="1px solid"
            borderColor={"red.600"}
            p={2}
            onClick={() => {
              console.log("click");
            }}
          >
            <Heading size={"xs"}>15 000 сом</Heading>
          </Card>
        </HtmlMarker2GIS> */}
      </Map2GIS>
    </Box>
  );
};

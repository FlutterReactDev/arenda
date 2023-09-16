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
} from "@chakra-ui/react";
import { Map2GIS } from "@shared/ui/2GIS";
import { HtmlMarker2GIS } from "@shared/ui/2GIS/HTMLMarker2GIS";
import { useEffect } from "react";
import { MdLocalShipping } from "react-icons/md";
export const MapPage = () => {
  useEffect(() => {
    fetch(
      "https://catalog.api.2gis.com/3.0/items/geocode?q=Москва&key=10153539-2026-4a0c-b7a3-52ddb3fed411"
    ).then((data) => {
      console.log(data.json());
    });
  }, []);
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

  return (
    <Box h="100dvh">
      <Map2GIS
        initialMapOptions={{
          center: [74.62712071263891, 42.856867565222004],
          zoom: 13,
          key: "10153539-2026-4a0c-b7a3-52ddb3fed411",
        }}
        onClick={(data) => {
          console.log(data);
        }}
      >
        <HtmlMarker2GIS coordinates={[77.17569679531643, 42.64475773607496]}>
          <Popover openDelay={0} closeDelay={0}>
            <PopoverTrigger>
              <Card
                boxShadow={"lg"}
                border="1px solid"
                borderColor={"red.600"}
                p={5}
                onClick={() => {
                  console.log("click");
                }}
              >
                <Heading>20 000 сом</Heading>
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
        </HtmlMarker2GIS>
        <HtmlMarker2GIS coordinates={[77.17555741158148, 42.64561161009302]}>
          <Card
            boxShadow={"lg"}
            border="1px solid"
            borderColor={"red.600"}
            p={5}
            onClick={() => {
              console.log("click");
            }}
          >
            <Heading>10 000 сом</Heading>
          </Card>
        </HtmlMarker2GIS>
        <HtmlMarker2GIS coordinates={[77.17678937825993, 42.64530871154138]}>
          <Card
            boxShadow={"lg"}
            border="1px solid"
            borderColor={"red.600"}
            p={5}
            onClick={() => {
              console.log("click");
            }}
          >
            <Heading>15 000 сом</Heading>
          </Card>
        </HtmlMarker2GIS>
      </Map2GIS>
    </Box>
  );
};

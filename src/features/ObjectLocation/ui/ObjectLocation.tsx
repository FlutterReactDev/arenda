import { Box } from "@chakra-ui/react";
import { useGet2GISObjectInfoQuery } from "@entites/Object";
import { ObjectDetailInfoCard } from "@entites/Object/ui/ObjectDetailInfoCard";
import { Map2GIS } from "@shared/ui/2GIS";
import { Marker2GIS } from "@shared/ui/2GIS/Marker2GIS";
import { FC } from "react";

interface ObjectLocationProps {
  id: string;
}

export const ObjectLocation: FC<ObjectLocationProps> = (props) => {
  const { id } = props;
  const { data, isSuccess } = useGet2GISObjectInfoQuery(id);

  return (
    <>
      {isSuccess && (
        <ObjectDetailInfoCard
          title={
            <>
              {data.result.items[0].full_name ||
                data.result.items[0].address_name}
            </>
          }
        >
          <Box h={"96"}>
            <Map2GIS
              initialMapOptions={{
                center: [
                  data.result.items[0].point.lon,
                  data.result.items[0].point.lat,
                ],
                zoom: 18,
                key: _2GIS_KEY_,

                scaleControl: true,
                minZoom: 5,
              }}
            >
              <Marker2GIS
                coordinates={[
                  data.result.items[0].point.lon,
                  data.result.items[0].point.lat,
                ]}
              />
            </Map2GIS>
          </Box>
        </ObjectDetailInfoCard>
      )}
    </>
  );
};

import { StarIcon } from "@chakra-ui/icons";
import { Button, HStack, Stack, Text } from "@chakra-ui/react";
import { ObjectDetailInfoCard } from "@entites/Object/ui/ObjectDetailInfoCard";
import {
  Review,
  ReviewAnswer,
  ReviewCard,
  ReviewSkeleton,
  useGetObjectReviewQuery,
} from "@entites/Review";
import { FC, useEffect, useState } from "react";
interface ReviewLoaderProps {
  id: string;
}
export const ReviewLoader: FC<ReviewLoaderProps> = (props) => {
  const { id } = props;
  const [offsetDate, setOffsetDate] = useState("");

  const [reviews, setReviews] = useState<Review[]>([]);

  const { data, isSuccess, isFetching } = useGetObjectReviewQuery({
    limit: 12,
    objectId: id,
    ...(offsetDate?.length > 0 && {
      offset_date: offsetDate,
    }),
  });

  useEffect(() => {
    if (data) {
      setReviews((prevData) => {
        return [...prevData, ...data.reviews];
      });
    }
  }, [data]);

  const onNextPart = () => {
    if (data) {
      const nextPart = new URLSearchParams(data.meta.next_link).get(
        "offset_date"
      ) as string;
      setOffsetDate(nextPart);
    }
  };

  return (
    <Stack>
      <ObjectDetailInfoCard
        title={
          <HStack alignItems={"center"} spacing={12}>
            <Text>Оценка гостей</Text>
            <HStack fontSize={"xl"} cursor={"pointer"}>
              <HStack spacing={1}>
                <StarIcon color={"red.500"} />
                <Text fontWeight={"medium"}>{data?.meta.branch_rating}</Text>
                <span>/</span>
                <Text fontWeight={"medium"}>5</Text>
              </HStack>
              <Text
                mt={1}
                color={"gray.500"}
                fontSize={"sm"}
                fontWeight={"medium"}
              >
                ({data?.meta.total_count})
              </Text>
            </HStack>
          </HStack>
        }
      >
        <Stack spacing={4} mt={5}>
          {isSuccess &&
            reviews.map(
              ({
                id,
                rating,
                user,
                text,
                date_created,
                photos,
                official_answer,
              }) => {
                if (official_answer) {
                  return (
                    <ReviewCard
                      rating={rating}
                      text={text}
                      userName={user.name}
                      userImg={user.photo_preview_urls.url}
                      createdDate={date_created}
                      photos={photos}
                      key={id}
                    >
                      <ReviewAnswer {...official_answer} />
                    </ReviewCard>
                  );
                }
                return (
                  <ReviewCard
                    key={id}
                    rating={rating}
                    text={text}
                    userName={user.name}
                    userImg={user.photo_preview_urls.url}
                    createdDate={date_created}
                    photos={photos}
                  />
                );
              }
            )}

          {isFetching && (
            <>
              <ReviewSkeleton />
              <ReviewSkeleton />
              <ReviewSkeleton />
              <ReviewSkeleton />
              <ReviewSkeleton />
            </>
          )}
          {data && (
            <Button
              variant={"outline"}
              onClick={onNextPart}
              isDisabled={reviews.length >= data?.meta.total_count}
            >
              Показать еще
            </Button>
          )}
        </Stack>
      </ObjectDetailInfoCard>
    </Stack>
  );
};

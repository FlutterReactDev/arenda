import { base2GISReviewApi } from "@shared/api/2GISReviewApi";
import { ReviewResponse } from "./types/review";

const reviewApi = base2GISReviewApi.injectEndpoints({
  endpoints(build) {
    return {
      getObjectReview: build.query<
        ReviewResponse,
        {
          objectId: string;
          limit: number;
          offset_date?: string;
        }
      >({
        query: ({ limit = 10, objectId, offset_date }) => {
          return {
            url: `/branches/${objectId}/reviews?is_advertiser=false&fields=meta.providers,meta.branch_rating,meta.branch_reviews_count,meta.total_count,reviews.hiding_reason,reviews.is_verified&without_my_first_review=false&rated=true`,
            params: {
              limit,
              offset_date,
            },
          };
        },
      }),
    };
  },
});

export const { useGetObjectReviewQuery } = reviewApi;
//https://public-api.reviews.2gis.com/2.0/branches/70000001031386489/reviews?fields=meta.providers%2Cmeta.branch_rating%2Cmeta.branch_reviews_count%2Cmeta.total_count%2Creviews.hiding_reason%2Creviews.is_verified&is_advertiser=false&key=37c04fe6-a560-4549-b459-02309cf643ad&limit=12&locale=ru_KG&offset_date=2023-06-08T02%3A45%3A05.106444%2B07%3A00&rated=true&sort_by=date_edited&without_my_first_review=false
//https://public-api.reviews.2gis.com/2.0/branches/70000001031386489/reviews?fields=meta.providers%2Cmeta.branch_rating%2Cmeta.branch_reviews_count%2Cmeta.total_count%2Creviews.hiding_reason%2Creviews.is_verified&is_advertiser=false&key=37c04fe6-a560-4549-b459-02309cf643ad&limit=12&locale=ru_KG&offset_date=2023-07-08T03%3A05%3A06.977737%2B07%3A00&rated=true&sort_by=date_edited&without_my_first_review=false

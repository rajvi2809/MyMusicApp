import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-core.p.rapidapi.com/v1",
    prepareHeaders: (headers) => {
      headers.set(
        "x-rapidapi-key",
        "c652aff09fmshc65ce0120eed5c6p167bc2jsn10ee5b91aa97"
      );
      headers.set("x-rapidapi-host", "shazam-core.p.rapidapi.com");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: () => ({
        url: "/charts/world",
        params: { country_code: "IN" },
      }),
    }),
  }),
});

export const { useGetTopChartsQuery } = shazamCoreApi;

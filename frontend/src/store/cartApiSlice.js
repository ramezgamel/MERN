import { apiSlice } from "./apiSlice";

const cartApiSLice = apiSlice.injectEndpoints({
  endpoints:builder => ({
    getUserCart: builder.query({
      query:(cartId)=>({
        url:`/cart/${cartId}`
      }),
      providesTags:['Cart']
    }),
    clearCart: builder.mutation({
      query:(cartId)=>({
        url:`/cart/${cartId}`,
        method:"DELETE"
      }),
      providesTags:['Cart']
    }),
    addToCart:builder.mutation({
      query:(data)=>({
        url:`/cart${data?.cartId ? "?cartId="+data.cartId : ""}`,
        method:"POST",
        body: {productId:data.productId, quantity:data.quantity}
      }),
      invalidatesTags:["Cart"]
    }),
    deleteFromCart:builder.mutation({
      query:({cartId,productId})=>({
        url:`/cart/${cartId}/${productId}`,
        method:"DELETE"
      }),
      invalidatesTags:["Cart"]
    }),
    applyCoupon:builder.mutation({
      query:({cartId,couponName})=>({
        url:`/cart/${cartId}/applyCoupon`,
        method:"PUT",
        body: {couponName}
      }),
      invalidatesTags:["Cart"]
    }),
    clearCoupon:builder.mutation({
      query:(cartId)=>({
        url:`/cart/${cartId}/clearCoupon`,
        method:"DELETE"
      }),
      invalidatesTags:["Cart"]
    })
  })
});

export const {useLazyGetUserCartQuery, useClearCouponMutation,useGetUserCartQuery ,useAddToCartMutation, useApplyCouponMutation, useClearCartMutation, useDeleteFromCartMutation} = cartApiSLice
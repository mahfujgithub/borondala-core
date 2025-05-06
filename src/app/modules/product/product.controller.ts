import { NextFunction, Request, Response } from "express";
import { ProductService } from "./product.service";
import sendResponse from "../../../shared/sendResponse";
import { Product } from "@prisma/client";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await ProductService.insertIntoDB(req.body);

    sendResponse<Product>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Product inserted successfully',
      data: result,
    });
})

export const ProductController = {
    insertIntoDB,
};

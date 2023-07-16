import { PaginationHelper } from "../../../helpers/pagination.helper";
import { UpdateHelper } from "../../../helpers/update.helper";
import type { IGenericMongoDBDocument } from "../../../interfaces/document.interface";
import type { IPaginationOptions } from "../../../interfaces/pagination.interface";
import { cowSearchableFields } from "./cow.constant";
import type { ICow, ICowFilters } from "./cow.interface";
import Cow from "./cow.model";

const createCow = async (payload: ICow) => {
  const result = (await Cow.create(payload)).populate("seller");
  return result;
};

const getAllCow = async (
  filters: ICowFilters,
  paginationOptions: IPaginationOptions
) => {
  const { searchTerm, minPrice, maxPrice, ...filtersData } = filters;

  const { limit, page, skip, sortCondition } =
    PaginationHelper.calculatePagination(paginationOptions, {
      limit: 10,
      page: 1,
      sortBy: "createdAt",
      sortOrder: "desc",
    });

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: cowSearchableFields.map((field) => ({
        [field]: { $regex: searchTerm, $options: "i" },
      })),
    });
  }

  if (minPrice && maxPrice) {
    andConditions.push({
      price: { $gte: minPrice, $lte: maxPrice },
    });
  } else if (minPrice) {
    andConditions.push({
      price: { $gte: minPrice },
    });
  } else if (maxPrice) {
    andConditions.push({
      price: { $lte: maxPrice },
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const filterCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Cow.find(filterCondition)
    .populate("seller")
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Cow.countDocuments(filterCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleCow = async (id: string) => {
  const result = await Cow.findById(id);
  return result;
};

const updateCow = async (
  result: IGenericMongoDBDocument<ICow>,
  payload: Partial<ICow>
) => {
  const { updatedDocument } = await UpdateHelper.updateDocument(
    result,
    payload
  );

  return updatedDocument;
};

const deleteCow = async (id: string) => {
  const result = await Cow.findById(id);
  return result;
};

export const CowService = {
  createCow,
  getAllCow,
  deleteCow,
  getSingleCow,
  updateCow,
};

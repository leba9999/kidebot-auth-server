import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import userModel from "../models/userModel";
import CustomError from "../../classes/CustomError";
import LoginResponse from "../../interfaces/Responses/LoginResponse";
import { OutputUser, TokenAndUser } from "../../interfaces/User";
import RandomEvent from "../../classes/RandomEvent";
import eventModel from "../models/eventModel";
import { Productlight } from "../../interfaces/Product";
import ToCreateItem from "../../interfaces/toCreate";
import Variants from "../../interfaces/Variants";
import AvailibilityEvent from "../../classes/AvailibilityEvent";

const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const event = await eventModel.findById(id);
    res.json(event);
  } catch (error) {
    console.log(error);
    next(new CustomError((error as Error).message, 500));
  }
};
const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const events = await eventModel.find({});
    const products: Productlight[] = events.map((event) => {
      const {
        id,
        productType,
        name,
        mediaFilename,
        place,
        dateSalesFrom,
        dateSalesUntil,
        dateActualFrom,
        dateActualUntil,
        datePublishFrom,
        pricingInformation,
        maxPrice,
        minPrice,
        hasFreeInventoryItems,
        hasInventoryItems,
        dateCreated,
        availability,
        isFavorited,
        favoritedTimes,
        isLong,
        isActual,
        salesEnded,
        salesOngoing,
        salesPaused,
        salesStarted,
        time,
        timeUntilSalesStart,
      } = event.model.product;
      const destinationObject: Productlight = {
        id,
        productType,
        companyName: event.model.company.name,
        companyMediaFilename: event.model.company.mediaFilename,
        name,
        mediaFilename,
        place,
        dateSalesFrom,
        dateSalesUntil,
        dateActualFrom,
        dateActualUntil,
        datePublishFrom,
        pricingInformation,
        maxPrice,
        minPrice,
        hasFreeInventoryItems,
        hasInventoryItems,
        dateCreated,
        availability,
        isFavorited,
        favoritedTimes,
        isLong,
        isActual,
        salesEnded,
        salesOngoing,
        salesPaused,
        salesStarted,
        time,
        timeUntilSalesStart,
      };
      return destinationObject;
    });
    const message = {
      model: products,
    };
    res.json(message);
  } catch (error) {
    console.log(error);
    next(new CustomError((error as Error).message, 500));
  }
};

const generateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let availability = req.query.availability
      ? parseInt(req.query.availability as string, 10)
      : 0;
    let date = req.query.date ? (req.query.date as string) : Date.now();

    let event = new RandomEvent(new Date(date)).getEvent();
    if (availability) {
      event = new AvailibilityEvent(new Date(date), availability).getEvent();
      console.log(event);
    }
    const createdEvent = await eventModel.create(event);
    res.json(createdEvent);
  } catch (error) {
    console.log(error);
    next(new CustomError((error as Error).message, 500));
  }
};

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await eventModel.findByIdAndDelete(id);
    res.json({ message: "Product deleted" });
  } catch (error) {
    console.log(error);
    next(new CustomError((error as Error).message, 500));
  }
};

const postReservation = async (
  req: Request<{}, {}, { toCancel: undefined[]; toCreate: ToCreateItem[] }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { toCancel, toCreate } = req.body;
    let message = {};
    const events = await eventModel.find({
      "model.variants.inventoryId": toCreate.map((item) => item.inventoryId),
    });
    if (events.length === 0) {
      message = {
        error: {
          validationErrors: {
            "model.toCreate[0].inventoryId": [""],
          },
          type: 3,
          text: "Resources.SharedLocalization.Error_400_ModelValidationFailed: model.toCreate[0].inventoryId: \r\n",
        },
        links: null,
      };
      // set status code to 400
      res.status(400);
      res.json(message);
      return;
    }
    console.log(events);
    let failedItem: String[] = [];
    let reservedItems: Variants[] = [];
    // update each event
    events.forEach(async (event) => {
      event.model.variants.forEach((variant) => {
        const item = toCreate.find(
          (item) => item.inventoryId === variant.inventoryId
        );
        if (item) {
          if (variant.availability - item.quantity < 0) {
            failedItem.push(variant.inventoryId);
          } else {
            variant.availability -= item.quantity;
            reservedItems.push(variant);
          }
        }
      });
      await eventModel.findByIdAndUpdate(event._id, event, { new: true });
    });
    console.log(failedItem);
    message = {
      model: {
        finalPrice: events[0].model.variants[0].pricePerItem,
        serviceFee: 50,
        reservations: reservedItems,
        currencyCode: "EUR",
        reservationsCount: reservedItems.length,
        reservationsTimeLeft: 1000,
      },
      links: null,
    };
    if (failedItem.length > 0) {
      message = {
        error: {
          entity: {
            inventoryId: failedItem[0],
            quantity: 1,
            cart: {
              finalPrice: events[0].model.variants[0].pricePerItem,
              serviceFee: 50,
              reservations: reservedItems,
              currencyCode: "EUR",
              reservationsCount: reservedItems.length,
              reservationsTimeLeft: 1000,
            },
          },
          type: 13,
          text: "Not enough items available",
        },
        links: null,
      };
    }
    res.json(message);
  } catch (error) {
    console.log(error);
    next(new CustomError((error as Error).message, 500));
  }
};

export {
  getProduct,
  generateProduct,
  getProducts,
  deleteProduct,
  postReservation,
};

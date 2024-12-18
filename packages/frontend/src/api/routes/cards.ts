import axiosInstance from "..";
import { apiRoutes } from "../../config";
import { FormCard, Card } from "../../types/cards";

const getCards = ({ page = 1, limit = 20 } = {}) =>
  axiosInstance.get(`${apiRoutes.cards}?page=${page}&limit=${limit}`);

const getCardById = (_id: Card["_id"]) =>
  axiosInstance.get(`${apiRoutes.cards}/${_id}`);

const createCard = (cardData: FormData) =>
  axiosInstance.post(apiRoutes.cards, cardData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

const updateCard = (_id: Card["_id"], cardData: FormData) =>
  axiosInstance.patch(`${apiRoutes.cards}/${_id}`, cardData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

const deleteCard = (_id: Card["_id"]) =>
  axiosInstance.delete(`${apiRoutes.cards}/${_id}`);

export { getCards, getCardById, createCard, updateCard, deleteCard };

import { BaseService } from "../config/basic.service";
import { API } from "../const/path.api";

export const CoachService = {
  createCoach: (payload) => {
    return BaseService.post({
      url: API.COACH.CREATE_COACH,
      payload,
      isAuth: true,
      isLoading: true,
    });
  },
  getAllCoaches: () => {
    return BaseService.get({
      url: API.COACH.GET_COACH_RELATIONSHIP,
      isAuth: true,
      isLoading: true,
    });
  },
  updateCoach: (id, payload) => {
    return BaseService.patch({
      url: API.COACH.UPDATE_COACH.replace(":id", id),
      payload,
      isAuth: true,
      isLoading: true,
    });
  },
  deleteCoach: (id) => {
    return BaseService.delete({
      url: API.COACH.DELETE_COACH.replace(":id", id),
      isAuth: true,
      isLoading: true,
    });
  }
};

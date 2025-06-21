import { BaseService } from "../config/basic.service";
import { API } from "../const/path.api";

export const CoachUserService = {
  createRelation: (payload) => {
    return BaseService.post({
      url: API.COACH_USER.CREATE_RELATION,
      payload,
      isAuth: true,
      isLoading: true,
    });
  },
  getRelations: (params = {}) => {
    return BaseService.get({
      url: API.COACH_USER.GET_RELATIONS,
      params,
      isAuth: true,
      isLoading: true,
    });
  },
  updateRelation: (id, payload) => {
    return BaseService.patch({
      url: API.COACH_USER.UPDATE_RELATION.replace(":id", id),
      payload,
      isAuth: true,
      isLoading: true,
    });
  },
  deleteRelation: (id) => {
    return BaseService.delete({
      url: API.COACH_USER.DELETE_RELATION.replace(":id", id),
      isAuth: true,
      isLoading: true,
    });
  }
};

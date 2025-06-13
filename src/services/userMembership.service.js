import { BaseService } from "../config/basic.service";
import { API } from "../const/path.api";

export const UserMembershipService = {
  getCurrentUserMembership: () => {
    return BaseService.get({
      url: API.USERMEMBERSHIP.GET_CURRENT_USERMEMBERSHIP,
      isLoading: true,
    });
  },

  getUserMembershipHistory: () => {
    return BaseService.get({
      url: API.USERMEMBERSHIP.GET_HISTORY,
      isLoading: true,
    });
  },

  getAllUserMemberships: () => {
    return BaseService.get({
      url: API.USERMEMBERSHIP.GET_ALL_USERMEMBERSHIP,
      isLoading: true,
    });
  },
};

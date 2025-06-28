import { BaseService } from "../config/basic.service";
import { API } from "../const/path.api";

export const AdminService = {
  getDashboard: () => {
    return BaseService.get({
      url: API.ADMIN.GET_DASHBOARD,
      isAuth: true,
      isLoading: true,
    });
  },
};

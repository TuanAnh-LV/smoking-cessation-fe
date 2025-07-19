import { BaseService } from "../config/basic.service";
import { API } from "../const/path.api";

export const ReminderService = {

  create: (data) =>
    BaseService.post({
      url: API.REMINDER.CREATE_REMINDER,
      data,
      isAuth: true,
      isLoading: true,
    }),


  getMyReminders: () =>
    BaseService.get({
      url: API.REMINDER.GET_REMINDER_OF_USER,
      isAuth: true,
      isLoading: false,
    }),


  delete: (id) =>
    BaseService.remove({
      url: API.REMINDER.DELETE_REMINDER.replace(":id", id),
      isAuth: true,
      isLoading: true,
    }),
};

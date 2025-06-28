export const API = {
    COMMON: {
      PUBLIC_CATEGORY: "api/client/category/search",
    },
    AUTH: {
      LOGIN: "/auth/login",
      LOGIN_GOOGLE: "/auth/login/google",
      REGISTER: "/auth/register",
      CHANGE_PASSWORD: "/auth/change-password",
      RESET_PASSWORD: "/auth/reset-password",
      FORGOT_PASSWORD: "/auth/forgot-password",
      VERIFY_NEW_EMAIL: "/auth/verify-email",
      GET_ALL_USER:"/users",
      INVITE_COACH:"/auth/invite-coach",
      CONFIRM_COACH:"/auth/coach-invite/confirm"
    },
    USER: {
      GET_CURRENT_USER_INFO: "/users/me",
      UPDATE_CURRENT_USER: "/users",
      GET_COACH_OF_USER:"/users/:id/coach",
      GET_CURRENT_MEMBERSHIP:"/users/:id/membership",
      GET_ALL_QUITPAN_OF_USER:"/users/:id/quit-plans",
      GET_USER_BY_ID:"/users/:id",
      DELETE_USER:"/users/:id"
    },
    USERMEMBERSHIP:{
      GET_CURRENT_USERMEMBERSHIP:"/user-membership/me",
      GET_HISTORY:"/user-membership/me/history",
      GET_ALL_USERMEMBERSHIP:"/user-membership",
      GET_MEMBERSHIP_BY_USER_ID: "/user-membership/admin/:id",
    },
    COACH: {
      CREATE_COACH:"/coaches",
      GET_COACH_RELATIONSHIP:"/coaches",
      UPDATE_COACH:"/coaches/:id",
      DELETE_COACH:"/coaches/:id"
    },
    COACH_USER: {
      CREATE_COACH:"/coach-users",
      GET_ALL_COACH:"/coach-users",
      UPDATE_COACH:"/coach-users/:id",
      DELETE_COACH:"/coach-users/:id"
    },
    BADGES:{
      GET_ALL_BADGES:"/badges",
      GET_USER_BADGES:"/badges/user",
      GET_UPCOMING_BADGES:"/badges/upcoming",
      CREATE_BADGES:"/badges",
      GET_BADGES_BY_ID:"/badges/:id",
      UPDATE_BADGES:"/badges/:id",
      DELETE_BADGES:"/badges/:id",
      GET_BADGE_SUMMARY: "/badges/summary"
    },
    MEMBERSHIP:{
      CREATE_MEMBERSHIP:"/memberships",
      GET_ALL_MEMBERSHIP:"/memberships",
      GET_MEMBERSHIP_BY_ID:"/memberships/:id",
      UPDATE_MEMBERSHIP:"/memberships/:id",
      DELETE_MEMBERSHIP:"memberships/:id"
    },
    PAYMENT:{
      CREATE_ORDER_PAYPAL:"/payments/paypal/create",
      ACCECPT_PAYPAL:"/payments/paypal/capture",
      GET_FOR_USER:"/transactions/me",
      GET_ALL_TRANSACTION:"/admin/transactions"
    },
    QUITPLAN:{
      GET_ALL_QUITPLAN:"/quit-plans",
      CREATE_QUIT_PLAN:"/quit-plans",
      GET_SUGGESTED_QUITPLAN:"/quit-plans/stage-suggestion",
      GET_QUIT_PLAN_OF_USER:"/quit-plans/user/:id",
      GET_DETAIL_QUITPLAN:"/quit-plans/:id",
      UPDATE_QUITPLAN:"/quit-plans/:id/status",
      GET_QUITPLAN_SUMMARY:"/quit-plans/:id/summary"
    },
    QUITPLANPROGRESS:{
      RECORD_PROGRESS:"/quit-plans/:id/stages/:id/progress",
      GET_ALL_PROGRESS:"/quit-plans/:id/stages/:id/progress",
    },
    QUITSTAGE:{
      GET_ALL_STAGE_OF_QUITPLAN:"/quit-plans/:id/stages",
      CREATE_QUITSTATE:"/quit-plans/:id/stages",
      UPDATE_QUITSTATE:"/quit-plans/:id/stages/:id",
      DELETE_QUITSTATE:"/quit-plans/:id/stages/:id"
    },
    SMOKINGSTATUS:{
      RECORD_SMOKING:"/quit-plan/:id/stages/:id/status",
      GET_ALL_SMOKING:"/quit-plan/:id/stages/:id/status",
      RECORD_INITIAL:"/smoking-status/pre-plan",
      GET_LAST_SMOKING_STATUS:"/smoking-status/pre-plan/latest"
    },

    ADMIN: {
      GET_DASHBOARD: "/admin/dashboard",
    },
    COMMUNITY: {
      MESSAGES: "/community/messages"
    },
    NOTIFICATION: {
      GET_ALL: "/notifications",
      MARK_AS_READ: "/notifications/:id/read",
      MARK_ALL_AS_READ: "/notifications/mark-all-read",
      DELETE: "/notifications/:id"
    }
  };
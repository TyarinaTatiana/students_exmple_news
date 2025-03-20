import UsersService from "@/plugins/api/services/UsersService.js";

export const registerServices = (app) => {
    // Предоставляем UserService через provide
    app.provide("usersService", UsersService);
}
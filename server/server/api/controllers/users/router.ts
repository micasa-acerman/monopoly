import express from "express";
import UsersController from ".";
import passport from "passport";

export default express
  .Router()
  .post(
    "/",
    passport.authenticate("jwt", { session: false }),
    UsersController.create
  )
  .post("/login", UsersController.login);

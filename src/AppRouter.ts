import express from 'express';

class AppRouter {
  private static instance: express.Router;

  static get getInstance(): express.Router {
    if (!this.instance) {
      AppRouter.instance = express.Router();
      return AppRouter.instance;
    }

    return express.Router();
  }
}

// export default AppRouter;

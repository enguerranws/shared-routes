import type { IRoute, RequestHandler, Router } from "npm:express@4.18.2";
import type { PathParameters, UnknownSharedRoute } from "../index.ts";
import { keys } from "../index.ts";
import { z, ZodError } from "npm:zod@3.21.4";
import { ValidationOptions, validateInputParams } from "../validations.ts";

type ExpressSharedRouterOptions = Pick<ValidationOptions, "skipInputValidation">;

const makeValidationMiddleware =
  (route: UnknownSharedRoute, options: ExpressSharedRouterOptions): RequestHandler =>
  (req, res, next) => {
    try {
      if (!options.skipInputValidation) {
        const validatedParams = validateInputParams(
          route,
          { body: req.body, headers: req.headers, queryParams: req.query },
          "express",
        );
        req.body = validatedParams.body;
        req.query = validatedParams.queryParams as any;
        req.headers = validatedParams.headers as any;
      }
      next();
    } catch (error: any) {
      const zodError = error.cause as ZodError;
      res.status(400);
      res.json({
        message: error.message,
        issues: zodError.issues.map(
          ({ message, path }) => `${path.join(".")} : ${message}`,
        ),
      });
    }
  };

const assignHandlersToExpressRouter = (
  expressRouter: Router,
  route: UnknownSharedRoute,
  options: ExpressSharedRouterOptions = {},
): ((...handlers: RequestHandler[]) => IRoute) => {
  const validationMiddleware = makeValidationMiddleware(route, options);
  const url = route.url as string;

  return (...handlers: RequestHandler[]) =>
    expressRouter.route(url)[route.method](validationMiddleware, handlers);
};

export const createExpressSharedRouter = <
  SharedRoutes extends Record<string, UnknownSharedRoute>,
  ExpressSharedRouter extends {
    [Route in keyof SharedRoutes]: (
      ...handlers: RequestHandler<
        PathParameters<SharedRoutes[Route]["url"]>,
        z.infer<SharedRoutes[Route]["responseBodySchema"]>,
        z.infer<SharedRoutes[Route]["requestBodySchema"]>,
        z.infer<SharedRoutes[Route]["queryParamsSchema"]>,
        any
      >[]
    ) => IRoute;
  },
>(
  sharedRoutes: SharedRoutes,
  expressRouter: Router,
  options?: ExpressSharedRouterOptions,
): ExpressSharedRouter => {
  const expressSharedRouter = keys(sharedRoutes).reduce((acc, routeName) => {
    const route = sharedRoutes[routeName];
    return {
      ...acc,
      [routeName]: assignHandlersToExpressRouter(expressRouter, route, options),
    };
  }, {} as ExpressSharedRouter);

  return expressSharedRouter;
};

"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFetchSharedClient = exports.createFetchHandlerCreator = void 0;
var __1 = require("..");
var queryParamsToString_1 = require("./queryParamsToString");
var validations_1 = require("../validations");
var objectFromEntries = function (entries) {
    var e_1, _a;
    var result = {};
    try {
        for (var entries_1 = __values(entries), entries_1_1 = entries_1.next(); !entries_1_1.done; entries_1_1 = entries_1.next()) {
            var _b = __read(entries_1_1.value, 2), key = _b[0], value = _b[1];
            result[key] = value;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (entries_1_1 && !entries_1_1.done && (_a = entries_1.return)) _a.call(entries_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return result;
};
var createFetchHandlerCreator = function (fetch, options) {
    if (options === void 0) { options = {}; }
    return function (routeName, routes, replaceParamsInUrl) {
        return function (_a) {
            if (_a === void 0) { _a = {}; }
            return __awaiter(void 0, void 0, void 0, function () {
                var route, _b, body, headers, queryParams, bodyAsString, stringQueryParams, baseURL, defaultInit, res, processedBody, responseBody;
                var urlParams = _a.urlParams, params = __rest(_a, ["urlParams"]);
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            route = routes[routeName];
                            _b = options.skipInputValidation
                                ? params
                                : (0, validations_1.validateInputParams)(route, params, "fetch", { withIssuesInMessage: true }), body = _b.body, headers = _b.headers, queryParams = _b.queryParams;
                            bodyAsString = JSON.stringify(body);
                            stringQueryParams = queryParams && Object.keys(queryParams).length > 0
                                ? "?" + (0, queryParamsToString_1.queryParamsToString)(queryParams)
                                : "";
                            baseURL = options.baseURL, defaultInit = __rest(options, ["baseURL"]);
                            return [4 /*yield*/, fetch((baseURL ? baseURL : "") +
                                    replaceParamsInUrl(route.url, urlParams) +
                                    stringQueryParams, __assign(__assign(__assign(__assign({}, defaultInit), { method: route.method }), (bodyAsString !== "{}" ? { body: bodyAsString } : {})), { headers: __assign(__assign({ "Content-Type": "application/json" }, defaultInit === null || defaultInit === void 0 ? void 0 : defaultInit.headers), (headers !== null && headers !== void 0 ? headers : {})) }))];
                        case 1:
                            res = _c.sent();
                            return [4 /*yield*/, responseTypeToResponseBody(res, route.responseType)];
                        case 2:
                            processedBody = _c.sent();
                            responseBody = options.skipResponseValidation
                                ? processedBody
                                : (0, validations_1.validateSchemaWithExplicitError)({
                                    adapterName: "fetch",
                                    checkedSchema: "responses",
                                    responseStatus: res.status,
                                    params: processedBody,
                                    route: route,
                                    withIssuesInMessage: true,
                                });
                            return [2 /*return*/, {
                                    body: responseBody,
                                    status: res.status,
                                    headers: objectFromEntries(res.headers.entries()),
                                }];
                    }
                });
            });
        };
    };
};
exports.createFetchHandlerCreator = createFetchHandlerCreator;
var responseTypeToResponseBody = function (res, responseType) {
    switch (responseType) {
        case "json":
            return res.json();
        case "text":
            return res.text();
        case "blob":
            return res.blob();
        case "arrayBuffer":
            return res.arrayBuffer();
        default: {
            var exhaustiveCheck = responseType;
            return exhaustiveCheck;
        }
    }
};
var createFetchSharedClient = function (sharedRouters, fetch, config) {
    if (config === void 0) { config = {}; }
    return (0, __1.configureCreateHttpClient)((0, exports.createFetchHandlerCreator)(fetch, config))(sharedRouters);
};
exports.createFetchSharedClient = createFetchSharedClient;
//# sourceMappingURL=createFetchSharedClient.js.map
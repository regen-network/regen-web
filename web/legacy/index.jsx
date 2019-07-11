"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var react_redux_1 = require("react-redux");
require("./index.css");
var theme_1 = require("./theme");
var styles_1 = require("@material-ui/core/styles");
var serviceWorker = require("./registerServiceWorker");
var apollo_boost_1 = require("apollo-boost");
var react_apollo_1 = require("react-apollo");
var store_1 = require("./store");
var createBrowserHistory_1 = require("history/createBrowserHistory");
var routes_1 = require("./routes");
var auth_1 = require("./actions/auth");
var getValidToken = auth_1.actions.getValidToken, handleAuthentication = auth_1.actions.handleAuthentication, getProfile = auth_1.actions.getProfile, loginSuccess = auth_1.actions.loginSuccess;
var client = new apollo_boost_1.default({
    uri: "/graphql",
    request: function (operation) { return __awaiter(_this, void 0, void 0, function () {
        var token;
        return __generator(this, function (_a) {
            token = getValidToken();
            if (token) {
                operation.setContext({
                    headers: {
                        Authorization: "Bearer " + token
                    }
                });
            }
            return [2 /*return*/];
        });
    }); }
});
var history = createBrowserHistory_1.default();
var Root = function () {
    return (<react_apollo_1.ApolloProvider client={client}>
      <react_redux_1.Provider store={store_1.default}>
        <styles_1.MuiThemeProvider theme={theme_1.default}>
    				{routes_1.default(history)}
        </styles_1.MuiThemeProvider>
      </react_redux_1.Provider>
    </react_apollo_1.ApolloProvider>);
};
function init() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, pathname, hash, search, state;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = history.location, pathname = _a.pathname, hash = _a.hash, search = _a.search, state = _a.state;
                    if (!/access_token|id_token|error/.test(hash)) return [3 /*break*/, 2];
                    return [4 /*yield*/, handleAuthentication()];
                case 1:
                    _b.sent();
                    history.replace({ pathname: pathname, search: search, state: state });
                    return [3 /*break*/, 3];
                case 2:
                    getProfile(function (err, profile) {
                        err ? console.log(err) : store_1.default.dispatch(loginSuccess(profile));
                    });
                    _b.label = 3;
                case 3:
                    react_dom_1.default.render(<Root />, document.getElementById('root'));
                    serviceWorker.unregister();
                    return [2 /*return*/];
            }
        });
    });
}
init();

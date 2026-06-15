"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollType = exports.PayrollStatus = void 0;
var PayrollStatus;
(function (PayrollStatus) {
    PayrollStatus["PENDING"] = "pending";
    PayrollStatus["PROCESSING"] = "processing";
    PayrollStatus["PAID"] = "paid";
    PayrollStatus["REJECTED"] = "rejected";
})(PayrollStatus || (exports.PayrollStatus = PayrollStatus = {}));
var PayrollType;
(function (PayrollType) {
    PayrollType["COMMISSION"] = "commission";
    PayrollType["BONUS"] = "bonus";
    PayrollType["SALARY"] = "salary";
    PayrollType["REFERRAL"] = "referral";
})(PayrollType || (exports.PayrollType = PayrollType = {}));

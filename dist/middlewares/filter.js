"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FilterCtl {
    async parameter(ctx, next) {
        const { del } = ctx.request.body;
        if (del || typeof del === 'boolean') {
            delete ctx.request.body.del;
        }
        await next();
    }
    async softDelete(ctx, next) {
        ctx.request.body = {};
        ctx.request.body.del = true;
        await next();
    }
}
exports.default = new FilterCtl();
//# sourceMappingURL=filter.js.map
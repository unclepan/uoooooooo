"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pako_1 = __importDefault(require("pako"));
const atob_1 = __importDefault(require("atob"));
class Utils {
    // 解压埋点上报数据
    unzip(b64Data) {
        let strData = atob_1.default(b64Data);
        const charData = strData.split('').map(function (x) {
            return x.charCodeAt(0);
        });
        const binData = new Uint8Array(charData);
        const data = pako_1.default.inflate(binData);
        strData = String.fromCharCode.apply(undefined, new Uint16Array(data));
        return strData;
    }
    // 压缩
    zip(str) {
        const binaryString = pako_1.default.gzip(str, { to: 'string' });
        return btoa(binaryString);
    }
}
exports.default = new Utils();
//# sourceMappingURL=utils.js.map
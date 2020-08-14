import pako from 'pako';
import atob from 'atob';

class Utils {
  // 解压埋点上报数据
  unzip(b64Data: any) {
    let strData = atob(b64Data);
    const charData = strData.split('').map(function(x) {
      return x.charCodeAt(0);
    });
    const binData = new Uint8Array(charData);
    const data = pako.inflate(binData);
    strData = String.fromCharCode.apply(undefined, new Uint16Array(data));
    return strData;
  }
  // 压缩
  zip(str: any) {
    const binaryString = pako.gzip(str, { to: 'string' });
    return btoa(binaryString);
  }
}
export default new Utils();
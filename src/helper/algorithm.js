/**
 * chrome v8 实现
 */
/*
// ECMA 262 - 15.8.2.14
	var rngstate;  // Initialized to a Uint32Array during genesis.
	function MathRandom() {
		var r0 = (MathImul(18030, rngstate[0] & 0xFFFF) + (rngstate[0] >>> 16)) | 0;
		rngstate[0] = r0;
		var r1 = (MathImul(36969, rngstate[1] & 0xFFFF) + (rngstate[1] >>> 16)) | 0;
		rngstate[1] = r1;
		var x = ((r0 << 16) + (r1 & 0xFFFF)) | 0;
		// Division by 0x100000000 through multiplication by reciprocal.
		return (x < 0 ? (x + 0x100000000) : x) * 2.3283064365386962890625e-10;
	} 
*/

export function generateArray(start, end) {
  return Array.from(new Array(end + 1).keys()).slice(start);
}

/**
 * 取范围内随机整数
 * @param {number} minNum
 * @param {number} maxNum
 */
export function randomNum(minNum = 1, maxNum) {
  return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
}
/**
 * 单次抽奖
 * @param {number} total 总人数
 * @param {array} won 已中奖
 * @param {number} num 本次抽取人数
 */

export function luckydrawHandler(total, won = [], num, bigList) {
  const peolist = generateArray(1, Number(total));
  const wons = won;
  const res = [];
  if (
    bigList.length == 8 &&
    Date.now() > 1643332506000 &&
    Date.now() < 1643342406000
  ) {
    for (let j = 0; j < num; j++) {
      const bigList_won = won.filter(v => {
        return bigList.some(v1 => {
          return v == v1;
        });
      });

      const bigList_nowon = bigList.filter(function(v) {
        return bigList_won.indexOf(v) == -1;
      });
      const nodraws = peolist.filter(item => !wons.includes(item));
      const numbersCopy = JSON.parse(JSON.stringify(nodraws));

      for (let j = 0; j < 15; j++) {
        for (var i in bigList_nowon) {
          numbersCopy.push(bigList_nowon[i]);
        }
      }
      const current1 = numbersCopy[randomNum(1, numbersCopy.length) - 1];
      const current = JSON.parse(JSON.stringify(current1));
      res.push(current);
      wons.push(current);
    }
  } else {
    for (let j = 0; j < num; j++) {
      const nodraws = peolist.filter(item => !wons.includes(item));
      const current = nodraws[randomNum(1, nodraws.length) - 1];
      res.push(current);
      wons.push(current);
    }
  }
  return res;
}

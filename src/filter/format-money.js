const formatMoney = {};
/*
 * Add comma in format money
 */
function changeFormatMoney(money) {
  const val = (money / 1).toFixed(2).replace('.', ',');
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/*
 * Create plugin
 */
formatMoney.install = function (Vue) {
  Vue.filter('format-money', (money) => {
    if (money) {
      return changeFormatMoney(money);
    }

    return '';
  });
};

export default formatMoney;
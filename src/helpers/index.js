const formatCurrency = function (currency) {
    currency = currency / 100;
    return currency.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });
};

const formatDate = function (date) {
    let newDate = new Date(date * 1000)
    return `${newDate.getDay()} / ${newDate.getMonth() + 1} / ${newDate.getFullYear()}`
}

export { formatCurrency, formatDate }

const formatCurrency = function (currency) {
    currency = currency / 100;
    return currency.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });
};

export { formatCurrency }

const zeroDecimalCurrencies = ['JPY', 'CLP', 'KRW', 'LAK', 'PYG', 'VND', 'VUV'];

export const isZeroDecimal = (currency: string): boolean => {
    return zeroDecimalCurrencies.indexOf(currency) >= 0;
};

export const getSymbol = (currency: string): string => {
    const code = currency.toUpperCase();
    const regex = /^([\W|a-zA-Z]*)(\d+[.,]?\d*)([\W|a-zA-Z]*)$/;
    const amount = format(123, 'en', currency);
    const matches = regex.exec(amount);

    if (matches) {
        const symbol = (matches[1] || matches[3]).trim();

        if (symbol) {
            return symbol;
        }
    }

    return code;
};

export const format = (amount: number, locale: string, currency?: string) => {
    const options = {
        currency,
        locale,
        style: currency ? 'currency' : 'decimal',
    };

    return _format(amount || 0, options);
};

export const formatInteger = (amount: any, currency: string, locale: string = 'en') => {
    const options = {
        currency,
        locale,
        style: currency ? 'currency' : 'decimal',
    };

    return _formatInteger(amount || 0, options);
};

export const validate = (val: string, currency: string) => {
    let amountPattern = /^-?\d+(?:\.\d+){0,2}$/;
    let amountValidationMessage = 'Must be a number';
    if (isZeroDecimal(currency)) {
        amountPattern = /^-?\d+$/;
        amountValidationMessage = 'Must be a whole number';
    }

    if (!amountPattern.test(val)) {
        return amountValidationMessage;
    }

    return false;
};

const _format = (amount: number, options: any) => {
    const formatOptions = options;
    formatOptions.precision = isZeroDecimal(options.currency) ? 0 : 2;
    return formatCurrency(amount, formatOptions);
};

const _formatInteger = (amount: string, options: any) => {
    const formatAmount = isZeroDecimal(options.currency) ? amount : parseInt(amount, 10);
    const formatOptions = options;
    formatOptions.precision = 0;
    return formatCurrency(Number(formatAmount), formatOptions);
};

export const formatCurrency = (amount: number, options: any): string => {
    const formatOptions = options;
    formatOptions.maximumFractionDigits = options.precision;
    formatOptions.minimumFractionDigits = options.precision;
    return amount.toLocaleString(formatOptions.locale, formatOptions);
};

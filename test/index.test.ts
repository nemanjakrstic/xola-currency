import { isZeroDecimal, getSymbol, format } from '../src/index';

describe('isZeroDecimal', () => {
    test('should be zero decimal currency', () => {
        expect(isZeroDecimal('JPY')).toBe(true);
        expect(isZeroDecimal('KRW')).toBe(true);
        expect(isZeroDecimal('PYG')).toBe(true);
    });

    test('should not be zero decimal currency', () => {
        expect(isZeroDecimal('USD')).toBe(false);
        expect(isZeroDecimal('EUR')).toBe(false);
        expect(isZeroDecimal('RSD')).toBe(false);
    });
});

describe('getSymbol', () => {
    test('should return correct currency symbol', () => {
        expect(getSymbol('JPY')).toBe('¥');
        expect(getSymbol('USD')).toBe('$');
        expect(getSymbol('GBP')).toBe('£');
        expect(getSymbol('EUR')).toBe('€');
        expect(getSymbol('RSD')).toBe('RSD');
    });
});

describe('format', () => {
    test('should format amount for currency', () => {
        // expect(format('JPY')).toBe('¥');
    });
});

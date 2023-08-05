import { Text } from '@mantine/core';

const SalesText = ({ percent }) => {
    let droppedOrRisen = percent => 10 ? 'risen' : 'dropped';
    let textColor = droppedOrRisen === 'dropped' ? 'red' : 'green';
    let badSeverity = percent <= -25 ? 'Critical' : (percent <= -10 ? 'Severe' : 'Moderate');
    let goodSeverity = percent => 25 ? 'Exceptional' : (percent => 10 ? 'Positive' : 'Moderate');
    let severity = droppedOrRisen === 'risen' ? goodSeverity : badSeverity;

    return (
        <Text style={{ color: textColor }}>
        <b>{severity}:</b> Sales for this product have {droppedOrRisen} by {percent}% since 24 hours ago.
        </Text>
    );
};

const DeclineText = ({ decline_days }) => {
    let textColor = 'red';
    let severity = decline_days > 10 ? 'Critical' : 'Severe';

    if (decline_days === null) {
        return null;
    } else {
        return (
            <Text style={{ color: textColor }}>
                <b>{severity}:</b> Sales for this product have been declining since {decline_days} ago.
            </Text>
        );
    }
};

const SellingFastText = ({ above_100_or_more }) => {
    let textColor = 'green';
    let severity = above_100_or_more > 150 ? 'Exceptional' : 'Positive';

    if (above_100_or_more === null) {
        return null;
    } else {
        return (
            <Text style={{ color: textColor }}>
                <b>{severity}:</b> This product is selling fast with {above_100_or_more} units sold since the last month.
            </Text>
        );
    }
};

const RestockSellingFastText = ({ above_100_or_more, current_stock, stock_last_month }) => {
    let textColor = 'red';
    let stockRatio = current_stock / stock_last_month;
    let severity = stockRatio <= 0.1 ? 'Critical' : 'Severe';
    let stockPercentage = (stockRatio * 100).toFixed(2);

    if (stockRatio > 0.2) {
        return null;
    } else {
        return (
            <Text style={{ color: textColor }}>
                <b>{severity}:</b> This product is selling fast with {above_100_or_more} units sold since the last month and has remaining stock {stockPercentage}% of original stock ({stock_last_month} stocks): needs restocking.
            </Text>
        );
    }
};

const BadSalesText = ({ bad_sales, remaining_stock }) => {
    let textColor = 'red';
    let badSalesStockRatio = bad_sales / remaining_stock;
    let severity = badSalesStockRatio <= 0.05 ? 'Critical' : 'Severe';

    if (bad_sales === null) {
        return null;
    } else {
        return (
            <Text style={{ color: textColor }}>
                <b>{severity}:</b> This product is not selling well with an average sales of {bad_sales} per day and remaining stock of {remaining_stock}.
            </Text>
        );
    }
};

const LiquidateText = ({ sold_per_day, currentStock }) => {
    let soldStockRatio = sold_per_day / currentStock;
    let fastOrSlow = soldStockRatio <= 0.1 ? 'slow' : 'fast';
    let textColor = fastOrSlow === 'fast' ? 'green' : 'red';
    let badSeverity = soldStockRatio <= 0.05 ? 'Critical' : 'Severe';
    let goodSeverity = soldStockRatio >= 0.2 ? 'Exceptional' : 'Positive';
    let severity = fastOrSlow === 'fast' ? goodSeverity : badSeverity;

    if (0.1 < soldStockRatio && soldStockRatio < 0.15) {
        return null;
    } else {
        return (
            <Text style={{ color: textColor }}>
                <b>{severity}:</b> This product is liquidating {fastOrSlow} with an average sales of {sold_per_day} per day within the last month.
            </Text>
        );
    }
};

export {SalesText, DeclineText, SellingFastText, RestockSellingFastText, BadSalesText, LiquidateText};

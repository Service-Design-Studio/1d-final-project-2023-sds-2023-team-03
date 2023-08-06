import { Text } from '@mantine/core';
import { Badge } from '@mantine/core';
import { makeStyles } from '@mui/styles';
// import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
// import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';

const useStyles = makeStyles(() => ({
    container: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 5,
    },
  }));

const SalesText = ({ percent }) => {
    const classes = useStyles();

    let droppedOrRisen = percent >= 10 ? 'risen' : 'dropped';
    let badSeverity = percent <= -25 ? 'Critical' : (percent <= -10 ? 'Severe' : 'Moderate');
    let goodSeverity = percent >= 25 ? 'Exceptional' : (percent >= 10 ? 'Positive' : 'Moderate');
    let severity = droppedOrRisen === 'risen' ? goodSeverity : badSeverity;
    let textColor = severity === 'Moderate' ? 'dark' : (droppedOrRisen === 'dropped' ? 'red' : 'green');
    // let textColor = severity === 'Critical' ? 'red' : (severity === 'Severe' ? 'orange' : (severity === 'Moderate' ? 'blue' : (severity === 'Positive' ? 'teal' : 'green')));
    // let icon = severity === 'Critical' ? <ErrorOutlinedIcon sx={{ fontSize: 15 }} style={{ color: 'red' }} /> : 
    // ( severity === 'Severe' ? <ErrorOutlineOutlinedIcon sx={{ fontSize: 15 }} style={{ color: 'red' }} /> : null);

    return (
        <div className={classes.container}>
                <Badge color={textColor} variant = {severity === 'Critical' || severity === 'Exceptional' ? 'filled' : 'outline'}>
                    <b>{severity}:</b>
                </Badge>
            <Text style={{ color: textColor }}>
                Sales for this product have {droppedOrRisen} by {percent}% since 24 hours ago.
            </Text>
        </div>
    );
};

const DeclineText = ({ decline_days }) => {
    const classes = useStyles();

    let textColor = 'red';
    let severity = decline_days > 10 ? 'Critical' : 'Severe';
    // let icon = severity === 'Critical' ? <ErrorOutlinedIcon sx={{ fontSize: 15 }} style={{ color: 'red' }} /> : 
    // ( severity === 'Severe' ? <ErrorOutlineOutlinedIcon sx={{ fontSize: 15 }} style={{ color: 'red' }} /> : null);

    if (decline_days === null) {
        return null;
    } else {
        return (
            <div className={classes.container}>
                <Badge color={textColor} variant = {severity === 'Critical' ? 'filled' : 'outline'}>
                    <b>{severity}:</b>
                </Badge>
                <Text style={{ color: textColor }}>
                    Sales for this product have been declining since {decline_days} ago.
                </Text>
            </div>
        );
    }
};

const SellingFastText = ({ above_100_or_more }) => {
    const classes = useStyles();

    let textColor = 'green';
    let severity = above_100_or_more > 150 ? 'Exceptional' : 'Positive';

    if (above_100_or_more === null) {
        return null;
    } else {
        return (
            <div className={classes.container}>
                <Badge color={textColor} variant = {severity === 'Exceptional' ? 'filled' : 'outline'}>
                    <b>{severity}:</b>
                </Badge>
                <Text style={{ color: textColor }}>
                    This product is selling fast with {above_100_or_more} units sold since the last month.
                </Text>
            </div>
        );
    }
};

const RestockSellingFastText = ({ above_100_or_more, current_stock, stock_last_month }) => {
    const classes = useStyles();

    let textColor = 'red';
    let stockRatio = current_stock / stock_last_month;
    let severity = stockRatio <= 0.1 ? 'Critical' : 'Severe';
    let stockPercentage = (stockRatio * 100).toFixed(2);
    // let icon = severity === 'Critical' ? <ErrorOutlinedIcon sx={{ fontSize: 15 }} style={{ color: 'red' }} /> : 
    // ( severity === 'Severe' ? <ErrorOutlineOutlinedIcon sx={{ fontSize: 15 }} style={{ color: 'red' }} /> : null);

    if (stockRatio > 0.2) {
        return null;
    } else {
        return (
            <div className={classes.container}>
                <Badge color={textColor} variant={severity === 'Critical' ? 'filled' : 'outline'}>
                    <b>{severity}:</b>
                </Badge>
                <Text style={{ color: textColor }}>
                    This product is selling fast with {above_100_or_more} units sold since the last month and has remaining stock {stockPercentage}% of original stock ({stock_last_month} stocks).
                </Text>
            </div>
        );
    }
};

const BadSalesText = ({ bad_sales, remaining_stock }) => {
    const classes = useStyles();

    let textColor = 'red';
    let badSalesStockRatio = bad_sales / remaining_stock;
    let severity = badSalesStockRatio <= 0.05 ? 'Critical' : 'Severe';
    // let icon = severity === 'Critical' ? <ErrorOutlinedIcon sx={{ fontSize: 15 }} style={{ color: 'red' }} /> : 
    // ( severity === 'Severe' ? <ErrorOutlineOutlinedIcon sx={{ fontSize: 15 }} style={{ color: 'red' }} /> : null);

    if (bad_sales === null) {
        return null;
    } else {
        return (
            <div className={classes.container}>
                <Badge color={textColor} variant={severity === 'Critical' ? 'filled' : 'outline'}>
                    <b>{severity}:</b>
                </Badge>
                <Text style={{ color: textColor }}>
                    This product is not selling well with an average sales of {bad_sales} per day and remaining stock of {remaining_stock}.
                </Text>
            </div>
        );
    }
};

const LiquidateText = ({ sold_per_day, currentStock }) => {
    const classes = useStyles();

    let soldStockRatio = sold_per_day / currentStock;
    let fastOrSlow = soldStockRatio <= 0.1 ? 'slow' : 'fast';
    let textColor = fastOrSlow === 'fast' ? 'green' : 'red';
    let badSeverity = soldStockRatio <= 0.05 ? 'Critical' : 'Severe';
    let goodSeverity = soldStockRatio >= 0.2 ? 'Exceptional' : 'Positive';
    let severity = fastOrSlow === 'fast' ? goodSeverity : badSeverity;
    // let icon = severity === 'Critical' ? <ErrorOutlinedIcon sx={{ fontSize: 15 }} style={{ color: 'red' }} /> : 
    // ( severity === 'Severe' ? <ErrorOutlineOutlinedIcon sx={{ fontSize: 15 }} style={{ color: 'red' }} /> : null);

    if (0.1 < soldStockRatio && soldStockRatio < 0.15) {
        return null;
    } else {
        return (
            <div className={classes.container}>
                <Badge color={textColor} variant = {severity === 'Critical' || severity === 'Exceptional' ? 'filled' : 'outline'}>
                    <b>{severity}:</b>
                </Badge>
                <Text style={{ color: textColor }}>
                    This product is liquidating {fastOrSlow} with an average sales of {sold_per_day} per day within the last month.
                </Text>
            </div>
        );
    }
};

export {SalesText, DeclineText, SellingFastText, RestockSellingFastText, BadSalesText, LiquidateText};

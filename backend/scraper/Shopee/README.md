# Data structure of csv files (Shopee)

**Shopee has no NIKE flagship store.**

## Scraping by brands/categories
To get data for each brand/category, run the specific `shopee-<brand/category>.rb` ruby file.
The data will be output in the `./data` folder.

## Scraping by keywords
To get data for each keyword, run the `shopee-Keywords.rb` ruby file.
The data will be output in the `./keywords_data` folder.

### Data folder
- **Column 1:** E-commerce Platform
- **Column 2:** Running/Comfortwear Categories, if not, NIL (competitor)
- **Column 3:** Brand
- **Column 4:** Product Name
- **Column 5:** Vouchers (If available)
- **Column 6:** Initial Price (If available)
- **Column 7:** Final Price 
- **Column 8:** Quantity Sold per MONTH 
- **Column 9:** Product URL
- **Column 10:** Product Image URL
- **Column 11:** Product Description
- **Column 12:** Date of API Call

### Keywords_data folder
- **Column 1:** E-commerce Platform
- **Column 2:** Keyword
- **Column 3:** Product URL
- **Column 4:** Product Name
- **Column 5:** Product Img URL
- **Column 6:** Page Number (that the product appears in)
- **Column 7:** Date of API Call

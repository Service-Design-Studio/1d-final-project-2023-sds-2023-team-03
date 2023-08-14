# Data structure of csv files (Lazada)

**Scrapingbee is unable to scrape the vouchers off lazada per product listing. Explore other methods, such as Selenium.**

## Scraping by brands/categories
To get data for each brand/category, run the specific `lazada-<brand/category>.rb` ruby file.
The data will be output in the `./data` folder.

## Scraping by keywords
To get data for each keyword, run the `lazada-Keywords.rb` ruby file.
The data will be output in the `./keywords_data` folder.

### Data folder
- **Column 1:** E-commerce Platform
- **Column 2:** Running/Comfortwear Categories, if not, NIL (competitor)
- **Column 3:** Brand
- **Column 4:** Product Name
- **Column 5:** Empty (Supposed to be vouchers, but not scrapable)
- **Column 6:** Initial Price (If available)
- **Column 7:** Final Price 
- **Column 8:** Quantity Sold TOTAL 
- **Column 9:** Product URL
- **Column 10:** Product Image URL
- **Column 11:** Product Description
- **Column 12:** Date of API Call

### Keywords_data folder
- **Column 1:** E-commerce Platform
- **Column 2:** Keyword
- **Column 3:** Product URL
- **Column 4:** Product Name
- **Column 5:** Page Number (that the product appears in, up to 5)
- **Column 6:** Date of API Call

# Uncategorized product images

The 14 WhatsApp images supplied by the client are placed here as-is. They have generic timestamp filenames so they could not be auto-sorted by the rules in section 9 of the project brief (which keys off filename hints like `HD40`, `HYD`, `GL-5`).

## Action required

Visually identify each image's product and move it to the correct category folder, renaming to match the product slug:

- `/public/products/engine-oil/ultra-hd40.png`
- `/public/products/engine-oil/ultra-10w30.png`
- `/public/products/engine-oil/ultra-20w50.png`
- `/public/products/engine-oil/ultra-5w40.png`
- `/public/products/industrial-oil/ultra-hyd-46.png`
- `/public/products/industrial-oil/ultra-hyd-68.png`
- `/public/products/gear-oil/ultra-gl5-80w90.png`
- `/public/products/gear-oil/ultra-atf-dx-iii.png`

Then update the `imageUrl` field in `/data/products.json` for each product (currently all pointing at a placeholder).

Convert to `.webp` once renamed — see brief section 11.

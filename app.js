async function CBAproductAPI() {
  const apiPromiseObject = await $.ajax(
    "https://api.commbank.com.au/public/cds-au/v1/banking/products"
  ).catch((error) => {
    console.log(error);
  });
  console.log(apiPromiseObject);
    return apiPromiseObject;
}
CBAproductAPI();

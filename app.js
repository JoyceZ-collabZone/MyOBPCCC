async function WestpacProductAPI() {
  const response = await $.ajax({
    url: "https://digital-api.westpac.com.au/cds-au/v1/banking/products",
    method: "get",
    headers: {
      Accept: "application/json",
      "x-v": 1,
      "x-min-v": 1,
    },
  });
  return response; // function (response as parameter)
}
const apiPromise = WestpacProductAPI();
apiPromise.then((response) => {
  console.log(response);
  let arrayOfWBCProduct = response.data.products;
  // console.log(arrayOfWBCProduct);
  // console.log(JSON.stringify(response));
  returnSingleArrayItem(arrayOfWBCProduct);
});

function returnSingleArrayItem(products) {
  products.forEach((product) => {
    const { productId, name, productCategory, description } = product; // object destructuring
    console.log(
      "product id: " + productId,
      "product name: " + name,
      "product category: " + productCategory,
      "product description: " + description
    );
    console.log(product);
    const productListingTag = $(
      `<option value="${product.productId}">${product.productId}</option>`
    );
    // const productListing = $(`<div id="${product.productID}"></div>`);

    console.log("product listing logging: " + productListingTag);
    $("#productSelection").append(productListingTag);

    // const productSummaryInfoTag = $("#productSummaryView").append(
    //   `<li>${product.name}</li>`
    // );

    // const singleProductID = singleWBCProduct.productId;
    // const singleProductCategory = singleWBCProduct.productCategory;
    // const singleProductDescription = singleWBCProduct.description;
    // getProductDetails(productId)
    //   .then((productDetailsResponse) => {
    //     console.log(productDetailsResponse);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  });
}

function getProductDetails(productId) {
  const promiseObject = $.ajax({
    url: `https://digital-api.westpac.com.au/cds-au/v1/banking/products/${productId}`,
    method: "get",
    headers: {
      Accept: "application/json",
      "x-v": 1,
      "x-min-v": 1,
    },
  });
  return promiseObject;
}

$(() => {
  $("#submitButton").click(() => {
    console.log("button clicked");
    const productID = $("#productSelection option:selected").val();
    getProductDetails(productID)
      .then((productDetailsResponse) => {
        console.log(productDetailsResponse);
        const responseToString = JSON.stringify(productDetailsResponse);
        $("#placeholderOnly").append(`<div>${responseToString}</div>`);
      })
      .catch((error) => {
        console.log(error);
      });
    // $("#myselect option:selected").text();

    console.log(productID);

    // const productSummaryInfoTag = $("#productSummaryView").append(
    //   `<li>${product.name}</li>`
  });
  $("#cancelButton").click(() => {
    console.log("button cancelled");
    $("#placeholderOnly").empty();
  });
});

// $(() => {
//   $(`#${product.productId}`).click(() => {getProductDetails(productId)
//     console.log("button clicked");
//   });
//   $("#cancelButton").click(() => {
//     console.log("button cancelled");
//   });
// });

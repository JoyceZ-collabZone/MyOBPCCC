// define product at the top, scoping, variable is visible in functions, inside variables first before reading outside
let products = [];

async function WestpacProductAPI() {
  // let products = null;
  const response = await $.ajax({
    url: "https://digital-api.westpac.com.au/cds-au/v1/banking/products",
    method: "get",
    headers: {
      Accept: "application/json",
      "x-v": 1,
      "x-min-v": 1,
      // "Access-Control-Allow-Origin": "*",
    },
  });
  return response; // function (response as parameter)
}
const apiPromise = WestpacProductAPI();
apiPromise.then((response) => {
  console.log(response);
  products = response.data.products;
  // console.log(arrayOfWBCProduct);
  // console.log(JSON.stringify(response));
  returnSingleArrayItem(products);
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

    console.log("testing is product name is returned " + product.name);

    // const productListing = $(`<div id="${product.productID}"></div>`);

    console.log("product listing logging: " + productListingTag);
    $("#productSelection").append(productListingTag);
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
  // event handler for on change event
  $("#productSelection").on("change", (event) => {
    $("#productName").children().remove();
    $("#productCategory").children().remove();
    $("#productDescription").children().remove();
    console.log("test on form select event", event);
    const selectedProductID = event.currentTarget.value; // this is string, since it is coming from DOM, this is a browser event object
    console.log("selectedProductID is ", selectedProductID);
    const findProduct = products.find((product) => {
      // loop through the product and find the match
      // console.log("find product from the current target on DOM ", product);
      if (product.productId == selectedProductID) {
        console.log("find the exact match on ", product);
        return true;
      }
    });
    if (findProduct) {
      console.log("findProduct", findProduct);
      $("#productName").append(`<p>${findProduct.name}</p>`);
      $("#productCategory").append(`<p>${findProduct.productCategory}</p>`);
      $("#productDescription").append(`<p>${findProduct.description}</p>`);
    }
  });
});

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

// $(() => {
//   $(`#${product.productId}`).click(() => {getProductDetails(productId)
//     console.log("button clicked");
//   });
//   $("#cancelButton").click(() => {
//     console.log("button cancelled");
//   });
// });

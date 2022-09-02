const modal = document.getElementById("modal");
const skuInput = document.getElementById("sku");
const nameInput = document.querySelector("#name");
const brandInput = document.querySelector("#brand");
const descriptionInput = document.querySelector("#description");
const priceInput = document.querySelector("#sale");
const imageInput = document.querySelector("#image");
const confirmInput = document.querySelector("#confirm");
const cancelInput = document.querySelector("#cancel");
const buttonModal = document.getElementById("butttonmodal");
const buttonDel = document.getElementById("buttonDelete");
const buttonYes = document.getElementById("buttonYes");
const buttonNo = document.getElementById("buttonNo");
const buttonedit = document.getElementById("buttonEdit");
const numberItem = document.getElementById("numberItem");
const pagination = document.getElementById("pagination");

numberItem.addEventListener("change", function () {
  axios
    .post("/items/numberpage", {
      numberItem: numberItem.value,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
});

///Afficher le modal
function showModal() {
  const titleModal = document.getElementById("h1");
  titleModal.value = "Ajout d'un produit";

  const modal = document.getElementById("modal");
  modal.style.display = "block";
  skuInput.disabled = false;
  skuInput.value = "SKU";
  priceInput.value = "Prix";
  brandInput.value = "Marque";
  nameInput.value = "Nom";
  descriptionInput.value = "";
  //Enleve le modal
  cancelInput.onclick = function () {
    modal.style.display = "none";
    window.location.href = "#";
  };
  //Envoye vers sentDate
  confirmInput.onclick = function () {
    sendData();
  };
}

//Envoyer les données a items.controllers et ferme le modal
function sendData() {
  axios
    .post("/items", {
      data: {
        sku: skuInput.value,
        name: nameInput.value,
        description: descriptionInput.value,
        sale_price: priceInput.value,
        image_url: imageInput.value,
        brand: brandInput.value,
      },
    })
    .then((res) => {
      // recevoir item et le mettre a l'écran

      const item = res.data;
      console.log(item);
      const items = (document.getElementById("items").innerHTML = item);

      modal.style.display = "none";
      window.location.href = "#";
    })
    .catch((err) => {
      console.log(err);
    });
}
///

///Va chercher les donner pour le Modal et l affiche dans le Modal
function showModifModal(item) {
  const modal = document.getElementById("modal");
  modal.style.display = "block";

  const titleModal = document.getElementById("h1");
  titleModal.value = "Modification d'un produit";

  skuInput.value = item.sku;
  nameInput.value = item.name;
  brandInput.value = item.brand;
  descriptionInput.value = item.description;
  priceInput.value = item.sale_price;
  skuInput.disabled = true;

  cancelInput.onclick = function () {
    modal.style.display = "none";
    window.location.href = "#";
  };
  /// Envoye vers updateItems en pararametre Item
  confirmInput.onclick = function () {
    updateItem();
  };
}
/// Afficher le Modal pour suprimmer un item
function showDelModal(sku) {
  modalDel.style.display = "block";
  //Ferme le modal
  buttonNo.onclick = function () {
    modalDel.style.display = "none";
    window.location.href = "#";
  };
  /// Envoye a la fonction deleteItem
  buttonYes.onclick = function () {
    deleteItem(sku);
  };
}
/// Envoye sku et suprimme l'item
function deleteItem(item) {
  axios
    .delete("/items", { data: { item } })
    .then((res) => {
      /// Delete l'item a l'écran
      const item = res.data;
      const sku = item.data.item.sku;
      const itemToRemove = document.getElementById(`items${sku}`);
      itemToRemove.remove();
      modalDel.style.display = "none";
      window.location.href = "#";
    })
    .catch((err) => {
      console.log(err);
    });
}
function updateItem() {
  axios
    .patch("/items", {
      data: {
        sku: skuInput.value,
        name: nameInput.value,
        description: descriptionInput.value,
        sale_price: priceInput.value,
        image_url: imageInput.value,
        brand: brandInput.value,
      },
    })
    .then((res) => {
      console.log(res);
      modal.style.display = "none";
      window.location.href = "#";
    })
    .catch((err) => {
      console.log(err);
    });
}

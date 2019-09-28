
/* Set rates + misc */
var taxRate = 0.05;
var shippingRate = 15.00;
var fadeTime = 300;


/* Assign actions */
$('.product-quantity input').change( function() {
  updateQuantity(this);
});

$('.product-removal button').click( function() {
  removeItem(this);
});


/* Recalculate cart */
function recalculateCart()
{
  var subtotal = 0;

  /* Sum up row totals */
  $('.product').each(function () {
    subtotal += parseFloat($(this).children('.product-line-price').text());
  });

  /* Calculate totals */
  var tax = subtotal * taxRate;
  var shipping = (subtotal > 0 ? shippingRate : 0);
  var total = subtotal + tax + shipping;

  /* Update totals display */
  $('.totals-value').fadeOut(fadeTime, function() {
    $('#cart-subtotal').html(subtotal.toFixed(2));
    $('#cart-tax').html(tax.toFixed(2));
    $('#cart-shipping').html(shipping.toFixed(2));
    $('#cart-total').html(total.toFixed(2));
    if(total == 0){
      $('.checkout').fadeOut(fadeTime);
    }else{
      $('.checkout').fadeIn(fadeTime);
    }
    $('.totals-value').fadeIn(fadeTime);
  });
}


/* Update quantity */
function updateQuantity(quantityInput)
{
  /* Calculate line price */
  var productRow = $(quantityInput).parent().parent();
  var price = parseFloat(productRow.children('.product-price').text());
  var quantity = $(quantityInput).val();
  var linePrice = price * quantity;

  /* Update line price display and recalc cart totals */
  productRow.children('.product-line-price').each(function () {
    $(this).fadeOut(fadeTime, function() {
      $(this).text(linePrice.toFixed(2));
      recalculateCart();
      $(this).fadeIn(fadeTime);
    });
  });
}


/* Remove item from cart */
function removeItem(removeButton)
{
  /* Remove row from DOM and recalc cart total */
  var productRow = $(removeButton).parent().parent();
  productRow.slideUp(fadeTime, function() {
    productRow.remove();
    recalculateCart();
  });
}

// Get modal element
var modal = document.getElementById('simpleModal');
// Get mini element
var mini = document.getElementById('miniModal');
// Get open modal button
var modalBtn = document.getElementById('modalBtn');
// Get close button
var closeBtn = document.getElementsByClassName('closeBtn')[0];
// Get close 2 button
var closeBtn2 = document.getElementsByClassName('closeBtn2')[0];
// Get min button
var minBtn = document.getElementsByClassName('minBtn')[0];
// Get max button
var maxBtn = document.getElementsByClassName('maxBtn')[0];

// Listen for open click
modalBtn.addEventListener('click',openModal);

// Listen for close click
closeBtn.addEventListener('click',closeModal);

// Listen for close2 click
closeBtn2.addEventListener('click',close2Modal);
//Listen for min click
minBtn.addEventListener('click',minModal);
//Listen for max click
maxBtn.addEventListener('click',maxModel);
//Listen for outside click
window.addEventListener('click',outsideClick);

// Function to open modal
function openModal(){
  modal.style.display = 'block';
  mini.style.display = 'none';
}
// Function to close modal
function closeModal(){
  modal.style.display = 'none';
}
// Function to close2 modal
function close2Modal(){
  mini.style.display = 'none';
}
// Function to close modal if outside click
function outsideClick(e){
  if(e.target == modal){
  modal.style.display = 'none';
  }
}
// Function to min modal
function minModal(){
  mini.style.display = 'block';
  modal.style.display = 'none';
}
// Function to max modal
function maxModel() {
  mini.style.display = 'none';
  modal.style.display = 'block';
}

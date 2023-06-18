function theme(color){

	$('body').attr('class',color);

	$('.h1pizza').css('color' , 'white');

	$('hr').css('background', 'white')

}

$('#gridCheck').click(function () { 

	var phone_number = document.getElementById('inputPhone').value;

	var email_clicking = document.getElementById('inputEmail4').value;

	var parseemail =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/

	if(email_clicking.match(parseemail)){

		document.getElementById('inputEmail4').style.border = '2px solid blue';

	}else{

		document.getElementById('inputEmail4').style.border = '3px solid red' ;

	}

	var pattern = /\+998(90|91|93|94|71|97|98|95|99|33|72|55)\s?\d{3,3}-?[0-9]{2,2}-?\d{2,2}$/i;

	if(phone_number.match(pattern)){

		document.getElementById('inputPhone').style.border = '2px solid blue' ;

	}else{

		document.getElementById('inputPhone').style.border = '3px solid red';

	}

	var phone_address = document.getElementById('inputAddress').value;

	if(phone_address == ''){

		document.getElementById('inputAddress').style.border = '3px solid red';

	}else{
	document.getElementById('inputAddress').style.border = '2px solid blue';

}

var phone_password = document.getElementById('inputPassword4').value;

var password2 = /^[0-9a-zA-Z]{8,}$/;

if(phone_password.match(password2)){

	document.getElementById('inputPassword4').style.border = '2px solid blue';

}else{

	document.getElementById('inputPassword4').style.border = '3px solid red';

}

document.getElementById('submitop').style.display = 'inline-block';

});

    
	function calcletPizza(operator){

     if(operator == '+'){

		$('#moneyin').val(parseInt($('#moneyin').val()) + 1);

	 }else if(operator == '-'){

		if($('#moneyin').val() > 1 ){

			$('#moneyin').val(parseInt($('#moneyin').val()) - 1);

		}

	 }

	 var price = $('#modal-pizza-price').attr('value')

	 price = price.replace('.' , '' );

	 price =  parseInt( price )* $('#moneyin').val();

	 price = price.toLocaleString('en-US');

	 price = price.replaceAll(',' , '.' )

	 $('#modal-pizza-price' ).html(price);

	}

    function btnOver(){

		$('#addtocart').html('Tanlangan');
		
		$('#addtocart').css('background','blue');

	}

	function openModalPizza(pizza_id){


	  var  cart = localStorage.getItem('cart');

	  if(cart != undefined){

		  cart = JSON.parse(cart);

		  for (let i = 0; i < cart.length; i++) {
			  
			  if(pizza_id == cart[i][0]){

				$('#addtocart').html('Tanlangan');
				
				$('#addtocart').css('background','blue');

				  break;
				
			  }else{

				$('#addtocart').html('qo`shish');
				
				$('#addtocart').css('background','red');

			  }
		
			}
	  
		}
			$.getJSON('pizza.json',function(result){
				
				$.each(result, function(i, field){
					
					if(field.id == pizza_id){

						$('#modal-pizza-name').html(field.name);
						
						$('#modal-pizza-description').html(field.description);
						
						$('#modal-pizza-price').html(field.price);
						
						$('#modal-pizza-price').attr('value',field.price);
						
						$('#addtocart').attr('value',field.id);
						
						$('#modal-pizza-img').attr('src', field.image);
						
						$('#moneyin').val(1);

					}
					
				})
	    	
			})
 
		}

         function openCart() {

			var cart = localStorage.getItem('cart');

			cart = JSON.parse(cart);
			
			$('#products').html('');

            var allmoney = 0;

			$('#allMoney').html(allmoney + ' so`m');

			for(var j =  0; j < cart.length; j++){

				let name = '';
				
				$('#products').append('<ul id="checkedForDates">'+
				'<li id="catr-pizza-name-'+cart[j][0]+'"></li>'+
				'<li>'+cart[j][1]+' ta</li>'+
			'	<li>'+cart[j][2]+' so`m </li>'+
				'<li onclick="removeProduct('+cart[j][0]+')"><span class="x_send"> X <span/></li>'+
			  '</ul>'

			  )

			  allmoney = allmoney + parseInt(cart[j][2].replace('.' , ''));
				
			} 
			
			$('#allMoney').html(allmoney.toLocaleString('en-US')+' so`m');

			$.getJSON('pizza.json',function(result){

				$.each(result, function(i, field){

					for(var k =  0; k < cart.length; k++){

						if(field.id == cart[k][0]){

							$('#catr-pizza-name-'+cart[k][0]).html(field.name);

						}

					}
					
				})
				
			})
			
		 }

		function removeProduct(product_id){
                  
			var cart = localStorage.getItem('cart');

			cart = JSON.parse(cart)


			for(var i = 0 ; i < cart.length; i++){

				if(cart[i][0] == product_id){

					cart.splice(i, 1)

					break;

				}

			}

			if(cart.length == 0){
	        
				localStorage.removeItem('cart')
			
			}else{

				cart = JSON.stringify(cart);

				localStorage.setItem('cart',cart);
	
			}
		
			openCart()

		}

		

		$('#addtocart').click(function(){
	
			var pizza_id = $(this).attr('value')

			if(localStorage.getItem('cart') == undefined){
	
				var cart = [];
	
				cart.push([pizza_id,$('#moneyin').val(),$('#modal-pizza-price').html()])
	
				cart = JSON.stringify(cart)
	
				localStorage.setItem('cart' , cart)
					
			}else{

				var cart = localStorage.getItem('cart');
	
				cart = JSON.parse(cart)

				var status = -1;

				for(var i = 0 ; i < cart.length; i++ ){

					if(cart[i][0] == pizza_id){

						status = i;

						break;

					}

				}

				if(status > -1){

					cart[status][1] =  $('#moneyin').val();
					
					cart[status][2] =  $('#modal-pizza-price').html();

				}else{

				  cart.push([pizza_id,$('#moneyin').val(),$('#modal-pizza-price').html()])
	
				}
	
				cart = JSON.stringify(cart);

				localStorage.setItem('cart' , cart);

			}
 
		})


	$(document).ready(function(){
		
		$.getJSON('pizza.json',function(result){
			
			$.each(result, function(i, field){

			 	 var  status = 'Magazinga';
			 	 
				 var  color = 'btn-primary';

			     var  btn = localStorage.getItem('cart');

				if(btn != undefined){

					btn = JSON.parse(btn);

					for (let i = 0; i < btn.length; i++) {
						
						if(field.id == btn[i][0]){
	
							if($('#magazingabtn').hasClass('tanlangan') == false){

							$('#magazingabtn').addClass('tanlangan')

							}

							break;
								
						}

					}

				}

				

				$('.pizza-menu').append('<div class="col-sm-12 col-md-4"> '+
					'<div id="cardProducts" class="card text-center"> '+
					   '<a href="'+ field.image +'"><img src="'+ field.image +'" class="card-img-top"></a> '+
						'<div class="card-body"> '+
						'  <h5  class="card-title">'+field.name+'</h5> '+
						'  <p class="card-text">'+field.description+'</p> '+
						'  <div> '+
						'	<h3 class="d-inline price1"><span  id="price'+i+'">'+field.price+'</span> so`m </h3> '+
						'	<button onclick="openModalPizza('+field.id+')"  id="magazingabtn"  pizzaid="'+field.id+'" class="btn '+color+'  mt-3 magazingabtns" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop'+'" aria-controls="offcanvasTop">'+ status  +'</button> '+
						'  </div> '				

						)

			})

		})

	})


function clearAll(){
    
	localStorage.clear();
	
	openCart();

}

setInterval(function (){

	var magazingabtns = document.getElementsByClassName('magazingabtns');

	var cart = localStorage.getItem('cart');
	
	if(cart != undefined){
		
		cart = JSON.parse(cart);

	}else{

		cart = [[-1,-1,-1]];	
		
    }

	for(var i = 0; i < magazingabtns.length; i++){

		for (let j = 0; j < cart.length; j++) {
			

			if(magazingabtns[i].getAttribute('pizzaid') == cart[j][0]){

				magazingabtns[i].innerHTML = 'Tanlangan';
				
				magazingabtns[i].style.background = 'blue';
				
				break;

			}else{
			
				magazingabtns[i].innerHTML = 'Magazinga';
			
				magazingabtns[i].style.background = 'red';

			}
			
		}

	}

},1000);

setTimeout(function(){

	localStorage.clear();

},300000)


setInterval(function(){

var locproducts = localStorage.getItem('cart');

locproducts = JSON.parse(locproducts);

var amount = locproducts.length;

if($('#selectspan').html() != amount){
	
	$('#selectspan').html(amount);

}


},1000);

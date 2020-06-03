  
<template>
<div>
  <my-header :cartItemCount="cartItemCount"></my-header>
    <!-- 헤더 부르기 -->

  <main>
    <!-- 정렬된 상품들 -->
    <div v-for="product in sortedProducts"> 
      <div class="row">
        <div class="col-md-5 col-md-offset-0">
          <figure>
            <img class="product" v-bind:src="product.image">
          </figure>
        </div>

        <div class="col-md-6 col-md-offset-0 description">
            
            <!-- --------------------------------------------------------------------------------------------- -->
            <!-- 이름을 가지는 라우트 시작-->
            <router-link 
                tag="h1" 
                :to="{name: 'Id', params: {id: product.id}}"
            >
                <!-- tag => router-link를 변환해서 <h1>태그로 보이게 -->
                <!-- 경로대상은 Id, params 매개변수 보내기 => Vue 라우터가 product.id를 동적 세크먼트에 보냄 //php의 ?와 같음 -->
                
                {{product.title}} <!-- 클릭 가능한 텍스트 -->
            </router-link>
               <!-- --------------------------------------------------------------------------------------------- -->
           
            <p v-html="product.description"></p>
            <p class="price">
                {{product.price | formatPrice}} 
                <!-- 한국 돈 | 미국 돈 -->
            </p>

            <button class="btn btn-primary btn-lg"
                v-on:click="addToCart(product)"
                v-if="canAddToCart(product)">장바구니 담기</button>

            <button v-else disabled="true" class="btn btn-primary btn-lg"
                >장바구니 담기</button>

            <span class="inventory-message"
                    v-if="product.availableInventory - cartCount(product.id) === 0">
                품절!
            </span>

            <span class="inventory-message"
                    v-else-if="product.availableInventory - cartCount(product.id) < 5">
                {{product.availableInventory - cartCount(product.id)}} 남았습니다!
            </span>
            <span class="inventory-message"
                    v-else>지금 구매하세요!
            </span>

            <div class="rating">
                <span v-bind:class="{'rating-active': checkRating(n, product)}"
                    v-for="n in 5">☆
                </span>
            </div>
        </div>
      </div><!-- end of row -->
      <hr />
    </div><!-- end of v-for in sortedProducts-->
  </main>
</div>
</template>

<script>
import MyHeader from './Header.vue';

export default {
  name: 'imain',
  data() {
    return {
      products: [],
      cart: []
    }
  },
  components: { MyHeader },
  methods: {
    //   ???????????????????
    checkRating(n, myProduct) {
      return myProduct.rating - n >= 0;
    },

    addToCart(aProduct) {
      this.cart.push(aProduct.id);
    },

    canAddToCart(aProduct) {
      return aProduct.availableInventory > this.cartCount(aProduct.id);
    },

    cartCount(id) {
      let count = 0;
      for (var i = 0; i < this.cart.length; i++) {
        if (this.cart[i] === id) {
          count++;
        }
      }
      return count;
    }
  },
//   -------------------------------------
  computed: {
    cartItemCount() {
      return this.cart.length || '';
    },
    sortedProducts() { //상품 오름차순으로 정렬
      if (this.products.length > 0) {
        let productsArray = this.products.slice(0); //굳이 0을 해야하나? 아님 복사한거랑 같은 개념? 
        function compare(a, b) {
          if (a.title.toLowerCase() < b.title.toLowerCase())
            return -1;
          if (a.title.toLowerCase() > b.title.toLowerCase())
            return 1;
          return 0;
        }
        return productsArray.sort(compare); //정렬
      }
    }
  },
//   -----------------------------------------------
  filters: {
    formatPrice(price) { //금액 달러로 표현하기
        if (!parseInt(price)) {
            return '';
        } 
        if (price > 99999) { //1000 00을 넘는다면
            var priceString = (price / 100).toFixed(2); //1000.00
            var priceArray = priceString.split("").reverse(); //00.000,1,
            var index = 3; //.toFixed(2)를 했기때문에 3부터 시작

                    // 7 > 6
            while (priceArray.length > index + 3) {
                priceArray.splice(index+3, 0, ',');
                index += 4;
            }

            return '$' + priceArray.reverse().join('');
        } else {
            return '$' + (price / 100).toFixed(2);
        }
    }
  },
//-----------------------------------------------
  created: function() {
    axios.get('/static/products.json').then(response => {
      this.products = response.data.products;
      console.log(this.products);
    });
  }
}
</script>

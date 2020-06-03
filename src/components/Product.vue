<template>
    <div>
        <my-header></my-header>


        <h1>id는 {{$route.params.id}} 입니다. </h1>
        <div class="row">
            <div class="col-md-5 col-md-offset-0">
                <figure>
                    <img class="product" v-bind:src="product.image" >
                </figure>
            </div>
            <div class="col-md-6 col-md-offset-0 description">
                <h1>{{product.title}}</h1>
                <p v-html="product.description"></p>
                <p class="price">
                    {{product.price }}
                </p>
                <!-- ------------------------------ -->
                <button @click='edit'>상품 수정</button>
                <router-view></router-view> 
                <!-- router-view 컴포넌트는 경로의 시작점 => EditProduct 컴포넌트가 표시-->
            </div>
        </div>
    </div>
</template>
<script>
import MyHeader from './Header.vue'
export default {
    components:{MyHeader},
    data(){
        return{
            product:''
        }
    },
    created() {

                //절대경로
        axios.get('/static/products.json').then((response) => {
            this.product = response.data.products
            .filters(
                //응답 데이터 필터
                data => data.id == this.$route.params.id
            )[0] //.filters는 배열로 가져오니까
            this.product.image = '/' + this.product.image //절대경로로 변경
        })
    },
    methods: {
        edit(){
            this.$router.push({name:'Edit'})
            // $router.push는 Eidt 경로를 활성화
            /*
                router.push(location, onComplete, onAbort)
                Vue 인스턴스 내부의 $router를 사용하여 this.$router.push와 같이 사용할 수도 있습니다. 
                router.push는 다른 url로 이동할 때 사용
                이 메소드는 **새로운 URL을 히스토리 스택에 넣기 때문에** 사용자가 브라우저의 뒤로가기 버튼을 클릭하면 이전 URL로 이동하게 됨
                <router-link :to="...">를 클릭하면 router.push(...)를 호출하는 것과 같습니다.
            */
        }
    },
}
</script>
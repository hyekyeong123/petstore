<template>
<header>
    <div class="navbar navbar-default">
        <div class="navbar-header">
        <h1>
            <!-- 
                라우터에 등록된 링크는 <a>태그보다는 <router-link> 태그 사용 권장
             -->
            <router-link 
            :to="{name: 'iMain'}"
            >
                {{ sitename }}
            </router-link>
        </h1>
    </div>
    <div class="nav navbar-nav navbar-right cart">

        <router-link
            active-class="active"
            tag="button" 
            class="btn btn-default btn-lg" 
            :to="{name: 'Form'}"
        >
        
        <span class="glyphicon glyphicon-shopping-cart">
            {{cartItemCount}}
        </span> 
        체크아웃
        </router-link>
    </div>
  </div>
</header>
</template>

<script>
export default { //내보내기
  name: 'my-header', //이름
  data() {
    return {
      sitename: "Vue.js 애완용품샵"
    }
  },
  props: ['cartItemCount'],
  methods: {
      //
    showCheckout() {
        this.$router.push({name: 'Form'});
        // Vue.js 앱을 Form 경로로 이동
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
}

/* 라우터 경로가 활성화 될때에 발생 */
.router-link-exact-active {
    color: blue;

}
</style>

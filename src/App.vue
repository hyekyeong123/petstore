<template>
  <div id="app">
    <!-- 
      라우팅이 경로에 따라 컴포넌트를 바꿔치기해서 렌더링
      렌더링해주는 부분이  <router-view 태그 부분>  
    -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

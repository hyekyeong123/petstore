import Vue from "vue";
import Router from "vue-router";
import Form from "@/components/Form";
import Main from "@/components/Main";
import Product from "@/components/Product"; //경로 표시
import EditProduct from "@/components/EditProduct";

Vue.use(Router);

export default new Router({
  mode: "history",
	routes: [
	/*
		routes는 경로와 컴포넌트로 이루어진 컬렉션
		실제 이 앱을 보고 라우터가 경로에 따라 그에 맞는 컴포넌트를 렌더링한다. 
	*/
	{
		// 홈 경로
	  	path: "/",
	  	name: "iMain",
	  	component: Main,
	  	props: true
	},
	{
	  path: "/form",
	  name: "Form",
	  component: Form,
	  props: true
	},
	{
		path: "/product/:id", //id라는 동적 경로 세그먼트 표시
		//라우터 파일 내부의 클론을 이용해서 동적 경로 할당이 가능함
		name: "Id",
		component: Product,
		props: true,

		// 자식 경로
		children: [{
			path: "edit",
			name: "Edit",
			component: EditProduct,
			props: true
		}]
	},
	{
		// 사용자가 실수로 잘못된 URL을 입력했을때 메인 페이지로 이동
	  	path: "*", //와일드카드
	  	redirect: "/"
	}
  ]
});

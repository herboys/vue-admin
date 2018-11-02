<template>
    <div>
        <div>ss</div>
       <div class="menuDiv">
			<ul>
				<li v-for="(item,index) in name" :key="index">
					<a>
						<!-- <span>sds</span> -->

						<p>{{item.name}}</p>

					</a>
					<!--index1是索引 c是循环的数据 c.id循环数据的下的id-->
					<ul>
						<li v-for="(c,index1) in item.findMenuList" :key="index1" @click="goLink(c.id)" >
							<a>{{c.name}} </a>
						</li>
					</ul>
				</li>

			</ul>

		</div>
    </div>
</template>
<script>
export default {
    data() {

			return {
				name: '',
			}

        },

        methods:{
             goLink:function(id){
                 setTimeout(function(){
									 console.log(id)
									 console.log(1111)
									 
        },100);this.$router.push({ path: '/Home' });
		}
				},
		mounted: function() {
			let str = sessionStorage.getItem("obj");
			this.name = JSON.parse(str)
			console.log(0)
			console.log();
			 
			
		}
	}
</script>


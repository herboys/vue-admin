<template>
    <div>
        商品类表
        <router-link v-bind="{ name:'img' }">图片</router-link>
        <div>
            <router-view>
                
            <router-view>
        </div>
        <button @click="toCart">去购物<button>
    </div>
</template>

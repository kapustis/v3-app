<template>
    <v-container>
        <v-layout row wrap v-if="countCart > 0">
            <v-flex xs12 sm12 md12>
                <section id="cart">
                    <article class="product" v-for="(product, index) in products" :key="index">
                        <header>
                            <a class="open">
                                <img :src="product.imageSrc" :alt="product.title">
                                <h3>Open</h3>
                            </a>
                        </header>

                        <div class="content">
                            <h1>{{product.title}}</h1>
                            <div style="top: 0" class="type">
                                <v-btn icon dark @click="delProduct(index)">
                                    <v-icon class="red--text">{{'clear'}}</v-icon>
                                </v-btn>
                            </div>
                        </div>

                        <footer class="content">
                            <span class="qt-minus" :disabled="product.quantity === 1" @click="updateQuantity({id:product.id,count: -1})">-</span>
                            <span class="qt">{{product.quantity}}</span>
                            <span class="qt-plus" @click="updateQuantity({id:product.id,count:1})">+</span>
                            <h2 class="full-price">{{fullPrice(product.price,product.quantity) | currency}}</h2>
                            <h2 class="price">{{product.price}}&#8372;</h2>
                        </footer>
                    </article>
                </section>
            </v-flex>
            <app-buy :product="products"/>
        </v-layout>
        <v-layout v-else>
            <h3>Корзина пуста</h3>
        </v-layout>

        <footer id="site-footer">
            <div class="container clearfix">
                <div class="left">
                    <h2 class="subtotal">Subtotal: <span>163.96</span>€</h2>
                    <h3 class="tax">Taxes (5%): <span>8.2</span>€</h3>
                    <h3 class="shipping">Shipping: <span>5.00</span>€</h3>
                </div>
                <div class="right">
                    <h1 class="total">Total: <span>{{total | currency}}</span></h1>
                    <a class="btn">Купить</a>
                </div>
            </div>
        </footer>
    </v-container>
</template>

<script>
    import {mapGetters, mapMutations, mapActions} from 'vuex'

    export default {
        name: "shoppingCart",
        computed: {
            ...mapGetters({
                items: 'getCart',
                countCart: 'getCartCount',
                products: 'cartProducts',
                total: 'cartTotalPrice',
            })
        },
        methods: {
            ...mapMutations({delProduct: 'DELETE_PRODUCT',}),
            ...mapActions({updateQuantity: 'updateQuantity',}),
            fullPrice(price, quantity) {
                return Math.round((price * quantity) * 100) / 100;
            },
        },
        filters: {
            currency: function (value) {
                return '₴' + parseFloat(value).toFixed(2);
            }
        }
    }
</script>

<style scoped>
    body {
        background: #eee;
        margin: 0;
        padding: 0;
        overflow-x: hidden;
    }

    .clearfix {
        content: "";
        display: table;
        clear: both;
    }

    #site-header, #site-footer {
        background: #fff;
    }

    #site-header {
        margin: 0 0 30px 0;
    }

    #site-header h1 {
        font-size: 31px;
        font-weight: 300;
        padding: 40px 0;
        position: relative;
        margin: 0;
    }

    a {
        color: #000;
        text-decoration: none;

        -webkit-transition: color .2s linear;
        -moz-transition: color .2s linear;
        -ms-transition: color .2s linear;
        -o-transition: color .2s linear;
        transition: color .2s linear;
    }

    a:hover {
        color: #53b5aa;
    }

    #site-header h1 span {
        color: #53b5aa;
    }

    #site-header h1 span.last-span {
        background: #fff;
        padding-right: 150px;
        position: absolute;
        left: 217px;

        -webkit-transition: all .2s linear;
        -moz-transition: all .2s linear;
        -ms-transition: all .2s linear;
        -o-transition: all .2s linear;
        transition: all .2s linear;
    }

    #site-header h1:hover span.last-span, #site-header h1 span.is-open {
        left: 363px;
    }

    #site-header h1 em {
        font-size: 16px;
        font-style: normal;
        vertical-align: middle;
    }

    .container {
        font-family: 'Open Sans', sans-serif;
        margin: 0 auto;
        width: 980px;
    }

    #cart {
        /*width: 100%;*/
    }

    #cart h1 {
        /*font-weight: 300;*/
    }

    #cart a {
        color: #53b5aa;
        text-decoration: none;

        -webkit-transition: color .2s linear;
        -moz-transition: color .2s linear;
        -ms-transition: color .2s linear;
        -o-transition: color .2s linear;
        transition: color .2s linear;
    }

    #cart a:hover {
        color: #000;
    }

    .product {
        border: 1px solid #eee;
        margin: 20px 0;
        width: 100%;
        height: 195px;
        position: relative;

        -webkit-transition: margin .2s linear, opacity .2s linear;
        -moz-transition: margin .2s linear, opacity .2s linear;
        -ms-transition: margin .2s linear, opacity .2s linear;
        -o-transition: margin .2s linear, opacity .2s linear;
        transition: margin .2s linear, opacity .2s linear;
    }

    .product img {
        width: 100%;
        height: 100%;
    }

    .product header, .product .content {
        background-color: #fff;
        border: 1px solid #ccc;
        border-style: none none solid none;
        float: left;
    }

    .product header {
        background: #000;
        margin: 0 1% 20px 0;
        overflow: hidden;
        padding: 0;
        position: relative;
        width: 24%;
        height: 195px;
    }

    .product header:hover img {
        opacity: .7;
    }

    .product header:hover h3 {
        bottom: 73px;
    }

    .product header h3 {
        background: #53b5aa;
        color: #fff;
        font-size: 22px;
        font-weight: 300;
        line-height: 49px;
        margin: 0;
        padding: 0 30px;
        position: absolute;
        bottom: -50px;
        right: 0;
        left: 0;

        -webkit-transition: bottom .2s linear;
        -moz-transition: bottom .2s linear;
        -ms-transition: bottom .2s linear;
        -o-transition: bottom .2s linear;
        transition: bottom .2s linear;
    }

    .open {
        cursor: pointer;
    }

    .product .content {
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        height: 140px;
        padding: 0 20px;
        width: 75%;
    }

    .product h1 {
        color: #53b5aa;
        font-size: 25px;
        font-weight: 300;
        margin: 17px 0 20px 0;
    }

    .product footer.content {
        height: 50px;
        margin: 6px 0 0 0;
        padding: 0;
    }

    .product footer .price {
        background: #fcfcfc;
        color: #000;
        float: right;
        font-size: 15px;
        font-weight: 300;
        line-height: 49px;
        margin: 0;
        padding: 0 30px;
    }

    .product footer .full-price {
        background: #53b5aa;
        color: #fff;
        float: right;
        font-size: 22px;
        font-weight: 300;
        line-height: 49px;
        margin: 0;
        padding: 0 30px;

        -webkit-transition: margin .15s linear;
        -moz-transition: margin .15s linear;
        -ms-transition: margin .15s linear;
        -o-transition: margin .15s linear;
        transition: margin .15s linear;
    }

    .qt, .qt-plus, .qt-minus {
        display: block;
        float: left;
    }

    .qt {
        font-size: 19px;
        line-height: 50px;
        width: 70px;
        text-align: center;
    }

    .qt-plus, .qt-minus {
        background: #fcfcfc;
        border: none;
        font-size: 30px;
        font-weight: 300;
        height: 100%;
        padding: 0 20px;
        -webkit-transition: background .2s linear;
        -moz-transition: background .2s linear;
        -ms-transition: background .2s linear;
        -o-transition: background .2s linear;
        transition: background .2s linear;
    }

    .qt-plus:hover, .qt-minus:hover {
        background: #53b5aa;
        color: #fff;
        cursor: pointer;
    }

    .qt-plus {
        line-height: 50px;
    }

    .qt-minus {
        line-height: 47px;
    }

    #site-footer {
        margin: 30px 0 0 0;
    }

    #site-footer {
        padding: 40px;
    }

    #site-footer h1 {
        background: #fcfcfc;
        border: 1px solid #ccc;
        border-style: none none solid none;
        font-size: 24px;
        font-weight: 300;
        margin: 0 0 7px 0;
        padding: 14px 40px;
        text-align: center;
    }

    #site-footer h2 {
        font-size: 24px;
        font-weight: 300;
        margin: 10px 0 0 0;
    }

    #site-footer h3 {
        font-size: 19px;
        font-weight: 300;
        margin: 15px 0;
    }

    .left {
        float: left;
    }

    .right {
        float: right;
    }

    .btn {
        background: #53b5aa;
        border: 1px solid #999;
        cursor: pointer;
        display: block;
        color: #fff;
        font-size: 20px;
        font-weight: 300;
        padding: 16px 0;
        width: 290px;
        text-align: center;

        -webkit-transition: all .2s linear;
        -moz-transition: all .2s linear;
        -ms-transition: all .2s linear;
        -o-transition: all .2s linear;
        transition: all .2s linear;
    }

    .btn:hover {
        color: #fff;
        background: #429188;
    }

    .type {
        position: absolute;
        background: #fcfcfc;
        font-size: 13px;
        left: 100%;
    }

    .type:hover {
        background-color: #f44336
    }


    .color {
        width: 40px;
        height: 40px;
        right: -40px;
    }

    .red {
        background: #cb5a5e;
    }

    .yellow {
        background: #f1c40f;
    }

    .blue {
        background: #3598dc;
    }

    .minused {
        margin: 0 50px 0 0 !important;
    }

    .added {
        margin: 0 -50px 0 0 !important;
    }
</style>
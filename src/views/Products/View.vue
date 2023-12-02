<template>
    <div class="container mt-3">
        <div class="card">
            <div class="card-header">
                <h4>Products</h4>
                <router-link to="/products/create" class="btn btn-primary float-end">Add Product</router-link>
            </div>
            <div class="card-body table-responsive table-container overflow-auto">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th class="text-center">ID</th>
                            <th class="text-center">Name</th>
                            <th class="text-center">Price</th>
                            <th class="text-center">Description</th>
                            <th class="text-center">Created At</th>
                            <th class="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody v-if="products.length > 0">
                        <tr v-for="product in products" :key="product.id">
                            <td class="text-center">{{ product.id }}</td>
                            <td class="text-center">{{ product.name }}</td>
                            <td class="text-center">{{ product.price + ' $'}}</td>
                            <td class="text-center">{{ product.description }}</td>
                            <td class="text-center">{{ formatDate(product.created_at) }}</td>
                            <td class="text-center">
                                <router-link :to="'/products/' + product.id + '/edit/'" class="btn btn-primary mx-2">Edit</router-link>
                                <button type="button" @click="deleteProduct(product.id)" class="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="6" class="text-center">Loading...</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment';

export default {
    name: 'ProductsView',
    data() {
        return {
            products: [],
        }
    },
    mounted() {
        this.getProducts()
    },
    methods: {
        getProducts() {
            const apiUrl = 'http://127.0.0.1:8000/api/products'
            axios.get(apiUrl)
                .then(res => {
                    this.products = res.data;
                })
                .catch(error => {
                    console.error('Error while retrieving products:', error);
                });
        },

        deleteProduct(id) {
            const apiUrl = `http://127.0.0.1:8000/api/products/${id}`;
            
            axios.delete(apiUrl).then(res => {
                this.getProducts();
            }).catch(error => {
                console.error('Error while deleting product:', error);
            })
        },

        formatDate(date) {
            return moment(date).format('DD/MM/YYYY - HH:mm:ss');
        },
    }
}
</script>

<style scoped>
.table-container {
  max-height: 500px; 
}
</style>
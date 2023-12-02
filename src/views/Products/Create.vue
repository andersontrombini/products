<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Add Product</h4>
            </div>
            <div class="card-body">
                <ul class="alert alert-warning" v-if="Object.keys(errorList).length > 0">
                    <li class="mb-0 ms-2" v-for="(error, index) in errorList" :key="index">{{ error[0] }}</li>
                </ul>
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input v-model="model.product.name" type="text" class="form-control" id="name">
                </div>
                <div class="mb-3">
                    <label for="price" class="form-label">Price</label>
                    <input v-model="model.product.price" placeholder="0.00" type="text" class="form-control" id="price" :mask="['###.###.###,##']">
                    <!-- <input id="tel" class="input" type="tel" placeholder="(62) 98888-7777" v-mask="['(##) ####-####', '(##) #####-####']"> -->
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <input v-model="model.product.description" type="text" class="form-control" id="description">
                </div>
                <div class="mb-3">
                    <button type="button" @click="$router.go(-1)" class="btn btn-secondary mx-2">Back</button>
                    <button type="button" @click="saveProduct" class="btn btn-primary">Save</button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {

    name: 'ProductsCreate',
    data() {
        return {
            errorList: [],
            model: {
                product: {
                    name: '',
                    price: '',
                    description: ''
                }
            }
        }
    },
    methods: {
        saveProduct() {
            const apiUrl = 'http://127.0.0.1:8000/api/products';
            axios.post(apiUrl, this.model.product).then(res => {
                this.model.product = {
                    name: '',
                    price: '',
                    description: ''
                }
                this.errorList = [];

                this.$router.push({ name: 'products' });

            }).catch(error => {
                this.errorList = error.response ? error.response.data.errors : [];
                console.error('Error when registering product:', error);
            });
        }
    }
}
</script>
  
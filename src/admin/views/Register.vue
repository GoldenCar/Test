<template>
    <div class="row justify-content-center mt-7">
        <div class="col-lg-6 col-md-10">
            <div class="card bg-secondary shadow border-0">
                <form role="form" @submit.prevent>
                    <card type="secondary">
                        <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Test Form</h3>
                                </div>
                            </div>
                        </div>
                        <template>
                            <form  @submit.prevent>
                                <h6 class="heading-small text-muted mb-4">User information</h6>
                                <div class="pl-lg-4">
                                    <div class="avatar-row">
                                        <div class="avatar">
                                            <img :src="model.avatarUrl" @click="onClickAvatar()" />
                                            <input type="file" ref="avatarFile" accept="image/*" @change="onAvatarFileChange" style="display: none">
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-lg-12">
                                            <base-input alternative=""
                                                        label="Username"
                                                        placeholder="Username"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.username"
                                                        :error="model.usernameError"
                                            />
                                        </div>
                                        
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <base-input alternative=""
                                                        label="Email address"
                                                        placeholder="jesse@example.com"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.email"
                                                        :error="model.emailError"
                                            />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <base-input alternative=""
                                                        label="Phone Number"
                                                        placeholder="(123) 456-7899"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.phone"
                                                        :error="model.phoneError"
                                            />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <base-input alternative=""
                                                        label="Address"
                                                        placeholder="Address"
                                                        input-classes="form-control-alternative"
                                                        type="text"
                                                        v-model="model.address"
                                                        :error="model.addressError"
                                            />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <base-input alternative=""
                                                        label="Zipcode"
                                                        placeholder="Zipcode (5 digits)"
                                                        input-classes="form-control-alternative"
                                                        type="number"
                                                        v-model="model.zipcode"
                                                        :error="model.zipcodeError"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </template>
                    </card>

                    <div class="text-center">
                        <base-button type="primary" class="mt-3" @click="register()" >Create account</base-button>
                        <div class="text-danger invalid-feedback pb-3" style="display: block;">
                            {{ register_error }}
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <loading :active.sync="isLoading" 
        :is-full-page="true"
        loader="bars"
        color="#fff"
        background-color="rgba(0, 0, 0, 0.5)"
        :opacity="1"
        ></loading>
    </div>
</template>
<script>
  import VueCookies from 'vue-cookies';
  import Api from '../../api/api'
  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/vue-loading.css';

  export default {
    name: 'register',
    components: {
      Loading
    },

    data() {
      return {
        isLoading: false,

        model: {
          avatarUrl: require('../../assets/default_avatar.png'),
          avatarFile: '',
          username: '',
          email: '',
          phone: '',
          address: '',
          zipcode: '',
          usernameError: '',
          emailError: '',
          phoneError: '',
          addressError: '',
          zipcodeError: '',
        },

        register_error: '',
      }
    },

    methods: {
        onClickAvatar: function() {
            this.$refs.avatarFile.click();
        },

        onAvatarFileChange: function(e) {
            const file = e.target.files[0];
            const url = URL.createObjectURL(file);

            this.model.avatarUrl = url;
            this.model.avatarFile = file;
        },

        isEmailValid: function(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        },

        isPhoneValid: function(phone) {
            var re = /\([0-9]{3}\)\s[0-9]{3}\-[0-9]{4}/
            return re.test(String(phone).toLowerCase());
        },

        isZipValid: function(zip) {
            var re = /[0-9]{5}/
            return re.test(String(zip).toLowerCase());
        },

        register: function() {

            this.register_error = "";
            var isValid = true;

            // Username.
            if (this.model.username == null || this.model.username == "") {
                this.model.usernameError = "Please input valid Username.";
                isValid = false;
            } else {
                this.model.usernameError = "";
            }

            // Phone.
            if (this.model.phone == null || this.model.phone == "" || !this.isPhoneValid(this.model.phone)) {
                this.model.phoneError = "Please input valid phone number.";
                isValid = false;
            } else {
                this.model.phoneError = "";
            }

            // Email.
            if (this.model.email == null || this.model.email == "" || !this.isEmailValid(this.model.email)) {
                this.model.emailError = "Please input valid email address.";
                isValid = false;
            } else {
                this.model.emailError = "";
            }

            // Username.
            if (this.model.address == null || this.model.address == "") {
                this.model.addressError = "Please input valid Username.";
                isValid = false;
            } else {
                this.model.addressError = "";
            }

            // Zipcode.
            if (this.model.zipcode == null || this.model.zipcode == "" || !this.isZipValid(this.model.zipcode)) {
                this.model.zipcodeError = "Please input valid zipcode.";
                isValid = false;
            } else {
                this.model.zipcodeError = "";
            }

            if (this.isLoading) return;
            if (!isValid) {
                return;
            }

            this.isLoading = true;

            Api.registerMember(
                this.model.username,
                this.model.email,
                this.model.phone,
                this.model.address,
                this.model.zipcode,
                this.model.avatarFile
            ).then((data) => {
                console.log("Register Merchant: ", data);
                this.isLoading = false;
                if (data.result) {
                    VueCookies.set('user_id', data.user._id);
                    VueCookies.set('username', data.user.firstName + " " + data.user.lastName);
                    VueCookies.set('avatar', data.user.avatar);
                } else {
                    const error = data.error;
                    this.register_error = error;
                }
            }).catch((error) => {
                this.isLoading = false;
                console.log("error = ", error);
            });
        }
    }
  }
</script>

<style>
    .divider-line {
        width: 100%;
        height: 1px;
        background-color: rgba(0, 0, 0, 0.05);
    }

    select {
        background: url('../assets/img/icons/common/drop-down-arrow.png') no-repeat;
        background-position: right center;
        background-position-x: right 10px;
    }

    .file-control input {
        padding: 0px;
        border: none; 
        background: transparent;
    }

    .avatar-row {
        text-align: center;
        margin: auto;
        margin-bottom: 30px;
    }

    .avatar-row .avatar {
        width: 80px;
        height: 80px;
    }

    .avatar-row .avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>

<template>
  <div class="ml-auto">
    <v-btn
        v-if="unRegisteredUser"
        text="Войти"
        variant="text"
        @click="authorizationUserDialog=true"
    />
    <v-dialog
        v-model="authorizationUserDialog"
        width="500"
    >
      <v-card>
        <v-card-title>
          Авторизация
        </v-card-title>
        <v-card-subtitle>
          <v-tabs
              v-model="selectedTab"
              color="primary"
              item-text="title"

          >
            <v-tab
                v-for="(item, index) in tabItems"
                :key="index"
                :text="item.title"
                :value="item.value"
                class="uppercase-disabled font-weight-black"
            />
          </v-tabs>
        </v-card-subtitle>
        <v-card-text style="gap: 8px; display: grid">
          <div
              v-if="selectedTab === 2"
              style="gap: 8px; display: grid"
          >
            <v-text-field
                v-model="lastName"
                :rules="[(value)=>  !!value || 'Поле обязательно для заполнения' ]"
                hide-details="auto"
                label="Фамилия"
                variant="outlined"
            />
            <v-text-field
                v-model="name"
                :rules="[(value)=>  !!value || 'Поле обязательно для заполнения' ]"
                hide-details="auto"
                label="Имя"
                variant="outlined"
            />
            <v-text-field
                v-model="secondName"
                hide-details="auto"
                label="Отчество"
                variant="outlined"
            />
          </div>
          <v-text-field
              v-model="login"
              :rules="[(value)=>  !!value || 'Поле обязательно для заполнения' ]"
              hide-details="auto"
              label="Логин"
              variant="outlined"
          />
          <v-text-field
              v-model="password"
              :rules="[(value)=>  !!value || 'Поле обязательно для заполнения' ]"
              hide-details="auto"
              label="Пароль"
              type="password"
              variant="outlined"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn
              color="primary"
              :text="selectedTab === 1 ?'Войти' :'Зарегистрироваться'"
              variant="flat"
              @click="onAuthorization"
          />
          <v-btn
              color="primary"
              text="Отмена"
              variant="text"
              @click="onCloseDialog"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-menu v-if="!unRegisteredUser">
      <template #activator="{ props }">
        <v-btn
            v-bind="props"
            variant="text"
            :text="currentUser.fullShortName"
        />
      </template>
      <v-list>
        <v-list-item
            v-for="(menu, index) in menuList"
            :key="index"
            @click="menu.action"
        >
          {{ menu.title }}

        </v-list-item>

      </v-list>
    </v-menu>
  </div>
</template>


<script lang="ts">
import {mapGetters} from "vuex";

export default {
  name: "UserPanel",
  data:()=> ({
    unRegisteredUser: true,
    authorizationUserDialog: false,
    login: '',
    password: '',
    selectedTab:1,
    secondName: '',
    lastName: '',
    name: "",
  }),
  computed:{
    ...mapGetters('usersStore', ['currentUser']),
    menuList(){
      return [
        {
          value:1,
          title: 'Настройки'
        },
        {
          value:2,
          title: 'Выход',
          action: () => {
            this.$store.dispatch("usersStore/INIT_LOGOUT");
          }
        }
      ]
    },
    tabItems() {
      return [
        {
          value: 1,
          title: 'Войти'
        },
        {
          value: 2,
          title: 'Регистрация'
        }
      ]
    }
  },
  mounted() {
    const localStorageUser = localStorage.getItem("currentUser");
    if (!localStorageUser) {
      this.unRegisteredUser = true;

    } else {
      this.unRegisteredUser = false;
      this.$store.dispatch("usersStore/INIT_CURRENT_USER", parseInt(JSON.parse(localStorageUser)));
    }
  },
  watch:{
    currentUser:{
      handler(newValue, oldValue){
        if (Object.keys(newValue)?.length) this.unRegisteredUser = false;
        else {
          console.log(newValue);
          this.unRegisteredUser = true;
        }
      },
      immediate: true,
      deep: true
      
    }
  },
  methods: {
    async onAuthorization(){
      //Вызываем метод из стора

      if (this.selectedTab === 1) {
        if (!this.login || !this.password) {
          return alert('Не заполнены обязательные поля');
        }
        await this.$store.dispatch('usersStore/INIT_AUTORIZATION', {login: this.login, password: this.password})
            .then(res => {
              console.log(res)
            })
            .finally(() => {
              this.authorizationUserDialog = false;
            })
      }
      else {
        if (!this.login || !this.password || !this.name || !this.lastName) {
          return alert('Не заполнены обязательные поля');
        }
        await this.$store.dispatch('usersStore/INIT_REGISTRATION', {
          login: this.login,
          password: this.password,
          name: this.name,
          lastName: this.lastName,
          secondName: this.secondName,
        })
            .then(res => {
              console.log(res)
            })
            .finally(() => {
              this.authorizationUserDialog = false;
            })

      }
    },
    onCloseDialog() {
      this.login = '';
      this.password = '';
      this.authorizationUserDialog = false;
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
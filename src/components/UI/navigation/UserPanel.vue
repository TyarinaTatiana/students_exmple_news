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
        <v-card-text>
          <v-text-field
              v-model="login"
              label="Логин"
              variant="outlined"
          />
          <v-text-field
              v-model="password"
              label="Пароль"
              type="password"
              variant="outlined"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn
              color="primary"
              text="Войти"
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


<script lang="ts" setup>
import {useStore} from "vuex";
import {computed, inject, onMounted, ref, watch} from "vue";

const usersService = inject("usersService"); // Внедряем UserService

const unRegisteredUser = ref(true);
const authorizationUserDialog = ref(false);
const login = ref()
const password = ref()
const store = useStore()

const currentUser = computed(() => store.getters["usersStore/currentUser"]);
const menuList = computed(() => {
  return [
    {
      value:1,
      title: 'Настройки'
    },
    {
      value:2,
      title: 'Выход',
      action: () => {
        store.dispatch("usersStore/INIT_LOGOUT", );
      }
    }
  ]
})

onMounted(() => {
  const localStorageUser = localStorage.getItem("currentUser");
  if (!localStorageUser) {
    unRegisteredUser.value = true;
   
  } else {
    unRegisteredUser.value = false;
    store.dispatch("usersStore/INIT_CURRENT_USER", parseInt(JSON.parse(localStorageUser)));
  }
})

watch(currentUser, (newValue, oldValue) => {
  console.log('watch(currentUser ', newValue);
  if (Object.keys(newValue)?.length) unRegisteredUser.value = false;
  else {
    console.log(newValue);
    unRegisteredUser.value = true;
  }
}, {immediate: true, deep: true});


const onAuthorization = async () => {
  //Вызываем метод из стора
  await store.dispatch('usersStore/INIT_AUTORIZATION', {login: login.value, password: password.value})
      .finally(() => {
        authorizationUserDialog.value = false;
      })
}

const onCloseDialog = () => {
  login.value = '';
  password.value = '';
  authorizationUserDialog.value = false;
}
</script>

<style lang="scss" scoped>

</style>
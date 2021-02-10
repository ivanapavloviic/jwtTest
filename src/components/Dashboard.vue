<template>
  <div>
    <h1>Dashboard Page</h1>
    <div>Email -- {{ gettersAuthData.email}}</div>
    <div>
        <h6>Customer info</h6>
        <button type="button" class="btn btn-primary" @click="show()">Show Info</button>
        <ul>
            <li v-for="(t, index) in gettersAllInfo" :key="index">
                {{t}}
            </li>
        </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters("info",{
        gettersAllInfo:"getAllInfo"
    }),
    ...mapGetters("auth", {
      gettersAuthData: "getAuthData",
    }),
  },
  methods:{
      ...mapActions("info",{
          actionsGetAllInfo:'getAllInfo'
      }),
      async show(){
          await this.actionsGetAllInfo();
      }
  }
};
</script>
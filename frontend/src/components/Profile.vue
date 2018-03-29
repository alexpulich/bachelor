<template>
  <b-row v-if="user">
    <b-col sm="4">
      <profile-card :user="user"></profile-card>
    </b-col>
    <b-col sm="8">
      <profile-edit v-if="this.$route.name == 'ProfileEdit'"
                         :user="user">
      </profile-edit>
      <profile-description :user="user" :routes="userRoutes" :kinds="kinds" v-else>
      </profile-description>
    </b-col>
  </b-row>
</template>

<script>
  import ProfileCard from './profile/ProfileCard.vue'
  import ProfileDescription from './profile/ProfileDescription.vue'
  import ProfileEdit from './profile/ProfileEdit.vue'
//  import ClimbingwallEditPics from './climbingwalls/ClimbingwallEditPics.vue'
  import {mapGetters} from 'vuex'

  export default {
    name: 'Profile',
    components: { ProfileCard, ProfileDescription, ProfileEdit},
    computed: {
      user() {
          return this.$store.getters['users/profile'](this.$store.getters['auth/userId'])
      },
      userRoutes() {
        return this.$store.getters['users/userRoutes'](this.$store.getters['auth/userId'])
      },
      ...mapGetters('climbingwalls', ['kinds'])
    },
    created() {
      this.$store.dispatch('climbingwalls/getKinds')
      this.$store.dispatch('users/getUser', this.$store.getters['auth/userId'])
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .logo {
    max-height: 200px;
  }
</style>

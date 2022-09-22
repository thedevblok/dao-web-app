<template>
  <div class="vote-list-holder">
    <div class="row mx-auto text-center" style="max-width: 760px">
      <div class="col-12">
        <h1 class="main-title mb-1">VOTING</h1>
      </div>
      <div class="col-12 col-sm-6 mb-2 text-sm-left">
        <nuxt-link to="#" class="btn-info btn disabled" disabled
          >Create vote</nuxt-link
        >
        <p class="red-text">Coming soon</p>
      </div>
      <div class="col-12 col-sm-6 mb-2 text-sm-right">
        <nuxt-link to="/vote/attendance" class="btn-info btn"
          >Withdraw vote attendances</nuxt-link
        >
      </div>
    </div>
    <div class="row mx-auto text-center" style="max-width: 760px">
      <div class="col-12">
        <h1 class="sub-title mt-4">Active votes</h1>
        <div v-if="currentVotes.length > 0">
          <div
            v-for="vote in currentVotes"
            :key="vote.voteId"
            class="matrix-bg my-6"
          >
            <card>
              <div class="content">
                <h4>
                  {{ vote.title }}
                  <i
                    class="tim-icons"
                    :class="{
                      'icon-check-2': vote.votePositive > vote.voteNegative,
                      'icon-simple-remove':
                        vote.votePositive < vote.voteNegative,
                    }"
                  ></i>
                </h4>
                <p>
                  {{ vote.description }}
                </p>
                <nuxt-link
                  class="btn btn-info btn-simple"
                  :to="`/vote/${vote.voteId}`"
                >
                  VIEW MORE
                </nuxt-link>
              </div>
            </card>
          </div>
        </div>
        <div v-else>
          <h3 class="ml-6">No active vote</h3>
        </div>
      </div>
      <div class="col-12" v-if="false">
        <hr />
        <h1 class="sub-title">Previous votes</h1>
        <div v-if="previousVotes.length > 0">
          <div
            v-for="vote in previousVotes"
            :key="vote.voteId"
            class="matrix-bg my-6"
          >
            <card>
              <div class="content">
                <h4>
                  {{ vote.title }}
                  <i
                    class="tim-icons"
                    :class="{
                      'icon-check-2': vote.votePositive > vote.voteNegative,
                      'icon-simple-remove':
                        vote.votePositive < vote.voteNegative,
                    }"
                  ></i>
                </h4>
                <p>
                  {{ vote.description }}
                </p>
                <nuxt-link
                  class="btn btn-info btn-simple"
                  :to="`/vote/${vote.voteId}`"
                >
                  VIEW MORE
                </nuxt-link>
              </div>
            </card>
          </div>
        </div>
        <div v-else>
          <h3 class="ml-6">No previous vote</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    currentVotes: [],
    previousVotes: [],
  }),
  async mounted() {
    const currentVotes = await this.$axios.$get("/api/get-active-votes");

    const previousVotes = await this.$axios.$get("/api/get-inactive-votes", {
      params: {
        count: 3,
      },
    });

    this.currentVotes = [];

    currentVotes.forEach((element) => {
      const currentDescription =
        element.description.length > 100
          ? element.description.substring(0, 100) + "..."
          : element.description;
      this.currentVotes.push({
        title: element.heading,
        description: currentDescription,
        votePositive: element.votePositive,
        voteNegative: element.voteNegative,
        timestamp: element.timestamp,
        voteId: element.voteId,
        valid: element.valid,
      });
    });

    this.previousVotes = [];

    previousVotes.forEach((element) => {
      const previousDescription =
        element.description.length > 100
          ? element.description.substring(0, 100) + "..."
          : element.description;
      this.previousVotes.push({
        title: element.heading,
        description: previousDescription,
        votePositive: element.votePositive,
        voteNegative: element.voteNegative,
        timestamp: element.timestamp,
        voteId: element.voteId,
        valid: element.valid,
      });
    });
    return true;
  },
  methods: {
    getVotes() {},
  },
};
</script>
<style lang="scss" scoped>
.vote-list-holder {
  padding: 0px 40px;
  @media all and (max-width: 600px) {
    padding: 0px 28px;
  }
}
p {
  font-family: "goblin";
}

.red-text {
  color: red;
}
</style>

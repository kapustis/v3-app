<template>
<v-container fluid>
  <v-row>
    <v-col cols="12" lg="4">
      <material-chart-card :data="dailySalesChart.data" :options="dailySalesChart.options" color="info" type="Line">
        <h4 class="title font-weight-light">Daily Sales</h4>

        <p class="category d-inline-flex font-weight-light">
          <v-icon color="green" small>mdi-arrow-up</v-icon>
          <span class="green--text">55%</span>&nbsp;increase in today's sales
        </p>

        <template v-slot:actions>
          <v-icon class="mr-2" small>mdi-clock-outline</v-icon>
          <span class="caption grey--text font-weight-light">updated 4 minutes ago</span>
        </template>
      </material-chart-card>
    </v-col>
    <v-col cols="12" lg="4">
      <material-chart-card
              :data="emailsSubscriptionChart.data"
              :options="emailsSubscriptionChart.options"
              :responsive-options="emailsSubscriptionChart.responsiveOptions"
              color="red"
              type="Bar"
      >
        <h4 class="title font-weight-light">
          Email Subscription
        </h4>
        <p class="category d-inline-flex font-weight-light">
          Last Campaign Performance
        </p>

        <template v-slot:actions>
          <v-icon class="mr-2" small>
            mdi-clock-outline
          </v-icon>
          <span class="caption grey--text font-weight-light">updated 10 minutes ago</span>
        </template>
      </material-chart-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" sm="6" lg="3">
      <material-stats-card
              color="green"
              icon="mdi-store"
              title="Revenue"
              value="$34,245"
              sub-icon="mdi-calendar"
              sub-text="Last 24 Hours"></material-stats-card>
    </v-col>
    <v-col
            cols="12"
            sm="6"
            lg="3"
    >
      <material-stats-card
              color="orange"
              icon="mdi-content-copy"
              title="Used Space"
              value="49/50"
              small-value="GB"
              sub-icon="mdi-alert"
              sub-icon-color="error"
              sub-text="Get More Space..."
              sub-text-color="text-primary"
      />
    </v-col>
    <v-col
            cols="12"
            sm="6"
            lg="3"
    >
      <material-stats-card
              color="red"
              icon="mdi-information-outline"
              title="Fixed Issues"
              value="75"
              sub-icon="mdi-tag"
              sub-text="Tracked from Github"
      />
    </v-col>
    <v-col
            cols="12"
            sm="6"
            lg="3"
    >
      <material-stats-card
              color="info"
              icon="mdi-twitter"
              title="Followers"
              value="+245"
              sub-icon="mdi-update"
              sub-text="Just Updated"
      />
    </v-col>
  </v-row>
</v-container>
</template>

<script>
	export default {
		data() {
			return {
              dailySalesChart: {
                data: {
                  labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
                  series: [
                    [21, 17, 7, 17, 23, 18, 38],
                    [10, 10, 10, 10, 10, 10, 99],
                  ],
                },
                options: {
                  lineSmooth: this.$chartist.Interpolation.cardinal({
                    tension: 0
                  }),
                  low: 0,
                  high: 100, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
                  chartPadding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                  }
                }
              },
              dataCompletedTasksChart: {
                data: {
                  labels: ['12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
                  series: [
                    [230, 750, 450, 300, 280, 240, 200, 190]
                  ]
                },
                options: {
                  lineSmooth: this.$chartist.Interpolation.cardinal({
                    tension: 0
                  }),
                  low: 0,
                  high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
                  chartPadding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                  }
                }
              },
              emailsSubscriptionChart: {
                data: {
                  labels: ['Ja', 'Fe', 'Ma', 'Ap', 'Mai', 'Ju', 'Jul', 'Au', 'Se', 'Oc', 'No', 'De'],
                  series: [
                    [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

                  ]
                },
                options: {
                  axisX: {
                    showGrid: false
                  },
                  low: 0,
                  high: 1000,
                  chartPadding: {
                    top: 0,
                    right: 5,
                    bottom: 0,
                    left: 0,
                  }
                },
                responsiveOptions: [
                  ['screen and (max-width: 640px)', {
                    seriesBarDistance: 5,
                    axisX: {
                      labelInterpolationFnc: function (value) {
                        return value[0]
                      },
                    },
                  }],
                ],
              },
            }
		},

	}
</script>

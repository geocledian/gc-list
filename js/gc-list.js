/*
 Vue.js Geocledian list component
 created:     2020-01-14, jsommer
 last update: 2020-04-29, jsommer
 version: 0.6.1
*/
"use strict";

// surpress vue warnings
Vue.config.silent = true;

Vue.component('gc-list', {
  props: {
    listid: {
      type: String,
      default: 'list1',
      required: true
    },
    gcParcels: { 
      type: Array, 
      default: []
    },
    gcVisibleParcelIds: {      
      type: String,
      default: ''
    },
    gcSelectedParcelId: {      
      type: String,
      default: ''
    },
    gcAvailableFields: {
      type: String,
      default: 'parcelId,name,crop,entity,planting,harvest,area,promotion,fieldAnalysis'
    },
    gcFieldAnalysisLink: {
      type: String,
      default: undefined
    },
    gcAvailableOptions: {
      type: String,
      default: 'optionsTitle'
    },
    gcOptionsCollapsed: {
      type: String,
      default: 'true' // or false
    },
  },
  template: `<div :id="this.listid" class="is-inline">
              <p class="gc-options-title is-size-6 has-text-weight-bold is-orange" 
                  style="cursor: pointer; margin-bottom: 1em;"  
                  v-on:click="toggleListOptions"
                  v-show="availableOptions.includes('optionsTitle')">
               Parcel list
               <i :class="[JSON.parse(gcOptionsCollapsed) ? '': 'is-active', 'fas', 'fa-angle-down', 'fa-sm']"></i>
              </p>
              <div :id="'listOptions_'+listid" class="is-horizontal is-flex is-hidden">
              <!--div class="is-horizontal is-flex">
                <div class="field is-vertical">
                  <div class="field-label">
                    <label class="label has-text-left is-grey"> Option1 </label></div>
                  <div class="field-body">
                    <div class="select is-small">
                      <select id="selOption1" v-model="option1" disabled>
                          <option value="" selected>Default</option>
                          <option value="bla">Bla</option>
                          <option value="blu">Blu</option>
                      </select>
                    </div>
                  </div>
                </div -->
            </div><!-- list options -->

            <div :id="'list_'+ this.listid" :class="[JSON.parse(gcOptionsCollapsed) ? '': 'is-hidden']">

            <!-- data -->
            <div :id="'listTable_'+listid" class="">
              <table class="table is-narrow is-fullwidth" 
                      v-model="parcels" v-if="parcels">
                <thead class="title is-7">
                  <tr>
                    <th style="white-space: nowrap;" v-show="availableFields.includes('parcelId')">ID
                      <span class="">
                        <i class="fas fa-sort" style="cursor: pointer;" v-on:click="sortByAttribute('parcel_id')"></i>
                      </span>
                    </th>
                    <th style="white-space: nowrap;" v-show="availableFields.includes('name')">Name
                      <span class="">
                      <i class="fas fa-sort" style="cursor: pointer;" v-on:click="sortByAttribute('name')"></i>
                      </span>
                    </th>
                    <th style="white-space: nowrap;" v-show="availableFields.includes('crop')">Crop
                      <span class="">
                      <i class="fas fa-sort" style="cursor: pointer;" v-on:click="sortByAttribute('crop')"></i>
                      </span>
                   </th>
                    <th style="white-space: nowrap;" v-show="availableFields.includes('entity')">Entity
                      <span class="">
                      <i class="fas fa-sort" style="cursor: pointer;" v-on:click="sortByAttribute('entity')"></i>
                      </span>
                    </th>
                    <th style="white-space: nowrap;" v-show="availableFields.includes('planting')">Planting
                      <span class="">
                      <i class="fas fa-sort" style="cursor: pointer;" v-on:click="sortByAttribute('planting')"></i>
                      </span>
                    </th>
                    <th style="white-space: nowrap;" v-show="availableFields.includes('harvest')">Harvest
                      <span class="" style="white-space: nowrap;">
                      <i class="fas fa-sort" style="cursor: pointer;" v-on:click="sortByAttribute('harvest')"></i>
                      </span>
                    </th>
                    <th style="white-space: nowrap;" v-show="availableFields.includes('area')">Area
                      <span class="" style="white-space: nowrap;">
                      <i class="fas fa-sort" style="cursor: pointer;" v-on:click="sortByAttribute('area')"></i>
                      </span>
                    </th> 
                    <!-- th style="white-space: nowrap;" v-show="availableFields.includes('promotion')">Promotion
                      <span class="">
                        <i class="fas fa-sort" style="cursor: pointer;" v-on:click="sortByAttribute('promotion')"></i>
                      </span>
                    </th -->
                    <th style="white-space: nowrap;" v-show="availableFields.includes('fieldAnalysis')">
                      <span class="" style="white-space: nowrap;"></span>
                    </th>
                  </tr>
                </thead>
                <tbody class="is-size-7">
                  <tr v-for="p in parcels" v-on:mouseover="setCurrentParcelId" style="cursor: pointer;">
                    <td class="list-row-selected" v-if="p.parcel_id === selectedParcelId" v-show="availableFields.includes('parcelId')"><span class="is-small">{{p.parcel_id}}</span></td>
                    <td v-else  v-show="availableFields.includes('parcelId')"><span class="is-small">{{p.parcel_id}}</span></td>
                    <td class="list-row-selected" v-if="p.parcel_id === selectedParcelId" v-show="availableFields.includes('name')"><span class="is-small">{{p.name}}</span></td>
                    <td v-else v-show="availableFields.includes('name')"><span class="is-small">{{p.name}}</span></td>
                    <td class="list-row-selected" v-if="p.parcel_id === selectedParcelId" v-show="availableFields.includes('crop')"><span class="is-small">{{p.crop}}</span></td>
                    <td v-else  v-show="availableFields.includes('crop')"><span class="is-small">{{p.crop}}</span></td>
                    <td class="list-row-selected" v-if="p.parcel_id === selectedParcelId" v-show="availableFields.includes('entity')"><span class="is-small">{{p.entity}}</span></td>
                    <td v-else v-show="availableFields.includes('entity')"><span class="is-small">{{p.entity}}</span></td>
                    <td class="list-row-selected" v-if="p.parcel_id === selectedParcelId" v-show="availableFields.includes('planting')"><span class="is-small">{{p.planting}}</span></td>
                    <td v-else v-show="availableFields.includes('planting')"><span class="is-small">{{p.planting}}</span></td>
                    <td class="list-row-selected" v-if="p.parcel_id === selectedParcelId" v-show="availableFields.includes('harvest')"> <span class="is-small">{{p.harvest}}</span></td>
                    <td v-else v-show="availableFields.includes('harvest')"><span class="is-small">{{p.harvest}}</span></td>
                    <td class="list-row-selected" v-if="p.parcel_id === selectedParcelId" v-show="availableFields.includes('area')"><span class="is-small">{{p.area}}</span></td>
                    <td v-else v-show="availableFields.includes('area')"><span class="is-small">{{p.area}}</span></td>
                    <!-- td class="list-row-selected" v-if="p.parcel_id === selectedParcelId"<span class="is-small">{{p.promotion}}</span></td>
                    <td v-else v-show="availableFields.includes('promotion')"><span class="is-small">{{p.promotion}}</span></td -->
                    <td class="list-row-selected" v-if="p.parcel_id === selectedParcelId" v-show="availableFields.includes('fieldAnalysis')">                        
                      <a :href="getFieldAnalysisLink()">
                        <button class="button is-small is-light is-orange">
                        <i class="fas fa-info-circle fa-sm" /><span class="content">Detailansicht</span>
                        </button>
                      </a>
                    </td>
                    <td v-else v-show="availableFields.includes('fieldAnalysis')">                        
                      <a :href="getFieldAnalysisLink()"><button class="button is-small is-light is-orange">
                        <i class="fas fa-info-circle fa-sm" /><span class="content">Detailansicht</span>
                      </button></a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- data -->

          </div><!-- list -->            
        </div><!-- listid -->`,
  data: function () {
    console.debug("list! - data()");
    return {
      lastSortOrder: false
    }
  },
  created: function () {
    console.debug("list! - created()");
  },
  /* when vue component is mounted (ready) on DOM node */
  mounted: function () {

    //initial loading data
    console.debug("list! - mounted()");
  },
  computed: {
    parcels: {
      get: function () { 
        // show only these parcels with matching ids with parcelIds
        if (this.visibleParcelIds.length > 0)
          return this.gcParcels.filter(p => this.visibleParcelIds.includes(p.parcel_id+ "")); //convert to string for filtering
      },
      set: function (newValue) {
        console.debug("parcels setter");
        this.$root.$emit('parcelsChange', newValue);
      }
    },
    visibleParcelIds: {
      get: function () { 
        return this.gcVisibleParcelIds;
      },
      set: function (newValue) {
        this.$root.$emit('visibleParcelIdsChange', newValue);
      }
    },
    selectedParcelId: {
      get: function () { 
        return this.gcSelectedParcelId;
      },
      set: function (newValue) {
        this.$root.$emit('selectedParcelIdChange', parseInt(newValue));
      }
    },
    availableFields: {
      get: function () {
        return this.gcAvailableFields.split(",");
      }
    },
    availableOptions: {
      get: function() {
        return (this.gcAvailableOptions.split(","));
      }
    },
  },
  watch: {
    gcParcels: function(newValue, oldValue) {
      // inital setting of parcels only!
      //newValue.sort(function(a,b) { return parseInt(a.parcel_id) - parseInt(b.parcel_id); }); // sort by parcel id asc
    }
  },
  methods: {
    toggleListOptions: function() {
      this.gcOptionsCollapsed = !JSON.parse(this.gcOptionsCollapsed) + "";
    },
    setCurrentParcelId: function(event) {
      console.debug("setCurrentParcelId()");

      // may be span or td or a (span -> td -> tr)
      // walk the DOM upwards til found the tr element
      let tr = event.target.parentElement;
      while (true)  {
        if (tr.localName === "tr") {
          break;
        }
        else {
          tr = tr.parentElement;
        }
      }

      // parcel id is first td -> first span of tr
      let id = tr.children[0].children[0].innerText;

      this.selectedParcelId = parseInt(id);
      
    },
    sortByAttribute: function (attribute) {
      console.debug("sorting by "+ attribute);

      this.lastSortOrder = !this.lastSortOrder;

      // don't sort with operators - function must return -1 or 1
      this.parcels.sort( function (a,b) {
        if (this.lastSortOrder) {
          return a[attribute] > b[attribute] ? -1 : a[attribute] < b[attribute] ?  1 : 0 
        }
        else {
          return a[attribute] > b[attribute] ? 1 : a[attribute] < b[attribute] ?  -1 : 0
        }
      }.bind(this));

      // sort() will not trigger the rendering, so force it
      this.$forceUpdate();
    },
    getFieldAnalysisLink: function() {
      // either configured base URL
      if (this.gcFieldAnalysisLink) {
        return this.gcFieldAnalysisLink + "&parcel_id="+this.selectedParcelId;
      }
      else {
        // create dynamic link to analyst's dashboard
        return this.generateAnalystDashboardLink(this.selectedParcelId);
      }
    },
    generateAnalystDashboardLink: function (parcel_id) {
      /* returns a dynamic link to the Analyst's Dashboard */

      let apiKey = "";
      let host = "";
      if (this.gcApikey) {
        apiKey = this.gcApikey;
      }
      if (this.gcHost) {
        host = this.gcHost;
      }

      return "https://geocledian.com/agclient/analyst/?key="+apiKey + "&host=" +host+"&parcel_id="+parcel_id;;
    },
    /* helper functions */
    formatDecimal: function (decimal, numberOfDecimals) {
      /* Helper function for formatting numbers to given number of decimals */

      var factor = 100;

      if (isNaN(parseFloat(decimal))) {
        return NaN;
      }
      if (numberOfDecimals == 1) {
        factor = 10;
      }
      if (numberOfDecimals == 2) {
        factor = 100;
      }
      if (numberOfDecimals == 3) {
        factor = 1000;
      }
      if (numberOfDecimals == 4) {
        factor = 10000;
      }
      if (numberOfDecimals == 5) {
        factor = 100000;
      }
      return Math.ceil(decimal * factor) / factor;
    },
  }
});

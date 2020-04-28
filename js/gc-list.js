/*
 Vue.js Geocledian list component
 created:     2020-01-14, jsommer
 last update: 2020-04-23, jsommer
 version: 0.6
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
  },
  template: `<div :id="this.listid" class="is-inline">
              <p class="listOptionsTitle is-size-6 is-orange is-inline-block" style="margin-bottom: 1.0rem; cursor: default;"
                  v-on:click="toggleListOptions">
               Parcel list
               <!-- i class="fas fa-angle-down fa-sm"></i -->
              </p>
              <div :id="'listOptions_'+listid" class="listOptions is-horizontal is-flex is-hidden">
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

            <div :id="'list_'+ this.listid" class="gc-list">

            <!-- data -->
            <div :id="'listTable_'+listid" class="">
              <table class="table is-narrow is-fullwidth" 
                      v-model="parcels" v-if="parcels">
                <thead class="title is-7">
                  <tr>
                    <th style="white-space: nowrap;">ID
                      <span class="">
                        <i class="fas fa-sort" style="cursor: pointer;" v-on:click="sortByAttribute('parcel_id')"></i>
                      </span>
                    </th>
                    <th style="white-space: nowrap;">Name
                      <span class="">
                      <i class="fas fa-sort" style="cursor: pointer;" v-on:click="sortByAttribute('name')"></i>
                      </span>
                    </th>
                    <th style="white-space: nowrap;">Crop
                      <span class="">
                      <i class="fas fa-sort" style="cursor: pointer;" v-on:click="sortByAttribute('crop')"></i>
                      </span>
                   </th>
                    <th style="white-space: nowrap;">Entity
                      <span class="">
                      <i class="fas fa-sort" style="cursor: pointer;" v-on:click="sortByAttribute('entity')"></i>
                      </span>
                    </th>
                    <th style="white-space: nowrap;">Planting
                      <span class="">
                      <i class="fas fa-sort" style="cursor: pointer;" v-on:click="sortByAttribute('planting')"></i>
                      </span>
                    </th>
                    <th style="white-space: nowrap;">Harvest
                      <span class="" style="white-space: nowrap;">
                      <i class="fas fa-sort" style="cursor: pointer;" v-on:click="sortByAttribute('harvest')"></i>
                      </span>
                    </th>
                    <th style="white-space: nowrap;">Area
                      <span class="" style="white-space: nowrap;">
                      <i class="fas fa-sort" style="cursor: pointer;" v-on:click="sortByAttribute('area')"></i>
                      </span>
                    </th style="white-space: nowrap;">
                    <!-- th>Promotion
                      <span class="">
                      <i class="fas fa-sort" style="cursor: pointer;" v-on:click="sortByAttribute('promotion')"></i>
                      </span>
                    </th -->
                    </tr>
                </thead>
                <tbody class="is-size-7">
                  <tr v-for="p in parcels" v-on:mouseover="setCurrentParcelId" style="cursor: pointer;">
                    <td class="list-row-selected" v-if="p.parcel_id === selectedParcelId"><span class="is-small">{{p.parcel_id}}</span></td>
                    <td v-else><span class="is-small">{{p.parcel_id}}</span></td>
                    <td class="list-row-selected" v-if="p.parcel_id === selectedParcelId"><span class="is-small">{{p.name}}</span></td>
                    <td v-else><span class="is-small">{{p.name}}</span></td>
                    <td class="list-row-selected" v-if="p.parcel_id === selectedParcelId"><span class="is-small">{{p.crop}}</span></td>
                    <td v-else><span class="is-small">{{p.crop}}</span></td>
                    <td class="list-row-selected" v-if="p.parcel_id === selectedParcelId"><span class="is-small">{{p.entity}}</span></td>
                    <td v-else><span class="is-small">{{p.entity}}</span></td>
                    <td class="list-row-selected" v-if="p.parcel_id === selectedParcelId"><span class="is-small">{{p.planting}}</span></td>
                    <td v-else><span class="is-small">{{p.planting}}</span></td>
                    <td class="list-row-selected" v-if="p.parcel_id === selectedParcelId"><span class="is-small">{{p.harvest}}</span></td>
                    <td v-else><span class="is-small">{{p.harvest}}</span></td>
                    <td class="list-row-selected" v-if="p.parcel_id === selectedParcelId"><span class="is-small">{{p.area}}</span></td>
                    <td v-else><span class="is-small">{{p.area}}</span></td>
                    <!-- td class="list-row-selected" v-if="p.parcel_id === selectedParcelId"><span class="is-small">{{p.promotion}}</span></td>
                    <td v-else><span class="is-small">{{p.promotion}}</span></td -->
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
  },
  watch: {
    gcParcels: function(newValue, oldValue) {
      // inital setting of parcels only!
      //newValue.sort(function(a,b) { return parseInt(a.parcel_id) - parseInt(b.parcel_id); }); // sort by parcel id asc
    }
  },
  methods: {
    toggleListOptions: function() {
      let isListOptionsActive = false;
      isListOptionsActive = !(document.getElementById("listOptions_"+this.listid).classList.contains("is-hidden"));

      if (isListOptionsActive) {
        document.getElementById("listOptions_"+this.listid).classList.add("is-hidden");
        document.getElementById(this.listid).getElementsByClassName("listOptionsTitle")[0].children[0].classList.remove("is-active");
      }
      else {
        document.getElementById(this.listid).getElementsByClassName("listOptionsTitle")[0].children[0].classList.add("is-active");
        document.getElementById("listOptions_"+this.listid).classList.remove("is-hidden");
      }
    },
    setCurrentParcelId: function(event) {
      console.debug("setCurrentParcelId()");
      
      // may be span or td (span -> td -> tr)
      let tr;
      if (event.target.parentElement.localName == "tr") {
        tr = event.target.parentElement;
      }
      if (event.target.parentElement.parentElement.localName == "tr") {
        tr = event.target.parentElement.parentElement;
      }

      if (tr.localName == "tr") {
        // parcel id is first td -> first span
        let id = tr.children[0].children[0].innerText;
        console.debug(id);

        this.selectedParcelId = parseInt(id);
      }
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

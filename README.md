# gc-list widget
## Description
gc-list is an JavaScript/HTML app for visualizing the outputs of the ag|knowledge REST API from [geocledian](https://www.geocledian.com).
It is built as a reusable [Vue.js](https://www.vuejs.org) component which allows the integration in [Vue.js](https://www.vuejs.org) applications smoothly. 
You may but you don't have to build the rest of the container application with [Vue.js](https://www.vuejs.org).

## Purpose
With this widget you have a UI for listing parcels attributes from the REST API of ag|knowledge from geocledian.com.

It is customizeable via HTML attributes and supports the setting of the following attributes:
- gc-parcels: array of parcel objects to be displayed by the table list; default: []
- gc-available-fields: limit the fields of the widget, e.g. "crop,name"; default: "parcelId,crop,name,entity,area,planting,harvest,promotion,fieldAnalysis"
- gc-available-options: limit the available options, e.g. "" for not title at all; default: "widgetTitle"
- gc-visible-parcel-ids: string (separated by ',') with visible parcel ids; only these will be shown from the whole set of parcels; default: ""
- gc-selected-parcel-id: parcel id to highlight the row in the table. Works in both directions with emit(); default: ""
- gc-field-analysis-link: base URL for the detailed field analysis application; will be generated if not defined; default: undefined
- gc-widget-collapsed: start the widget with title only; content is hidden; default: "false"
- gc-language: initial locale language for translation, e.g. "en" for english; default: "en"

As there are defaults you will only have to set an attribute to change the default internal value.

## Integration
For the integration of the widget you'll have to follow these steps.

You have to add some dependencies in the head tag of the container website.

```html
<html>
  <head>

    <!--GC component begin -->

    <!-- loads also dependent css files via @import -->
    <link href="css/gc-list.css" rel="stylesheet">
    <!-- init script for components -->
    <script src="js/gc-list.js"></script> 

    <!--GC component end -->
  </head>
```

Then you may create the widget(s) with custom HTML tags anywhere in the body section of the website. Make sure to use an unique identifier for each component. 
>Please ensure, that you load Vue.js (v.2.6.x) before loading the gc-filter component first!
Also note that <a href="www.bulma.org">bulma.css</a> and <a href="www.fontawesome.org">Font awesome</a> wll be loaded through gc-filter.css.

As the component does not have a loader for parcels it expects the get an array of parcel objects via the `gc-parcels` prop. In the following example the parcels array will be fed from the root Vue instance that controls the
list widget. You may also filter all the parcels via `gc-visible-parcel-ids` and highlight a selected parcel in the list with `gc-selected-parcel-id`. Not that `gc-selected-parcel-id` is an input to the widget but it also emit a new selected parcel id on mouse over event over the list's table row through the Vue EventBus system ('selectedParcelIdChange event).

```html
<div id="gc-app">
    <gc-list
        listid="list1"
        :gc-parcels="$root.parcels"
        :gc-visible-parcel-ids="$root.visibleParcelIds.join(',')"
        :gc-selected-parcel-id="$root.selectedParcelId"
        gc-language="en">
    </gc-list>
</div>
```

## Support
Please contact [us](mailto:info@geocledian.com) from geocledian.com if you have troubles using the widget!

## Used Libraries
- [Vue.js](https://www.vuejs.org)

## Legal: Terms of use from third party data providers
- You have to add the copyright information of the used data. At the time of writing the following text has to be visible for [Landsat](https://www.usgs.gov/information-policies-and-instructions/crediting-usgs) and [Sentinel](https://scihub.copernicus.eu/twiki/pub/SciHubWebPortal/TermsConditions/TC_Sentinel_Data_31072014.pdf) data:

```html
 contains Copernicus data 2020.
 U.S. Geological Service Landsat 8 used in compiling this information.
```

**geocledian is not responsible for illegal use of third party services.**
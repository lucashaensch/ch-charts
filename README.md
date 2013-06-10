#ch-charts.js
Plotting charts on your web app with easiness

Ch-charts.js was made from the need of an easy way to plot charts on your web app.
It was develop in a way that you don't have to study flot's documentation to make some pretty charts.

####Stuff you'll need
* Ch-charts.js (Thank you, Captain Obvious)
* [jQuery][1]
* [Flot][2]
* Two `div`s in your .html
* Call the `.chart()` method you want and pass your data as params

[1]: http://jquery.com/download/ "jQuery"
[2]: http://flotcharts.org/ "Flot"

####Let's make it clear

I've made an example page called 'opt.html' where you can have an idea of its simpleness.

    <html>
     <head>
       <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
       <script type="text/JavaScript" src="jquery.js"></script>
       <script type="text/JavaScript" src="ch-charts.js"></script>
       <script type="text/JavaScript" src="flot/jquery.flot.js"></script>
       <script type="text/javascript">

         $(document).ready(function() {

            var info1 = [[0,1],[1,4],[2,7],[3,10],[4,13],[5,16],[6,19],[7,22],[8,25],[9,28],[10,31],[11,34],[12,37],[13,40],[14,43],[15,46],[16,49],[17,52],[18,55],[19,58]]
            var info2 = [[0,2],[1,6],[2,10],[3,14],[4,18],[5,22],[6,26],[7,30],[8,34],[9,38],[10,42],[11,46],[12,50],[13,54],[14,58],[15,62],[16,66],[17,70],[18,74],[19,78]]
            var info3 = [[0,3],[1,8],[2,13],[3,18],[4,23],[5,28],[6,33],[7,38],[8,43],[9,48],[10,53],[11,58],[12,63],[13,68],[14,73],[15,78],[16,83],[17,88],[18,93],[19,98]]

            var data = [info1,info2,info3]

            $(".demo-placeholder").lineChart(data)
            // $(".demo-placeholder").columnChart(data)
         });

       </script>
     </head>
     <body>
       <div class="demo-container" style="width: 1000px; height: 500px;">
         <div id="placeholder" class="demo-placeholder" style="width: 100%; height: 100%;"></div>
       </div>
     </body>
    </html>

#HTML

Put all the `.js` needed inside your `<script>` tags.

    <script type="text/JavaScript" src="jquery.js"></script>
    <script type="text/JavaScript" src="ch-charts.js"></script>
    <script type="text/JavaScript" src="flot/jquery.flot.js"></script>

You'll need to make a `<div>` inside the body of your `html` with the size you want the chart to be.<br />
Then, put a `<div>` inside it with the `id` or `class` you want to use to call the method.

    <div class="demo-container" style="width: 1000px; height: 500px;">
        <div id="placeholder" class="demo-placeholder" style="width: 100%; height: 100%;"></div>
    </div>
    
#Javascript

First, you'll see that I put some random data into `infoN` variables and pushed them into an array.

```javascript
var info1 = [[0,1],[1,4],[2,7],[3,10],[4,13],[5,16],[6,19],[7,22],[8,25],[9,28],[10,31],[11,34],[12,37],[13,40],[14,43],[15,46],[16,49],[17,52],[18,55],[19,58]]
var info2 = [[0,2],[1,6],[2,10],[3,14],[4,18],[5,22],[6,26],[7,30],[8,34],[9,38],[10,42],[11,46],[12,50],[13,54],[14,58],[15,62],[16,66],[17,70],[18,74],[19,78]]
var info3 = [[0,3],[1,8],[2,13],[3,18],[4,23],[5,28],[6,33],[7,38],[8,43],[9,48],[10,53],[11,58],[12,63],[13,68],[14,73],[15,78],[16,83],[17,88],[18,93],[19,98]]

var data = [info1,info2,info3]
```

You can put whatever you want as long as it have this data format

Finally, call the method of the type of chart you want to see and pass your data through params.<br />
In my example page, I used the line chart(`lineChart()`), but you can also call for column chart(`columnChart()`)

```javascript
$(".demo-placeholder").lineChart(data)
```

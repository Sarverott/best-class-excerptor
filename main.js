






var dataBase={
  classes:[
    ["a","b","c","d","e","f-k","g","n"],
    ["a","b","c","d","e","f-k","g","n"],
    ["a","b","c","d","e-k","g","i","n"],
    ["a","b","c","d","g","i","n","m"]
  ],
  presence:[
    {
      name:"wrzesień",
      riffles:[80,85,90,95],
      multiplier:5,
      classes:[]
    },
    {
      name:"pazdziernik",
      riffles:[80,85,90,95],
      multiplier:5,
      classes:[]
    },
    {
      name:"listopad",
      riffles:[80,85,90,95],
      multiplier:5,
      classes:[]
    },
    {
      name:"grudzień",
      riffles:[80,85,90,95],
      multiplier:5,
      classes:[]
    }
  ],
  semesterPresence:{
    riffles:[80,85,90,95],
    multiplier:5,
    classes:[]
  },
  semester:1,
  extraPoints:[
    {
      name:"akademia",
      multiplier:5,
      classes:[]
    },
    {
      name:"wolontariat",
      multiplier:5,
      classes:[]
    },
    {
      name:"nieobecność na zebraniu samorządu",
      multiplier:-20,
      classes:[]
    },
    {
      name:"punkty specjalne",
      multiplier:1,
      classes:[]
    }
  ],
  reading:[],
  marks:{
    average:{
      multiplier:4,
      classes:[]
    },
    primes:{
      multiplier:20,
      classes:[]
    }
  },
  competitions:{
    sport:[
      {
        name:"1 miejsce",
        multiplier:20,
        classes:[]
      },
      {
        name:"2 miejsce",
        multiplier:15,
        classes:[]
      },
      {
        name:"3 miejsce",
        multiplier:10,
        classes:[]
      },
      {
        name:"udział",
        multiplier:5,
        classes:[]
      }
    ],
    outer:[
      {
        name:"1 miejsce",
        multiplier:50,
        classes:[]
      },
      {
        name:"2 miejsce",
        multiplier:40,
        classes:[]
      },
      {
        name:"3 miejsce",
        multiplier:30,
        classes:[]
      },
      {
        name:"wyróżnienie",
        multiplier:20,
        classes:[]
      }
    ],
    inter:[
      {
        name:"1 miejsce",
        multiplier:15,
        classes:[]
      },
      {
        name:"2 miejsce",
        multiplier:10,
        classes:[]
      },
      {
        name:"3 miejsce",
        multiplier:5,
        classes:[]
      }
    ],
    olimpics:{
      multiplier:100,
      classes:[]
    }
  }
};
function demoFromHTML() {
        var pdf = new jsPDF('p', 'pt', 'letter');
        // source can be HTML-formatted string, or a reference
        // to an actual DOM element from which the text will be scraped.
        source = document.getElementsByClassName("all-classes-view")[0];

        // we support special element handlers. Register them with jQuery-style
        // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
        // There is no support for any other type of selectors
        // (class, of compound) at this time.
        specialElementHandlers = {
            // element with id of "bypass" - jQuery style selector
            '#bypassme': function(element, renderer) {
                // true = "handled elsewhere, bypass text extraction"
                return true
            }
        };
        margins = {
            top: 80,
            bottom: 60,
            left: 40,
            width: 522
        };
        // all coords and widths are in jsPDF instance's declared units
        // 'inches' in this case
        pdf.fromHTML(
                source, // HTML string or DOM elem ref.
                margins.left, // x coord
                margins.top, {// y coord
                    'width': margins.width, // max width of content on PDF
                    'elementHandlers': specialElementHandlers
                },
        function(dispose) {
            // dispose: object with X, Y of the last line add to the PDF
            //          this allow the insertion of new lines after html
            pdf.save('Test.pdf');
        }
        , margins);
    }
function scoreForClass(xcoord, ycoord, scoreObj){
  var tmp=0;
  //////console.log(scoreObj);
  for(i in scoreObj.presence){
    tmp+=scoreObj.presence[i][xcoord][ycoord];
    //////console.log(scoreObj.presence[i][xcoord][ycoord]);
  }
  //////console.log(scoreObj.presence);
  tmp+=scoreObj.semester[xcoord][ycoord];
  tmp+=scoreObj.reading[xcoord][ycoord];
  //////console.log(tmp);
  for(k in scoreObj.competitions.sport){
    tmp+=scoreObj.competitions.sport[k][xcoord][ycoord];
  }
  //////console.log(tmp);
  for(k in scoreObj.competitions.inter){
    tmp+=scoreObj.competitions.inter[k][xcoord][ycoord];
  }
  //////console.log(tmp);
  for(k in scoreObj.competitions.outer){
    tmp+=scoreObj.competitions.outer[k][xcoord][ycoord];
  }
  //////console.log(tmp);
  for(k in scoreObj.extraPoints){
    tmp+=scoreObj.extraPoints[k][xcoord][ycoord];
  }
  //////console.log(tmp);
  tmp+=scoreObj.marks.average[xcoord][ycoord];
  tmp+=scoreObj.marks.primes[xcoord][ycoord];
  return tmp;
}
function printTable(){
  tmp_alldata=calculatePercents();
  //////console.log(tmp_alldata);
  tmp="";
  tmp+='<tr>';
  tmp+='<th>klasy</th>';
  for(i in dataBase.presence){
    tmp+='<th colspan="2">'+dataBase.presence[i].name+'</th>';
  }
  tmp+='<th colspan="2">semestr '+dataBase.semester+'</th>';
  tmp+='<th>zawody wewnętrzne i sportowe</th>';
  tmp+='<th>zawody zewnętrzne</th>';
  tmp+='<th>akademia, działalność uczniowska i punkty dodoatkowe</th>';
  tmp+='<th colspan="2">średnia klasowa</th>';
  tmp+='<th colspan="2">uczniowie ze średnią 4.5+</th>';
  tmp+='<th colspan="2">czytelnictwo</th>';
  tmp+='<th>wyniki</th>';
  tmp+='<th>miejsca</th>';
  tmp+='<th>klasy</th>';
  tmp+='</tr>';
  $(".su-table-body").html("");
  $(".su-table-header").html(tmp);
  tmp="";
  for(var i=0; i<dataBase.classes.length;i++){
    for(var j=0; j<dataBase.classes[i].length;j++){
      ////console.log(i+" "+j);
      tmp+='<tr  class="table-class-row" data-xcoord="'+i+'" data-ycoord="'+j+'">';
      tmp+='<td>'+(i+1)+""+dataBase.classes[i][j]+'</td>';
      var tmp_num=0;
      for(k in dataBase.presence){
        //console.log("presence - "+k);
        tmp+='<td>'+dataBase.presence[k].classes[i][j]+'</td>';
        tmp_num+=dataBase.presence[k].classes[i][j];
        tmp+='<td>'+tmp_alldata.presence[k][i][j]+'</td>';
      }
      if(dataBase.semesterPresence.classes[i][j]==0){
        tmp+='<td>'+parseInt(tmp_num/dataBase.presence.length)+'</td>';
      }else{
        tmp+='<td>'+dataBase.semesterPresence.classes[i][j]+'</td>';
      }
      tmp+='<td>'+tmp_alldata.semester[i][j]+'</td>';
      tmp_num=0;
      for(k in dataBase.competitions.sport){
        //console.log("competitions.sport - "+k);
        tmp_num+=tmp_alldata.competitions.sport[k][i][j];
      }
      for(k in dataBase.competitions.inter){
        //console.log("competitions.inter - "+k);
        tmp_num+=tmp_alldata.competitions.inter[k][i][j];
      }
      tmp+='<td>'+tmp_num+'</td>';
      for(k in dataBase.competitions.outer){
        //console.log("competitions.outer - "+k);
        tmp_num+=tmp_alldata.competitions.outer[k][i][j];
      }
      tmp_num+=tmp_alldata.competitions.olimpics[i][j];
      tmp+='<td>'+tmp_num+'</td>';
      tmp_num=0;
      for(k in dataBase.extraPoints){
        //console.log("extraPoints - "+k);
        tmp_num+=tmp_alldata.extras[k][i][j];
      }
      tmp+='<td>'+tmp_num+'</td>';
      tmp+='<td>'+dataBase.marks.average.classes[i][j]+'</td>';
      tmp+='<td>'+tmp_alldata.marks.average[i][j]+'</td>';
      tmp+='<td>'+dataBase.marks.primes.classes[i][j]+'</td>';
      tmp+='<td>'+tmp_alldata.marks.primes[i][j]+'</td>';
      tmp+='<td>'+dataBase.reading[i][j]+'</td>';
      tmp+='<td>'+tmp_alldata.reading[i][j]+'</td>';
      tmp+='<td>'+tmp_alldata.score[i][j]+'</td>';
      tmp+='<td>'+tmp_alldata.place[i][j]+'</td>';
      tmp+='<td>'+(i+1)+""+dataBase.classes[i][j]+'</td>';
      tmp+='</tr>';
      $(".su-table-body").append(tmp);
      tmp='';
    }
  }
  $(".table-class-row").on("click", function(){
    $("article").addClass("hide-me");
    $(".class-view-window").removeClass("hide-me");
    miniListClassSelect($(this).data("xcoord"), $(this).data("ycoord"));
  });
}
function generateRaport(type){
  console.log(type);
  switch(type){
    case "table":
    $(".td, .th").css({
      "padding":"0 10px"
    });
    var element = document.getElementsByClassName("all-classes-view")[0];
    html2pdf(element, {
      html2canvas:  { dpi: 192, width: 1200},
      margin:       0.1,
      filename:     'raport-superklasa.pdf',
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'landscape' }
    });
    break;
  }
  printTable();
}
function loadWorkspace(){
  if(typeof(Cookies.get('superklasaprogress'))=="object"){
    dataBase=Cookies.get('superklasaprogress');
  }
}
function saveWorkspace(){
  Cookies.set('superklasaprogress', dataBase);
}
function fillWithZeroDualArray(){
  var tmp=[];
  for(v in dataBase.classes){
    tmp[v]=[];
    for(g in dataBase.classes[v]){
      tmp[v][g]=0;
    }
  }
  return tmp;
}
function findInArray(arr, name){
  for(k in arr){
    if(arr[k].name==name){
      return k;
      break;
    }
  }
}
function insertDataFromEditor(){
  saveWorkspace();
  savebutt=document.getElementById('save-me-very-much');

  switch($(".edit-menu-box .edit-menu-interface").data("section")){
    case 'marks':
      $(".edit-menu-box .edit-menu-interface input").each(function(){
        switch($(this).data("value")){
          case 'average':
            dataBase.marks.average.classes[$(".edit-menu-box .edit-menu-interface").data("xcoord")][$(".edit-menu-box .edit-menu-interface").data("ycoord")]=parseFloat($(this).val());
          break;
          case 'primes':
            dataBase.marks.primes.classes[$(".edit-menu-box .edit-menu-interface").data("xcoord")][$(".edit-menu-box .edit-menu-interface").data("ycoord")]=parseInt($(this).val());
          break;
        }
      });
    break;
    case 'reading':
      $(".edit-menu-box .edit-menu-interface input").each(function(){
        switch($(this).data("value")){
          case 'reading':
            dataBase.reading[$(".edit-menu-box .edit-menu-interface").data("xcoord")][$(".edit-menu-box .edit-menu-interface").data("ycoord")]=parseInt($(this).val());
          break;
        }
      });
    break;
    case 'extras':
      $(".edit-menu-box .edit-menu-interface input").each(function(){
          dataBase.extraPoints[findInArray(dataBase.extraPoints, $(this).data("value"))].classes[$(".edit-menu-box .edit-menu-interface").data("xcoord")][$(".edit-menu-box .edit-menu-interface").data("ycoord")]=parseInt($(this).val());
      });
    break;
    case 'competitions':
      $(".edit-menu-box .edit-menu-interface input").each(function(){
        var tmp;
        var keyString=$(this).data("value");
        if (keyString=="olimpiady") {
          dataBase.competitions.olimpics.classes[$(".edit-menu-box .edit-menu-interface").data("xcoord")][$(".edit-menu-box .edit-menu-interface").data("ycoord")]=parseInt($(this).val());
        }else{
          switch(keyString.substring(0,keyString.indexOf(' - '))){
            case 'sport':
              ////console.log(findInArray(dataBase.competitions.sport, keyString.substring(keyString.indexOf(' - ')+3,keyString.length)));
              ////console.log(keyString.substring(keyString.indexOf(' - ')+3,keyString.length-1));
              ////console.log(keyString.indexOf(' - ')+3);
              dataBase.competitions.sport[findInArray(dataBase.competitions.sport, keyString.substring(keyString.indexOf(' - ')+3,keyString.length))].classes[$(".edit-menu-box .edit-menu-interface").data("xcoord")][$(".edit-menu-box .edit-menu-interface").data("ycoord")]=parseInt($(this).val());
            break;
            case 'wewnętrzne':
              dataBase.competitions.inter[findInArray(dataBase.competitions.sport, keyString.substring(keyString.indexOf(' - ')+3,keyString.length))].classes[$(".edit-menu-box .edit-menu-interface").data("xcoord")][$(".edit-menu-box .edit-menu-interface").data("ycoord")]=parseInt($(this).val());
            break;
            case 'zewnętrzne':
              ////console.log(keyString);
              ////console.log(findInArray(dataBase.competitions.sport, keyString.substring(keyString.indexOf(' - ')+3,keyString.length)));
              ////console.log(keyString.substring(keyString.indexOf(' - ')+3,keyString.length));
              ////console.log(keyString.indexOf(' - ')+3);
              dataBase.competitions.outer[findInArray(dataBase.competitions.outer, keyString.substring(keyString.indexOf(' - ')+3,keyString.length))].classes[$(".edit-menu-box .edit-menu-interface").data("xcoord")][$(".edit-menu-box .edit-menu-interface").data("ycoord")]=parseInt($(this).val());
            break;
          }
        }
      });
    break;
    case 'presence':
      $(".edit-menu-box .edit-menu-interface input").each(function(){
          dataBase.presence[findInArray(dataBase.presence, $(this).data("value"))].classes[$(".edit-menu-box .edit-menu-interface").data("xcoord")][$(".edit-menu-box .edit-menu-interface").data("ycoord")]=parseFloat($(this).val());
      });
    break;
    case 'presence-semester':
      $(".edit-menu-box .edit-menu-interface input").each(function(){
          dataBase.semesterPresence.classes[$(".edit-menu-box .edit-menu-interface").data("xcoord")][$(".edit-menu-box .edit-menu-interface").data("ycoord")]=parseFloat($(this).val());
      });
    break;
  }
  savebutt.setAttribute('href', 'data:text/plain;charset=utf-8,'+encodeURIComponent(JSON.stringify(dataBase)));
  writeDataInView($(".class-view-window").data("xcoord"), $(".class-view-window").data("ycoord"))
  printTable();
}
function printMenu(title, classCoord, dataObj){
  $(".edit-menu-modu").modal("show");
  $(".edit-menu-box h1").html(title);
  $(".edit-menu-box .class-name").html((classCoord[0]+1)+""+dataBase.classes[classCoord[0]][classCoord[1]]);
  $(".edit-menu-box .edit-menu-interface").html("");
  $(".edit-menu-box .edit-menu-interface").data("section",dataObj.section);
  $(".edit-menu-box .edit-menu-interface").data("xcoord",classCoord[0]);
  $(".edit-menu-box .edit-menu-interface").data("ycoord",classCoord[1]);
  for(var i=0;i<dataObj.interface.length;i++){
    $(".edit-menu-box .edit-menu-interface").append('<p>'+dataObj.interface[i].name+':</p><input data-value="'+dataObj.interface[i].key+'" type="number" placeholder="1.0" step="0.01" value="'+dataObj.interface[i].value+'"><br>');
  }
}
function miniRiffleCounter(num, riffles){
  for(var i=0;i<riffles.length;i++){
    if(riffles[i]>num){
      return i;
      break;
    }else if(i==riffles.length-1){
      return i+1;
    }
  }
}
function miniListClassSelect(xcoord, ycoord){
  $(".class-view-window").data("xcoord", xcoord);
  $(".class-view-window").data("ycoord", ycoord);
  $(".main-class-name").html((xcoord+1)+""+dataBase.classes[xcoord][ycoord]);
  writeDataInView(xcoord, ycoord);
}
function generateSection(title, name, num, points){
  $(".class-view-scores").append('<h3>'+title+'</h3>');
  $(".class-view-scores").append('<div class="row class-view-score-section"></div>');
  for(x in name){
    $(".class-view-scores .class-view-score-section").last().append('<div class="col-4 class-view-display-box"><div><h5>'+name[x]+'</h5><div class="count-box-display">'+num[x]+'</div><div class="points-box-display"><b>'+points[x]+'</b></div></div></div>');
  }
}
function generateClasses(){
  for(var i=0;i<dataBase.classes.length;i++){
    for(var j=0;j<dataBase.classes[i].length;j++){
      $(".class-mini-list").append('<button class="btn btn-succesfull class-select-button" data-xcoord="'+i+'" data-ycoord="'+j+'">'+(i+1)+""+dataBase.classes[i][j]+'</button><br>');
    }
  }
  $(".class-select-button").on("click", function(){
    miniListClassSelect($(this).data('xcoord'), $(this).data('ycoord'));
  });
  dataBase.reading=fillWithZeroDualArray();
  dataBase.marks.average.classes=fillWithZeroDualArray();
  dataBase.marks.primes.classes=fillWithZeroDualArray();
  for(i in dataBase.competitions.outer){
    dataBase.competitions.outer[i].classes=fillWithZeroDualArray();
  }
  for(i in dataBase.competitions.inter){
    dataBase.competitions.inter[i].classes=fillWithZeroDualArray();
  }
  for(i in dataBase.competitions.sport){
      dataBase.competitions.sport[i].classes=fillWithZeroDualArray();
  }
  for(i in dataBase.extraPoints){
      dataBase.extraPoints[i].classes=fillWithZeroDualArray();
  }
  for(i in dataBase.presence){
      dataBase.presence[i].classes=fillWithZeroDualArray();
  }
  dataBase.semesterPresence.classes=fillWithZeroDualArray();
  dataBase.competitions.olimpics.classes=fillWithZeroDualArray();
}
function calculateAnything(type, content, additional){
  var arr=[];
  switch(type){
    case "counter":
      for(step in content){
        arr[step]=[];
        for(letter in content[step]){
          arr[step][letter]=(content[step][letter]*additional.multiplier);
        }
      }
    break;
    case "riffle":
      for(step in content){
        arr[step]=[];
        for(letter in content[step]){
          for(var i=0;i<additional.checkpoint.length;i++){
            if(additional.checkpoint[i]>content[step][letter]){
              arr[step][letter]=(additional.multiplier*i);
              break;
            }else if(i==additional.checkpoint.length-1){
              arr[step][letter]=(additional.multiplier*(i+1));
            }
          }
        }
      }
    break;
    case "ranking":
    var tmparr=[];
      for(var i=0;i<content.length;i++){
        for(var j=0;j<content[i].length;j++){
          ////console.log(content[i][j]);
          tmparr.push({
            xcoord:i,
            ycoord:j,
            num:content[i][j]
          });
        }
      }
      console.log(tmparr);
      for(var i=1;i<tmparr.length;i++){
        console.log(i-1);
        if(tmparr[i-1].num<tmparr[i].num){
          var tmp=tmparr[i];
          tmparr[i]=tmparr[i-1];
          tmparr[i-1]=tmp;
          i=0;
          continue;
        }
      }
      var dumbI=0;
      for(var i=0;i<tmparr.length;i++){
        ////console.log(tmparr);
        if(i==0||tmparr[i].num!=tmparr[i-1].num){
          dumbI=i;
        }
        if(typeof(arr[tmparr[i].xcoord])=="undefined"){
          arr[tmparr[i].xcoord]=[];
        }
        if(typeof(additional.backwords)=="undefined"){
          arr[tmparr[i].xcoord][tmparr[i].ycoord]=(tmparr.length-dumbI)*additional.multiplier;
        }else{
          arr[tmparr[i].xcoord][tmparr[i].ycoord]=(dumbI+1)*additional.multiplier;
        }
      }
    break;
  }
  return arr;
}
function calculatePercents(){
  tmp={};
  tmp.presence=[];
  for(i in dataBase.presence){
    tmp.presence[i]=calculateAnything("riffle", dataBase.presence[i].classes, {
      multiplier:dataBase.presence[i].multiplier,
      checkpoint:dataBase.presence[i].riffles
    });
  }
  tmp.extras=[];
  for(i in dataBase.extraPoints){
    tmp.extras[i]=calculateAnything("counter", dataBase.extraPoints[i].classes, {
      multiplier:dataBase.extraPoints[i].multiplier
    });
  }
  tmp.competitions={
    sport:[],
    inter:[],
    outer:[]
  };
  for(i in dataBase.competitions.sport){
    tmp.competitions.sport[i]=calculateAnything("counter", dataBase.competitions.sport[i].classes, {
      multiplier:dataBase.competitions.sport[i].multiplier
    });
  }
  for(i in dataBase.competitions.inter){
    tmp.competitions.inter[i]=calculateAnything("counter", dataBase.competitions.inter[i].classes, {
      multiplier:dataBase.competitions.inter[i].multiplier
    });
  }
  for(i in dataBase.competitions.outer){
    tmp.competitions.outer[i]=calculateAnything("counter", dataBase.competitions.outer[i].classes, {
      multiplier:dataBase.competitions.outer[i].multiplier
    });
  }
  tmp.reading=calculateAnything("ranking", dataBase.reading,{
    multiplier:1
  });
  tmp.competitions.olimpics=calculateAnything("counter", dataBase.competitions.olimpics.classes,{
    multiplier:dataBase.competitions.olimpics.multiplier
  });
  tmp.marks={
    average:[],
    primes:[]
  };
  tmp.marks.average=calculateAnything("ranking", dataBase.marks.average.classes,{
    multiplier:dataBase.marks.average.multiplier
  });
  tmp.marks.primes=calculateAnything("counter", dataBase.marks.primes.classes,{
    multiplier:dataBase.marks.primes.multiplier
  });
  tmp.score=[];
  tmp.semester=[];
  ////console.log(tmp.semester);
  for(var r=0;r< dataBase.classes.length;r++){
    tmp.score[r]=[];
    tmp.semester[r]=[];
    ////console.log(r);
    for(var t=0;t< dataBase.classes[r].length;t++){
      ////console.log(dataBase.classes);

      //console.log(r+" "+t);
      //console.log(tmp);
      if(dataBase.semesterPresence.classes[r][t]==0){
        var tmp_num=0;
        for(k in dataBase.presence){
          tmp_num+=dataBase.presence[k].classes[r][t];
          ////console.log(k);
        }
        tmp.semester[r][t]=miniRiffleCounter(Math.round(tmp_num/dataBase.presence.length),[80, 85, 90, 95])*5;
      }else{
        tmp.semester[r][t]=miniRiffleCounter(dataBase.semesterPresence.classes[r][t],[80, 85, 90, 95])*5;
      }
      tmp.score[r][t]=scoreForClass(r, t, tmp);
    }
  }
  tmp.place=calculateAnything('ranking', tmp.score, {multiplier:1, backwords:true});
  return tmp;
}
function writeDataInView(xcoord, ycoord){
  $(".class-view-scores").html('');
  var tmp_names=[];var tmp_num=[];var tmp_points=[];
  var tmp=calculatePercents();
  var tmp_calc=0;
  for(i in dataBase.presence){
    tmp_names[i]=dataBase.presence[i].name;
    tmp_num[i]=dataBase.presence[i].classes[xcoord][ycoord];
    tmp_points[i]=tmp.presence[i][xcoord][ycoord];
    tmp_calc+=dataBase.presence[i].classes[xcoord][ycoord]
  }
  tmp_names.push("Semestr "+dataBase.semester);
  if(dataBase.semesterPresence.classes[xcoord][ycoord]==0){
    tmp_num.push(parseInt(tmp_calc/tmp_num.length));
  }else{
    tmp_num.push(dataBase.semesterPresence.classes[xcoord][ycoord]);
  }
  tmp_points.push(tmp.semester[xcoord][ycoord]);
  generateSection("obecność", tmp_names, tmp_num, tmp_points);
  tmp_names=[
    dataBase.marks.average.name,
    dataBase.marks.primes.name
  ];
  tmp_num=[
    dataBase.marks.average.classes[xcoord][ycoord],
    dataBase.marks.primes.classes[xcoord][ycoord]
  ];
  tmp_points=[
    tmp.marks.average[xcoord][ycoord],
    tmp.marks.primes[xcoord][ycoord],
  ];
  generateSection("oceny", tmp_names, tmp_num, tmp_points);
  $(".class-view-scores").append("<h2>Zawody</h2>");
  tmp_names=[];tmp_num=[];tmp_points=[];
  for(i in dataBase.competitions.outer){
    tmp_names[i]=dataBase.competitions.outer[i].name;
    tmp_num[i]=dataBase.competitions.outer[i].classes[xcoord][ycoord];
    tmp_points[i]=tmp.competitions.outer[i][xcoord][ycoord];
  }
  generateSection("zewnętrzne", tmp_names, tmp_num, tmp_points);
  tmp_names=[];tmp_num=[];tmp_points=[];
  for(i in dataBase.competitions.inter){
    tmp_names[i]=dataBase.competitions.inter[i].name;
    tmp_num[i]=dataBase.competitions.inter[i].classes[xcoord][ycoord];
    tmp_points[i]=tmp.competitions.inter[i][xcoord][ycoord];
  }
  tmp_names.push("Olimpiady");
  tmp_num.push(dataBase.competitions.olimpics.classes[xcoord][ycoord]);
  tmp_points.push(tmp.competitions.olimpics[xcoord][ycoord]);
  generateSection("wewnętrzne", tmp_names, tmp_num, tmp_points);
  tmp_names=[];tmp_num=[];tmp_points=[];
  for(i in dataBase.competitions.sport){
    tmp_names[i]=dataBase.competitions.sport[i].name;
    tmp_num[i]=dataBase.competitions.sport[i].classes[xcoord][ycoord];
    tmp_points[i]=tmp.competitions.sport[i][xcoord][ycoord];
  }
  generateSection("sport", tmp_names, tmp_num, tmp_points);
  tmp_names=[];tmp_num=[];tmp_points=[];
  for(i in dataBase.extraPoints){
    tmp_names[i]=dataBase.extraPoints[i].name;
    tmp_num[i]=dataBase.extraPoints[i].classes[xcoord][ycoord];
    tmp_points[i]=tmp.extras[i][xcoord][ycoord];
  }
  generateSection("dodatkowe", tmp_names, tmp_num, tmp_points);
  tmp_names=[
    "czytelnictwo"
  ];
  tmp_num=[
    dataBase.reading[xcoord][ycoord]
  ];
  tmp_points=[
    tmp.reading[xcoord][ycoord]
  ];
  generateSection("czytelnia", tmp_names, tmp_num, tmp_points);
  $(".class-view-scores").append('<h3>Podsumowanie</h3>');
  $(".class-view-scores").append('<div class="row class-view-score-section"></div>');
  $(".class-view-scores .class-view-score-section").last().append('<div class="col-6 class-view-display-endpoint"><div data-key="score"><h2>punkty</h2><div class="points">'+tmp.score[xcoord][ycoord]+'</div></div></div>');
  $(".class-view-scores .class-view-score-section").last().append('<div class="col-6 class-view-display-endpoint"><div data-key="place"><h2>miejsce</h2><div class="place">'+tmp.place[xcoord][ycoord]+'</div></div></div>');
}
$(document).ready(function(){
  generateClasses();

  $(".save-me-very").on("click",function(){
    insertDataFromEditor();
  });
  $(".class-view-option").on("click", function(){
    var title;
    var configObj;
    switch($(this).data("option")){
      case 'marks':
        title="oceny";
        configObj={
          interface:[
            {
              name:"średnia ocen",
              key:'average',
              value:dataBase.marks.average.classes[$(".class-view-window").data("xcoord")][$(".class-view-window").data("ycoord")]
            },
            {
              name:"uczniowie ze średnią 4.5+",
              key:'primes',
              value:dataBase.marks.primes.classes[$(".class-view-window").data("xcoord")][$(".class-view-window").data("ycoord")]
            }
          ],
          section:$(this).data("option")
        };
      break;
      case 'extras':
        title="dodatkowe";
        configObj={
          interface:[],
          section:$(this).data("option")
        };
        for(var x=0;x<dataBase.extraPoints.length;x++){
          configObj.interface.push({
            name:dataBase.extraPoints[x].name,
            key:dataBase.extraPoints[x].name,
            value:dataBase.extraPoints[x].classes[$(".class-view-window").data("xcoord")][$(".class-view-window").data("ycoord")]
          });
        }
      break;
      case 'competitions':
        title="zawody";
        configObj={
          interface:[],
          section:$(this).data("option")
        };
        for(var x=0;x<dataBase.competitions.sport.length;x++){
          configObj.interface.push({
            name:"sport - "+dataBase.competitions.sport[x].name,
            key:"sport - "+dataBase.competitions.sport[x].name,
            value:dataBase.competitions.sport[x].classes[$(".class-view-window").data("xcoord")][$(".class-view-window").data("ycoord")]
          });
        }
        for(var x=0;x<dataBase.competitions.inter.length;x++){
          configObj.interface.push({
            name:"wewnętrzne - "+dataBase.competitions.inter[x].name,
            key:"wewnętrzne - "+dataBase.competitions.inter[x].name,
            value:dataBase.competitions.inter[x].classes[$(".class-view-window").data("xcoord")][$(".class-view-window").data("ycoord")]
          });
        }
        for(var x=0;x<dataBase.competitions.outer.length;x++){
          configObj.interface.push({
            name:"zewnętrzne - "+dataBase.competitions.outer[x].name,
            key:"zewnętrzne - "+dataBase.competitions.outer[x].name,
            value:dataBase.competitions.outer[x].classes[$(".class-view-window").data("xcoord")][$(".class-view-window").data("ycoord")]
          });
        }
        configObj.interface.push({
          name:"olimpiady",
          key:"olimpiady",
          value:dataBase.competitions.olimpics.classes[$(".class-view-window").data("xcoord")][$(".class-view-window").data("ycoord")]
        });
      break;
      case 'reading':
        title="czytelnictwo";
        //////console.log($(".class-view-window").data("ycoord"));
        //////console.log($(".class-view-window").data("xcoord"));
        configObj={
          interface:[
            {
              name:"czytelnictwo",
              key:'reading',
              value:dataBase.reading[$(".class-view-window").data("xcoord")][$(".class-view-window").data("ycoord")]
            }
          ],
          section:$(this).data("option")
        };
      break;
      case 'presence':
        title="obecność";
        configObj={
          interface:[],
          section:$(this).data("option")
        };
        for(var x=0;x<dataBase.presence.length;x++){
          configObj.interface.push({
            name:dataBase.presence[x].name,
            key:dataBase.presence[x].name,
            value:dataBase.presence[x].classes[$(".class-view-window").data("xcoord")][$(".class-view-window").data("ycoord")]
          });
        }
        //////console.log(type);
        //////console.log(configObj);
      break;
      case 'presence-semester':
        title="obecność za semestr (ustaw 0 aby liczyło automatycznie)";
        configObj={
          interface:[],
          section:$(this).data("option")
        };
        configObj.interface.push({
          name:'obecność semestralna',
          key:'presence-semester',
          value:dataBase.semesterPresence.classes[$(".class-view-window").data("xcoord")][$(".class-view-window").data("ycoord")]
        });
        //////console.log(type);
        //////console.log(configObj);
      break;
    }
    printMenu(title, [$(".class-view-window").data("xcoord"), $(".class-view-window").data("ycoord")], configObj);
  });
  $(".nav-table-button").on("click", function(){
    $("article").addClass("hide-me");
    $(".all-classes-view").removeClass("hide-me");
  });
  $(".nav-raport-button").on('click', function(){
    generateRaport('table');
  });
  printTable();
  loadWorkspace();
  //////console.log(calculatePercents());
});
function openFile(event) {
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function(){
      var text = reader.result;
      var tmp=JSON.parse(text);
      if(typeof(tmp.semesterPresence)=="undefined"){
        tmp.semesterPresence=dataBase.semesterPresence;
      }
      dataBase=tmp;
      console.log(text);
      console.log(JSON.parse(text));
      printTable();
      $("article").addClass("hide-me");
      $(".all-classes-view").removeClass("hide-me");
    };
    reader.readAsText(input.files[0]);

  }

var clickCount = 0;
function getColorPallette(){
    var url = "http://colormind.io/api/";
    var color = hexToRgb($("#colorPicker").val());
    var data = {
        model : "ui",
        input : [[color.r, color.g, color.b],"N","N","N","N"]
    }
    
    var http = new XMLHttpRequest();
    
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            var palette = JSON.parse(http.responseText).result;
            var rgbString = '';
          for(x = 0; x < palette.length; x++) {
           rgbString += ("rgb("+ palette[x][0] + ','+ palette[x][1] + ',' + palette[x][2] + ")|")        
          }
        }
        $("#hiddenInput").val(rgbString);
    }   
    http.open("POST", url, true);
    http.send(JSON.stringify(data));
};
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
$("#sizePicker").submit(function(event){
    makeGrid();
    event.preventDefault();
});
function setUpGridEvent(){
$("#pixelCanvas tr td").on("click", function(){
    if($("#generatePallette").prop('checked')==true){
    var inputColor = ($("#hiddenInput").val()).split("|");
    inputColor.pop();
    if(inputColor.length === clickCount){
        clickCount = 0;
    }
    $("h1").css("color", inputColor[clickCount]);
    $(this).css("background", inputColor[clickCount]);
    clickCount++;
}else{
    $("h1").css("color", $("#colorPicker").val());
    $(this).css("background", $("#colorPicker").val());
}
});
}
function makeGrid() {
var yAxisInput = $("#inputHeight").val();
var xAxisInput = $("#inputWidth").val();
var row = "";
var cell = "";
$("#pixelCanvas").empty();
for(x = 0; x < xAxisInput; x++){
    cell += "<td></td>";
}
for(y = 0; y < yAxisInput; y++){
    row += ("<tr>" + cell + "</tr>");
}
$("#pixelCanvas").append(row);
setUpGridEvent();
$("#colorPicker").prop('disabled', false);
}
$("#colorPicker").on("change", function(){
    getColorPallette();
    $("#palletteDiv").prop('hidden', false);
  });

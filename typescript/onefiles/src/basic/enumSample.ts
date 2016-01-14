enum Color {
  red, green, blue
}
console.log(JSON.stringify(Color, null, 2));
class K {
  public static TYPE: (typeof Color) = Color;
}

console.log(Color.red === K.TYPE.red);
/*
{
  "0": "red",
  "1": "green",
  "2": "blue",
  "red": 0,
  "green": 1,
  "blue": 2
}

var Color;
(function (Color) {
    Color[Color["red"] = 0] = "red";
    Color[Color["green"] = 1] = "green";
    Color[Color["blue"] = 2] = "blue";
})(Color || (Color = {}));
*/
